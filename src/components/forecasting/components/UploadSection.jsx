import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download } from 'lucide-react';

const UploadSection = () => {
  return (
    <Card className="bg-white rounded-xl shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload Forecast Data
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export to Excel
            </Button>
          </div>
          
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadSection;
