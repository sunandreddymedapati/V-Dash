import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SegmentDialog from './SegmentDialog';

const SegmentSelector = ({
  selectedSegment,
  setSelectedSegment,
  segments,
  onSegmentUpdate,
  showLabel = true,
  showAddButton = true
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSegmentSave = (newSegment) => {
    if (onSegmentUpdate) {
      const existingIndex = segments.findIndex(s => s.value === newSegment.value);
      let updatedSegments;
      
      if (existingIndex >= 0) {
        // Update existing segment
        updatedSegments = segments.map(s => 
          s.value === newSegment.value ? newSegment : s
        );
      } else {
        // Add new segment
        updatedSegments = [...segments, newSegment];
      }
      
      onSegmentUpdate(updatedSegments);
      console.log('Segment saved:', newSegment);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        {showLabel && <label className="text-sm font-medium text-gray-700">Segment:</label>}
        <div className="flex items-center space-x-2">
          <Select value={selectedSegment} onValueChange={setSelectedSegment}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a segment" />
            </SelectTrigger>
            <SelectContent>
              {segments.map((segment) => (
                <SelectItem key={segment.value} value={segment.value}>
                  {segment.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {showAddButton && (
            <Button
              variant="outline"
              size="sm"
              className="h-10 w-10 p-0 flex-shrink-0"
              onClick={() => setDialogOpen(true)}
              disabled={true} // Temp
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {showAddButton && (
        <SegmentDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          segments={segments}
          onSave={handleSegmentSave}
        />
      )}
    </>
  );
};

export default SegmentSelector;
