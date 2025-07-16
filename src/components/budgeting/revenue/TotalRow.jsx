import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { MONTHS, REVENUE_CATEGORIES } from './RevenueConstants';
import { calculateCategoryTotal, formatNumber } from './RevenueUtils';

const TotalRow = ({ 
  title, 
  type, 
  revenueData, 
  bgColor = 'bg-blue-50',
  textColor = 'text-blue-900'
}) => {
  const getMonthTotal = (month) => {
    const types = Array.isArray(type) ? type : [type];
    return REVENUE_CATEGORIES
      .filter(cat => types.includes(cat.type))
      .reduce((sum, cat) => sum + (revenueData[cat.id]?.[month] || 0), 0);
  };

  const getCategoryTotal = () => {
    const types = Array.isArray(type) ? type : [type];
    return types.reduce((sum, t) => sum + calculateCategoryTotal(t, revenueData), 0);
  };

  return (
    <TableRow className={`${bgColor} font-semibold border-t-2 border-blue-200`}>
      <TableCell className={`sticky left-0 ${bgColor} z-10 ${textColor}`}>
        {title}
      </TableCell>
      {MONTHS.map((month) => (
        <TableCell key={month} className={`text-right ${bgColor} ${textColor} font-semibold`}>
          {formatNumber(getMonthTotal(month))}
        </TableCell>
      ))}
      <TableCell className={`text-right bg-blue-100 border-l border-blue-200 ${textColor} font-semibold`}>
        {formatNumber(getCategoryTotal())}
      </TableCell>
    </TableRow>
  );
};

export default TotalRow;
