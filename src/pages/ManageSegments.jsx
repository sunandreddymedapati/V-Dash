import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Edit, Power, Trash2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PROPERTIES_DATA } from '@/constants/properties';
import DualListbox from '@/components/DualListbox';

const ManageSegments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalSegmentName, setOriginalSegmentName] = useState('');
  const [newSegmentName, setNewSegmentName] = useState('');
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [customSegments, setCustomSegments] = useState([]);
  const [disabledSegments, setDisabledSegments] = useState(new Set());
  const [viewPropertiesDialog, setViewPropertiesDialog] = useState({
    open: false,
    segment: null
  });
  const [removePropertyDialog, setRemovePropertyDialog] = useState({
    open: false,
    segmentName: '',
    propertyName: ''
  });
  const { toast } = useToast();

  const segments = [{
    name: 'Visions Hotels East',
    properties: PROPERTIES_DATA
      .filter(p =>
        ['Albany', 'Poughkeepsie', 'Fishkill', 'Syracuse', 'Utica', 'Rome', 'New Hartford'].includes(p.city) ||
        ['Wallingford', 'Tewksbury', 'Amesbury'].includes(p.city)
      )
      .map(p => p.name)
  }, {
    name: 'Visions Hotels West',
    properties: PROPERTIES_DATA
      .filter(p =>
        ['Buffalo', 'Rochester', 'Watertown', 'Potsdam', 'Canton', 'East Aurora', 'Oswego'].includes(p.city) ||
        ['Erie', 'Pittsburgh', 'Belle Vernon'].includes(p.city)
      )
      .map(p => p.name)
  }, {
    name: 'Greater Rochester',
    properties: PROPERTIES_DATA
      .filter(p => p.city === 'Rochester' || p.city === 'Canandaigua' || p.city === 'Auburn')
      .map(p => p.name)
  }, {
    name: 'Southern Tier',
    properties: PROPERTIES_DATA
      .filter(p =>
        ['Binghamton', 'Elmira', 'Corning', 'Olean', 'Cortland'].includes(p.city) ||
        ['Sayre'].includes(p.city)
      )
      .map(p => p.name)
  }, {
    name: 'Best Western',
    properties: PROPERTIES_DATA
      .filter(p => p.chain === 'Best Western')
      .map(p => p.name)
  }, ];

  const allSegments = [
    ...segments.filter(seg => !customSegments.some(custom => custom.name === `__REMOVED__${seg.name}`)),
    ...customSegments.filter(seg => !seg.name.startsWith('__REMOVED__'))
  ];

  const handlePropertyToggle = (selectedProperties) => {
    setSelectedProperties(selectedProperties);
  };

  const handleAddSegment = () => {
    if (!newSegmentName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a segment name",
        variant: "destructive",
      });
      return;
    }

    if (selectedProperties.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one property",
        variant: "destructive",
      });
      return;
    }

    const segmentData = {
      name: newSegmentName.trim(),
      properties: selectedProperties
    };

    if (isEditMode) {
      if (originalSegmentName !== newSegmentName.trim()) {
        setCustomSegments(prev => {
          const filtered = prev.filter(seg => seg.name !== originalSegmentName);
          const isDefaultSegment = segments.some(seg => seg.name === originalSegmentName);
          if (isDefaultSegment) {
            return [...filtered, {
              name: `__REMOVED__${originalSegmentName}`,
              properties: []
            }, segmentData];
          }
          return [...filtered, segmentData];
        });
      } else {
        setCustomSegments(prev => {
          const existingIndex = prev.findIndex(seg => seg.name === originalSegmentName);
          if (existingIndex !== -1) {
            const updated = [...prev];
            updated[existingIndex] = segmentData;
            return updated;
          } else {
            return [...prev, segmentData];
          }
        });
      }

      toast({
        title: "Success",
        description: `Segment "${segmentData.name}" has been updated successfully`,
      });
    } else {
      setCustomSegments(prev => [...prev, segmentData]);

      toast({
        title: "Success",
        description: `Segment "${segmentData.name}" has been created successfully`,
      });
    }

    setNewSegmentName('');
    setSelectedProperties([]);
    setIsDialogOpen(false);
    setIsEditMode(false);
    setOriginalSegmentName('');
  };

  const handleEditSegment = (segmentName) => {
    const segmentToEdit = allSegments.find(seg => seg.name === segmentName);
    if (segmentToEdit) {
      setIsEditMode(true);
      setOriginalSegmentName(segmentName);
      setNewSegmentName(segmentToEdit.name);
      setSelectedProperties([...segmentToEdit.properties]);
      setIsDialogOpen(true);
    }
  };

  const handleToggleSegment = (segmentName) => {
    const newDisabled = new Set(disabledSegments);
    if (disabledSegments.has(segmentName)) {
      newDisabled.delete(segmentName);
      toast({
        title: "Segment Enabled",
        description: `Segment "${segmentName}" has been enabled`,
      });
    } else {
      newDisabled.add(segmentName);
      toast({
        title: "Segment Disabled",
        description: `Segment "${segmentName}" has been disabled`,
      });
    }
    setDisabledSegments(newDisabled);
  };

  const handleRemoveSegment = (segmentName) => {
    const isCustomSegment = customSegments.some(seg => seg.name === segmentName);
    if (isCustomSegment) {
      setCustomSegments(prev => prev.filter(seg => seg.name !== segmentName));
    } else {
      setCustomSegments(prev => [...prev, {
        name: `__REMOVED__${segmentName}`,
        properties: []
      }]);
    }

    const newDisabled = new Set(disabledSegments);
    newDisabled.delete(segmentName);
    setDisabledSegments(newDisabled);

    toast({
      title: "Segment Removed",
      description: `Segment "${segmentName}" has been removed`,
    });
  };

  const showPropertiesPopup = (segment) => {
    setViewPropertiesDialog({
      open: true,
      segment
    });
  };

  const confirmRemoveProperty = (segmentName, propertyName) => {
    setRemovePropertyDialog({
      open: true,
      segmentName,
      propertyName
    });
  };

  const handleRemoveProperty = () => {
    const {
      segmentName,
      propertyName
    } = removePropertyDialog;

    const customSegmentIndex = customSegments.findIndex(seg => seg.name === segmentName);
    let newCustomSegments;

    if (customSegmentIndex !== -1) {
      newCustomSegments = [...customSegments];
      newCustomSegments[customSegmentIndex] = {
        ...newCustomSegments[customSegmentIndex],
        properties: newCustomSegments[customSegmentIndex].properties.filter(prop => prop !== propertyName)
      };
    } else {
      const defaultSegment = segments.find(seg => seg.name === segmentName);
      if (defaultSegment) {
        const modifiedSegment = {
          name: segmentName,
          properties: defaultSegment.properties.filter(prop => prop !== propertyName)
        };
        newCustomSegments = [...customSegments, modifiedSegment];
      } else {
        newCustomSegments = customSegments;
      }
    }

    setCustomSegments(newCustomSegments);

    const updatedAllSegments = [
      ...segments.filter(seg => !newCustomSegments.some(custom => custom.name === `__REMOVED__${seg.name}`)),
      ...newCustomSegments.filter(seg => !seg.name.startsWith('__REMOVED__'))
    ];

    const updatedSegment = updatedAllSegments.find(seg => seg.name === segmentName);
    if (updatedSegment && viewPropertiesDialog.open) {
      setViewPropertiesDialog({
        open: true,
        segment: updatedSegment
      });
    }

    toast({
      title: "Property Removed",
      description: `"${propertyName}" has been removed from segment "${segmentName}"`,
    });

    setRemovePropertyDialog({
      open: false,
      segmentName: '',
      propertyName: ''
    });
  };

  const filteredSegments = allSegments.filter(segment =>
    segment.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Segments</h1>
          <p className="text-muted-foreground">
            View and manage property segments across your portfolio
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setIsEditMode(false);
            setOriginalSegmentName('');
            setNewSegmentName('');
            setSelectedProperties([]);
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setIsEditMode(false);
              setOriginalSegmentName('');
            }}>
              <Plus className="h-4 w-4 mr-2" />
              New Segment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Edit Segment' : 'Create New Segment'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="segmentName">Segment Name</Label>
                <Input
                  id="segmentName"
                  placeholder="Enter segment name"
                  value={newSegmentName}
                  onChange={(e) => setNewSegmentName(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Property Selection</Label>
                <DualListbox
                  availableItems={PROPERTIES_DATA.map(p => p.name)}
                  selectedItems={selectedProperties}
                  onSelectionChange={handlePropertyToggle}
                  availableTitle="Available Properties"
                  selectedTitle="Selected Properties"
                />
                <p className="text-sm text-muted-foreground">
                  {selectedProperties.length} of {PROPERTIES_DATA.length} properties selected
                </p>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setIsEditMode(false);
                    setOriginalSegmentName('');
                    setNewSegmentName('');
                    setSelectedProperties([]);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddSegment}>
                  {isEditMode ? 'Update Segment' : 'Create Segment'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{allSegments.length}</div>
            <p className="text-xs text-muted-foreground">Total Segments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{PROPERTIES_DATA.length}</div>
            <p className="text-xs text-muted-foreground">Total Properties</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {Math.round(PROPERTIES_DATA.length / (allSegments.length - 1))}
            </div>
            <p className="text-xs text-muted-foreground">Avg Properties per Segment</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search segments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Segment Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Segment Name</TableHead>
                <TableHead>Property Count</TableHead>
                <TableHead>Properties</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSegments.map((segment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col gap-1">
                      <div
                        className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer hover:underline transition-colors"
                        onClick={() => handleEditSegment(segment.name)}
                      >
                        {segment.name}
                      </div>
                      <Badge
                        variant={disabledSegments.has(segment.name) ? "destructive" : "default"}
                        className={`w-fit text-xs ${disabledSegments.has(segment.name) ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                      >
                        {disabledSegments.has(segment.name) ? 'Disabled' : 'Enabled'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-accent/80"
                      onClick={() => showPropertiesPopup(segment)}
                    >
                      {segment.properties.length} {segment.properties.length === 1 ? 'Property' : 'Properties'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {segment.properties
                        .slice(0, 5)
                        .map((property, propIndex) => (
                          <div key={propIndex} className="text-sm text-muted-foreground">
                            {property}
                          </div>
                        ))}
                      {segment.properties.length > 5 && (
                        <div
                          className="text-sm text-muted-foreground font-medium cursor-pointer hover:text-primary"
                          onClick={() => showPropertiesPopup(segment)}
                        >
                          +{segment.properties.length - 5} more properties
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditSegment(segment.name)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Segment
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleSegment(segment.name)}>
                          <Power className="mr-2 h-4 w-4" />
                          {disabledSegments.has(segment.name) ? 'Enable' : 'Disable'} Segment
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleRemoveSegment(segment.name)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Segment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={viewPropertiesDialog.open}
        onOpenChange={(open) => setViewPropertiesDialog({
          open,
          segment: null
        })}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Properties in "{viewPropertiesDialog.segment?.name}"
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Total: {viewPropertiesDialog.segment?.properties.length} properties
            </div>
            <div className="grid gap-2">
              {viewPropertiesDialog.segment?.properties.map((property, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg bg-muted/30 text-sm"
                >
                  <span>{property}</span>
                  <button
                    onClick={() => confirmRemoveProperty(viewPropertiesDialog.segment.name, property)}
                    className="flex-shrink-0 p-1 rounded-full hover:bg-red-100 transition-colors"
                    aria-label="Remove property"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={removePropertyDialog.open}
        onOpenChange={(open) => !open && setRemovePropertyDialog({
          open: false,
          segmentName: '',
          propertyName: ''
        })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove "{removePropertyDialog.propertyName}" from the segment "{removePropertyDialog.segmentName}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveProperty}
              className="bg-red-500 hover:bg-red-600"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageSegments;