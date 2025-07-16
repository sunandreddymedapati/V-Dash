import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, TrendingUp } from 'lucide-react';
import { formatCurrency, formatPercentage, formatNumber } from './utils/formatUtils';

const LaborForecastTable = ({ data, loading = false }) => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  const rows = [
    { key: 'daysInMonth', label: 'Days in Month', format: formatNumber, highlight: false, icon: <BarChart3 className="w-3 h-3 text-gray-400" /> },
    { key: 'availableRooms', label: 'Available Rooms', format: formatNumber, highlight: false, icon: <BarChart3 className="w-3 h-3 text-gray-400" /> },
    { key: 'roomsOccupied', label: 'Rooms Occupied', format: formatNumber, highlight: false, icon: <BarChart3 className="w-3 h-3 text-gray-400" /> },
    { key: 'adr', label: 'ADR', format: formatCurrency, highlight: false, icon: <TrendingUp className="w-3 h-3 text-gray-400" /> },
    { key: 'revpar', label: 'RevPAR', format: formatCurrency, highlight: false, icon: <TrendingUp className="w-3 h-3 text-gray-400" /> },
    { key: 'occupancyPercent', label: 'Occupancy %', format: formatPercentage, highlight: false, icon: <BarChart3 className="w-3 h-3 text-gray-400" /> },
    { key: 'roomRevenue', label: 'Room Revenue', format: formatCurrency, highlight: false, icon: <TrendingUp className="w-3 h-3 text-gray-400" /> },
    { key: 'meetingRoomRevenue', label: 'Meeting Room Revenue', format: formatCurrency, highlight: false, icon: <TrendingUp className="w-3 h-3 text-gray-400" /> },
    { key: 'otherRevenue', label: 'Other Revenue', format: formatCurrency, highlight: false, icon: <TrendingUp className="w-3 h-3 text-gray-400" /> },
    { key: 'totalRevenue', label: 'Total Revenue', format: formatCurrency, highlight: false, icon: <TrendingUp className="w-3 h-3 text-gray-400" /> },
    { key: 'laborCost', label: 'Labor Cost', format: formatCurrency, highlight: false, icon: <BarChart3 className="w-3 h-3 text-gray-400" /> },
    { key: '% of Revenue (Labor)', label: '% of Revenue (Labor)', format: formatPercentage, highlight: true, icon: <BarChart3 className="w-3 h-3 text-blue-500" /> },
    { key: 'costPerOccupiedRoom', label: 'Cost per Occupied Room', format: formatCurrency, highlight: true, icon: <BarChart3 className="w-3 h-3 text-blue-500" /> },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="mb-6">
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} className="flex space-x-4">
              <Skeleton className="h-4 w-32" />
              {Array.from({ length: 14 }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-16" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Labor Forecast</h2>
      
      <div className="w-full overflow-x-auto shadow-inner">
        <table className="min-w-[1600px] w-full border-collapse text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="sticky left-0 z-20 bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[200px]">
                Metric
              </th>
              {months.map((month) => (
                <th key={month} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[80px] whitespace-nowrap">
                  {month}
                </th>
              ))}
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[100px] whitespace-nowrap">
                TOTAL
              </th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[100px] whitespace-nowrap">
                $ per Room
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.key} className={`hover:bg-gray-50 transition-colors duration-150 ${row.highlight ? 'bg-gray-50' : ''}`}>
                <td className={`sticky left-0 z-10 px-4 py-3 text-sm border-r border-gray-200 min-w-[200px] ${row.highlight ? 'bg-gray-50 hover:bg-gray-100 font-semibold text-gray-900' : 'bg-white hover:bg-gray-50 font-medium text-gray-900'}`}>
                  <div className="flex items-center space-x-2">
                    {row.icon}
                    <span className="truncate">{row.label}</span>
                  </div>
                </td>
                {months.map((month) => {
                  const value = data[month]?.[row.key] ?? 0;
                  return (
                    <td key={month} className={`px-3 py-3 text-sm text-gray-700 text-right whitespace-nowrap ${row.highlight ? 'font-semibold' : ''}`}>
                      {row.format(value)}
                    </td>
                  );
                })}
                <td className={`px-3 py-3 text-sm text-gray-900 text-right bg-blue-50 whitespace-nowrap ${row.highlight ? 'font-bold' : 'font-semibold'}`}>
                  {row.format(data.total?.[row.key] ?? 0)}
                </td>
                <td className={`px-3 py-3 text-sm text-gray-900 text-right bg-green-50 whitespace-nowrap ${row.highlight ? 'font-bold' : 'font-semibold'}`}>
                  {row.format(data.perRoom?.[row.key] ?? 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>* All currency values are displayed in USD. Labor costs include all departmental expenses.</p>
      </div>
    </div>
  );
};

export default LaborForecastTable;
