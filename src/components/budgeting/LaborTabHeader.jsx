import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Upload, Settings } from 'lucide-react';

const LaborTabHeader = ({
  selectedYear,
  onDownload,
  onUpload,
  onDepartmentSettings,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Labor Budget – {selectedYear}
        </h2>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onDownload}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button
          variant="outline"
          onClick={onUpload}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload
        </Button>
        <Button
          variant="outline"
          onClick={onDepartmentSettings}
          className="flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default LaborTabHeader;
