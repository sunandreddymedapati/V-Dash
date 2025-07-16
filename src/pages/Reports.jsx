import React, { useState } from 'react';
import { Calendar, Eye, Download, RefreshCcw, Mail, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

function Reports() {
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());
  const [showReprocessDialog, setShowReprocessDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState('');

  // Sample data - this would come from props/API
  const recentReports = [
    {
      id: '1',
      uploadDateTime: '05/30/2025 02:46 AM',
      reportName: "Manager's Report in PDF format",
      fileName: 'mgr (4).pdf',
      status: 'uploaded'
    },
    {
      id: '2',
      uploadDateTime: '05/30/2025 01:15 AM',
      reportName: 'Transaction Summary Report',
      fileName: 'transaction_summary.pdf',
      status: 'uploaded'
    },
    {
      id: '3',
      uploadDateTime: '05/29/2025 11:58 PM',
      reportName: 'Occupancy Forecast Report',
      fileName: 'occupancy_forecast.pdf',
      status: 'failed'
    }
  ];

  const standardReports = [
    { name: 'Revenue by Rate Plan – PDF Format', status: 'not_uploaded' },
    { name: 'Daily Operations Summary', status: 'not_uploaded' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploaded':
        return 'text-green-600 bg-green-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      case 'not_uploaded':
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploaded':
        return '✅';
      case 'failed':
        return '❌';
      case 'not_uploaded':
      default:
        return '⚠️';
    }
  };

  const handleReprocess = (reportName) => {
    setSelectedReport(reportName);
    setShowReprocessDialog(true);
  };

  const confirmReprocess = () => {
    console.log('Reprocessing report:', selectedReport);
    setShowReprocessDialog(false);
    setSelectedReport('');
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Reports (Grand Plaza Hotel – GPL)
        </h1>
        <p className="text-gray-600">For {selectedDate}</p>
        
        <div className="flex items-center space-x-2 mt-4">
          <Calendar className="w-4 h-4 text-gray-500" />
          <Input
            type="date"
            value={new Date().toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value).toLocaleDateString())}
            className="w-48"
          />
        </div>
      </div>

      {/* Recent Reports Table */}
      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Upload Date/Time (MST)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Report Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">File Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Re-Process</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">{report.uploadDateTime}</td>
                    <td className="py-3 px-4 text-gray-900">{report.reportName}</td>
                    <td className="py-3 px-4 text-gray-600 font-mono text-xs">{report.fileName}</td>
                    <td className="py-3 px-4">
                      <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor(report.status))}>
                        {getStatusIcon(report.status)} {report.status === 'uploaded' ? 'Uploaded' : report.status === 'failed' ? 'Upload Failed' : 'Not Uploaded'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-8 w-8"
                          title="View Report"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-8 w-8"
                          title="Download Report"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-8 w-8"
                        title="Re-Process Report"
                        onClick={() => handleReprocess(report.reportName)}
                      >
                        <RefreshCcw className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Standard Reports */}
      {standardReports.length > 0 && (
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Standard Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {standardReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">{report.name}</span>
                  <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor(report.status))}>
                    <AlertCircle className="w-3 h-3 inline mr-1" />
                    Not Uploaded
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compliance Reports Support */}
      <Card className="rounded-xl shadow-sm">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              If you want to have additional compliance report support, please reach out to the Support team.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Re-Process Dialog */}
      <Dialog open={showReprocessDialog} onOpenChange={setShowReprocessDialog}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Re-Process Report</DialogTitle>
            <DialogDescription>
              Are you sure you want to re-process "{selectedReport}"? This will reanalyze the uploaded file.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReprocessDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmReprocess} className="bg-blue-600 hover:bg-blue-700">
              Re-Process
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Reports;
