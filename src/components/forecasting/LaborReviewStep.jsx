import React from 'react';
import LaborReviewTable from '@/components/budgeting/LaborReviewTable';

const LaborReviewStep = ({ selectedMonthYear, selectedHotel }) => {
  return (
    <div className="space-y-6">
      <LaborReviewTable />
    </div>
  );
};

export default LaborReviewStep;
