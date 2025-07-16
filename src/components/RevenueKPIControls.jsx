import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MonthYearPicker from './MonthYearPicker';

const RevenueKPIControls = ({
  selectedKPI,
  onKPIChange,
  selectedTimeframe,
  onTimeframeChange,
  monthYear,
  onMonthYearChange,
  monthYearRequired,
  kpiOptions,
  timeframeOptions
}) => (
  <div className="flex flex-wrap gap-4 items-center">
    {/* KPI Selector */}
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium">KPI:</label>
      <Select value={selectedKPI} onValueChange={onKPIChange}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select KPI" />
        </SelectTrigger>
        <SelectContent>
          {kpiOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    {/* Timeframe Selector (with MonthYearPicker beside it) */}
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium">Timeframe:</label>
      <Select value={selectedTimeframe} onValueChange={onTimeframeChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select timeframe" />
        </SelectTrigger>
        <SelectContent>
          {timeframeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {monthYearRequired && (
        <MonthYearPicker
          value={monthYear}
          onChange={onMonthYearChange}
          disabledFuture
        />
      )}
    </div>
  </div>
);

export default RevenueKPIControls;
