import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Calendar, FileUp, Edit, RotateCcw } from 'lucide-react';

const generateMockAuditTrail = (reportId) => {
  const users = ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Chen'];
  const actions = ['upload', 'reupload', 'manual_entry', 'form_change'];
  
  const entries = [];
  const numEntries = Math.floor(Math.random() * 6) + 2;
  
  for (let i = 0; i < numEntries; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    
    const timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - daysAgo);
    timestamp.setHours(timestamp.getHours() - hoursAgo);
    timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);
    
    const userName = users[Math.floor(Math.random() * users.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    
    let details = '';
    switch (action) {
      case 'upload':
        details = `Uploaded new ${reportId}.pdf`;
        break;
      case 'reupload':
        details = `Re-uploaded ${reportId}.pdf (replaced previous version)`;
        break;
      case 'manual_entry':
        details = 'Entered data manually via form';
        break;
      case 'form_change':
        details = 'Modified form data values';
        break;
    }
    
    entries.push({
      id: `${reportId}-${i}`,
      userName,
      action,
      timestamp,
      details
    });
  }
  
  return entries.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const getActionIcon = (action) => {
  switch (action) {
    case 'upload':
      return <FileUp className="w-4 h-4" />;
    case 'reupload':
      return <RotateCcw className="w-4 h-4" />;
    case 'manual_entry':
      return <Edit className="w-4 h-4" />;
    case 'form_change':
      return <Edit className="w-4 h-4" />;
    default:
      return <FileUp className="w-4 h-4" />;
  }
};

const getActionBadgeVariant = (action) => {
  switch (action) {
    case 'upload':
      return 'default';
    case 'reupload':
      return 'secondary';
    case 'manual_entry':
      return 'outline';
    case 'form_change':
      return 'outline';
    default:
      return 'default';
  }
};

const getActionLabel = (action) => {
  switch (action) {
    case 'upload':
      return 'Upload';
    case 'reupload':
      return 'Re-upload';
    case 'manual_entry':
      return 'Manual Entry';
    case 'form_change':
      return 'Form Change';
    default:
      return 'Unknown';
  }
};

const formatTimestamp = (date) => {
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

const AuditTrailDialog = ({
  open,
  onOpenChange,
  reportName,
  reportId
}) => {
  const [auditTrail] = React.useState(() => generateMockAuditTrail(reportId));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Audit Trail - {reportName}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4">
            {auditTrail.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No audit trail entries found for this report.
              </div>
            ) : (
              auditTrail.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex gap-4 p-4 rounded-lg border ${
                    index === 0 ? 'bg-blue-50/50 border-blue-200' : 'bg-gray-50/50'
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                      {getActionIcon(entry.action)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getActionBadgeVariant(entry.action)}>
                        {getActionLabel(entry.action)}
                      </Badge>
                      {index === 0 && (
                        <Badge variant="secondary" className="text-xs">
                          Latest
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">
                        {entry.userName}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {formatTimestamp(entry.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700">
                      {entry.details}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AuditTrailDialog;