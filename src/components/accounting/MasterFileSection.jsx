import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Plus, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const MasterFileSection = () => {
  const handleDownload = (format) => {
    console.log(`Downloading master file as ${format}`);
    // Implement download logic
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accounting Master File</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <Button onClick={() => handleDownload('xlsx')}>
              <Download className="w-4 h-4 mr-2" />
              Download Master File (.xlsx)
            </Button>
            <Button variant="outline" onClick={() => handleDownload('csv')}>
              <Download className="w-4 h-4 mr-2" />
              Download (.csv)
            </Button>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Missing Info
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Missing Information</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload file or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    Supported formats: .xlsx, .csv, .pdf
                  </p>
                  <Button variant="outline" className="mt-3">
                    Choose File
                  </Button>
                </div>
                <div className="text-center text-gray-500">or</div>
                <Button variant="outline" className="w-full">
                  Manual Entry
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default MasterFileSection;
