import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, ArrowLeft, Mail, User, Plus } from 'lucide-react';
import { PROPERTIES_DATA } from '@/constants/properties';
import { useToast } from '@/hooks/use-toast';

const InviteUser = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    designation: '',
    role: '',
    assignedProperties: []
  });

  const [propertySearchQuery, setPropertySearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedChain, setSelectedChain] = useState('all');
  const [selectedSegment, setSelectedSegment] = useState('all');

  const uniqueStates = [...new Set(PROPERTIES_DATA.map(p => p.state))].sort();
  const uniqueChains = [...new Set(PROPERTIES_DATA.map(p => p.chain))].sort();
  const uniqueSegments = [...new Set(PROPERTIES_DATA.map(p => p.segment))].sort();

  const filteredPropertiesForDialog = PROPERTIES_DATA.filter(property => {
    const matchesSearch =
      property.name.toLowerCase().includes(propertySearchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(propertySearchQuery.toLowerCase()) ||
      property.state.toLowerCase().includes(propertySearchQuery.toLowerCase()) ||
      property.chain.toLowerCase().includes(propertySearchQuery.toLowerCase()) ||
      property.segment.toLowerCase().includes(propertySearchQuery.toLowerCase());

    const matchesState = selectedState === 'all' || property.state === selectedState;
    const matchesChain = selectedChain === 'all' || property.chain === selectedChain;
    const matchesSegment = selectedSegment === 'all' || property.segment === selectedSegment;

    return matchesSearch && matchesState && matchesChain && matchesSegment;
  });

  const handlePropertyToggle = (propertyName, checked) => {
    setNewUser(prev => ({
      ...prev,
      assignedProperties: checked
        ? [...prev.assignedProperties, propertyName]
        : prev.assignedProperties.filter(p => p !== propertyName)
    }));
  };

  const handleClearPropertyFilters = () => {
    setPropertySearchQuery('');
    setSelectedState('all');
    setSelectedChain('all');
    setSelectedSegment('all');
  };

  const handleSelectAllFilteredProperties = () => {
    const allPropertyNames = filteredPropertiesForDialog.map(p => p.name);
    setNewUser(prev => ({
      ...prev,
      assignedProperties: [...new Set([...prev.assignedProperties, ...allPropertyNames])]
    }));
  };

  const handleInviteUser = () => {
    if (newUser.firstName && newUser.lastName && newUser.email && newUser.designation && newUser.role) {
      const invitedUser = {
        id: Date.now().toString(),
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        designation: newUser.designation,
        role: newUser.role,
        status: 'Active',
        inviteStatus: 'invited',
        createdDate: new Date().toISOString().split('T')[0],
        lastLogin: 'Never',
        assignedProperties: newUser.assignedProperties,
      };

      const existingUsers = JSON.parse(localStorage.getItem('managedUsers') || '[]');
      const updatedUsers = [...existingUsers, invitedUser];
      localStorage.setItem('managedUsers', JSON.stringify(updatedUsers));

      toast({
        title: "Invitation Sent",
        description: `Invitation email sent to ${newUser.email}`,
      });

      navigate('/manage-users');
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/manage-users')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Manage Users
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invite New User</h1>
            <p className="text-gray-600">Send an invitation to join the platform</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name *</Label>
                  <Input
                    value={newUser.firstName}
                    onChange={(e) => setNewUser(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Enter first name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Last Name *</Label>
                  <Input
                    value={newUser.lastName}
                    onChange={(e) => setNewUser(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email Address *</Label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  value={newUser.phone}
                  onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="space-y-2">
                <Label>Designation *</Label>
                <Select
                  value={newUser.designation}
                  onValueChange={(value) => setNewUser(prev => ({ ...prev, designation: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Corporate Director">Corporate Director</SelectItem>
                    <SelectItem value="General Manager">General Manager</SelectItem>
                    <SelectItem value="Revenue Manager">Revenue Manager</SelectItem>
                    <SelectItem value="Property Manager">Property Manager</SelectItem>
                    <SelectItem value="Financial Controller">Financial Controller</SelectItem>
                    <SelectItem value="Operations Manager">Operations Manager</SelectItem>
                    <SelectItem value="Assistant Manager">Assistant Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Role *</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Assign Properties ({newUser.assignedProperties.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search properties..."
                  value={propertySearchQuery}
                  onChange={(e) => setPropertySearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="State" />
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
                    <SelectValue placeholder="Chain" />
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
                    <SelectValue placeholder="Segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Segments</SelectItem>
                    {uniqueSegments.map((segment) => (
                      <SelectItem key={segment} value={segment}>{segment}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 text-xs">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAllFilteredProperties}
                  disabled={filteredPropertiesForDialog.length === 0}
                >
                  Select All ({filteredPropertiesForDialog.length})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearPropertyFilters}
                >
                  Clear Filters
                </Button>
              </div>

              <ScrollArea className="h-80 border rounded-lg">
                <div className="p-3 space-y-2">
                  {filteredPropertiesForDialog.map((property) => (
                    <div key={property.name} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md">
                      <Checkbox
                        id={`new-${property.name}`}
                        checked={newUser.assignedProperties.includes(property.name)}
                        onCheckedChange={(checked) => handlePropertyToggle(property.name, checked)}
                      />
                      <Label htmlFor={`new-${property.name}`} className="text-sm font-normal flex-1 cursor-pointer">
                        <div>
                          <div className="font-medium">{property.name}</div>
                          <div className="text-xs text-gray-500">{property.city}, {property.state} • {property.rooms} rooms</div>
                          <div className="text-xs text-gray-400">{property.chain} • {property.segment}</div>
                        </div>
                      </Label>
                    </div>
                  ))}

                  {filteredPropertiesForDialog.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No properties found matching your criteria.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => navigate('/manage-users')}>
            Cancel
          </Button>
          <Button onClick={handleInviteUser} className="bg-blue-600 hover:bg-blue-700">
            Send Invitation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InviteUser;