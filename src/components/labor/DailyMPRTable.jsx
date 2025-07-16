import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DailyMPRTable = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Minutes Per Room – Monthly View</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full overflow-x-auto shadow-inner">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-white min-w-[150px]">Date</TableHead>
                <TableHead className="text-right whitespace-nowrap">MPR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.date}>
                  <TableCell className="sticky left-0 bg-white font-medium min-w-[150px]">{row.date}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{row.mpr.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyMPRTable;
