import React, { useState } from 'react';
import BudgetingHeader from '@/components/budgeting/BudgetingHeader';
import BudgetForm from '@/components/budgeting/BudgetForm';

const Budgeting = ({ selectedHotel = 'Default Property' }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const handleYearChange = (year) => {
    setSelectedYear(year);
    console.log('Selected year:', year);
  };

  return (
    <div className="space-y-6">
      <BudgetingHeader
        selectedHotel={selectedHotel}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />
      
      <BudgetForm selectedYear={selectedYear} />
    </div>
  );
};

export default Budgeting;
