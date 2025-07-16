import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { MONTHS } from './RevenueConstants';

const SectionHeader = ({ 
  title, 
  bgColor = 'bg-green-100',
  textColor = 'text-green-900'
}) => {
  return (
    <TableRow className={bgColor}>
      <TableCell className={`sticky left-0 ${bgColor} z-10 font-semibold ${textColor}`}>
        {title}
      </TableCell>
      {MONTHS.map((month) => (
        <TableCell key={month} className={bgColor}></TableCell>
      ))}
      <TableCell className={bgColor}></TableCell>
    </TableRow>
  );
};

export default SectionHeader;
