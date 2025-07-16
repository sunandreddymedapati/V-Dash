import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MONTHS } from './RevenueConstants';

function RevenueTableHeader() {
  return (
    <TableHeader>
      <TableRow className="bg-blue-100">
        <TableHead className="sticky left-0 bg-blue-100 z-10 min-w-48 font-semibold text-blue-900">
          Revenue ($)
        </TableHead>
        {MONTHS.map((month) => (
          <TableHead key={month} className="text-center min-w-28 font-semibold text-blue-900">
            {month}
          </TableHead>
        ))}
        <TableHead className="text-center min-w-32 font-semibold bg-blue-200 text-blue-900">
          TOTAL
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default RevenueTableHeader;
