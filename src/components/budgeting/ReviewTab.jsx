import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const reviewData = {
  daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  availableRooms: [4309, 3892, 4309, 4170, 4309, 4170, 4309, 4309, 4170, 4309, 4170, 4309],
  roomsOccupied: [2510, 2649, 3353, 3289, 4105, 4170, 4199, 4065, 3609, 3964, 2466, 2500],
  adr: [109.21, 110.64, 106.91, 120.47, 133.14, 130.58, 130.13, 134.63, 134.07, 134.24, 127.03, 115.92],
  revPAR: [63.61, 75.31, 82.70, 95.01, 126.83, 130.58, 126.80, 127.00, 116.04, 123.49, 75.12, 67.25],
  occupancy: [58.25, 68.06, 77.35, 78.87, 95.27, 100.00, 97.45, 94.34, 86.55, 91.99, 59.14, 58.02],
  roomRevenue: [274114.60, 293090.00, 356344.00, 396211.00, 546522.00, 544530.00, 546395.00, 547260.00, 483866.00, 532122.00, 313246.00, 289800.00],
  otherRevenue: [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
  roomAndOtherRevenue: [274114.60, 293090.00, 356344.00, 396211.00, 546522.00, 544530.00, 546395.00, 547260.00, 483866.00, 532122.00, 313246.00, 289800.00],
  fbRevenue: [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
  cogs: [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
  grossRevenue: [274114.60, 293090.00, 356344.00, 396211.00, 546522.00, 544530.00, 546395.00, 547260.00, 483866.00, 532122.00, 313246.00, 289800.00]
};

const ReviewTab = () => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  const calculateTotal = (values) => {
    return values.reduce((sum, val) => sum + val, 0);
  };

  const calculateAverage = (values) => {
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Review Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 h-8">
                  <TableHead className="min-w-40 font-semibold border-r h-8 py-1">Item</TableHead>
                  {MONTHS.map((month) => (
                    <TableHead key={month} className="text-center font-semibold border-r min-w-24 h-8 py-1">
                      {month}
                    </TableHead>
                  ))}
                  <TableHead className="text-center font-semibold border-r min-w-24 h-8 py-1">TOTAL</TableHead>
                  <TableHead className="text-center font-semibold border-r min-w-32 h-8 py-1">$ per Room</TableHead>
                  <TableHead className="text-center font-semibold min-w-24 h-8 py-1">% Rev</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderRow("Days in Month", reviewData.daysInMonth, "-", "-", "-")}
                {renderRow("Available Rooms", reviewData.availableRooms, formatNumber(calculateTotal(reviewData.availableRooms)), "-", "-")}
                {renderRow("Rooms Occupied", reviewData.roomsOccupied, formatNumber(calculateTotal(reviewData.roomsOccupied)), "-", "-")}
                {renderRow("ADR", reviewData.adr, formatCurrency(calculateAverage(reviewData.adr)), formatCurrency(125.39), "-")}
                {renderRow("revPAR", reviewData.revPAR, formatCurrency(calculateAverage(reviewData.revPAR)), formatCurrency(100.99), "-")}
                {renderRow("occupancy", reviewData.occupancy, formatPercentage(calculateAverage(reviewData.occupancy)), formatPercentage(80.44), "-")}
                {renderRow("Room Revenue", reviewData.roomRevenue, formatCurrency(calculateTotal(reviewData.roomRevenue)), formatCurrency(125.39), "-")}
                {renderRow("Other Revenue", reviewData.otherRevenue, formatCurrency(calculateTotal(reviewData.otherRevenue)), formatCurrency(0), formatCurrency(0))}
                {renderRow("Room & Other Revenue", reviewData.roomAndOtherRevenue, formatCurrency(calculateTotal(reviewData.roomAndOtherRevenue)), formatCurrency(125.39), "-")}
                {renderRow("F&B Revenue", reviewData.fbRevenue, formatCurrency(calculateTotal(reviewData.fbRevenue)), formatCurrency(0), formatCurrency(0))}
                {renderRow("COGS", reviewData.cogs, formatCurrency(calculateTotal(reviewData.cogs)), "-", "-")}
                {renderRow("Gross Revenue", reviewData.grossRevenue, formatCurrency(calculateTotal(reviewData.grossRevenue)), "-", "-")}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  function renderRow(label, values, totalCell, perRoomCell, revCell) {
    return (
      <TableRow className="h-8">
        <TableCell className="font-medium border-r py-1">{label}</TableCell>
        {values.map((value, index) => (
          <TableCell key={index} className="text-center border-r py-1">
            {label === "occupancy" ? formatPercentage(value) :
             label === "ADR" || label === "revPAR" || label.includes("Revenue") || label === "COGS"
               ? formatCurrency(value)
               : formatNumber(value)}
          </TableCell>
        ))}
        <TableCell className="text-center border-r py-1">{totalCell}</TableCell>
        <TableCell className="text-center border-r py-1">{perRoomCell}</TableCell>
        <TableCell className="text-center py-1">{revCell}</TableCell>
      </TableRow>
    );
  }
};

export default ReviewTab;
