import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileText, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ManualEntryDialog from './ManualEntryDialog';
import AuditTrailDialog from './AuditTrailDialog';

const reportItems = [
  { id: 'transactions', name: 'Transactions Report', format: 'PDF format' },
  { id: 'occupancy', name: 'Occupancy Forecast Report', format: 'PDF format' },
  { id: 'city-ledger', name: 'City Ledger Aging', format: 'PDF format' },
  { id: 'manager', name: "Manager's Report", format: 'PDF format' },
  { id: 'transaction-summary', name: 'Transaction Summary Report', format: 'PDF format' },
  { id: 'adp', name: 'ADP Report', format: 'CSV format' }
];

const UploadReportsSection = () => {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = React.useState({});
  const [uploadStatus, setUploadStatus] = React.useState({});
  const [uploadTimestamps, setUploadTimestamps] = React.useState({});
  const [manualDialogOpen, setManualDialogOpen] = React.useState(false);
  const [selectedReportForManual, setSelectedReportForManual] = React.useState(null);
  const [auditTrailDialogOpen, setAuditTrailDialogOpen] = React.useState(false);
  const [selectedReportForAudit, setSelectedReportForAudit] = React.useState(null);

  const formatTimestampEST = (date) => {
    return date.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleFileSelect = (reportId, event) => {
    const file = event.target.files?.[0] || null;
    setSelectedFiles(prev => ({ ...prev, [reportId]: file }));
    if (file) {
      setUploadStatus(prev => ({ ...prev, [reportId]: null }));
    }
  };

  const handleUpload = async (reportId) => {
    const file = selectedFiles[reportId];
    const reportName = reportItems.find(r => r.id === reportId)?.name;
    
    if (!file) {
      toast({
        title: "No File Selected",
        description: `Please select a file for ${reportName} before uploading.`,
        variant: "destructive",
      });
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const isSuccess = Math.random() > 0.3;
      
      if (isSuccess) {
        const now = new Date();
        setUploadStatus(prev => ({ ...prev, [reportId]: 'success' }));
        setUploadTimestamps(prev => ({ ...prev, [reportId]: now }));
        toast({
          title: "Upload Successful",
          description: `${reportName} has been uploaded successfully.`,
        });
        setSelectedFiles(prev => ({ ...prev, [reportId]: null }));
        const fileInput = document.querySelector(`input[data-report-id="${reportId}"]`);
        if (fileInput) fileInput.value = '';
      } else {
        const now = new Date();
        setUploadStatus(prev => ({ ...prev, [reportId]: 'failed' }));
        setUploadTimestamps(prev => ({ ...prev, [reportId]: now }));
        toast({
          title: "Upload Failed",
          description: `Failed to upload ${reportName}. Please try again.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      const now = new Date();
      setUploadStatus(prev => ({ ...prev, [reportId]: 'failed' }));
      setUploadTimestamps(prev => ({ ...prev, [reportId]: now }));
      toast({
        title: "Upload Error",
        description: `An error occurred while uploading ${reportName}.`,
        variant: "destructive",
      });
    }
  };

  const handleManual = (reportId) => {
    setSelectedReportForManual(reportId);
    setManualDialogOpen(true);
  };

  const handleAuditTrail = (reportId) => {
    setSelectedReportForAudit(reportId);
    setAuditTrailDialogOpen(true);
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Reports</h2>
        
        <div className="space-y-4">
          {reportItems.map((report, index) => (
            <div 
              key={report.id}
              className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border ${
                index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900">
                    {index + 1}. {report.name}
                  </span>
                  {uploadStatus[report.id] === 'success' && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" title="Upload successful" />
                      <span className="text-xs text-green-600 font-medium">
                        {formatTimestampEST(uploadTimestamps[report.id])}
                      </span>
                    </div>
                  )}
                  {uploadStatus[report.id] === 'failed' && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full" title="Upload failed" />
                      <span className="text-xs text-red-600 font-medium">
                        {formatTimestampEST(uploadTimestamps[report.id])}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">– {report.format}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 min-w-fit">
                <div className="relative">
                  <Input
                    type="file"
                    accept={report.id === 'adp' ? '.csv' : '.pdf'}
                    data-report-id={report.id}
                    onChange={(e) => handleFileSelect(report.id, e)}
                    className="w-full sm:w-48"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleUpload(report.id)}
                    className="flex-1 sm:flex-none"
                    disabled={!selectedFiles[report.id]}
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Upload
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleManual(report.id)}
                    className="flex-1 sm:flex-none"
                  >
                    Manual
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAuditTrail(report.id)}
                    className="p-2"
                    title="Audit Trail"
                  >
                    <History className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      {selectedReportForManual && (
        <ManualEntryDialog
          open={manualDialogOpen}
          onOpenChange={setManualDialogOpen}
          reportName={reportItems.find(r => r.id === selectedReportForManual)?.name || ''}
          reportStatus={uploadStatus[selectedReportForManual]}
          uploadTimestamp={uploadTimestamps[selectedReportForManual]}
        />
      )}
      
      {selectedReportForAudit && (
        <AuditTrailDialog
          open={auditTrailDialogOpen}
          onOpenChange={setAuditTrailDialogOpen}
          reportName={reportItems.find(r => r.id === selectedReportForAudit)?.name || ''}
          reportId={selectedReportForAudit}
        />
      )}
    </Card>
  );
};

export default UploadReportsSection;