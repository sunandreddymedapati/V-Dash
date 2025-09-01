import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, MessageCircle } from 'lucide-react';
import { formatCurrency } from '@/components/forecasting/utils/formatUtils';

const BusinessDetails = ({ selectedDate }) => {
  const generateDatesForMonth = (month, year) => {
    const dates = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      dates.push(date.toLocaleDateString('en-US'));
    }
    
    return dates;
  };

  const dates = generateDatesForMonth(selectedDate.month, selectedDate.year);

  const generateSampleData = () => {
    const currentDate = new Date();
    const isCurrentMonth = currentDate.getMonth() === selectedDate.month && currentDate.getFullYear() === selectedDate.year;
    
    return dates.map((date) => {
      const rowDate = new Date(date);
      const isTodayOrFuture = isCurrentMonth && rowDate >= currentDate;
      
      if (isTodayOrFuture) {
        return {
          date,
          roomRevenue: 0,
          otherRevenue: 0,
          taxes: 0,
          cash: 0,
          amex: 0,
          visa: 0,
          discover: 0,
          mastercard: 0,
          bankDeposits: 0,
          checkACH: 0,
          directBill: 0,
          adChange: 0,
          glChange: 0,
          clChange: 0,
        };
      }
      
      return {
        date,
        roomRevenue: Math.random() * 50000 + 20000,
        otherRevenue: Math.random() * 10000 + 5000,
        taxes: Math.random() * 8000 + 3000,
        cash: Math.random() * 5000 + 1000,
        amex: Math.random() * 15000 + 5000,
        visa: Math.random() * 20000 + 8000,
        discover: Math.random() * 8000 + 2000,
        mastercard: Math.random() * 12000 + 4000,
        bankDeposits: Math.random() * 10000 + 3000,
        checkACH: Math.random() * 7000 + 2000,
        directBill: Math.random() * 15000 + 5000,
        adChange: Math.random() * 2000 - 1000,
        glChange: Math.random() * 2000 - 1000,
        clChange: Math.random() * 2000 - 1000,
      };
    });
  };

  const businessData = generateSampleData();

  const isFutureDate = (date) => {
    const currentDate = new Date();
    const isCurrentMonth = currentDate.getMonth() === selectedDate.month && currentDate.getFullYear() === selectedDate.year;
    const rowDate = new Date(date);
    return isCurrentMonth && rowDate >= currentDate;
  };

  const displayValue = (value, date) => {
    return isFutureDate(date) ? "-" : formatCurrency(value);
  };

  const calculateTotalRevenue = (row) => {
    return row.roomRevenue + row.otherRevenue + row.taxes;
  };

  const calculateTotalDeposits = (row) => {
    return row.cash + row.amex + row.visa + row.discover + row.mastercard + 
           row.bankDeposits + row.checkACH + row.directBill + row.adChange + 
           row.glChange + row.clChange;
  };

  const calculateRevenueMiniusDeposits = (row) => {
    return calculateTotalRevenue(row) - calculateTotalDeposits(row);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Business Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead rowSpan={2} className="border-r sticky left-0 bg-background z-10">Date</TableHead>
                <TableHead colSpan={3} className="text-center border-r">Revenue (Credits)</TableHead>
                <TableHead colSpan={11} className="text-center border-r">Deposits (Debits)</TableHead>
                <TableHead rowSpan={2} className="text-center border-r">Revenue (Minus) Deposits</TableHead>
                <TableHead rowSpan={2} className="text-center">Actions</TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="border-r">Room Revenue</TableHead>
                <TableHead className="border-r">Other Revenue</TableHead>
                <TableHead className="border-r">Taxes</TableHead>
                <TableHead className="border-r">Cash</TableHead>
                <TableHead className="border-r">AMEX</TableHead>
                <TableHead className="border-r">VISA</TableHead>
                <TableHead className="border-r">DISCOVER</TableHead>
                <TableHead className="border-r">MasterCard</TableHead>
                <TableHead className="border-r">Bank Deposits</TableHead>
                <TableHead className="border-r">Check/ACH</TableHead>
                <TableHead className="border-r">Direct Bill</TableHead>
                <TableHead className="border-r">AD Change</TableHead>
                <TableHead className="border-r">GL Change</TableHead>
                <TableHead className="border-r">CL Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businessData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium sticky left-0 bg-background z-10 border-r py-0.5 px-2">
                    {row.date}
                  </TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{displayValue(row.roomRevenue, row.date)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{displayValue(row.otherRevenue, row.date)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{displayValue(row.taxes, row.date)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{displayValue(row.cash, row.date)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{displayValue(row.amex, row.date)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{displayValue(row.visa, row.date)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{displayValue(row.discover, row.date)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{displayValue(row.mastercard, row.date)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{displayValue(row.bankDeposits, row.date)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{displayValue(row.checkACH, row.date)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{displayValue(row.directBill, row.date)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{displayValue(row.adChange, row.date)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{displayValue(row.glChange, row.date)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{displayValue(row.clChange, row.date)}</TableCell>
                  <TableCell className="text-right border-r font-medium py-0.5 px-2">
                    {isFutureDate(row.date) ? "-" : formatCurrency(calculateRevenueMiniusDeposits(row))}
                  </TableCell>
                  <TableCell className="py-0.5 px-2">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" disabled={isFutureDate(row.date)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" disabled={isFutureDate(row.date)}>
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
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

export default BusinessDetails;