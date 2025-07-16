import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatCurrency, formatPercentage, formatNumber } from '../utils/revenueForecastUtils';
import VarianceCell from './VarianceCell';

const DailyForecastTableRow = ({ row, index, varianceType }) => {
  const formatValue = (value, formatter) => {
    return value === null ? '-' : formatter(value);
  };

  const formatSimpleValue = (value) => {
    return value === null ? '-' : String(Math.round(value));
  };

  // Check if the date is in the future
  const currentDate = new Date();
  const [monthStr, dayStr] = row.date.split(' ');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIndex = monthNames.indexOf(monthStr);
  const dayNumber = parseInt(dayStr, 10);
  const rowDate = new Date(currentDate.getFullYear(), monthIndex, dayNumber);
  const isFutureDate = rowDate > currentDate;
  const isPastOrToday = rowDate <= currentDate;

  // Generate comparison data for variance calculations
  const getComparisonData = (actualValue) => {
    if (actualValue === null) return null;

    const variations = {
      'last-year': 0.92,
      'same-time-last-year': 0.88
    };

    return actualValue * variations[varianceType];
  };

  return (
    <TableRow key={index} className="hover:bg-gray-50">
      <TableCell className="font-medium text-center border-r">
        <div>{row.date}</div>
        <div className="text-xs text-gray-500">({row.day})</div>
      </TableCell>

      {/* Actual/OTB - Show Variance for All Dates */}
      <TableCell className="text-center text-sm">
        <div className="space-y-1">
          <div>{formatSimpleValue(row.actualOTB.occ)}</div>
          {row.actualOTB.occ !== null && (
            <VarianceCell
              actual={row.actualOTB.occ}
              comparison={getComparisonData(row.actualOTB.occ)}
              isWholeNumber
            />
          )}
        </div>
      </TableCell>
      <TableCell className="text-center text-sm">
        <div className="space-y-1">
          <div>{formatValue(row.actualOTB.adr, formatCurrency)}</div>
          {row.actualOTB.adr !== null && (
            <VarianceCell
              actual={row.actualOTB.adr}
              comparison={getComparisonData(row.actualOTB.adr)}
              isCurrency
            />
          )}
        </div>
      </TableCell>
      <TableCell className="text-center text-sm border-r">
        <div className="space-y-1">
          <div>{formatValue(row.actualOTB.revenue, formatCurrency)}</div>
          {row.actualOTB.revenue !== null && (
            <VarianceCell
              actual={row.actualOTB.revenue}
              comparison={getComparisonData(row.actualOTB.revenue)}
              isCurrency
            />
          )}
        </div>
      </TableCell>

      {/* 7 Days Pickup - No Variance */}
      <TableCell className="text-center text-sm">{formatValue(row.sevenDayPickup.adr, formatCurrency)}</TableCell>
      <TableCell className="text-center text-sm border-r">{formatValue(row.sevenDayPickup.revenue, formatCurrency)}</TableCell>

      {/* Transient Forecast - No Variance */}
      <TableCell className="text-center text-sm">{formatSimpleValue(row.transientForecast.occ)}</TableCell>
      <TableCell className="text-center text-sm">{formatValue(row.transientForecast.adr, formatCurrency)}</TableCell>
      <TableCell className="text-center text-sm border-r">{formatValue(row.transientForecast.revenue, formatCurrency)}</TableCell>

      {/* Group Forecast - No Variance */}
      <TableCell className="text-center text-sm">{formatSimpleValue(row.groupForecast.occ)}</TableCell>
      <TableCell className="text-center text-sm">{formatValue(row.groupForecast.adr, formatCurrency)}</TableCell>
      <TableCell className="text-center text-sm border-r">{formatValue(row.groupForecast.revenue, formatCurrency)}</TableCell>

      {/* Total Forecast - No Variance */}
      <TableCell className="text-center text-sm">{formatSimpleValue(row.totalForecast.occ)}</TableCell>
      <TableCell className="text-center text-sm">{formatValue(row.totalForecast.occupancy, formatPercentage)}</TableCell>
      <TableCell className="text-center text-sm">{formatValue(row.totalForecast.adr, formatCurrency)}</TableCell>
      <TableCell className="text-center text-sm border-r">{formatValue(row.totalForecast.revenue, formatCurrency)}</TableCell>

      {/* MTD - No Variance */}
      <TableCell className="text-center text-sm">{formatSimpleValue(row.mtd.occ)}</TableCell>
      <TableCell className="text-center text-sm">{formatValue(row.mtd.occupancy, formatPercentage)}</TableCell>
      <TableCell className="text-center text-sm">{formatValue(row.mtd.adr, formatCurrency)}</TableCell>
      <TableCell className="text-center text-sm border-r">{formatValue(row.mtd.revenue, formatCurrency)}</TableCell>

      {/* YTD - No Variance */}
      <TableCell className="text-center text-sm">{formatValue(row.ytd.occ, formatNumber)}</TableCell>
      <TableCell className="text-center text-sm">{formatValue(row.ytd.occupancy, formatPercentage)}</TableCell>
      <TableCell className="text-center text-sm">{formatValue(row.ytd.adr, formatCurrency)}</TableCell>
      <TableCell className="text-center text-sm border-r">{formatValue(row.ytd.revenue, formatCurrency)}</TableCell>

      {/* Projected EOM - Only show data for past and today dates */}
      <TableCell className="text-center text-sm">
        {isPastOrToday ? formatValue(row.projectedEOM.occ, formatNumber) : '-'}
      </TableCell>
      <TableCell className="text-center text-sm">
        {isPastOrToday ? formatValue(row.projectedEOM.occupancy, formatPercentage) : '-'}
      </TableCell>
      <TableCell className="text-center text-sm">
        {isPastOrToday ? formatValue(row.projectedEOM.adr, formatCurrency) : '-'}
      </TableCell>
      <TableCell className="text-center text-sm">
        {isPastOrToday ? formatValue(row.projectedEOM.revenue, formatCurrency) : '-'}
      </TableCell>
    </TableRow>
  );
};

export default DailyForecastTableRow;
