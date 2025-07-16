import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DailyPerformanceTable = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Labor Hours – Last 7 Days</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full overflow-x-auto shadow-inner">
          <Table className="min-w-[1200px]">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-white min-w-[200px]">Department</TableHead>
                <TableHead className="text-right whitespace-nowrap">05/23</TableHead>
                <TableHead className="text-right whitespace-nowrap">05/24</TableHead>
                <TableHead className="text-right whitespace-nowrap">05/25</TableHead>
                <TableHead className="text-right whitespace-nowrap">05/26</TableHead>
                <TableHead className="text-right whitespace-nowrap">05/27</TableHead>
                <TableHead className="text-right whitespace-nowrap">05/28</TableHead>
                <TableHead className="text-right whitespace-nowrap">05/29</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((dept) => (
                <TableRow key={dept.department}>
                  <TableCell className="sticky left-0 bg-white font-medium min-w-[200px] truncate">
                    {dept.department}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">{dept['05/23']}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{dept['05/24']}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{dept['05/25']}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{dept['05/26']}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{dept['05/27']}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{dept['05/28']}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{dept['05/29']}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyPerformanceTable;
