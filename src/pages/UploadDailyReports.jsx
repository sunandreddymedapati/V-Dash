import React from 'react';
import UploadReportsHeader from '../components/upload/UploadReportsHeader';
import UploadReportsSection from '../components/upload/UploadReportsSection';

const UploadDailyReports = ({ selectedHotel }) => {
  return (
    <div className="space-y-6">
      <UploadReportsHeader selectedHotel={selectedHotel} />
      <UploadReportsSection />
    </div>
  );
};

export default UploadDailyReports;
