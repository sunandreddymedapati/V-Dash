import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Flag } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const TaxExemptTable = () => {
  const taxData = [
    {
      date: '05/01',
      occupancyTax: 450,
      stateTax: 750,
      nightlyTotal: 1200,
      taxVariance: 0,
    },
    {
      date: '05/02',
      occupancyTax: 425,
      stateTax: 700,
      nightlyTotal: 1125,
      taxVariance: -25,
    },
    // Add more sample data as needed
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
        <CardTitle>Tax Exempt Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Occupancy Tax</TableHead>
              <TableHead>State Tax</TableHead>
              <TableHead>Nightly Total</TableHead>
              <TableHead>Tax Variance</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taxData.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.date}</TableCell>
                <TableCell className="font-mono">{formatCurrency(row.occupancyTax)}</TableCell>
                <TableCell className="font-mono">{formatCurrency(row.stateTax)}</TableCell>
                <TableCell className="font-mono">{formatCurrency(row.nightlyTotal)}</TableCell>
                <TableCell className={`font-mono ${row.taxVariance !== 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {formatCurrency(row.taxVariance)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 justify-center">
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
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TaxExemptTable;
