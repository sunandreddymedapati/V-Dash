import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet } from 'lucide-react';
import { formatValue } from '../utils/formatUtils';
import {
  calculateTotal,
  calculateAverage,
  calculatePercentOfRevenue,
  calculateCostPerRoom
} from '../utils/calculationUtils';
import { months } from '../utils/tableUtils';

const LaborReviewTable = ({ rows, data }) => {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Labor Review Table</h2>
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Download CSV
          </Button>
        </div>

        <div className="w-full overflow-x-auto shadow-inner">
          <table className="min-w-[1600px] w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="sticky left-0 bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 min-w-[200px]">
                  Metric
                </th>
                {months.map((month) => (
                  <th
                    key={month}
                    className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 min-w-[90px] whitespace-nowrap"
                  >
                    {month}
                  </th>
                ))}
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 min-w-[100px] whitespace-nowrap">
                  TOTAL
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] whitespace-nowrap">
                  AVERAGE
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  <td className="sticky left-0 bg-white px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200 min-w-[200px] truncate">
                    {row.label}
                  </td>
                  {row.values.map((value, index) => (
                    <td
                      key={index}
                      className="px-3 py-3 text-sm text-gray-900 text-center border-r border-gray-200 whitespace-nowrap"
                    >
                      {formatValue(value, row.type)}
                    </td>
                  ))}
                  <td className="px-3 py-3 text-sm font-semibold text-gray-900 text-center border-r border-gray-200 whitespace-nowrap">
                    {row.type === 'percentage'
                      ? `${calculateAverage(row.values).toFixed(1)}%`
                      : formatValue(calculateTotal(row.values), row.type)
                    }
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-900 text-center whitespace-nowrap">
                    {row.type === 'percentage'
                      ? '—'
                      : formatValue(calculateAverage(row.values), row.type)
                    }
                  </td>
                </tr>
              ))}

              {/* % of Revenue Row */}
              <tr className="hover:bg-gray-50 bg-blue-50">
                <td className="sticky left-0 bg-blue-50 px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200 min-w-[200px] truncate">
                  % of Revenue
                </td>
                {months.map((_, index) => {
                  const percentage = calculatePercentOfRevenue(
                    data.departmentTotal[index],
                    data.totalRevenue[index]
                  );
                  return (
                    <td
                      key={index}
                      className="px-3 py-3 text-sm text-gray-900 text-center border-r border-gray-200 whitespace-nowrap"
                    >
                      {percentage.toFixed(1)}%
                    </td>
                  );
                })}
                <td className="px-3 py-3 text-sm font-semibold text-gray-900 text-center border-r border-gray-200 whitespace-nowrap">
                  —
                </td>
                <td className="px-3 py-3 text-sm text-gray-900 text-center whitespace-nowrap">
                  {(
                    data.departmentTotal.reduce((sum, val, i) =>
                      sum + calculatePercentOfRevenue(val, data.totalRevenue[i]), 0
                    ) / 12
                  ).toFixed(1)}%
                </td>
              </tr>

              {/* Cost per Occupied Room Row */}
              <tr className="hover:bg-gray-50 bg-green-50">
                <td className="sticky left-0 bg-green-50 px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200 min-w-[200px] truncate">
                  Cost per Occupied Room
                </td>
                {months.map((_, index) => {
                  const costPerRoom = calculateCostPerRoom(
                    data.departmentTotal[index],
                    data.roomsOccupied[index]
                  );
                  return (
                    <td
                      key={index}
                      className="px-3 py-3 text-sm text-gray-900 text-center border-r border-gray-200 whitespace-nowrap"
                    >
                      ${costPerRoom.toFixed(2)}
                    </td>
                  );
                })}
                <td className="px-3 py-3 text-sm font-semibold text-gray-900 text-center border-r border-gray-200 whitespace-nowrap">
                  —
                </td>
                <td className="px-3 py-3 text-sm text-gray-900 text-center whitespace-nowrap">
                  ${(
                    data.departmentTotal.reduce((sum, val, i) =>
                      sum + calculateCostPerRoom(val, data.roomsOccupied[i]), 0
                    ) / 12
                  ).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default LaborReviewTable;
