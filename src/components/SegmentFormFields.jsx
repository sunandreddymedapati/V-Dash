import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DualListbox from './DualListbox';

const SegmentFormFields = ({
  mode,
  selectedSegment,
  segmentName,
  selectedProperties,
  segments,
  availableProperties,
  onSegmentSelect,
  onSegmentNameChange,
  onPropertiesChange
}) => {
  return (
    <>
      {/* Existing Segment Selection (only for modify mode) */}
      {mode === 'modify' && (
        <div className="space-y-2">
          <Label htmlFor="existing-segment">Select Existing Segment</Label>
          <Select value={selectedSegment} onValueChange={onSegmentSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a segment to modify" />
            </SelectTrigger>
            <SelectContent>
              {segments.map((segment) => (
                <SelectItem key={segment.value} value={segment.value}>
                  {segment.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Segment Name (only for add mode) */}
      {mode === 'add' && (
        <div className="space-y-2">
          <Label htmlFor="segment-name">New Segment Name</Label>
          <Input
            id="segment-name"
            value={segmentName}
            onChange={(e) => onSegmentNameChange(e.target.value)}
            placeholder="Enter segment name"
          />
        </div>
      )}

      {/* Property Selection */}
      <div className="space-y-2">
        <Label>Property Selection</Label>
        <DualListbox
          availableItems={availableProperties}
          selectedItems={selectedProperties}
          onSelectionChange={onPropertiesChange}
          availableTitle="Available Properties"
          selectedTitle="Selected Properties"
        />
      </div>
    </>
  );
};

export default SegmentFormFields;
