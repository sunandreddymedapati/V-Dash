import React from 'react';
import { Building2, CalendarIcon, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getPropertyWithRooms } from '@/constants/properties';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const LaborAnalyticsHeader = ({
  hotelName,
  selectedDate,
  onDateChange
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
      <div className="flex flex-col">
        <div className="flex items-center space-x-3 mb-2">
          <Building2 className="w-6 h-6 text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {getPropertyWithRooms(hotelName)}
          </h1>
        </div>
        
        <div className="ml-9 space-y-1">
          <p className="text-sm text-gray-600">
            Showing Data for {format(selectedDate, "MMMM d, yyyy")}
          </p>
          <div className="flex items-center gap-2 text-sm text-orange-600">
            <Info className="w-4 h-4" />
            <span>Time Clock Issues – 2 error records. Error records are not counted.</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[180px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "MMM dd, yyyy") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && onDateChange(date)}
              disabled={(date) => date > new Date()}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default LaborAnalyticsHeader;
