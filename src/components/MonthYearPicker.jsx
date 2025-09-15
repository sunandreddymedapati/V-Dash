import React from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function MonthYearPicker({ value, onChange, disabledFuture }) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState("year");
  const [selectedYear, setSelectedYear] = React.useState(value.year);

  const years = [];
  for (let y = currentYear; y <= currentYear + 10; y++) years.push(y);

  React.useEffect(() => {
    if (open) {
      setStep("year");
      setSelectedYear(value.year);
    }
  }, [open, value.year]);

  const [yearBase, setYearBase] = React.useState(currentYear);
  React.useEffect(() => {
    if (open) setYearBase(value.year - (value.year % 12));
  }, [open, value.year]);

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setStep("month");
  };

  const handleMonthSelect = (month) => {
    setOpen(false);
    onChange({ year: selectedYear, month });
  };

  const visibleYears = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => yearBase + i);
  }, [yearBase]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[180px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(new Date(value.year, value.month, 1), "MMM yyyy")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] px-4 py-4">
        {step === "year" && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <Button
                variant="ghost"
                size="sm"
                className="px-2"
                onClick={() => setYearBase(y => y - 12)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="font-medium">Pick Year</span>
              <Button
                variant="ghost"
                size="sm"
                className="px-2"
                onClick={() => setYearBase(y => y + 12)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {visibleYears.map(y =>
                <Button
                  key={y}
                  variant={y === value.year ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleYearSelect(y)}
                >
                  {y}
                </Button>
              )}
            </div>
          </div>
        )}
        {step === "month" && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="ghost"
                size="sm"
                className="px-2"
                onClick={() => setStep("year")}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="font-medium">{selectedYear}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {months.map((m, idx) => {
                let disabled = false;
                if (disabledFuture) {
                  if (selectedYear > currentYear) disabled = true;
                  if (selectedYear === currentYear && idx > currentMonth) disabled = true;
                }
                return (
                  <Button
                    key={m}
                    variant={selectedYear === value.year && idx === value.month ? "default" : "outline"}
                    size="sm"
                    disabled={disabled}
                    className="px-1 py-1 text-xs"
                    onClick={() => handleMonthSelect(idx)}
                  >
                    {m.slice(0, 3)}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default MonthYearPicker;
