import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const LedgerSummaryTable = () => {
  const ledgerData = [
    { name: 'Room Revenue', amount: 125000 },
    { name: 'Food & Beverage', amount: 45000 },
    { name: 'Meeting Room Revenue', amount: 15000 },
    { name: 'Parking Revenue', amount: 8500 },
    { name: 'Other Revenue', amount: 12000 },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ledger Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full overflow-x-auto shadow-inner">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-white min-w-[200px]">Ledger Name</TableHead>
                <TableHead className="text-right whitespace-nowrap">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ledgerData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="sticky left-0 bg-white font-medium min-w-[200px] truncate">{entry.name}</TableCell>
                  <TableCell className="text-right font-mono whitespace-nowrap">
                    {formatCurrency(entry.amount)}
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

export default LedgerSummaryTable;
