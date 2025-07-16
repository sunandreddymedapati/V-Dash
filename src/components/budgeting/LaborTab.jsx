import React, { useState, useEffect } from 'react';
import LaborTabHeader from './LaborTabHeader';
import LaborInformationForm from './LaborInformationForm';
import LaborTable from './LaborTable';
import DepartmentConfigurationDialog from './DepartmentConfigurationDialog';

const LaborTab = ({ selectedYear }) => {
  const [laborData, setLaborData] = useState({});
  const [isDepartmentConfigOpen, setIsDepartmentConfigOpen] = useState(false);

  // Reset/load data when year changes
  useEffect(() => {
    console.log('Year changed to:', selectedYear);
    // Load data for the selected year (placeholder for now)
    setLaborData(prev => ({
      ...prev,
      [selectedYear]: prev[selectedYear] || {}
    }));
  }, [selectedYear]);

  const handleDownload = () => {
    console.log('Download clicked for year:', selectedYear);
  };

  const handleUpload = () => {
    console.log('Upload clicked for year:', selectedYear);
  };

  const handleDepartmentSettings = () => {
    setIsDepartmentConfigOpen(true);
    console.log('Department configuration settings clicked');
  };

  return (
    <div className="space-y-6">
      <LaborTabHeader
        selectedYear={selectedYear}
        onDownload={handleDownload}
        onUpload={handleUpload}
        onDepartmentSettings={handleDepartmentSettings}
      />

      <LaborInformationForm selectedYear={selectedYear} />

      <LaborTable selectedYear={selectedYear} />

      <DepartmentConfigurationDialog
        open={isDepartmentConfigOpen}
        onOpenChange={setIsDepartmentConfigOpen}
      />
    </div>
  );
};

export default LaborTab;
