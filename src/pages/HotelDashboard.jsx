import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Building2 } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import PROPERTIES, { getPropertyWithRooms } from "@/constants/properties";
import HotelKPICardsSection from "@/components/hotel/HotelKPICardsSection";
import Next30Days from "@/components/hotel/Next30Days";
import RevenueComparison from "@/components/RevenueComparison";
import { useDateStore } from "@/store/dateStore";

// New: Formatted date label (e.g., June 15th, 2025)
const getFormattedDate = (date) => format(date, "MMMM do, yyyy");

function HotelDashboardHeader({ hotelName, date, setDate }) {
  const today = new Date();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
      <div className="flex items-center space-x-3">
        <Building2 className="w-6 h-6 text-gray-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {getPropertyWithRooms(hotelName)}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Showing Data for {format(date, "MMMM d, yyyy")}
          </p>
        </div>
      </div>
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[230px] justify-start text-left font-normal"
              id="hd-date-picker"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>{getFormattedDate(date)}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selected) => {
                if (selected) {
                  setDate(selected);
                  setOpen(false);
                }
              }}
              initialFocus
              disabled={(d) => d > today}
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

const HotelDashboard = ({ selectedHotel }) => {
  const dateFromStore = useDateStore((s) => s.selectedDate?.from);
  const setSelectedDate = useDateStore((s) => s.setSelectedDate);
  const date = dateFromStore || new Date();
  const setDate = React.useCallback(
    (d) => setSelectedDate(d ? { from: d, to: undefined } : null),
    [setSelectedDate]
  );

  const [kpiTimeTab, setKpiTimeTab] = useState("daily");
  const [kpiVarianceTab, setKpiVarianceTab] = useState("last-year");

  const hotelName = selectedHotel || PROPERTIES[0];

  return (
    <div>
      <HotelDashboardHeader hotelName={hotelName} date={date} setDate={setDate} />
      <div className="mt-2">
        <HotelKPICardsSection
          kpiTimeTab={kpiTimeTab}
          setKpiTimeTab={setKpiTimeTab}
          kpiVarianceTab={kpiVarianceTab}
          setKpiVarianceTab={setKpiVarianceTab}
          selectedDate={date}
        />
        {/* <Next30Days /> */}
        <RevenueComparison />
      </div>
    </div>
  );
};

export default HotelDashboard;
