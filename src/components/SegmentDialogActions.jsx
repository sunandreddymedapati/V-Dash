import React from 'react';
import { Button } from '@/components/ui/button';

const SegmentDialogActions = ({
  mode,
  segmentName,
  selectedSegment,
  onSave,
  onCancel
}) => {
  const isDisabled = (mode === 'add' && !segmentName.trim()) || (mode === 'modify' && !selectedSegment);

  return (
    <div className="flex justify-end space-x-2 pt-4 border-t">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button 
        onClick={onSave}
        disabled={isDisabled}
      >
        {mode === 'add' ? 'Add Segment' : 'Update Segment'}
      </Button>
    </div>
  );
};

export default SegmentDialogActions;
