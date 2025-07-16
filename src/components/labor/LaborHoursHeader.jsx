import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Download, Grid3X3 } from 'lucide-react';

const LaborHoursHeader = ({
  selectedPeriod,
  onPeriodChange,
  dateRange,
  onDateRangeChange,
  onDownloadCSV,
  onViewOptions
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-lg font-semibold">Labor Hours -</span>
        <Select value={selectedPeriod} onValueChange={onPeriodChange}>
          <SelectTrigger className="w-40 h-auto px-2 py-1 text-lg font-semibold border-none shadow-none bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Month">Month</SelectItem>
            <SelectItem value="Custom Dates">Custom Dates</SelectItem>
          </SelectContent>
        </Select>
        {selectedPeriod === 'Custom Dates' && (
          <DateRangePicker 
            date={dateRange}
            onDateChange={onDateRangeChange}
            className="ml-2"
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="p-2" 
          title="Download CSV"
          onClick={onDownloadCSV}
        >
          <Download className="w-4 h-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="p-2" 
          title="View Options"
          onClick={onViewOptions}
        >
          <Grid3X3 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default LaborHoursHeader;
