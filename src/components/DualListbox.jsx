import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-react';

const DualListbox = ({
  availableItems,
  selectedItems,
  onSelectionChange,
  availableTitle = "Available Properties",
  selectedTitle = "Selected Properties"
}) => {
  const [selectedAvailable, setSelectedAvailable] = useState([]);
  const [selectedAssigned, setSelectedAssigned] = useState([]);

  const availableNotSelected = availableItems.filter(item => !selectedItems.includes(item));

  const moveToSelected = () => {
    const newSelected = [...selectedItems, ...selectedAvailable];
    onSelectionChange(newSelected);
    setSelectedAvailable([]);
  };

  const moveToAvailable = () => {
    const newSelected = selectedItems.filter(item => !selectedAssigned.includes(item));
    onSelectionChange(newSelected);
    setSelectedAssigned([]);
  };

  const moveAllToSelected = () => {
    onSelectionChange([...selectedItems, ...availableNotSelected]);
  };

  const moveAllToAvailable = () => {
    onSelectionChange([]);
    setSelectedAssigned([]);
  };

  const handleAvailableSelect = (item, isCtrlPressed) => {
    if (isCtrlPressed) {
      setSelectedAvailable(prev =>
        prev.includes(item)
          ? prev.filter(i => i !== item)
          : [...prev, item]
      );
    } else {
      setSelectedAvailable([item]);
    }
  };

  const handleSelectedSelect = (item, isCtrlPressed) => {
    if (isCtrlPressed) {
      setSelectedAssigned(prev =>
        prev.includes(item)
          ? prev.filter(i => i !== item)
          : [...prev, item]
      );
    } else {
      setSelectedAssigned([item]);
    }
  };

  return (
    <div className="flex gap-4 items-center">
      {/* Available Properties */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">{availableTitle}</label>
        <ScrollArea className="h-40 border rounded-md">
          <div className="p-2">
            {availableNotSelected.map((item) => (
              <div
                key={item}
                className={`p-2 text-sm cursor-pointer rounded hover:bg-accent ${
                  selectedAvailable.includes(item) ? 'bg-accent' : ''
                }`}
                onClick={(e) => handleAvailableSelect(item, e.ctrlKey || e.metaKey)}
              >
                {item}
              </div>
            ))}
            {availableNotSelected.length === 0 && (
              <div className="p-2 text-sm text-muted-foreground text-center">
                No available properties
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={moveToSelected}
          disabled={selectedAvailable.length === 0}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={moveAllToSelected}
          disabled={availableNotSelected.length === 0}
          className="h-8 w-8"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={moveToAvailable}
          disabled={selectedAssigned.length === 0}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={moveAllToAvailable}
          disabled={selectedItems.length === 0}
          className="h-8 w-8"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Selected Properties */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">{selectedTitle}</label>
        <ScrollArea className="h-40 border rounded-md">
          <div className="p-2">
            {selectedItems.map((item) => (
              <div
                key={item}
                className={`p-2 text-sm cursor-pointer rounded hover:bg-accent ${
                  selectedAssigned.includes(item) ? 'bg-accent' : ''
                }`}
                onClick={(e) => handleSelectedSelect(item, e.ctrlKey || e.metaKey)}
              >
                {item}
              </div>
            ))}
            {selectedItems.length === 0 && (
              <div className="p-2 text-sm text-muted-foreground text-center">
                No selected properties
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DualListbox;
