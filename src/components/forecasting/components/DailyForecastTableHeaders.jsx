import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DailyForecastTableHeaders = ({ onCopyFromOTB }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-center font-semibold border-r w-20 bg-gray-200">Day</TableHead>
        
        {/* Actual/OTB Section with OTB Date */}
        <TableHead className="text-center font-semibold bg-blue-100" colSpan={3}>
          <div>Actual/OTB</div>
          <div className="text-xs font-normal text-gray-600 mt-1">
            OTB Date: {currentDate}
          </div>
        </TableHead>
        
        <TableHead className="text-center font-semibold border-r bg-green-100" colSpan={2}>7 Days Pickup</TableHead>
        
        {/* Transient Forecast with Copy from OTB */}
        <TableHead className="text-center font-semibold border-r bg-yellow-100" colSpan={3}>
          <div>Transient Forecast</div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-normal text-blue-600 mt-1 h-auto p-1 hover:bg-blue-50"
            onClick={onCopyFromOTB}
          >
            <Copy className="w-3 h-3 mr-1" />
            Copy from OTB
          </Button>
        </TableHead>
        
        <TableHead className="text-center font-semibold border-r bg-purple-100" colSpan={3}>Group Forecast</TableHead>
        <TableHead className="text-center font-semibold border-r bg-orange-100" colSpan={4}>Total Forecast</TableHead>
        <TableHead className="text-center font-semibold border-r bg-pink-100" colSpan={4}>MTD</TableHead>
        <TableHead className="text-center font-semibold border-r bg-indigo-100" colSpan={4}>YTD</TableHead>
        <TableHead className="text-center font-semibold bg-teal-100" colSpan={4}>Projected EOM</TableHead>
      </TableRow>
      
      <TableRow>
        <TableHead className="text-center text-xs border-r bg-gray-50"></TableHead>
        
        {/* Actual/OTB Sub-headers */}
        <TableHead className="text-center text-xs bg-blue-50">Occ</TableHead>
        <TableHead className="text-center text-xs bg-blue-50">ADR</TableHead>
        <TableHead className="text-center text-xs border-r bg-blue-50">Revenue</TableHead>
        
        {/* 7 Days Pickup Sub-headers */}
        <TableHead className="text-center text-xs bg-green-50">ADR</TableHead>
        <TableHead className="text-center text-xs border-r bg-green-50">Revenue</TableHead>
        
        {/* Transient Forecast Sub-headers */}
        <TableHead className="text-center text-xs bg-yellow-50">Occ</TableHead>
        <TableHead className="text-center text-xs bg-yellow-50">ADR</TableHead>
        <TableHead className="text-center text-xs border-r bg-yellow-50">Revenue</TableHead>
        
        {/* Group Forecast Sub-headers */}
        <TableHead className="text-center text-xs bg-purple-50">Occ</TableHead>
        <TableHead className="text-center text-xs bg-purple-50">ADR</TableHead>
        <TableHead className="text-center text-xs border-r bg-purple-50">Revenue</TableHead>
        
        {/* Total Forecast Sub-headers */}
        <TableHead className="text-center text-xs bg-orange-50">Occ</TableHead>
        <TableHead className="text-center text-xs bg-orange-50">Occ%</TableHead>
        <TableHead className="text-center text-xs bg-orange-50">ADR</TableHead>
        <TableHead className="text-center text-xs border-r bg-orange-50">Revenue</TableHead>
        
        {/* MTD Sub-headers */}
        <TableHead className="text-center text-xs bg-pink-50">Occ</TableHead>
        <TableHead className="text-center text-xs bg-pink-50">Occ%</TableHead>
        <TableHead className="text-center text-xs bg-pink-50">ADR</TableHead>
        <TableHead className="text-center text-xs border-r bg-pink-50">Revenue</TableHead>
        
        {/* YTD Sub-headers */}
        <TableHead className="text-center text-xs bg-indigo-50">Occ</TableHead>
        <TableHead className="text-center text-xs bg-indigo-50">Occ%</TableHead>
        <TableHead className="text-center text-xs bg-indigo-50">ADR</TableHead>
        <TableHead className="text-center text-xs border-r bg-indigo-50">Revenue</TableHead>
        
        {/* Projected EOM Sub-headers */}
        <TableHead className="text-center text-xs bg-teal-50">Occ</TableHead>
        <TableHead className="text-center text-xs bg-teal-50">Occ%</TableHead>
        <TableHead className="text-center text-xs bg-teal-50">ADR</TableHead>
        <TableHead className="text-center text-xs bg-teal-50">Revenue</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default DailyForecastTableHeaders;
