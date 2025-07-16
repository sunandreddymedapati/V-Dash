import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { tableData } from './constants';
import { formatCurrency, calculateTotal } from './utils';

const DepartmentSection = () => {
  return (
    <>
      {/* Department Section Header */}
      <TableRow className="bg-gray-100 h-8">
        <TableCell className="font-bold border-r py-1">Department</TableCell>
        <TableCell className="border-r py-1"></TableCell>
        <TableCell className="border-r py-1"></TableCell>
        <TableCell className="border-r py-1"></TableCell>
        <TableCell className="border-r py-1"></TableCell>
        <TableCell className="border-r py-1"></TableCell>
        <TableCell className="border-r py-1"></TableCell>
        <TableCell className="border-r py-1"></TableCell>
        <TableCell className="border-r py-1"></TableCell>
        <TableCell className="border-r py-1"></TableCell>
        <TableCell className="border-r py-1"></TableCell>
        <TableCell className="border-r py-1"></TableCell>
        <TableCell className="border-r py-1"></TableCell>
        <TableCell className="border-r py-1"></TableCell>
        <TableCell className="py-1"></TableCell>
      </TableRow>

      {/* Department Rows */}
      {Object.entries(tableData.departments).map(([dept, values]) => (
        <TableRow key={dept} className="h-8">
          <TableCell className="font-medium border-r py-1">{dept}</TableCell>
          {values.map((value, index) => (
            <TableCell key={index} className="text-center border-r py-1">{formatCurrency(value)}</TableCell>
          ))}
          <TableCell className="text-center border-r py-1">{formatCurrency(calculateTotal(values))}</TableCell>
          <TableCell className="text-center py-1">{formatCurrency(0)}</TableCell>
        </TableRow>
      ))}

      {/* Department Total */}
      <TableRow className="font-bold bg-gray-50 h-8">
        <TableCell className="border-r py-1">TOTAL</TableCell>
        {Array(12).fill(0).map((_, index) => (
          <TableCell key={index} className="text-center border-r py-1">{formatCurrency(0)}</TableCell>
        ))}
        <TableCell className="text-center border-r py-1">{formatCurrency(0)}</TableCell>
        <TableCell className="text-center py-1">{formatCurrency(0)}</TableCell>
      </TableRow>
    </>
  );
};

export default DepartmentSection;
