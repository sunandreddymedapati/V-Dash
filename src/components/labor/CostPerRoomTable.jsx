import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CostPerRoomTable = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Labor Cost ($) per Room – Actual vs Budgeted</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full overflow-x-auto shadow-inner">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-white min-w-[150px]">Date</TableHead>
                <TableHead className="text-right whitespace-nowrap">Actual $</TableHead>
                <TableHead className="text-right whitespace-nowrap">Budgeted $</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.date}>
                  <TableCell className="sticky left-0 bg-white font-medium min-w-[150px]">{row.date}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">${row.actual.toFixed(2)}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">${row.budgeted.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 border-gray-200 font-semibold">
                <TableCell className="sticky left-0 bg-white">Total</TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  ${data.reduce((sum, row) => sum + row.actual, 0).toFixed(2)}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  ${data.reduce((sum, row) => sum + row.budgeted, 0).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostPerRoomTable;
