import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus } from 'lucide-react';

const AddPropertyDialog = ({ onAddProperty }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    propertyId: '',
    propertyName: '',
    streetAddress: '',
    city: '',
    state: '',
    country: 'USA',
    numberOfRooms: '',
    chain: '',
    pmsSystem: '',
    segment: 'Not Assigned',
    status: true,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProperty(formData);
    setFormData({
      propertyId: '',
      propertyName: '',
      streetAddress: '',
      city: '',
      state: '',
      country: 'USA',
      numberOfRooms: '',
      chain: '',
      pmsSystem: '',
      segment: 'Not Assigned',
      status: true,
    });
    setOpen(false);
  };

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const chains = [
    'Best Western', 'Marriott', 'Hilton', 'IHG', 'Independent', 'Hyatt', 'Choice Hotels',
    'Wyndham', 'Radisson', 'Extended Stay America', 'Other'
  ];

  const pmsSystems = [
    'Opera', 'Amadeus', 'Maestro', 'Protel', 'Fidelio', 'RoomMaster', 'Hotelogix', 'eZee',
    'RMS Cloud', 'Cloudbeds', 'Stayntouch', 'ALICE', 'Infor HMS', 'Other'
  ];

  const segments = [
    'Not Assigned', 'Limited Service', 'Full Service', 'Extended Stay', 'Premium', 'Boutique'
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Property
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyId">Property ID</Label>
              <Input
                id="propertyId"
                value={formData.propertyId}
                onChange={(e) => handleInputChange('propertyId', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="chain">Chain</Label>
              <Select value={formData.chain} onValueChange={(value) => handleInputChange('chain', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Chain" />
                </SelectTrigger>
                <SelectContent>
                  {chains.map(chain => (
                    <SelectItem key={chain} value={chain}>{chain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyName">Property Name</Label>
            <Input
              id="propertyName"
              value={formData.propertyName}
              onChange={(e) => handleInputChange('propertyName', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="streetAddress">Street Address</Label>
            <Input
              id="streetAddress"
              value={formData.streetAddress}
              onChange={(e) => handleInputChange('streetAddress', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numberOfRooms">#Rooms</Label>
              <Input
                id="numberOfRooms"
                type="number"
                value={formData.numberOfRooms}
                onChange={(e) => handleInputChange('numberOfRooms', e.target.value)}
                required
                min="1"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="segment">Segment</Label>
              <Select value={formData.segment} onValueChange={(value) => handleInputChange('segment', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Segment" />
                </SelectTrigger>
                <SelectContent>
                  {segments.map(segment => (
                    <SelectItem key={segment} value={segment}>{segment}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="pmsSystem">PMS System</Label>
              <Select value={formData.pmsSystem} onValueChange={(value) => handleInputChange('pmsSystem', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select PMS" />
                </SelectTrigger>
                <SelectContent>
                  {pmsSystems.map(pms => (
                    <SelectItem key={pms} value={pms}>{pms}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="status"
              checked={formData.status}
              onCheckedChange={(checked) => handleInputChange('status', checked)}
            />
            <Label htmlFor="status">
              Status: {formData.status ? 'Enabled' : 'Disabled'}
            </Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Property</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyDialog;