import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { MONTHS } from './constants';
import { formatCurrency, calculateAverage } from './utils';

const BottomSection = () => {
  // Sample percentage values for demonstration - in real app this would come from props/context
  const revenuePercentages = [8.5, 9.2, 7.8, 8.1, 9.5, 8.9, 9.3, 8.7, 8.4, 9.1, 8.6, 9.0];
  const averagePercentage = calculateAverage(revenuePercentages);

  return (
    <>
      {/* Blank Row */}
      <TableRow className="h-8">
        <TableCell className="border-r py-1"></TableCell>
        {Array(12).fill(0).map((_, index) => (
          <TableCell key={index} className="text-center border-r py-1"></TableCell>
        ))}
        <TableCell className="text-center border-r py-1"></TableCell>
        <TableCell className="text-center py-1"></TableCell>
      </TableRow>

      {/* Months Row */}
      <TableRow className="h-8">
        <TableCell className="border-r py-1"></TableCell>
        {MONTHS.map((month) => (
          <TableCell key={month} className="text-center border-r py-1 font-medium">{month}</TableCell>
        ))}
        <TableCell className="text-center border-r py-1 font-medium">AVERAGE</TableCell>
        <TableCell className="text-center py-1"></TableCell>
      </TableRow>

      {/* Bottom Section */}
      <TableRow className="bg-blue-50 h-8">
        <TableCell className="font-bold border-r py-1">% of Revenue</TableCell>
        {revenuePercentages.map((percentage, index) => (
          <TableCell key={index} className="text-center border-r py-1">{percentage.toFixed(2)}%</TableCell>
        ))}
        <TableCell className="text-center border-r py-1">{averagePercentage.toFixed(2)}%</TableCell>
        <TableCell className="text-center py-1">0.00%</TableCell>
      </TableRow>

      <TableRow className="bg-blue-50 h-8">
        <TableCell className="font-bold border-r py-1">Cost/Occupied Room</TableCell>
        {Array(12).fill(0).map((_, index) => (
          <TableCell key={index} className="text-center border-r py-1">{formatCurrency(0)}</TableCell>
        ))}
        <TableCell className="text-center border-r py-1">{formatCurrency(0)}</TableCell>
        <TableCell className="text-center py-1">{formatCurrency(0)}</TableCell>
      </TableRow>
    </>
  );
};

export default BottomSection;
