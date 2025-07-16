import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getPropertyWithRooms } from '@/constants/properties';

const RevenueKPITable = ({
  properties,
  columns,
  generateData
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full">
        <div className="max-h-[420px] overflow-y-auto">
          <Table className="w-full">
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead className="sticky left-0 bg-white z-20 min-w-[200px] border-r">
                  Property Name
                </TableHead>
                {columns.map((column) => (
                  <TableHead key={column.key} className="text-center min-w-[100px] whitespace-nowrap">
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property, index) => (
                <TableRow key={index}>
                  <TableCell className="sticky left-0 bg-white z-10 font-medium border-r">
                    {getPropertyWithRooms(property)}
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.key} className="text-center">
                      {generateData(property, column.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RevenueKPITable;
