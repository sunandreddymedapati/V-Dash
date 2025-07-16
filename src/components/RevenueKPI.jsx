import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, BarChart3, Table, Printer } from 'lucide-react';
import PropertyList from './PropertyList';
import RevenueKPITable from './RevenueKPITable';
import MonthYearPicker from './MonthYearPicker';
import RevenueKPIControls from './RevenueKPIControls';
import RevenueKPILineChart from './RevenueKPILineChart';
import PROPERTIES from '../constants/properties';
import {
  generateColumns,
  generateData,
  handleDownload,
  handlePrint
} from './revenueKPIUtils';

const RevenueKPI = () => {
  const [selectedKPI, setSelectedKPI] = useState('total-revenue');
  const [selectedTimeframe, setSelectedTimeframe] = useState('last-15-days');
  const [chartMode, setChartMode] = useState('table');
  const today = new Date();
  const [monthYear, setMonthYear] = useState({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

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

  const kpiOptions = [
    { value: 'total-revenue', label: 'Total Revenue' },
    { value: 'revpar', label: 'RevPAR' },
    { value: 'adr', label: 'ADR' },
    { value: 'city-ledger', label: 'City Ledger (Direct Bills Receivables)' },
    { value: 'guest-ledger', label: 'Guest Ledger' },
    { value: 'advance-deposits', label: 'Advance Deposits' },
    { value: 'occupancy', label: 'Occupancy (%)' },
    { value: 'occupancy-forecast', label: 'Occupancy Forecast' },
    { value: 'cash', label: 'Cash' },
    { value: 'bank-cards', label: 'Bank Cards' },
    { value: 'room-revenue', label: 'Room Revenue' },
    { value: 'other-revenue', label: 'Other Revenue' },
    { value: 'tax', label: 'Tax' },
  ];

  const timeframeOptions = [
    { value: 'last-15-days', label: 'Last 15 Days' },
    { value: 'mtd', label: 'MTD' },
    { value: 'ytd', label: 'YTD' },
    { value: 'trailing-12', label: 'Trailing 12' },
    { value: 'last-3-years', label: 'Last 3 Years' },
  ];

  const columns = generateColumns({ selectedTimeframe, monthYear, today });

  const onDownload = () => handleDownload(columns, selectedKPI, selectedTimeframe, monthYear);
  const onPrint = () => handlePrint(outputRef);

  const handleToggleChart = () => {
    setChartMode((mode) => (mode === 'table' ? 'chart' : 'table'));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Revenue KPIs</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleToggleChart}>
              {chartMode === 'table' ? (
                <BarChart3 className="w-4 h-4" />
              ) : (
                <Table className="w-4 h-4" />
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={onPrint}>
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
        <div ref={outputRef}>
          <PropertyList>
            {(properties) => {
              if (chartMode === 'table') {
                return (
                  <RevenueKPITable
                    properties={properties}
                    columns={columns}
                    generateData={(property, colKey) =>
                      generateData(selectedKPI, property, colKey)
                    }
                  />
                );
              } else {
                return (
                  <RevenueKPILineChart
                    properties={properties}
                    columns={columns}
                    generateData={(property, colKey) =>
                      generateData(selectedKPI, property, colKey)
                    }
                    selectedKPI={selectedKPI}
                  />
                );
              }
            }}
          </PropertyList>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueKPI;
