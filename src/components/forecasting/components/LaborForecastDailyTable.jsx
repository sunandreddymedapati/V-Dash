import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { DEPARTMENTS } from './laborForecastConstants';
import { generateDaysArray, calculateDayTotal, calculateGrandTotal } from './laborForecastUtils';
import LaborTableHeader from './LaborTableHeader';
import RoomDataRows from './RoomDataRows';
import DepartmentRows from './DepartmentRows';

const LaborForecastDailyTable = ({ selectedMonthYear, selectedHotel }) => {
  const [laborData, setLaborData] = useState({});
  const [formulaData, setFormulaData] = useState({});

  const { month, year } = selectedMonthYear;
  const days = generateDaysArray(month, year);

  // Sample room data (in a real app, this would come from props or API)
  const otbRooms = days.map(() => Math.floor(Math.random() * 40) + 100); // Random rooms 100-140
  const forecastedRooms = Array(days.length).fill(139);

  const handleInputChange = (department, day, value) => {
    setLaborData((prev) => ({
      ...prev,
      [department]: {
        ...prev[department],
        [day]: value
      }
    }));
  };

  const handleFormulaChange = (department, value) => {
    setFormulaData((prev) => ({
      ...prev,
      [department]: value
    }));
  };

  return (
    <Card className="bg-white rounded-xl shadow-md border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Labor Forecast - Daily Planning
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <LaborTableHeader days={days} />
            <TableBody>
              <RoomDataRows 
                days={days}
                otbRooms={otbRooms}
                forecastedRooms={forecastedRooms}
              />

              {/* Department Header Row */}
              <TableRow className="bg-gray-200">
                <TableCell className="font-semibold border-r bg-gray-200 sticky left-0 z-10 min-w-48">
                  <div>Department</div>
                  <div className="text-xs text-gray-600 mt-1">Formula</div>
                </TableCell>
                {days.map((day) => (
                  <TableCell key={day.dayNumber} className="border-r bg-gray-200"></TableCell>
                ))}
                <TableCell className="bg-gray-200"></TableCell>
              </TableRow>

              <DepartmentRows
                days={days}
                laborData={laborData}
                formulaData={formulaData}
                onInputChange={handleInputChange}
                onFormulaChange={handleFormulaChange}
              />

              {/* Total Row */}
              <TableRow className="bg-gray-100 font-semibold">
                <TableCell className="font-bold border-r bg-gray-100 sticky left-0 z-10 min-w-48">
                  Total
                </TableCell>
                {days.map((day) => (
                  <TableCell key={day.dayNumber} className="text-center text-sm border-r bg-gray-100">
                    {calculateDayTotal(laborData, DEPARTMENTS, day.dayNumber)}
                  </TableCell>
                ))}
                <TableCell className="text-center text-sm font-bold bg-gray-100">
                  {calculateGrandTotal(laborData, DEPARTMENTS)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LaborForecastDailyTable;
