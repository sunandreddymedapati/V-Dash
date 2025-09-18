import React, { useState, useMemo } from 'react';
import { MoreHorizontal, Eye, EyeOff, Trash2, Search, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PROPERTIES_DATA } from '@/constants/properties';
import AddPropertyDialog from '@/components/AddPropertyDialog';
import EditPropertyDialog from '@/components/EditPropertyDialog';

const STATE_ABBREVIATIONS = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
  'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
  'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
  'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
  'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
  'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
  'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
  'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
};

const getStateAbbreviation = (stateName) => {
  return STATE_ABBREVIATIONS[stateName] || stateName;
};

const generatePropertyId = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `VH${timestamp.slice(-6)}${random}`;
};

const ManageProperties = () => {
  const [properties, setProperties] = useState(
    PROPERTIES_DATA.map((property, index) => ({
      ...property,
      id: index + 1,
      propertyId: `VH${(index + 1).toString().padStart(4, '0')}`,
      enabled: true,
    }))
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL_STATES');
  const [chainFilter, setChainFilter] = useState('ALL_CHAINS');

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const togglePropertyStatus = (propertyId) => {
    setProperties(prev =>
      prev.map(property =>
        property.id === propertyId
          ? { ...property, enabled: !property.enabled }
          : property
      )
    );
  };

  const removeProperty = (propertyId) => {
    setProperties(prev => prev.filter(property => property.id !== propertyId));
  };

  const addNewProperty = (propertyData) => {
    const newProperty = {
      id: Math.max(...properties.map(p => p.id)) + 1,
      propertyId: generatePropertyId(),
      name: propertyData.propertyName,
      city: propertyData.city,
      state: propertyData.state,
      rooms: parseInt(propertyData.numberOfRooms),
      chain: propertyData.chain || 'Independent',
      segment: propertyData.segment || 'Not Assigned',
      enabled: propertyData.status,
    };
    setProperties(prev => [...prev, newProperty]);
  };

  const editProperty = (propertyData) => {
    if (!selectedProperty) return;

    setProperties(prev =>
      prev.map(property =>
        property.id === selectedProperty.id
          ? {
              ...property,
              name: propertyData.propertyName,
              city: propertyData.city,
              state: propertyData.state,
              rooms: parseInt(propertyData.numberOfRooms),
              chain: propertyData.chain,
              segment: propertyData.segment,
              enabled: propertyData.status,
            }
          : property
      )
    );
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setEditDialogOpen(true);
  };

  const uniqueStates = useMemo(() =>
    [...new Set(properties.map(p => p.state))]
      .filter((s) => Boolean(s) && s.trim() !== '')
      .sort(),
    [properties]
  );

  const uniqueChains = useMemo(() =>
    [...new Set(properties.map(p => p.chain))]
      .filter((c) => Boolean(c) && c.trim() !== '')
      .sort(),
    [properties]
  );

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = searchTerm === '' ||
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.propertyId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesState = stateFilter === 'ALL_STATES' || property.state === stateFilter;
      const matchesChain = chainFilter === 'ALL_CHAINS' || property.chain === chainFilter;

      return matchesSearch && matchesState && matchesChain;
    });
  }, [properties, searchTerm, stateFilter, chainFilter]);

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Properties</h1>
          <p className="text-gray-600 mt-2">Manage your hotel properties and their settings</p>
        </div>
        <AddPropertyDialog onAddProperty={addNewProperty} />
      </div>

      <div className="mb-6 flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by name or Property ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={stateFilter} onValueChange={setStateFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Filter by State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL_STATES">All States</SelectItem>
            {uniqueStates.map(state => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={chainFilter} onValueChange={setChainFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter by Chain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL_CHAINS">All Chains</SelectItem>
            {uniqueChains.map(chain => (
              <SelectItem key={chain} value={chain}>{chain}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property ID</TableHead>
                <TableHead>Property Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>#Rooms</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.propertyId}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleEditProperty(property)}
                      className="text-left font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors"
                    >
                      {property.name}
                    </button>
                  </TableCell>
                  <TableCell>{property.city}, {getStateAbbreviation(property.state)}</TableCell>
                  <TableCell>{property.rooms}</TableCell>
                  <TableCell>{property.segment}</TableCell>
                  <TableCell>
                    <Badge variant={property.enabled ? "default" : "secondary"}>
                      {property.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem
                            onClick={() => handleEditProperty(property)}
                            className="cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Property
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => togglePropertyStatus(property.id)}
                            className="cursor-pointer"
                          >
                            {property.enabled ? (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Disable Property
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-4 w-4" />
                                Enable Property
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => removeProperty(property.id)}
                            className="cursor-pointer text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Property
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

      <EditPropertyDialog
        property={selectedProperty}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onEditProperty={editProperty}
      />
    </div>
  );
};

export default ManageProperties;