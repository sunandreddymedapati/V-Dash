import React from 'react';
import { useToast } from '@/hooks/use-toast';

const LaborForecastToolbar = ({
  onDownloadForecast,
  onUploadSheet,
  onCompareActuals,
  onNotifyHeads
}) => {
  const { toast } = useToast();

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Toolbar buttons removed as requested */}
      </div>
    </div>
  );
};

export default LaborForecastToolbar;
