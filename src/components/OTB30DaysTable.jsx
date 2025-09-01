import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PROPERTIES_DATA } from '@/constants/properties';

const generate30DaysData = (properties) => {
  const today = new Date();
  const days = [];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit' 
    });
    
    days.push({
      date: formattedDate,
      dayOfWeek
    });
  }

  return properties.map(property => ({
    name: property.name,
    totalRooms: property.rooms,
    dailyData: days.map(day => {
      const roomsSold = Math.floor(property.rooms * (0.60 + Math.random() * 0.30));
      const occupancyPercent = Math.round((roomsSold / property.rooms) * 10000) / 100;
      const adr = Math.floor(150 + Math.random() * 100);
      const roomRevenue = roomsSold * adr;
      
      return {
        date: day.date,
        dayOfWeek: day.dayOfWeek,
        roomsSold,
        occupancyPercent,
        roomRevenue,
        adr
      };
    })
  }));
};

const OTB30DaysTable = () => {
  const mockData = generate30DaysData(PROPERTIES_DATA);
  
  return (
    <div className="relative overflow-x-auto border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-100">
            <TableHead className="sticky left-0 bg-blue-100 z-20 font-semibold text-blue-900 border-r border-blue-200" style={{ width: '280px', minWidth: '280px' }}>
              Property Name
            </TableHead>
            <TableHead className="sticky bg-blue-100 z-20 min-w-32 w-32 font-semibold text-blue-900 border-r border-blue-200 text-center" style={{ left: '280px' }}>
              Total Rooms
            </TableHead>
            {mockData[0]?.dailyData.map((day, index) => (
              <TableHead key={index} className="text-center min-w-32 font-semibold text-blue-900 whitespace-nowrap">
                {day.date} · {day.dayOfWeek}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((property, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell className="sticky left-0 bg-white z-10 font-medium border-r border-gray-200 break-words" style={{ width: '280px', minWidth: '280px' }}>
                {property.name}
              </TableCell>
              <TableCell className="sticky bg-white z-10 min-w-32 w-32 text-center border-r border-gray-200" style={{ left: '280px' }}>
                {property.totalRooms}
              </TableCell>
              {property.dailyData.map((dayData, dayIndex) => (
                <TableCell key={dayIndex} className="text-center min-w-32 p-2">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {dayData.roomsSold} / {dayData.occupancyPercent.toFixed(2)}%
                    </div>
                    <div className="text-xs text-gray-600">
                      ${dayData.roomRevenue.toLocaleString()} / ${dayData.adr.toFixed(2)}
                    </div>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OTB30DaysTable;