import React from 'react';
import { Label } from '@/components/ui/label';

const SegmentModeSelector = ({ mode, onModeChange }) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Select Action</Label>
      <div className="flex space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="mode"
            value="add"
            checked={mode === 'add'}
            onChange={(e) => onModeChange(e.target.value)}
            className="h-4 w-4"
          />
          <span className="text-sm">Add New Segment</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="mode"
            value="modify"
            checked={mode === 'modify'}
            onChange={(e) => onModeChange(e.target.value)}
            className="h-4 w-4"
          />
          <span className="text-sm">Modify Existing Segment</span>
        </label>
      </div>
    </div>
  );
};

export default SegmentModeSelector;
