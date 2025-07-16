import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import DailyPerformanceHoursTable from './DailyPerformanceHoursTable';
import { format } from 'date-fns';
import { getPropertyRooms } from '@/constants/properties';

const DailyPerformanceHoursComponent = ({ selectedHotel, selectedDate }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 7 Days');

  const getDefaultDateRange = () => {
    const endDate = new Date(selectedDate);
    const startDate = new Date(selectedDate.getTime() - 6 * 24 * 60 * 60 * 1000);
    return { from: startDate, to: endDate };
  };

  const [dateRange, setDateRange] = useState(getDefaultDateRange());

  useEffect(() => {
    if (selectedPeriod === 'Last 7 Days') {
      setDateRange(getDefaultDateRange());
    }
  }, [selectedDate, selectedPeriod]);

  const getDatesArray = () => {
    if (selectedPeriod === 'Custom Dates' && dateRange?.from && dateRange?.to) {
      const dates = [];
      const currentDate = new Date(dateRange.from);
      const endDate = new Date(dateRange.to);

      while (currentDate <= endDate) {
        dates.push(format(currentDate, 'MM/dd'));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    } else {
      const dates = [];
      const endDate = new Date(selectedDate);
      for (let i = 6; i >= 0; i--) {
        const date = new Date(endDate.getTime() - i * 24 * 60 * 60 * 1000);
        dates.push(format(date, 'MM/dd'));
      }
      return dates;
    }
  };

  const tableData = useMemo(() => {
    const departments = ['A&G', 'Food & Beverage', 'Front Desk', 'Housekeeping', 'Maintenance'];
    const dates = getDatesArray();
    const roomCount = getPropertyRooms(selectedHotel);
    const baseRoomsSold = Math.floor(roomCount * 0.6);
    const roomsVariation = Math.floor(roomCount * 0.2);

    return {
      roomsSold: dates.map(() =>
        baseRoomsSold + Math.floor(Math.random() * roomsVariation) - Math.floor(roomsVariation / 2)
      ),
      departments: departments.map(dept => {
        const baseHours = (roomCount / 100) * 50;
        const values = dates.map(() => baseHours + (Math.random() * baseHours * 0.4) - (baseHours * 0.2));
        const total = values.reduce((sum, val) => sum + val, 0);

        return {
          name: dept,
          values: values.map(val => parseFloat(val.toFixed(2))),
          total: parseFloat(total.toFixed(2))
        };
      }),
      dates
    };
  }, [selectedHotel, selectedPeriod, dateRange, selectedDate]);

  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
    if (value === 'Custom Dates' && !dateRange) {
      setDateRange(getDefaultDateRange());
    } else if (value === 'Last 7 Days') {
      setDateRange(getDefaultDateRange());
    }
  };

  const handleDownloadCSV = () => {
    console.log('Download CSV clicked');
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-semibold">Daily Performance (Hours) -</span>
            <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-40 h-auto px-2 py-1 text-lg font-semibold border-none shadow-none bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                <SelectItem value="Custom Dates">Custom Dates</SelectItem>
              </SelectContent>
            </Select>
            {selectedPeriod === 'Custom Dates' && (
              <DateRangePicker
                date={dateRange}
                onDateChange={setDateRange}
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
              onClick={handleDownloadCSV}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DailyPerformanceHoursTable data={tableData} />
      </CardContent>
    </Card>
  );
};

export default DailyPerformanceHoursComponent;
