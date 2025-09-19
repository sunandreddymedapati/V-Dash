// In component: RevenueKPI
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, BarChart3, Table, Printer } from 'lucide-react';
import PropertyList from './PropertyList';
import RevenueKPITable from './RevenueKPITable';
import MonthYearPicker from './MonthYearPicker';
import RevenueKPIControls from './RevenueKPIControls';
import RevenueKPILineChart from './RevenueKPILineChart';
import {
  generateColumns,
  generateData,
  handleDownload,
  handlePrint
} from './revenueKPIUtils';
import { api } from '@/store/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useDateStore } from '@/store/dateStore';

const RevenueKPI = () => {
  const [selectedKPI, setSelectedKPI] = useState('total_revenue');
  const [selectedTimeframe, setSelectedTimeframe] = useState('last-15-days');
  const [chartMode, setChartMode] = useState('table');
  const dateFromStore = useDateStore((s) => s.selectedDate?.from);
  const today = dateFromStore || new Date();
  const [monthYear, setMonthYear] = useState({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiColumns, setApiColumns] = useState(null);
  const [apiDetails, setApiDetails] = useState(null);

  const outputRef = useRef(null);
  const monthYearRequired = ['mtd', 'ytd', 'trailing-12', 'last-3-years'].includes(selectedTimeframe);

  useEffect(() => {
    if (monthYearRequired) {
      setMonthYear({
        month: today.getMonth(),
        year: today.getFullYear(),
      });
    }
    // eslint-disable-next-line
  }, [selectedTimeframe]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          timeframe: selectedTimeframe,
          unit: 'USD',
          decimals: 2,
        };
        if (selectedTimeframe !== 'last-15-days') {
          params.month = monthYear.month + 1;
          params.year = monthYear.year;
        }
        const res = await api.get('reports/grid', { params });
        const { columns: cols, details } = res || {};
        setApiColumns(Array.isArray(cols) ? cols : null);
        setApiDetails(Array.isArray(details) ? details : null);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError(e.message || 'Failed to fetch KPI data');
        }
        setApiColumns(null);
        setApiDetails(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedTimeframe, monthYear]);

  // Determine if there is any non-null/defined value for the selected KPI
  const hasApiDataForKPI = React.useMemo(() => {
    if (!apiDetails) return false;
    return apiDetails.some(d => {
      const series = d?.values?.[selectedKPI];
      if (!series) return false;
      return Object.values(series).some(v => v !== null && v !== undefined && v !== '');
    });
  }, [apiDetails, selectedKPI]);

  const kpiOptions = [
    { value: 'total_revenue', label: 'Total Revenue' },
    { value: 'revpar', label: 'RevPAR' },
    { value: 'adr', label: 'ADR' },
    { value: 'city_ledger', label: 'City Ledger (Direct Bills Receivables)' },
    { value: 'guest_ledger', label: 'Guest Ledger' },
    { value: 'occupancy', label: 'Occupancy (%)' },
    { value: 'cash', label: 'Cash' },
    { value: 'bank_cards', label: 'Bank Cards' },
    { value: 'room_revenue', label: 'Room Revenue' },
    { value: 'other_revenue', label: 'Other Revenue' },
    { value: 'tax', label: 'Tax' },
  ];

  const timeframeOptions = [
    { value: 'last-15-days', label: 'Last 15 Days' },
    { value: 'mtd', label: 'MTD' },
    { value: 'ytd', label: 'YTD' },
    { value: 'trailing-12', label: 'Trailing 12' },
    // { value: 'last-3-years', label: 'Last 3 Years' },
  ];

  const columns = generateColumns({ selectedTimeframe, monthYear, today });
  const effectiveColumns = apiColumns || columns;

  const onDownload = () => handleDownload(effectiveColumns, selectedKPI, selectedTimeframe, monthYear);
  const onPrint = () => handlePrint(outputRef);

  const handleToggleChart = () => {
    setChartMode((mode) => (mode === 'table' ? 'chart' : 'table'));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Business Revenue KPIs</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onDownload} disabled={loading || !hasApiDataForKPI}>
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleToggleChart} disabled={loading}>
              {chartMode === 'table' ? (
                <BarChart3 className="w-4 h-4" />
              ) : (
                <Table className="w-4 h-4" />
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={onPrint} disabled={loading}>
              <Printer className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <RevenueKPIControls
            selectedKPI={selectedKPI}
            onKPIChange={setSelectedKPI}
            selectedTimeframe={selectedTimeframe}
            onTimeframeChange={setSelectedTimeframe}
            monthYear={monthYear}
            onMonthYearChange={setMonthYear}
            monthYearRequired={monthYearRequired}
            kpiOptions={kpiOptions}
            timeframeOptions={timeframeOptions}
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          // Skeletons during load
          chartMode === 'table' ? (
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <Skeleton className="h-6 w-48" />
                <div className="flex-1 overflow-x-auto">
                  <div className="flex gap-2 min-w-[600px]">
                    {effectiveColumns.map((c) => (
                      <Skeleton key={c.key} className="h-6 w-24" />
                    ))}
                    <Skeleton className="h-6 w-28" />
                  </div>
                </div>
              </div>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Skeleton className="h-6 w-48" />
                  <div className="flex-1 overflow-x-auto">
                    <div className="flex gap-2 min-w-[600px]">
                      {effectiveColumns.map((c) => (
                        <Skeleton key={c.key} className="h-6 w-24" />
                      ))}
                      <Skeleton className="h-6 w-28" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full py-2 pr-2 pl-1" style={{ minHeight: 400 }}>
              <Skeleton className="w-full h-[420px] rounded-md" />
              <div className="mt-3 text-xs text-gray-400 text-center">
                <Skeleton className="h-4 w-64 mx-auto" />
              </div>
            </div>
          )
        ) : !hasApiDataForKPI ? (
          // Empty state when API returned no data (no fallback randoms)
          <div className="p-10 text-center text-sm text-muted-foreground">
            No data available for the selected KPI and timeframe.
          </div>
        ) : (
          <div ref={outputRef}>
            <PropertyList>
              {(storeProperties) => {
                const properties = apiDetails ? apiDetails.map(d => d.property_name) : storeProperties;

                // Build lookup only from API; do not fallback to generated values
                const valueMap = apiDetails
                  ? apiDetails.reduce((acc, d) => {
                      acc[d.property_name] = d.values || {};
                      return acc;
                    }, {})
                  : null;

                // Reorder: properties that have any value for selectedKPI come first, while keeping the rest of your logic unchanged
                const hasDataForProperty = (name) => {
                  const series = valueMap?.[name]?.[selectedKPI];
                  if (!series) return false;
                  return Object.values(series).some(v => v !== null && v !== undefined && v !== '');
                };

                const sortedProperties = valueMap
                  ? (() => {
                      const withData = [];
                      const withoutData = [];
                      properties.forEach((p) => (hasDataForProperty(p) ? withData.push(p) : withoutData.push(p)));
                      return withData.concat(withoutData);
                    })()
                  : properties;

                if (chartMode === 'table') {
                  return (
                    <RevenueKPITable
                      properties={sortedProperties}
                      columns={effectiveColumns}
                      selectedKPI={selectedKPI}
                      generateData={(property, colKey) => {
                        const v = valueMap?.[property]?.[selectedKPI]?.[colKey];
                        return v ?? '';
                      }}
                    />
                  );
                } else {
                  return (
                    <RevenueKPILineChart
                      properties={sortedProperties}
                      columns={effectiveColumns}
                      generateData={(property, colKey) => {
                        const v = valueMap?.[property]?.[selectedKPI]?.[colKey];
                        return v ?? null;
                      }}
                      selectedKPI={selectedKPI}
                    />
                  );
                }
              }}
            </PropertyList>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueKPI;
