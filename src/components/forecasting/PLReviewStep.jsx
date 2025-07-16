import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency, formatPercentage } from './utils/formatUtils';

const PLReviewStep = ({ selectedMonthYear, selectedHotel }) => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  // Generate different data based on selected hotel
  const getReviewDataForHotel = (hotelName) => {
    let multiplier = 1;
    let roomMultiplier = 1;
    
    if (hotelName?.includes('Buffalo Marriott')) {
      multiplier = 2.5;
      roomMultiplier = 2.5;
    } else if (hotelName?.includes('Embassy Suites')) {
      multiplier = 1.8;
      roomMultiplier = 1.5;
    } else if (hotelName?.includes('DoubleTree')) {
      multiplier = 1.6;
      roomMultiplier = 1.3;
    } else if (hotelName?.includes('Best Western')) {
      multiplier = 0.8;
      roomMultiplier = 0.4;
    } else if (hotelName?.includes('Hampton Inn')) {
      multiplier = 0.9;
      roomMultiplier = 0.6;
    } else if (hotelName?.includes('Holiday Inn')) {
      multiplier = 1.1;
      roomMultiplier = 0.8;
    }

    const baseRooms = Math.round(139 * roomMultiplier);
    const totalRooms = baseRooms * 12;

    return [
      {
        item: 'Days in Month',
        values: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        total: '-',
        perRoom: '-',
        percentRev: '-'
      },
      {
        item: 'Available Rooms',
        values: Array(12).fill(0).map(() => Math.round(baseRooms * (0.95 + Math.random() * 0.1))),
        total: Math.round(totalRooms * (0.95 + Math.random() * 0.1)),
        perRoom: '-',
        percentRev: '-'
      },
      {
        item: 'Rooms Occupied',
        values: Array(12).fill(0).map((_, i) => Math.round(baseRooms * (0.7 + (i % 4) * 0.05) * multiplier * 0.8)),
        total: Math.round(totalRooms * 0.8 * multiplier),
        perRoom: '-',
        percentRev: '-'
      },
      {
        item: 'ADR',
        values: Array(12).fill(0).map((_, i) => Math.round((100 + i * 3 + Math.random() * 10) * multiplier * 100) / 100),
        total: Math.round(115 * multiplier * 100) / 100,
        perRoom: Math.round(118 * multiplier * 100) / 100,
        percentRev: '-'
      },
      {
        item: 'revPAR',
        values: Array(12).fill(0).map((_, i) => Math.round((75 + i * 2 + Math.random() * 8) * multiplier * 100) / 100),
        total: Math.round(88 * multiplier * 100) / 100,
        perRoom: Math.round(90 * multiplier * 100) / 100,
        percentRev: '-'
      },
      {
        item: 'occupancy',
        values: Array(12).fill(0).map((_, i) => Math.round((70 + i * 1.5 + Math.random() * 5) * 100) / 100),
        total: Math.round(78.5 * 100) / 100,
        perRoom: Math.round(78.5 * 100) / 100,
        percentRev: '-'
      },
      {
        item: 'Room Revenue',
        values: Array(12).fill(0).map((_, i) => Math.round((250000 + i * 15000 + Math.random() * 20000) * multiplier)),
        total: Math.round(4000000 * multiplier),
        perRoom: Math.round(118 * multiplier),
        percentRev: '-'
      },
      {
        item: 'Other Revenue',
        values: Array(12).fill(0),
        total: 0.00,
        perRoom: 0.00,
        percentRev: 0.00
      },
      {
        item: 'Room & Other Revenue',
        values: Array(12).fill(0).map((_, i) => Math.round((250000 + i * 15000 + Math.random() * 20000) * multiplier)),
        total: Math.round(4000000 * multiplier),
        perRoom: Math.round(118 * multiplier),
        percentRev: '-'
      },
      {
        item: 'F&B Revenue',
        values: Array(12).fill(0),
        total: 0.00,
        perRoom: 0.00,
        percentRev: 0.00
      },
      {
        item: 'COGS',
        values: Array(12).fill(0),
        total: 0.00,
        perRoom: '-',
        percentRev: '-'
      },
      {
        item: 'Gross Revenue',
        values: Array(12).fill(0).map((_, i) => Math.round((250000 + i * 15000 + Math.random() * 20000) * multiplier)),
        total: Math.round(4000000 * multiplier),
        perRoom: '-',
        percentRev: '-'
      }
    ];
  };

  const reviewData = getReviewDataForHotel(selectedHotel);

  return (
    <Card className="bg-white rounded-xl shadow-md border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          P&L Review
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold border-r min-w-40 h-8 py-2">Item</TableHead>
                {months.map((month) => (
                  <TableHead key={month} className="text-center font-semibold border-r min-w-24 h-8 py-2">
                    {month}
                  </TableHead>
                ))}
                <TableHead className="text-center font-semibold border-r min-w-24 h-8 py-2">TOTAL</TableHead>
                <TableHead className="text-center font-semibold border-r min-w-32 h-8 py-2">$ per Room</TableHead>
                <TableHead className="text-center font-semibold min-w-24 h-8 py-2">% Rev</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviewData.map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-50 h-8">
                  <TableCell className="font-medium border-r py-2">
                    {row.item}
                  </TableCell>
                  {row.values.map((value, monthIndex) => (
                    <TableCell key={monthIndex} className="text-right border-r py-2">
                      {row.item === 'ADR' || row.item === 'revPAR' || row.item.includes('Revenue') || row.item === 'COGS' 
                        ? formatCurrency(value)
                        : row.item === 'occupancy'
                        ? formatPercentage(value)
                        : value.toLocaleString()
                      }
                    </TableCell>
                  ))}
                  <TableCell className="text-right border-r font-semibold py-2">
                    {row.total === '-' 
                      ? '-' 
                      : typeof row.total === 'number'
                      ? (row.item.includes('Revenue') || row.item === 'COGS' || row.item === 'ADR' || row.item === 'revPAR'
                         ? formatCurrency(row.total)
                         : row.item === 'occupancy'
                         ? formatPercentage(row.total)
                         : row.total.toLocaleString())
                      : row.total
                    }
                  </TableCell>
                  <TableCell className="text-right border-r py-2">
                    {row.perRoom === '-' 
                      ? '-' 
                      : typeof row.perRoom === 'number'
                      ? formatCurrency(row.perRoom)
                      : row.perRoom
                    }
                  </TableCell>
                  <TableCell className="text-right py-2">
                    {row.percentRev === '-' 
                      ? '-' 
                      : typeof row.percentRev === 'number'
                      ? formatPercentage(row.percentRev)
                      : row.percentRev
                    }
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

export default PLReviewStep;
