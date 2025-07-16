import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download } from 'lucide-react';
import { formatCurrency } from './PortfolioUtils';
import { getPropertyWithRooms } from '@/constants/properties';

const RevenueKPIsTable = ({ revenueData, dateColumns }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Revenue KPIs – Total Revenue</CardTitle>
          <button className="flex items-center space-x-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
            <Download className="w-3 h-3" />
            <span>Export</span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full overflow-x-auto shadow-inner">
          <Table className="min-w-[1200px]">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-white z-10 min-w-[200px]">Hotel Name</TableHead>
                {dateColumns.map((date) => (
                  <TableHead key={date.value} className="text-right min-w-[100px] whitespace-nowrap">{date.label}</TableHead>
                ))}
                <TableHead className="text-right font-semibold min-w-[120px] whitespace-nowrap">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueData.map((hotel, index) => (
                <TableRow key={index}>
                  <TableCell className="sticky left-0 bg-white z-10 font-medium min-w-[200px] truncate">
                    {getPropertyWithRooms(hotel.hotelName)}
                  </TableCell>
                  {hotel.dailyRevenues.map((revenue, dateIndex) => (
                    <TableCell key={dateIndex} className="text-right text-sm whitespace-nowrap">
                      {formatCurrency(Number(revenue))}
                    </TableCell>
                  ))}
                  <TableCell className="text-right font-semibold whitespace-nowrap">
                    {formatCurrency(Number(hotel.total))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueKPIsTable;
