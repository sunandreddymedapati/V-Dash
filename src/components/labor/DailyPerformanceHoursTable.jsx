import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DailyPerformanceHoursTable = ({ data }) => {
  const calculateTotal = (values) => {
    return values.reduce((sum, val) => sum + val, 0);
  };

  const totalByDate = data.dates.map((_, dateIndex) =>
    data.departments.reduce((sum, dept) => sum + dept.values[dateIndex], 0)
  );

  const grandTotal = totalByDate.reduce((sum, val) => sum + val, 0);

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[800px] text-sm">
        <TableHeader>
          <TableRow className="bg-blue-100 h-8">
            <TableHead className="sticky left-0 bg-blue-100 font-semibold text-black min-w-[120px] px-2 py-1"></TableHead>
            {data.dates.map((date) => (
              <TableHead
                key={date}
                className="text-center font-semibold text-black min-w-[80px] px-2 py-1"
              >
                {date}
              </TableHead>
            ))}
            <TableHead className="text-center font-semibold text-black min-w-[80px] px-2 py-1">
              Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Rooms Sold Row */}
          <TableRow className="bg-gray-50 h-8">
            <TableCell className="sticky left-0 bg-gray-50 font-semibold px-2 py-1">
              Rooms Sold
            </TableCell>
            {data.roomsSold.map((rooms, index) => (
              <TableCell key={index} className="text-center px-2 py-1">
                {rooms}
              </TableCell>
            ))}
            <TableCell className="text-center font-semibold px-2 py-1">
              {calculateTotal(data.roomsSold)}
            </TableCell>
          </TableRow>

          {/* Departments Header */}
          <TableRow className="bg-gray-100 h-8">
            <TableCell className="sticky left-0 bg-gray-100 font-semibold px-2 py-1">
              Departments
            </TableCell>
            {data.dates.map((_, index) => (
              <TableCell key={index} className="px-2 py-1"></TableCell>
            ))}
            <TableCell className="px-2 py-1"></TableCell>
          </TableRow>

          {/* Department Rows */}
          {data.departments.map((dept, deptIndex) => (
            <TableRow
              key={dept.name}
              className={`h-10 ${deptIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <TableCell
                className={`sticky left-0 font-medium px-2 py-1 ${
                  deptIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                {dept.name}
              </TableCell>
              {dept.values.map((value, valueIndex) => (
                <TableCell key={valueIndex} className="text-center px-2 py-1">
                  <div className="flex flex-col">
                    <span className="text-black text-sm">{value.toFixed(2)}</span>
                    <span className="text-xs text-red-500">
                      {value > 50
                        ? `+${(value - 50).toFixed(2)}`
                        : `-${(50 - value).toFixed(2)}`}
                    </span>
                  </div>
                </TableCell>
              ))}
              <TableCell className="text-center font-semibold px-2 py-1">
                <div className="flex flex-col">
                  <span className="text-black text-sm">{dept.total.toFixed(2)}</span>
                  <span className="text-xs text-red-500">
                    {dept.total > 350
                      ? `+${(dept.total - 350).toFixed(2)}`
                      : `-${(350 - dept.total).toFixed(2)}`}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {/* Total Row */}
          <TableRow className="bg-blue-50 border-t-2 border-blue-200 h-10">
            <TableCell className="sticky left-0 bg-blue-50 font-bold px-2 py-1">
              Total
            </TableCell>
            {totalByDate.map((total, index) => (
              <TableCell key={index} className="text-center font-semibold px-2 py-1">
                <div className="flex flex-col">
                  <span className="text-black text-sm">{total.toFixed(2)}</span>
                  <span className="text-xs text-red-500">
                    {total > 200
                      ? `+${(total - 200).toFixed(2)}`
                      : `-${(200 - total).toFixed(2)}`}
                  </span>
                </div>
              </TableCell>
            ))}
            <TableCell className="text-center font-bold px-2 py-1">
              <div className="flex flex-col">
                <span className="text-black text-sm">{grandTotal.toFixed(2)}</span>
                <span className="text-xs text-red-500">
                  {grandTotal > 1400
                    ? `+${(grandTotal - 1400).toFixed(2)}`
                    : `-${(1400 - grandTotal).toFixed(2)}`}
                </span>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DailyPerformanceHoursTable;
