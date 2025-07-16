import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SegmentModeSelector from './SegmentModeSelector';
import SegmentFormFields from './SegmentFormFields';
import SegmentDialogActions from './SegmentDialogActions';
import PROPERTIES from '../constants/properties';

const SegmentDialog = ({
  open,
  onOpenChange,
  segments,
  onSave,
  editingSegment
}) => {
  const [mode, setMode] = useState('add');
  const [selectedSegment, setSelectedSegment] = useState('');
  const [segmentName, setSegmentName] = useState('');
  const [selectedProperties, setSelectedProperties] = useState([]);

  useEffect(() => {
    if (editingSegment) {
      setMode('modify');
      setSelectedSegment(editingSegment.value);
      setSegmentName(editingSegment.label);
      setSelectedProperties(editingSegment.properties || []);
    } else {
      setMode('add');
      setSelectedSegment('');
      setSegmentName('');
      setSelectedProperties([]);
    }
  }, [editingSegment, open]);

  const handleSave = () => {
    if (mode === 'add' && !segmentName.trim()) return;
    if (mode === 'modify' && !selectedSegment) return;

    const segmentValue = mode === 'add' 
      ? segmentName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      : selectedSegment;

    const segmentLabel = mode === 'add' 
      ? segmentName.trim()
      : (segments.find(s => s.value === selectedSegment)?.label || '');

    onSave({
      value: segmentValue,
      label: segmentLabel,
      properties: selectedProperties
    });

    // Reset form
    setSelectedSegment('');
    setSegmentName('');
    setSelectedProperties([]);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedSegment('');
    setSegmentName('');
    setSelectedProperties([]);
    onOpenChange(false);
  };

  const handleSegmentSelect = (value) => {
    setSelectedSegment(value);
    const segment = segments.find(s => s.value === value);
    if (segment) {
      setSegmentName(segment.label);
      setSelectedProperties(segment.properties || []);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Segment Management</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <SegmentModeSelector
            mode={mode}
            onModeChange={setMode}
          />

          <SegmentFormFields
            mode={mode}
            selectedSegment={selectedSegment}
            segmentName={segmentName}
            selectedProperties={selectedProperties}
            segments={segments}
            availableProperties={PROPERTIES}
            onSegmentSelect={handleSegmentSelect}
            onSegmentNameChange={setSegmentName}
            onPropertiesChange={setSelectedProperties}
          />
        </div>

        <SegmentDialogActions
          mode={mode}
          segmentName={segmentName}
          selectedSegment={selectedSegment}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SegmentDialog;
