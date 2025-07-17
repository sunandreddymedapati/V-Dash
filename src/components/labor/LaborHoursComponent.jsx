import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import LaborHoursHeader from './LaborHoursHeader';
import LaborHoursChart from './LaborHoursChart';
import LaborHoursViewDialog from './LaborHoursViewDialog';
import { downloadLaborHoursCSV } from '@/utils/csvDownload';
import { generatePropertyEmployeeData } from '@/utils/propertyEmployeeData';

const LaborHoursComponent = ({ selectedHotel }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Month');
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  // Default date range: first day of month to today
  const getDefaultDateRange = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return {
      from: firstDayOfMonth,
      to: today
    };
  };

  const [dateRange, setDateRange] = useState(getDefaultDateRange());

  // Generate employee data
  const employeeData = useMemo(() => {
    const propertyEmployees = generatePropertyEmployeeData(selectedHotel);

    let daysDiff;
    if (selectedPeriod === 'Month') {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      daysDiff = Math.ceil((today - firstDayOfMonth) / (1000 * 60 * 60 * 24)) + 1;
    } else if (selectedPeriod === 'Custom Dates' && dateRange?.from && dateRange?.to) {
      daysDiff = Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24)) + 1;
    } else {
      daysDiff = new Date().getDate();
    }

    const multiplier = Math.max(daysDiff / 30, 0.1);

    return propertyEmployees.map(name => ({
      name,
      regular: Math.floor((Math.random() * 15 + 5) * multiplier),
      overtime: Math.floor((Math.random() * 8 + 2) * multiplier)
    }));
  }, [selectedHotel, selectedPeriod, dateRange]);

  // X-axis scaling
  const xAxisValues = useMemo(() => {
    let daysDiff;
    if (selectedPeriod === 'Month') {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      daysDiff = Math.ceil((today - firstDayOfMonth) / (1000 * 60 * 60 * 24)) + 1;
    } else if (selectedPeriod === 'Custom Dates' && dateRange?.from && dateRange?.to) {
      daysDiff = Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24)) + 1;
    } else {
      daysDiff = new Date().getDate();
    }

    if (daysDiff <= 7) {
      return ['0', '10', '20', '30', '40'];
    } else if (daysDiff <= 30) {
      return ['0', '20', '40', '60', '80'];
    } else if (daysDiff <= 90) {
      return ['0', '30', '60', '90', '120'];
    } else {
      return ['0', '50', '100', '150', '200'];
    }
  }, [selectedPeriod, dateRange]);

  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
    if (value === 'Custom Dates' && !dateRange) {
      setDateRange(getDefaultDateRange());
    }
  };

  const handleDownloadCSV = () => {
    downloadLaborHoursCSV(employeeData);
  };

  const handleViewOptions = () => {
    setViewDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <LaborHoursHeader
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onDownloadCSV={handleDownloadCSV}
          onViewOptions={handleViewOptions}
        />
      </CardHeader>
      <CardContent>
        <LaborHoursChart
          employeeData={employeeData}
          xAxisValues={xAxisValues}
        />
      </CardContent>
      
      <LaborHoursViewDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        employeeData={employeeData}
      />
    </Card>
  );
};

export default LaborHoursComponent;
