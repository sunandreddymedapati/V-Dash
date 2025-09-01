import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const ManualEntryDialog = ({
  open,
  onOpenChange,
  reportName,
  reportStatus,
  uploadTimestamp,
}) => {
  const { toast } = useToast();
  const [showCancelConfirm, setShowCancelConfirm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    reportDate: new Date(),
    totalRevenue: '',
    roomsOccupied: '',
    averageRate: '',
    occupancyRate: '',
    notes: '',
  });
  const [isDirty, setIsDirty] = React.useState(false);

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

  const getStatusInfo = () => {
    if (reportStatus === 'success') {
      return {
        dot: 'bg-green-500',
        text: 'text-green-600',
        reason: 'Correct Upload',
        timestamp: uploadTimestamp ? formatTimestampEST(uploadTimestamp) : ''
      };
    } else if (reportStatus === 'failed') {
      return {
        dot: 'bg-red-500',
        text: 'text-red-600',
        reason: 'Incorrect Upload',
        timestamp: uploadTimestamp ? formatTimestampEST(uploadTimestamp) : ''
      };
    } else {
      return {
        dot: 'bg-red-500',
        text: 'text-red-600',
        reason: 'Not Uploaded',
        timestamp: ''
      };
    }
  };

  const statusInfo = getStatusInfo();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowCancelConfirm(true);
    } else {
      onOpenChange(false);
      resetForm();
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirm(false);
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      reportDate: new Date(),
      totalRevenue: '',
      roomsOccupied: '',
      averageRate: '',
      occupancyRate: '',
      notes: '',
    });
    setIsDirty(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.totalRevenue || !formData.roomsOccupied || !formData.averageRate || !formData.occupancyRate) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Manual Entry Successful",
      description: `Manual entry for ${reportName} has been saved successfully.`,
    });
    
    onOpenChange(false);
    resetForm();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={onSubmit} className="space-y-6">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>Manual Entry - {reportName}</DialogTitle>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[200px] pl-3 text-left font-normal",
                        !formData.reportDate && "text-muted-foreground"
                      )}
                    >
                      {formData.reportDate ? (
                        format(formData.reportDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.reportDate}
                      onSelect={(date) => handleInputChange('reportDate', date)}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </DialogHeader>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className={`w-3 h-3 ${statusInfo.dot} rounded-full`} />
              <div>
                <span className={`font-medium ${statusInfo.text}`}>
                  {statusInfo.reason}
                </span>
                {statusInfo.timestamp && (
                  <span className={`ml-2 text-sm ${statusInfo.text}`}>
                    {statusInfo.timestamp}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Total Revenue ($)</label>
                <Input
                  placeholder="Enter total revenue"
                  value={formData.totalRevenue}
                  onChange={(e) => handleInputChange('totalRevenue', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rooms Occupied</label>
                <Input
                  placeholder="Enter rooms occupied"
                  value={formData.roomsOccupied}
                  onChange={(e) => handleInputChange('roomsOccupied', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Average Rate ($)</label>
                <Input
                  placeholder="Enter average rate"
                  value={formData.averageRate}
                  onChange={(e) => handleInputChange('averageRate', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Occupancy Rate (%)</label>
                <Input
                  placeholder="Enter occupancy rate"
                  value={formData.occupancyRate}
                  onChange={(e) => handleInputChange('occupancyRate', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
              <Input
                placeholder="Additional notes..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type="submit">
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Cancel</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel? Any unsaved changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowCancelConfirm(false)}>
              Keep Editing
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCancel}>
              Yes, Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ManualEntryDialog;