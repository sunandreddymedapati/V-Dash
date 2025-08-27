import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const RoomDetails = ({ selectedDate, roomData }) => {
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  const formatInteger = (value) => {
    return value.toString();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const generateDatesForMonth = () => {
    const { month, year } = selectedDate;
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dates = [];
    
    let lastDay = daysInMonth;
    if (year === currentYear && month === currentMonth) {
      lastDay = currentDay - 1;
    }
    
    for (let day = 1; day <= lastDay; day++) {
      const date = new Date(year, month, day);
      dates.push(formatDate(date));
    }
    
    return dates;
  };

  const generateSampleData = () => {
    const dates = generateDatesForMonth();
    
    return dates.map((date) => {
      const roomsOccupied = Math.floor(Math.random() * 80) + 40;
      const occupancyPercent = Math.random() * 30 + 65;
      const adr = Math.random() * 50 + 100;
      const revpar = (adr * occupancyPercent) / 100;
      const noShow = Math.floor(Math.random() * 5) + 1;
      const outOfOrder = Math.floor(Math.random() * 3);
      const compRooms = Math.floor(Math.random() * 8) + 2;

      return {
        date,
        roomsOccupied,
        occupancyPercent,
        adr,
        revpar,
        noShow,
        outOfOrder,
        compRooms,
      };
    });
  };

  const data = roomData || generateSampleData();

  const calculateTotals = () => {
    const totals = data.reduce((acc, row) => ({
      roomsOccupied: acc.roomsOccupied + row.roomsOccupied,
      occupancyPercent: acc.occupancyPercent + row.occupancyPercent,
      adr: acc.adr + row.adr,
      revpar: acc.revpar + row.revpar,
      noShow: acc.noShow + row.noShow,
      outOfOrder: acc.outOfOrder + row.outOfOrder,
      compRooms: acc.compRooms + row.compRooms,
    }), {
      roomsOccupied: 0,
      occupancyPercent: 0,
      adr: 0,
      revpar: 0,
      noShow: 0,
      outOfOrder: 0,
      compRooms: 0,
    });

    const numDays = data.length;
    return {
      roomsOccupied: totals.roomsOccupied,
      occupancyPercent: totals.occupancyPercent / numDays,
      adr: totals.adr / numDays,
      revpar: totals.revpar / numDays,
      noShow: totals.noShow,
      outOfOrder: totals.outOfOrder,
      compRooms: totals.compRooms,
    };
  };

  const totals = calculateTotals();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Room Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="min-w-[100px] border-r sticky left-0 bg-background z-20">Date</TableHead>
                <TableHead className="text-left min-w-[120px] border-r">Rooms Occupied</TableHead>
                <TableHead className="text-left min-w-[120px] border-r">Occupancy (%)</TableHead>
                <TableHead className="text-right min-w-[100px] border-r">ADR</TableHead>
                <TableHead className="text-right min-w-[100px] border-r">RevPAR</TableHead>
                <TableHead className="text-left min-w-[100px] border-r">No Show</TableHead>
                <TableHead className="text-left min-w-[120px] border-r">Out of Order</TableHead>
                <TableHead className="text-left min-w-[120px]">Comp Rooms</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium border-r py-0.5 px-2 sticky left-0 bg-background">
                    {row.date}
                  </TableCell>
                  <TableCell className="text-left border-r py-0.5 px-2">
                    {formatInteger(row.roomsOccupied)}
                  </TableCell>
                  <TableCell className="text-left border-r py-0.5 px-2">
                    {formatPercentage(row.occupancyPercent)}
                  </TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">
                    {formatCurrency(row.adr)}
                  </TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">
                    {formatCurrency(row.revpar)}
                  </TableCell>
                  <TableCell className="text-left border-r py-0.5 px-2">
                    {formatInteger(row.noShow)}
                  </TableCell>
                  <TableCell className="text-left border-r py-0.5 px-2">
                    {formatInteger(row.outOfOrder)}
                  </TableCell>
                  <TableCell className="text-left py-0.5 px-2">
                    {formatInteger(row.compRooms)}
                  </TableCell>
                </TableRow>
              ))}
              
              <TableRow className="border-t-2 font-bold bg-muted/50">
                <TableCell className="font-bold border-r py-0.5 px-2 sticky left-0 bg-muted/50">
                  MTD
                </TableCell>
                <TableCell className="text-left border-r py-0.5 px-2">
                  {formatInteger(totals.roomsOccupied)}
                </TableCell>
                <TableCell className="text-left border-r py-0.5 px-2">
                  {formatPercentage(totals.occupancyPercent)}
                </TableCell>
                <TableCell className="text-right border-r py-0.5 px-2">
                  {formatCurrency(totals.adr)}
                </TableCell>
                <TableCell className="text-right border-r py-0.5 px-2">
                  {formatCurrency(totals.revpar)}
                </TableCell>
                <TableCell className="text-left border-r py-0.5 px-2">
                  {formatInteger(totals.noShow)}
                </TableCell>
                <TableCell className="text-left border-r py-0.5 px-2">
                  {formatInteger(totals.outOfOrder)}
                </TableCell>
                <TableCell className="text-left py-0.5 px-2">
                  {formatInteger(totals.compRooms)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomDetails;