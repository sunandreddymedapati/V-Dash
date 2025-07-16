import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { tableData } from './constants';
import { formatCurrency, formatNumber, formatPercentage, calculateTotal, calculateAverage } from './utils';

const HotelMetricsRows = () => {
  const calculateTotalRevenue = (index) => {
    return tableData.roomRevenue[index] + tableData.meetingRoomRevenue[index] + tableData.otherRevenue[index];
  };

  return (
    <>
      <TableRow className="h-8">
        <TableCell className="font-medium border-r py-1">Days in Month</TableCell>
        {tableData.daysInMonth.map((value, index) => (
          <TableCell key={index} className="text-center border-r py-1">{value}</TableCell>
        ))}
        <TableCell className="text-center border-r py-1">-</TableCell>
        <TableCell className="text-center py-1">-</TableCell>
      </TableRow>

      <TableRow className="h-8">
        <TableCell className="font-medium border-r py-1">Available Rooms</TableCell>
        {tableData.availableRooms.map((value, index) => (
          <TableCell key={index} className="text-center border-r py-1">{formatNumber(value)}</TableCell>
        ))}
        <TableCell className="text-center border-r py-1">{formatNumber(calculateTotal(tableData.availableRooms))}</TableCell>
        <TableCell className="text-center py-1">-</TableCell>
      </TableRow>

      <TableRow className="h-8">
        <TableCell className="font-medium border-r py-1">Rooms Occupied</TableCell>
        {tableData.roomsOccupied.map((value, index) => (
          <TableCell key={index} className="text-center border-r py-1">{formatNumber(value)}</TableCell>
        ))}
        <TableCell className="text-center border-r py-1">{formatNumber(calculateTotal(tableData.roomsOccupied))}</TableCell>
        <TableCell className="text-center py-1">-</TableCell>
      </TableRow>

      <TableRow className="h-8">
        <TableCell className="font-medium border-r py-1">ADR</TableCell>
        {tableData.adr.map((value, index) => (
          <TableCell key={index} className="text-center border-r py-1">{formatCurrency(value)}</TableCell>
        ))}
        <TableCell className="text-center border-r py-1">{formatCurrency(calculateAverage(tableData.adr))}</TableCell>
        <TableCell className="text-center py-1">-</TableCell>
      </TableRow>

      <TableRow className="h-8">
        <TableCell className="font-medium border-r py-1">revPAR</TableCell>
        {tableData.revPAR.map((value, index) => (
          <TableCell key={index} className="text-center border-r py-1">{formatCurrency(value)}</TableCell>
        ))}
        <TableCell className="text-center border-r py-1">{formatCurrency(calculateAverage(tableData.revPAR))}</TableCell>
        <TableCell className="text-center py-1">-</TableCell>
      </TableRow>

      <TableRow className="h-8">
        <TableCell className="font-medium border-r py-1">occupancy</TableCell>
        {tableData.occupancy.map((value, index) => (
          <TableCell key={index} className="text-center border-r py-1">{formatPercentage(value)}</TableCell>
        ))}
        <TableCell className="text-center border-r py-1">{formatPercentage(calculateAverage(tableData.occupancy))}</TableCell>
        <TableCell className="text-center py-1">-</TableCell>
      </TableRow>

      <TableRow className="h-8">
        <TableCell className="font-medium border-r py-1">Room Revenue</TableCell>
        {tableData.roomRevenue.map((value, index) => (
          <TableCell key={index} className="text-center border-r py-1">{formatCurrency(value)}</TableCell>
        ))}
        <TableCell className="text-center border-r py-1">{formatCurrency(calculateTotal(tableData.roomRevenue))}</TableCell>
        <TableCell className="text-center py-1">{formatCurrency(calculateTotal(tableData.roomRevenue) / calculateTotal(tableData.roomsOccupied))}</TableCell>
      </TableRow>

      <TableRow className="h-8">
        <TableCell className="font-medium border-r py-1">Meeting Room Revenue</TableCell>
        {tableData.meetingRoomRevenue.map((value, index) => (
          <TableCell key={index} className="text-center border-r py-1">{formatCurrency(value)}</TableCell>
        ))}
        <TableCell className="text-center border-r py-1">{formatCurrency(calculateTotal(tableData.meetingRoomRevenue))}</TableCell>
        <TableCell className="text-center py-1">{formatCurrency(0)}</TableCell>
      </TableRow>

      <TableRow className="h-8">
        <TableCell className="font-medium border-r py-1">Other Revenue</TableCell>
        {tableData.otherRevenue.map((value, index) => (
          <TableCell key={index} className="text-center border-r py-1">{formatCurrency(value)}</TableCell>
        ))}
        <TableCell className="text-center border-r py-1">{formatCurrency(calculateTotal(tableData.otherRevenue))}</TableCell>
        <TableCell className="text-center py-1">{formatCurrency(0)}</TableCell>
      </TableRow>

      <TableRow className="h-8 bg-blue-50">
        <TableCell className="font-medium border-r py-1">Total Revenue</TableCell>
        {tableData.roomRevenue.map((_, index) => {
          const totalRevenue = calculateTotalRevenue(index);
          return (
            <TableCell key={index} className="text-center border-r py-1">{formatCurrency(totalRevenue)}</TableCell>
          );
        })}
        <TableCell className="text-center border-r py-1">{formatCurrency(
          calculateTotal(tableData.roomRevenue) + 
          calculateTotal(tableData.meetingRoomRevenue) + 
          calculateTotal(tableData.otherRevenue)
        )}</TableCell>
        <TableCell className="text-center py-1">{formatCurrency(
          (calculateTotal(tableData.roomRevenue) + 
           calculateTotal(tableData.meetingRoomRevenue) + 
           calculateTotal(tableData.otherRevenue)) / calculateTotal(tableData.roomsOccupied)
        )}</TableCell>
      </TableRow>

      <TableRow className="h-8 bg-blue-50">
        <TableCell className="font-medium border-r py-1">Gross Revenue</TableCell>
        {tableData.grossRevenue.map((value, index) => (
          <TableCell key={index} className="text-center border-r py-1">{formatCurrency(value)}</TableCell>
        ))}
        <TableCell className="text-center border-r py-1">{formatCurrency(calculateTotal(tableData.grossRevenue))}</TableCell>
        <TableCell className="text-center py-1">{formatCurrency(calculateTotal(tableData.grossRevenue) / calculateTotal(tableData.roomsOccupied))}</TableCell>
      </TableRow>
    </>
  );
};

export default HotelMetricsRows;
