import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const VarianceTabsSection = ({ kpiVarianceTab, setKpiVarianceTab }) => {
  return (
    <Tabs value={kpiVarianceTab} onValueChange={setKpiVarianceTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="last-year">Last Year Variance</TabsTrigger>
        {/* <TabsTrigger value="budget">Budget Variance</TabsTrigger>
        <TabsTrigger value="year-before">Year Before Last Variance</TabsTrigger> */}
      </TabsList>
    </Tabs>
  );
};

export default VarianceTabsSection;
