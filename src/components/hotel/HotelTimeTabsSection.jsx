import React, { useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import HotelKPIGrid from './HotelKPIGrid';

const HotelTimeTabsSection = ({
  kpiTimeTab,
  setKpiTimeTab,
  getCurrentKPIData,
  varianceSuffix
}) => {
  const [currData, setCurrData] = React.useState([]);
  useEffect(() => {
    
    const run = async () => {
      try {
        const data = await getCurrentKPIData();
        setCurrData(data);
      } catch (err) {
        // TODO: alert error
      }
    };
  
    run();

  }, [kpiTimeTab, getCurrentKPIData]);
  // Always show all 8 cards (logic for filtering already in parent's getCurrentKPIData)
  return (
    <Tabs value={kpiTimeTab} onValueChange={setKpiTimeTab} className="mb-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="daily">Daily</TabsTrigger>
        <TabsTrigger value="mtd">MTD</TabsTrigger>
        <TabsTrigger value="ytd">YTD</TabsTrigger>
      </TabsList>

      <TabsContent value="daily" className="mt-6">
        <HotelKPIGrid kpiData={currData} varianceSuffix={varianceSuffix} />
      </TabsContent>
      <TabsContent value="mtd" className="mt-6">
        <HotelKPIGrid kpiData={currData} varianceSuffix={varianceSuffix} />
      </TabsContent>
      <TabsContent value="ytd" className="mt-6">
        <HotelKPIGrid kpiData={currData} varianceSuffix={varianceSuffix} />
      </TabsContent>
    </Tabs>
  );
};

export default HotelTimeTabsSection;
