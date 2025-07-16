import React, { useState } from 'react';
import { Calendar, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPropertyWithRooms } from '@/constants/properties';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

const BudgetingHeader = ({ selectedHotel, selectedYear, onYearChange }) => {
  const currentYear = new Date().getFullYear();
  const [isOpen, setIsOpen] = useState(false);
  const [viewStartYear, setViewStartYear] = useState(Math.floor(currentYear / 16) * 16);

  const generateYearGrid = (startYear) => {
    const years = [];
    for (let i = 0; i < 16; i++) {
      years.push(startYear + i);
    }
    return years;
  };

  const yearGrid = generateYearGrid(viewStartYear);
  const endViewYear = viewStartYear + 15;

  const handleYearSelect = (year) => {
    onYearChange(year.toString());
    setIsOpen(false);
  };

  const handlePrevious = () => {
    setViewStartYear(prev => prev - 16);
  };

  const handleNext = () => {
    setViewStartYear(prev => prev + 16);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
      <div className="flex items-center space-x-3">
        <Building2 className="w-6 h-6 text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          {getPropertyWithRooms(selectedHotel)}
        </h1>
      </div>
      
      <div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-32 justify-start text-left font-normal"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {selectedYear}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="bg-green-500 text-white px-4 py-2 rounded-md font-medium">
                  {viewStartYear} - {endViewYear}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {yearGrid.map((year) => {
                  const isSelected = year.toString() === selectedYear;
                  const isCurrent = year === currentYear;
                  
                  return (
                    <Button
                      key={year}
                      variant={isSelected ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handleYearSelect(year)}
                      className={`
                        h-10 w-full text-sm font-medium
                        ${isSelected 
                          ? "bg-green-500 hover:bg-green-600 text-white" 
                          : isCurrent
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "text-gray-600 hover:bg-gray-100"
                        }
                        ${isSelected && isCurrent ? "ring-2 ring-green-300" : ""}
                      `}
                    >
                      {year}
                    </Button>
                  );
                })}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default BudgetingHeader;
