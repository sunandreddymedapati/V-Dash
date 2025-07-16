import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const RoomTaxDetailTable = () => {
  const roomTaxData = [
    {
      date: '05/01',
      roomsOccupied: 85,
      occupancyPercent: 85.0,
      adr: 120.50,
      revpar: 102.43,
      noShow: 2,
      outOfOrderRevenue: 0,
      revenueExempted: 250,
      taxCollected: 1200,
      taxEstimated: 1200,
      taxVariance: 0,
      revenue: 12000,
    },
    // Add more sample data as needed
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercent = (value) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Room & Tax Performance Metrics
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Variance Alert</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-white">Date</TableHead>
                <TableHead>Rooms Occupied</TableHead>
                <TableHead>Occupancy (%)</TableHead>
                <TableHead>ADR</TableHead>
                <TableHead>RevPAR</TableHead>
                <TableHead>No Show</TableHead>
                <TableHead>Out of Order Revenue</TableHead>
                <TableHead>Revenue Exempted</TableHead>
                <TableHead>Tax Collected</TableHead>
                <TableHead>Tax Estimated</TableHead>
                <TableHead>Tax Variance</TableHead>
                <TableHead>Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roomTaxData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="sticky left-0 bg-white font-medium">{row.date}</TableCell>
                  <TableCell className="text-center">{row.roomsOccupied}</TableCell>
                  <TableCell className="text-center">{formatPercent(row.occupancyPercent)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.adr)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.revpar)}</TableCell>
                  <TableCell className="text-center">{row.noShow}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.outOfOrderRevenue)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.revenueExempted)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.taxCollected)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.taxEstimated)}</TableCell>
                  <TableCell className={`font-mono ${row.taxVariance !== 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {row.taxVariance !== 0 && <AlertTriangle className="w-4 h-4 inline mr-1 text-amber-500" />}
                    {formatCurrency(row.taxVariance)}
                  </TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.revenue)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomTaxDetailTable;
