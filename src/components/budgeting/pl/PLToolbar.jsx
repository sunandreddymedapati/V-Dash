import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PLToolbar = ({
  onSaveDraft,
  onSubmitFinal,
  onDownload
}) => {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={onSaveDraft}
              className="flex items-center space-x-2 text-sm"
            >
              <span>Save Draft</span>
            </Button>

            <Button
              onClick={onSubmitFinal}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              <span>Submit Final P&L</span>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={() => onDownload('csv')}
              className="flex items-center space-x-2 text-sm"
            >
              <span>Download CSV</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => onDownload('pdf')}
              className="flex items-center space-x-2 text-sm"
            >
              <span>Download PDF</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PLToolbar;
