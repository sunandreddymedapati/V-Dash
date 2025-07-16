import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';
import { formatCurrency } from './PortfolioUtils';
import { getPropertyWithRooms } from '@/constants/properties';

const BusinessSummaryTable = ({ hotelData, portfolioTotals }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Business Summary</CardTitle>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search hotels..."
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full overflow-x-auto shadow-inner">
          <Table className="min-w-[1800px]">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-white z-10 min-w-[200px]">Hotel Name</TableHead>
                <TableHead className="text-right whitespace-nowrap">Rooms Occupied</TableHead>
                <TableHead className="text-right whitespace-nowrap">Room Revenue</TableHead>
                <TableHead className="text-right whitespace-nowrap">F&B Revenue</TableHead>
                <TableHead className="text-right whitespace-nowrap">Other Revenue</TableHead>
                <TableHead className="text-right whitespace-nowrap">Gross Revenue</TableHead>
                <TableHead className="text-right whitespace-nowrap">Occupancy (%)</TableHead>
                <TableHead className="text-right whitespace-nowrap">ADR</TableHead>
                <TableHead className="text-right whitespace-nowrap">RevPAR</TableHead>
                <TableHead className="text-right whitespace-nowrap">No Show</TableHead>
                <TableHead className="text-right whitespace-nowrap">OOO</TableHead>
                <TableHead className="text-right whitespace-nowrap">Comp Rooms</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hotelData.map((hotel, index) => (
                <TableRow key={index}>
                  <TableCell className="sticky left-0 bg-white z-10 font-medium min-w-[200px] truncate">
                    {getPropertyWithRooms(hotel.name)}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">{hotel.roomsOccupied}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{formatCurrency(hotel.roomRevenue)}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{formatCurrency(hotel.fnbRevenue)}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{formatCurrency(hotel.otherRevenue)}</TableCell>
                  <TableCell className="text-right font-semibold whitespace-nowrap">{formatCurrency(hotel.grossRevenue)}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{hotel.occupancy.toFixed(1)}%</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{formatCurrency(hotel.adr)}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{formatCurrency(hotel.revpar)}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{hotel.noShow}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{hotel.ooo}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{hotel.compRooms}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50 font-semibold border-t-2">
                <TableCell className="sticky left-0 bg-gray-50 z-10 min-w-[200px] truncate">Portfolio Totals</TableCell>
                <TableCell className="text-right whitespace-nowrap">{portfolioTotals.roomsOccupied}</TableCell>
                <TableCell className="text-right whitespace-nowrap">{formatCurrency(portfolioTotals.roomRevenue)}</TableCell>
                <TableCell className="text-right whitespace-nowrap">{formatCurrency(portfolioTotals.fnbRevenue)}</TableCell>
                <TableCell className="text-right whitespace-nowrap">{formatCurrency(portfolioTotals.otherRevenue)}</TableCell>
                <TableCell className="text-right whitespace-nowrap">{formatCurrency(portfolioTotals.grossRevenue)}</TableCell>
                <TableCell className="text-right whitespace-nowrap">{portfolioTotals.occupancy.toFixed(1)}%</TableCell>
                <TableCell className="text-right whitespace-nowrap">{formatCurrency(portfolioTotals.adr)}</TableCell>
                <TableCell className="text-right whitespace-nowrap">{formatCurrency(portfolioTotals.revpar)}</TableCell>
                <TableCell className="text-right whitespace-nowrap">{portfolioTotals.noShow}</TableCell>
                <TableCell className="text-right whitespace-nowrap">{portfolioTotals.ooo}</TableCell>
                <TableCell className="text-right whitespace-nowrap">{portfolioTotals.compRooms}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessSummaryTable;
