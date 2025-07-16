import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const LaborHoursChart = ({ employeeData, xAxisValues }) => {
  const maxHours = Math.max(...employeeData.map(emp => emp.regular + emp.overtime));

  const getBarWidth = (hours) => {
    return maxHours > 0 ? (hours / maxHours) * 100 : 0;
  };

  return (
    <TooltipProvider>
      {/* Legend */}
      <div className="flex items-center gap-4 mb-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 bg-green-500 rounded-sm"></div>
          <span className="text-sm text-gray-600">Regular</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 bg-red-400 rounded-sm"></div>
          <span className="text-sm text-gray-600">Overtime</span>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-2">
        {employeeData.map((employee, index) => (
          <div key={index} className="flex items-center">
            {/* Employee Name */}
            <div className="w-64 text-right pr-4 text-sm text-gray-700 font-medium">
              {employee.name}
            </div>
            
            {/* Bar Chart */}
            <div className="flex-1 relative">
              <div className="flex h-4 bg-gray-100 rounded">
                {/* Regular Hours Bar */}
                {employee.regular > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        className="bg-green-500 h-full rounded-l cursor-pointer hover:bg-green-600 transition-colors"
                        style={{ width: `${getBarWidth(employee.regular)}%` }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <div>Regular Hours: {employee.regular.toFixed(1)}</div>
                        <div>Overtime Hours: {employee.overtime.toFixed(1)}</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
                {/* Overtime Hours Bar */}
                {employee.overtime > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        className="bg-red-400 h-full cursor-pointer hover:bg-red-500 transition-colors"
                        style={{ 
                          width: `${getBarWidth(employee.overtime)}%`,
                          borderRadius: employee.regular > 0 ? '0 4px 4px 0' : '4px'
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <div>Regular Hours: {employee.regular.toFixed(1)}</div>
                        <div>Overtime Hours: {employee.overtime.toFixed(1)}</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-4 ml-64 text-sm text-gray-500">
        {xAxisValues.map((value, index) => (
          <span key={index}>{value}</span>
        ))}
      </div>
      <div className="text-center mt-2 ml-64 text-sm text-gray-500">
        Hours
      </div>
    </TooltipProvider>
  );
};

export default LaborHoursChart;
