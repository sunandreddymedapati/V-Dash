import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';

const RoomDataRows = ({ days, otbRooms, forecastedRooms }) => {
  return (
    <>
      {/* OTB Rooms Row */}
      <TableRow className="bg-blue-50">
        <TableCell className="font-medium border-r bg-blue-50 sticky left-0 z-10 min-w-48">
          OTB Rooms
        </TableCell>
        {otbRooms.map((rooms, index) => (
          <TableCell key={index} className="text-center text-sm border-r">
            {rooms}
          </TableCell>
        ))}
        <TableCell className="text-center text-sm font-semibold">
          {otbRooms.reduce((sum, val) => sum + val, 0)}
        </TableCell>
      </TableRow>

      {/* Forecasted Rooms Row */}
      <TableRow className="bg-green-50">
        <TableCell className="font-medium border-r bg-green-50 sticky left-0 z-10 min-w-48">
          Forecasted Rooms
        </TableCell>
        {forecastedRooms.map((rooms, index) => (
          <TableCell key={index} className="text-center text-sm border-r">
            {rooms}
          </TableCell>
        ))}
        <TableCell className="text-center text-sm font-semibold">
          {forecastedRooms.reduce((sum, val) => sum + val, 0)}
        </TableCell>
      </TableRow>
    </>
  );
};

export default RoomDataRows;
