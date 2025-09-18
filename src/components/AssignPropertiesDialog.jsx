import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { PROPERTIES_DATA } from '@/constants/properties';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AssignPropertiesDialog = ({
  open,
  onOpenChange,
  currentlyAssigned,
  onSave
}) => {
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedChain, setSelectedChain] = useState('all');
  const [selectedSegment, setSelectedSegment] = useState('all');

  useEffect(() => {
    if (open) {
      setSelectedProperties(currentlyAssigned);
    }
  }, [open, currentlyAssigned]);

  const uniqueStates = [...new Set(PROPERTIES_DATA.map(p => p.state))].sort();
  const uniqueChains = [...new Set(PROPERTIES_DATA.map(p => p.chain))].sort();
  const uniqueSegments = [...new Set(PROPERTIES_DATA.map(p => p.segment))].sort();

  const filteredProperties = PROPERTIES_DATA.filter(property => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.chain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.segment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesState = selectedState === 'all' || property.state === selectedState;
    const matchesChain = selectedChain === 'all' || property.chain === selectedChain;
    const matchesSegment = selectedSegment === 'all' || property.segment === selectedSegment;

    return matchesSearch && matchesState && matchesChain && matchesSegment;
  });

  const handlePropertyToggle = (propertyName) => {
    if (currentlyAssigned.includes(propertyName) && selectedProperties.includes(propertyName)) {
      return;
    }

    setSelectedProperties(prev =>
      prev.includes(propertyName)
        ? prev.filter(name => name !== propertyName)
        : [...prev, propertyName]
    );
  };

  const handleSave = () => {
    onSave(selectedProperties);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedProperties(currentlyAssigned);
    setSearchQuery('');
    setSelectedState('all');
    setSelectedChain('all');
    setSelectedSegment('all');
    onOpenChange(false);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedState('all');
    setSelectedChain('all');
    setSelectedSegment('all');
  };

  const handleSelectAll = () => {
    const allPropertyNames = filteredProperties.map(p => p.name);
    setSelectedProperties(allPropertyNames);
  };

  const handleDeselectAll = () => {
    setSelectedProperties(currentlyAssigned);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Assign Properties</DialogTitle>
          <p className="text-sm text-gray-600">
            Select properties to assign to this user ({selectedProperties.length} of {PROPERTIES_DATA.length} selected)
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {uniqueStates.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedChain} onValueChange={setSelectedChain}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Chains</SelectItem>
                {uniqueChains.map((chain) => (
                  <SelectItem key={chain} value={chain}>{chain}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSegment} onValueChange={setSelectedSegment}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Segments</SelectItem>
                {uniqueSegments.map((segment) => (
                  <SelectItem key={segment} value={segment}>{segment}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              disabled={filteredProperties.length === 0}
            >
              Select All ({filteredProperties.length})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeselectAll}
            >
              Deselect All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          </div>

          <ScrollArea className="h-96 border rounded-md">
            <div className="p-4 space-y-3">
              {filteredProperties.map((property) => {
                const isCurrentlyAssigned = currentlyAssigned.includes(property.name);
                return (
                  <div key={property.name} className={`flex items-center space-x-3 p-2 rounded-md ${isCurrentlyAssigned ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    <Checkbox
                      id={`property-${property.name}`}
                      checked={selectedProperties.includes(property.name)}
                      onCheckedChange={() => handlePropertyToggle(property.name)}
                      disabled={isCurrentlyAssigned}
                    />
                    <Label
                      htmlFor={`property-${property.name}`}
                      className={`text-sm font-normal flex-1 ${
                        isCurrentlyAssigned
                          ? 'text-blue-700 cursor-default'
                          : 'text-gray-700 cursor-pointer'
                      }`}
                    >
                      <div>
                        <div className="font-medium">
                          {property.name}
                          {isCurrentlyAssigned && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                              Currently Assigned
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{property.city}, {property.state} • {property.rooms} rooms</div>
                        <div className="text-xs text-gray-400">{property.chain} • {property.segment}</div>
                      </div>
                    </Label>
                  </div>
                );
              })}

              {filteredProperties.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No properties found matching your search.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className="flex gap-2 pt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignPropertiesDialog;