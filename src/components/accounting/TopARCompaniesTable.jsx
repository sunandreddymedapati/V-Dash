import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grid3X3 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const TopARCompaniesTable = () => {
  const arData = [
    { companyName: 'Corporate Solutions Inc.', totalOutstanding: 25000 },
    { companyName: 'Global Events LLC', totalOutstanding: 18500 },
    { companyName: 'Business Travel Group', totalOutstanding: 15200 },
    { companyName: 'Conference Partners', totalOutstanding: 12800 },
    { companyName: 'Executive Stays Co.', totalOutstanding: 9600 },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Top 5 A/R – August 2025</CardTitle>
          <Button variant="outline" size="sm" className="p-2">
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead className="text-right">Total Outstanding</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {arData.map((company, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{company.companyName}</TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(company.totalOutstanding)}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopARCompaniesTable;
