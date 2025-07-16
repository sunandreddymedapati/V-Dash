import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import LaborReviewTableHeader from './labor-review/LaborReviewTableHeader';
import HotelMetricsRows from './labor-review/HotelMetricsRows';
import DepartmentSection from './labor-review/DepartmentSection';
import DivisionSection from './labor-review/DivisionSection';
import BottomSection from './labor-review/BottomSection';

const LaborReviewTable = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Labor Review</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <LaborReviewTableHeader />
            <TableBody>
              <HotelMetricsRows />
              <DepartmentSection />
              <DivisionSection />
              <BottomSection />
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LaborReviewTable;
