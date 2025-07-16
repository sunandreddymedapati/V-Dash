import React from 'react';
import MPRChart from '@/components/labor/MPRChart';
import AverageLaborChart from '@/components/labor/AverageLaborChart';
import { format, startOfMonth, eachDayOfInterval, min } from 'date-fns';

const LaborChartsGrid = ({ selectedDate }) => {
  // Generate MPR data from day 1 of the month to selected date
  const generateMonthMPRData = () => {
    const monthStart = startOfMonth(selectedDate);
    const today = new Date();

    // Don't go beyond current date or selected date
    const actualEndDate = min([selectedDate, today]);
    const daysInRange = eachDayOfInterval({ start: monthStart, end: actualEndDate });

    return daysInRange.map(day => ({
      date: format(day, 'MM/dd'),
      actual: Math.round(25 + Math.random() * 15), // Whole numbers between 25-40 minutes
      budgeted: Math.round(30 + Math.random() * 8)  // Whole numbers between 30-38 minutes
    }));
  };

  // Generate Labor Cost data from day 1 of the month to selected date
  const generateMonthLaborCostData = () => {
    const monthStart = startOfMonth(selectedDate);
    const today = new Date();

    // Don't go beyond current date or selected date
    const actualEndDate = min([selectedDate, today]);
    const daysInRange = eachDayOfInterval({ start: monthStart, end: actualEndDate });

    return daysInRange.map(day => ({
      date: format(day, 'MM/dd'),
      actual: parseFloat((75 + Math.random() * 30).toFixed(2)), // Numbers between $75-$105
      budgeted: parseFloat((85 + Math.random() * 15).toFixed(2))  // Numbers between $85-$100
    }));
  };

  const mprData = generateMonthMPRData();
  const laborCostData = generateMonthLaborCostData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MPRChart data={mprData} />
      <AverageLaborChart data={laborCostData} />
    </div>
  );
};

export default LaborChartsGrid;
