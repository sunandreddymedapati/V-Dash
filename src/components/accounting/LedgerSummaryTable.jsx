import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Grid3X3, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const LedgerSummaryTable = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const ledgerData = [
    { name: 'Advance Deposit Ledger', amount: 125000 },
    { name: 'City Ledger', amount: 45000 },
    { name: 'Guest Ledger', amount: 75000 },
  ];

  const generateDailyData = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push({
        date: `Aug ${i.toString().padStart(2, '0')}`,
        advanceDeposits: (Math.random() * 3000 + 1000).toFixed(2),
        guestLedger: (Math.random() * 2000 + 500).toFixed(2),
        cityLedger: (Math.random() * 1500 + 300).toFixed(2),
      });
    }
    return days;
  };

  const dailyData = generateDailyData();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Ledger Summary</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDialogOpen(true)}
            className="p-2"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ledger Name</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ledgerData.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{entry.name}</TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(entry.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Ledger Details - August 2025</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDialogOpen(false)}
              className="p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Advance Deposits</TableHead>
                  <TableHead className="text-right">Guest Ledger</TableHead>
                  <TableHead className="text-right">City Ledger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dailyData.map((day, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{day.date}</TableCell>
                    <TableCell className="text-right font-mono">${day.advanceDeposits}</TableCell>
                    <TableCell className="text-right font-mono">${day.guestLedger}</TableCell>
                    <TableCell className="text-right font-mono">${day.cityLedger}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LedgerSummaryTable;
