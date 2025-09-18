import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Phone,
  Search,
  Building,
  ArrowLeft,
  Edit,
  UserX,
  UserCheck,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import PROPERTIES from '@/constants/properties';
import { PROPERTIES_DATA } from '@/constants/properties';
import { format } from 'date-fns';
import EditUserDialog from '@/components/EditUserDialog';
import EditAccessDialog from '@/components/EditAccessDialog';
import AssignPropertiesDialog from '@/components/AssignPropertiesDialog';

const ManageUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const routeUser = location?.state?.user;
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showEditAccessDialog, setShowEditAccessDialog] = useState(false);
  const [selectedPropertyForAccess, setSelectedPropertyForAccess] = useState(null);
  const [expandedProperties, setExpandedProperties] = useState(new Set());
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [propertyToRemove, setPropertyToRemove] = useState(null);
  const [showAssignPropertiesDialog, setShowAssignPropertiesDialog] = useState(false);

  const [userData, setUserData] = useState(() => {
    const storedUsers = localStorage.getItem('managedUsers');
    if (storedUsers && userId) {
      const users = JSON.parse(storedUsers);
      const storedUser = users.find((u) => u.id === userId);
      if (storedUser) {
        const initials = `${storedUser.firstName?.charAt(0) || ''}${storedUser.lastName?.charAt(0) || ''}`.toUpperCase();
        return {
          id: storedUser.id,
          firstName: storedUser.firstName,
          lastName: storedUser.lastName,
          name: `${storedUser.firstName} ${storedUser.lastName}`,
          initials: initials || 'NA',
          email: storedUser.email || '',
          phone: storedUser.phone || '',
          designation: storedUser.designation || 'User',
          role: storedUser.role || 'Viewer',
          status: storedUser.status || 'Active',
          inviteStatus: storedUser.inviteStatus || null,
          createdDate: storedUser.createdDate || new Date().toISOString().split('T')[0],
          lastLogin: storedUser.lastLogin || 'Never',
          assignedProperties: storedUser.assignedProperties || []
        };
      }
    }

    const u = routeUser;
    if (u) {
      const initials = `${u.firstName?.charAt(0) || ''}${u.lastName?.charAt(0) || ''}`.toUpperCase();
      return {
        id: userId || u.id || '1',
        firstName: u.firstName,
        lastName: u.lastName,
        name: `${u.firstName} ${u.lastName}`,
        initials: initials || 'NA',
        email: u.email || '',
        phone: u.phone || '',
        designation: u.designation || 'User',
        role: u.role || 'Viewer',
        status: u.status || 'Active',
        inviteStatus: u.inviteStatus || null,
        createdDate: u.createdDate || new Date().toISOString().split('T')[0],
        lastLogin: u.lastLogin || 'Never',
        assignedProperties: u.assignedProperties || []
      };
    }
    return {
      id: userId || '1',
      firstName: 'Jason',
      lastName: "D'Agostino",
      name: "Jason D'Agostino",
      initials: 'JD',
      email: 'jason.dagostino@company.com',
      phone: '+1 555-123-4567',
      designation: 'Corporate Director',
      role: 'Administrator',
      status: 'Active',
      inviteStatus: null,
      createdDate: '2024-01-15',
      lastLogin: '2024-12-19',
      assignedProperties: [PROPERTIES[0], PROPERTIES[1], PROPERTIES[2]]
    };
  });

  const [userProperties, setUserProperties] = useState(() => {
    if (userData.assignedProperties && userData.assignedProperties.length > 0) {
      return userData.assignedProperties.map((propName, i) => {
        const p = PROPERTIES_DATA.find(pp => pp.name === propName);
        return {
          name: propName,
          id: `${10000 + i}`,
          role: userData.role,
          location: p ? `${p.city}, ${p.state}, USA` : 'Location TBD',
          pages: ["Dashboard", "Revenue", "Forecasting"],
          disabled: false
        };
      });
    }
    return [
      {
        name: PROPERTIES[0],
        id: "12443",
        role: "Administrator",
        location: "Fishkill, NY, USA",
        pages: ["Dashboard", "Revenue", "Forecasting", "Budgeting", "Labor Analytics", "Accounting", "Reports"],
        disabled: false
      },
      {
        name: PROPERTIES[1],
        id: "1113157",
        role: "Administrator",
        location: "Olean, NY, USA",
        pages: ["Dashboard", "Revenue", "Forecasting", "Budgeting", "Labor Analytics", "Reports"],
        disabled: false
      },
      {
        name: PROPERTIES[2],
        id: "10949",
        role: "Administrator",
        location: "Watertown, NY, USA",
        pages: ["Dashboard", "Revenue", "Forecasting", "Labor Analytics"],
        disabled: false
      }
    ];
  });

  const filteredProperties = userProperties.filter(property =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.id.includes(searchQuery)
  );

  const handleEditUser = () => {
    setShowEditDialog(true);
  };

  const handleSaveUser = (updatedData) => {
    setUserData(prev => ({
      ...prev,
      ...updatedData,
      name: `${updatedData.firstName} ${updatedData.lastName}`,
      initials: `${updatedData.firstName.charAt(0)}${updatedData.lastName.charAt(0)}`
    }));
  };

  const handleToggleStatus = () => {
    const updatedData = {
      ...userData,
      status: userData.status === 'Active' ? 'Inactive' : 'Active'
    };
    setUserData(updatedData);

    const storedUsers = localStorage.getItem('managedUsers');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const updatedUsers = users.map((u) =>
        u.id === userData.id ? updatedData : u
      );
      localStorage.setItem('managedUsers', JSON.stringify(updatedUsers));
    }
  };

  const handleAcceptInvite = () => {
    const updatedData = {
      ...userData,
      inviteStatus: null,
      lastLogin: format(new Date(), 'yyyy-MM-dd')
    };
    setUserData(updatedData);

    const storedUsers = localStorage.getItem('managedUsers');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const updatedUsers = users.map((u) =>
        u.id === userData.id ? updatedData : u
      );
      localStorage.setItem('managedUsers', JSON.stringify(updatedUsers));
    }
  };

  const handleDeleteUser = () => {
    console.log('Delete user');
  };

  const handleEditAccess = (property) => {
    setSelectedPropertyForAccess(property);
    setShowEditAccessDialog(true);
  };

  const handleSaveAccess = (selectedPages) => {
    if (selectedPropertyForAccess) {
      setUserProperties(prevProperties =>
        prevProperties.map(property =>
          property.id === selectedPropertyForAccess.id
            ? { ...property, pages: selectedPages }
            : property
        )
      );

      setSelectedPropertyForAccess(prev => ({ ...prev, pages: selectedPages }));

      console.log('Updated access for', selectedPropertyForAccess.name, 'with pages:', selectedPages);
    }
  };

  const togglePropertyExpansion = (propertyId) => {
    setExpandedProperties(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(propertyId)) {
        newExpanded.delete(propertyId);
      } else {
        newExpanded.add(propertyId);
      }
      return newExpanded;
    });
  };

  const handleTogglePropertyAccess = (property) => {
    setUserProperties(prevProperties =>
      prevProperties.map(prop =>
        prop.id === property.id
          ? { ...prop, disabled: !prop.disabled }
          : prop
      )
    );
    console.log(`${property.disabled ? 'Enabled' : 'Disabled'} access for ${property.name}`);
  };

  const handleRemoveProperty = (property) => {
    setPropertyToRemove(property);
    setShowRemoveDialog(true);
  };

  const confirmRemoveProperty = () => {
    if (propertyToRemove) {
      setUserProperties(prevProperties =>
        prevProperties.filter(prop => prop.id !== propertyToRemove.id)
      );
      console.log('Permanently removed property:', propertyToRemove.name);
      setPropertyToRemove(null);
      setShowRemoveDialog(false);
    }
  };

  const handleAssignProperties = () => {
    setShowAssignPropertiesDialog(true);
  };

  const handleSavePropertyAssignments = (selectedProperties) => {
    const newUserProperties = selectedProperties.map((propertyName, index) => {
      const existingProperty = userProperties.find(p => p.name === propertyName);
      if (existingProperty) {
        return existingProperty;
      }

      return {
        name: propertyName,
        id: `${Math.random().toString().slice(2, 8)}`,
        role: "Administrator",
        location: "Location TBD",
        pages: ["Dashboard", "Revenue", "Forecasting"],
        disabled: false
      };
    });

    setUserProperties(newUserProperties);

    setUserData(prev => ({
      ...prev,
      assignedProperties: selectedProperties
    }));

    console.log('Updated property assignments:', selectedProperties);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
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
        <h1 className="text-2xl font-bold text-gray-900">Manage User</h1>
        <p className="text-gray-600 mt-1">View and manage user account information and properties</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-white">{userData.initials}</span>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
                  <p className="text-sm text-gray-500">{userData.designation}</p>
                  <div className="mt-2 flex items-center gap-3">
                    {userData.inviteStatus === 'invited' ? (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Invited
                      </Badge>
                    ) : (
                      <Badge
                        variant={userData.status === 'Active' ? 'default' : 'secondary'}
                        className={userData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      >
                        {userData.status}
                      </Badge>
                    )}
                    <Badge variant="outline">
                      {userData.role}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditUser}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {userData.inviteStatus === 'invited' ? (
                        <DropdownMenuItem onClick={handleAcceptInvite}>
                          <UserCheck className="w-4 h-4 mr-2" />
                          Accept Invite
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={handleToggleStatus}>
                          {userData.status === 'Active' ? (
                            <>
                              <UserX className="w-4 h-4 mr-2" />
                              Disable User
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-4 h-4 mr-2" />
                              Enable User
                            </>
                          )}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={handleDeleteUser}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-blue-600">{userData.email}</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{userData.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Assigned Properties ({userProperties.length})</h3>
            <Button size="sm" onClick={handleAssignProperties}>
              Assign Properties
            </Button>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by property name, ID, or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-1">
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-gray-500 border-b">
              <div className="col-span-10">Property</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {filteredProperties.map((property) => (
              <div key={property.id} className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors rounded-lg">
                <div className="col-span-10 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {property.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {property.id}
                    </div>
                    <div className="text-sm text-gray-500">
                      {property.location}
                    </div>
                  </div>
                </div>

                <div className="col-span-2 flex items-center justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleTogglePropertyAccess(property)}>
                        {property.disabled ? (
                          <>
                            <UserCheck className="w-4 h-4 mr-2" />
                            Enable Access
                          </>
                        ) : (
                          <>
                            <UserX className="w-4 h-4 mr-2" />
                            Disable Access
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleRemoveProperty(property)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Property
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No properties found matching your search.
            </div>
          )}
        </CardContent>
      </Card>

      <EditUserDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        userData={userData}
        onSave={handleSaveUser}
      />
      <EditAccessDialog
        open={showEditAccessDialog}
        onOpenChange={setShowEditAccessDialog}
        propertyName={selectedPropertyForAccess?.name || ''}
        currentAccess={selectedPropertyForAccess?.pages || []}
        onSave={handleSaveAccess}
      />

      <AssignPropertiesDialog
        open={showAssignPropertiesDialog}
        onOpenChange={setShowAssignPropertiesDialog}
        currentlyAssigned={userProperties.map(p => p.name)}
        onSave={handleSavePropertyAssignments}
      />

      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Property Access</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently remove access to "{propertyToRemove?.name}"?
              This action cannot be undone and the user will lose all access to this property.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemoveProperty}
              className="bg-red-600 hover:bg-red-700"
            >
              Remove Property
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageUser;