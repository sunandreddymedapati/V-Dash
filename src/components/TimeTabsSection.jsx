import React, { useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import KPIGrid from '@/components/KPIGrid';
import { use } from 'react';

const TimeTabsSection = ({
  kpiTimeTab,
  setKpiTimeTab,
  getCurrentKPIData,
  varianceSuffix = "LYV"
}) => {
  const [currData, setCurrData] = React.useState([]);

  useEffect(() => {
  let cancelled = false;

  const run = async () => {
    try {
      const data = await getCurrentKPIData();
      if (!cancelled) setCurrData(data);
    } catch (err) {
      // TODO: alert error
    }
  };

  run();

  return () => {
    cancelled = true;
  };
}, [kpiTimeTab, getCurrentKPIData]);

  return (
    <Tabs value={kpiTimeTab} onValueChange={setKpiTimeTab} className="mb-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="daily">Daily</TabsTrigger>
        <TabsTrigger value="mtd">MTD</TabsTrigger>
        <TabsTrigger value="ytd">YTD</TabsTrigger>
      </TabsList>
      
      <TabsContent value="daily" className="mt-6">
        <KPIGrid kpiData={currData} varianceSuffix={varianceSuffix} />
      </TabsContent>
      
      <TabsContent value="mtd" className="mt-6">
        <KPIGrid kpiData={currData} varianceSuffix={varianceSuffix} />
      </TabsContent>
      
      <TabsContent value="ytd" className="mt-6">
        <KPIGrid kpiData={currData} varianceSuffix={varianceSuffix} />
      </TabsContent>
    </Tabs>
  );
};

export default TimeTabsSection;
