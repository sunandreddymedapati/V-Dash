import React, { useState } from 'react';
import SegmentSelector from '@/components/SegmentSelector';
import KPICardsSection from '@/components/KPICardsSection';
import VarianceTable from '@/components/VarianceTable';
import RevenueKPI from '@/components/RevenueKPI';
import BusinessPerformanceSummary from '@/components/portfolio/BusinessPerformanceSummary';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useDateStore } from '@/store/dateStore';

const Dashboard = () => {
  const dateFromStore = useDateStore((s) => s.selectedDate?.from);
  const setGlobalSelectedDate = useDateStore((s) => s.setSelectedDate);
  const selectedDate = dateFromStore || new Date();

  const [selectedSegment, setSelectedSegment] = useState('all-segments');
  const [kpiTimeTab, setKpiTimeTab] = useState('daily');
  const [kpiVarianceTab, setKpiVarianceTab] = useState('last-year');
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [segments, setSegments] = useState([
    { value: 'all-segments', label: 'All Segments', properties: [] },
    // { value: 'visions-east', label: 'Visions Hotels East', properties: [] },
    // { value: 'visions-west', label: 'Visions Hotels West', properties: [] },
    // { value: 'greater-rochester', label: 'Greater Rochester', properties: [] },
    // { value: 'buffalo', label: 'Buffalo', properties: [] },
    // { value: 'all-best-western', label: 'All Best Western', properties: [] },
    // { value: 'all-hilton', label: 'All Hilton', properties: [] },
    // { value: 'all-ihg', label: 'All IHG', properties: [] },
    // { value: 'all-marriott', label: 'All Marriott', properties: [] }
  ]);

  const handleSegmentUpdate = (updatedSegments) => {
    setSegments(updatedSegments);
  };

  const handleDateSelect = (date) => {
    if (date) {
      setGlobalSelectedDate({ from: date, to: undefined });
      setCalendarOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Date Picker and Segment Selector Section */}
      <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4">
        {/* Segment Selector - Extreme Left */}
        <div className="flex-shrink-0">
          <SegmentSelector
            selectedSegment={selectedSegment}
            setSelectedSegment={setSelectedSegment}
            segments={segments}
            onSegmentUpdate={handleSegmentUpdate}
          />
        </div>

        {/* Date Picker - Extreme Right */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <label className="text-sm font-medium text-gray-700">Date:</label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => date > new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <KPICardsSection
        kpiTimeTab={kpiTimeTab}
        setKpiTimeTab={setKpiTimeTab}
        kpiVarianceTab={kpiVarianceTab}
        setKpiVarianceTab={setKpiVarianceTab}
        selectedDate={selectedDate}
        selectedSegment={selectedSegment}
        segments={segments}
      />

      {/* <BusinessPerformanceSummary /> */}
      <VarianceTable />
      <RevenueKPI />
    </div>
  );
};

export default Dashboard;
