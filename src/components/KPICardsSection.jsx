// Imports
import React, { useEffect, useState } from 'react';
import PortfolioSummaryHeader from '@/components/PortfolioSummaryHeader';
import TimeTabsSection from '@/components/TimeTabsSection';
import VarianceTabsSection from '@/components/VarianceTabsSection';
import { getCurrentKPIData } from '@/components/KPIDataService';
import { format } from 'date-fns';
import { api } from '@/store/api';
import KPICardsSkeleton from '@/components/ui/KPICardsSkeleton';

// Helper to determine the correct label
const getVarianceSuffix = (kpiVarianceTab) => {
  if (kpiVarianceTab === "last-year") return "LYV";
  if (kpiVarianceTab === "budget") return "BV";
  if (kpiVarianceTab === "year-before") return "YBY";
  return "";
};

const KPICardsSection = ({
  kpiTimeTab,
  setKpiTimeTab,
  kpiVarianceTab,
  setKpiVarianceTab,
  selectedDate,
  selectedSegment,
  segments
}) => {
  // Get current KPI data based on selected tabs
  // Fetch KPI data (no property_id) like HotelKPICardsSection
  const [kpiData, setKpiData] = useState(null);

  const fetchApiData = async () => {
    try {
      const resp = await api.get("reports/revenue-kpi", {
        params: {
          date: selectedDate
            ? format(
                selectedDate instanceof Date ? selectedDate : new Date(selectedDate),
                'yyyy-MM-dd'
              )
            : '',
        },
      });
      setKpiData(resp?.data || {});
    } catch (err) {
      console.error('Failed to fetch KPI data:', err);
      setKpiData({}); // ensure kpiData is an empty object on error
    }
  };

  useEffect(() => {
    setKpiData(null);
    fetchApiData();
  }, [selectedDate]);

  // Get data based on selected tabs from fetched data
  const getKPIData = () => ((kpiData?.[kpiTimeTab] || {})[kpiVarianceTab] || []);

  const varianceSuffix = getVarianceSuffix(kpiVarianceTab);
  const isEmpty = kpiData && Object.keys(kpiData).length === 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <PortfolioSummaryHeader
        selectedDate={selectedDate}
        selectedSegment={selectedSegment}
        segments={segments}
      />

      {kpiData === null ? (
        <KPICardsSkeleton cards={4} />
      ) : isEmpty ? (
        <div className="p-6 text-center text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/40 border border-dashed border-gray-300 dark:border-gray-700/70 rounded-lg">
          Data is available only from 01-01-2024 till 31-08-2025.
        </div>
      ) : (
        <>
          <TimeTabsSection
            kpiTimeTab={kpiTimeTab}
            setKpiTimeTab={setKpiTimeTab}
            getCurrentKPIData={getKPIData}
            varianceSuffix={varianceSuffix}
          />
          <VarianceTabsSection
            kpiVarianceTab={kpiVarianceTab}
            setKpiVarianceTab={setKpiVarianceTab}
          />
        </>
      )}
    </div>
  );
};

export default KPICardsSection;
