import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Save, Send, Download, History } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const BudgetingToolbar = ({
  onSaveDraft,
  onSubmitFinal,
  onDownload,
  onViewHistory
}) => {
  return (
    <div className="sticky bottom-6 z-10">
      <Card className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={onSaveDraft}
              className="flex items-center space-x-2 text-sm font-medium tracking-tight"
            >
              <Save className="w-4 h-4" />
              <span>Save Draft</span>
            </Button>

            <Button
              onClick={onSubmitFinal}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium tracking-tight"
            >
              <Send className="w-4 h-4" />
              <span>Submit Final</span>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 text-sm font-medium tracking-tight"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Budget</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onDownload('csv')}>
                  Download as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDownload('pdf')}>
                  Download as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              onClick={onViewHistory}
              className="flex items-center space-x-2 text-sm font-medium tracking-tight"
            >
              <History className="w-4 h-4" />
              <span>Change History</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BudgetingToolbar;
