import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';

function RevenueHeader({
  selectedYear,
  onDownload,
  onUpload,
}) {
  const handleDownload = () => {
    if (onDownload) {
      onDownload(selectedYear);
    } else {
      console.log('Download clicked for year:', selectedYear);
    }
  };

  const handleUpload = () => {
    if (onUpload) {
      onUpload(selectedYear);
    } else {
      console.log('Upload clicked for year:', selectedYear);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Revenue Budget – {selectedYear}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Enter monthly projected revenue by category
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={handleDownload}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button
          variant="outline"
          onClick={handleUpload}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload
        </Button>
      </div>
    </div>
  );
}

export default RevenueHeader;
