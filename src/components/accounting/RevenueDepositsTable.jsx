import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Flag, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const RevenueDepositsTable = () => {
  const transactionData = [
    {
      date: '05/01',
      roomRevenue: 12000,
      otherRevenue: 3500,
      taxes: 1200,
      cash: 500,
      amex: 4500,
      visa: 6000,
      discover: 800,
      mastercard: 3200,
      bankDeposits: 15000,
      checkACH: 1000,
      directBill: 2500,
      revenueCredits: 16700,
      depositsDebits: 15000,
      variance: 1700,
    },
    // Add more sample data as needed
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const totals = transactionData.reduce((acc, row) => ({
    roomRevenue: acc.roomRevenue + row.roomRevenue,
    otherRevenue: acc.otherRevenue + row.otherRevenue,
    taxes: acc.taxes + row.taxes,
    cash: acc.cash + row.cash,
    amex: acc.amex + row.amex,
    visa: acc.visa + row.visa,
    discover: acc.discover + row.discover,
    mastercard: acc.mastercard + row.mastercard,
    bankDeposits: acc.bankDeposits + row.bankDeposits,
    checkACH: acc.checkACH + row.checkACH,
    directBill: acc.directBill + row.directBill,
    revenueCredits: acc.revenueCredits + row.revenueCredits,
    depositsDebits: acc.depositsDebits + row.depositsDebits,
    variance: acc.variance + row.variance,
  }), {
    roomRevenue: 0, otherRevenue: 0, taxes: 0, cash: 0, amex: 0, visa: 0,
    discover: 0, mastercard: 0, bankDeposits: 0, checkACH: 0, directBill: 0,
    revenueCredits: 0, depositsDebits: 0, variance: 0
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Transactions – Revenue vs Deposits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-white">Date</TableHead>
                <TableHead>Room Revenue</TableHead>
                <TableHead>Other Revenue</TableHead>
                <TableHead>Taxes</TableHead>
                <TableHead>Cash</TableHead>
                <TableHead>AMEX</TableHead>
                <TableHead>VISA</TableHead>
                <TableHead>DISCOVER</TableHead>
                <TableHead>MasterCard</TableHead>
                <TableHead>Bank Deposits</TableHead>
                <TableHead>Check/ACH</TableHead>
                <TableHead>Direct Bill</TableHead>
                <TableHead>Revenue (Credits)</TableHead>
                <TableHead>Deposits (Debits)</TableHead>
                <TableHead>Revenue – Deposits</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="sticky left-0 bg-white font-medium">{row.date}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.roomRevenue)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.otherRevenue)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.taxes)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.cash)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.amex)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.visa)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.discover)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.mastercard)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.bankDeposits)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.checkACH)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.directBill)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.revenueCredits)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(row.depositsDebits)}</TableCell>
                  <TableCell className={`font-mono ${row.variance !== 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(row.variance)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50 font-semibold">
                <TableCell className="sticky left-0 bg-gray-50">TOTAL</TableCell>
                <TableCell className="font-mono">{formatCurrency(totals.roomRevenue)}</TableCell>
                <TableCell className="font-mono">{formatCurrency(totals.otherRevenue)}</TableCell>
                <TableCell className="font-mono">{formatCurrency(totals.taxes)}</TableCell>
                <TableCell className="font-mono">{formatCurrency(totals.cash)}</TableCell>
                <TableCell className="font-mono">{formatCurrency(totals.amex)}</TableCell>
                <TableCell className="font-mono">{formatCurrency(totals.visa)}</TableCell>
                <TableCell className="font-mono">{formatCurrency(totals.discover)}</TableCell>
                <TableCell className="font-mono">{formatCurrency(totals.mastercard)}</TableCell>
                <TableCell className="font-mono">{formatCurrency(totals.bankDeposits)}</TableCell>
                <TableCell className="font-mono">{formatCurrency(totals.checkACH)}</TableCell>
                <TableCell className="font-mono">{formatCurrency(totals.directBill)}</TableCell>
                <TableCell className="font-mono">{formatCurrency(totals.revenueCredits)}</TableCell>
                <TableCell className="font-mono">{formatCurrency(totals.depositsDebits)}</TableCell>
                <TableCell className={`font-mono ${totals.variance !== 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {formatCurrency(totals.variance)}
                </TableCell>
                <TableCell>—</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueDepositsTable;
