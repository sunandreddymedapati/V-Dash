import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Building,
  User,
  MoreHorizontal,
  UserCheck,
  UserX
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import PROPERTIES from '@/constants/properties';

const ManageUsers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [showAssignPropertiesDialog, setShowAssignPropertiesDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateUserDialog, setShowCreateUserDialog] = useState(false);
  const defaultNewUser = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    designation: '',
    role: 'Staff',
    status: 'Active',
    inviteStatus: null,
    createdDate: format(new Date(), 'yyyy-MM-dd'),
    lastLogin: 'Never',
    assignedProperties: [],
  };
  const [newUser, setNewUser] = useState(defaultNewUser);

  const loadUsers = () => {
    const storedUsers = localStorage.getItem('managedUsers');
    const mockUsers = [
      {
        id: '1',
        firstName: 'Jason',
        lastName: "D'Agostino",
        email: 'jason.dagostino@company.com',
        phone: '+1 555-123-4567',
        designation: 'Corporate Director',
        role: 'Administrator',
        status: 'Active',
        inviteStatus: 'accepted',
        createdDate: '2024-01-15',
        lastLogin: '2024-12-19',
        assignedProperties: [PROPERTIES[0], PROPERTIES[1], PROPERTIES[2]]
      },
      {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@company.com',
        phone: '+1 555-234-5678',
        designation: 'Revenue Manager',
        role: 'Manager',
        status: 'Active',
        inviteStatus: 'accepted',
        createdDate: '2024-02-20',
        lastLogin: '2024-12-18',
        assignedProperties: [PROPERTIES[0], PROPERTIES[3]]
      },
      {
        id: '3',
        firstName: 'Mike',
        lastName: 'Davis',
        email: 'mike.davis@company.com',
        phone: '+1 555-345-6789',
        designation: 'Property Manager',
        role: 'Manager',
        status: 'Inactive',
        inviteStatus: 'accepted',
        createdDate: '2024-01-10',
        lastLogin: '2024-12-15',
        assignedProperties: [PROPERTIES[1]]
      },
      {
        id: '4',
        firstName: 'Emily',
        lastName: 'Chen',
        email: 'emily.chen@company.com',
        phone: '+1 555-456-7890',
        designation: 'Financial Controller',
        role: 'Staff',
        status: 'Active',
        inviteStatus: 'accepted',
        createdDate: '2024-03-05',
        lastLogin: '2024-12-17',
        assignedProperties: [PROPERTIES[2], PROPERTIES[4], PROPERTIES[5]]
      }
    ];

    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      const existingEmails = parsedUsers.map((u) => u.email);
      const filteredMockUsers = mockUsers.filter(u => !existingEmails.includes(u.email));
      return [...parsedUsers, ...filteredMockUsers];
    }
    return mockUsers;
  };

  const [users, setUsers] = useState(loadUsers);

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditUserDialog(true);
  };

  const handleUpdateUser = () => {
    if (selectedUser) {
      setShowEditUserDialog(false);
      setSelectedUser(null);
    }
  };

  const handleToggleUserStatus = (userId) => {
    const updatedUsers = users.map(user =>
      user.id === userId
        ? { ...user, status: (user.status === 'Active' ? 'Inactive' : 'Active') }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('managedUsers', JSON.stringify(updatedUsers));
  };

  const handleAcceptInvite = (userId) => {
    const updatedUsers = users.map(user =>
      user.id === userId
        ? { ...user, inviteStatus: 'accepted', lastLogin: format(new Date(), 'yyyy-MM-dd') }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('managedUsers', JSON.stringify(updatedUsers));
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('managedUsers', JSON.stringify(updatedUsers));
  };

  const handleAssignProperties = (user) => {
    setSelectedUser(user);
    setShowAssignPropertiesDialog(true);
  };

  const handleUpdateProperties = () => {
    if (selectedUser) {
      setShowAssignPropertiesDialog(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-600 mt-1">Invite, edit, and manage user accounts and property assignments</p>
        </div>
        <Button onClick={() => navigate('/invite-user')}>
          <Plus className="w-4 h-4 mr-2" />
          Invite User
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users by name, email, or designation"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>Total Users: {users.length}</span>
              <span>Active: {users.filter(u => u.status === 'Active' && u.inviteStatus !== 'invited').length}</span>
              <span>Inactive: {users.filter(u => u.status === 'Inactive' && u.inviteStatus !== 'invited').length}</span>
              <span>Invited: {users.filter(u => u.inviteStatus === 'invited').length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-gray-500 border-b">
              <div className="col-span-4">User</div>
              <div className="col-span-2">Properties</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Last Login</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {filteredUsers.map((user) => (
              <div key={user.id} className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors rounded-lg">
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div
                      className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
                      onClick={() => navigate(`/manage-user/${user.id}`, { state: { user } })}
                    >
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.designation}
                    </div>
                    <div className="mt-1">
                      {user.inviteStatus === 'invited' ? (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Invited
                        </Badge>
                      ) : (
                        <Badge
                          variant={user.status === 'Active' ? 'default' : 'secondary'}
                          className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                        >
                          {user.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-blue-600 font-medium">
                    {user.assignedProperties.length} Properties
                  </span>
                </div>

                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-700">{user.role}</span>
                </div>

                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-700">
                    {user.lastLogin !== 'Never' ? format(new Date(user.lastLogin), 'E, MMM d, yyyy') : 'Never'}
                  </span>
                </div>

                <div className="col-span-2 flex items-center justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user.inviteStatus === 'invited' ? (
                        <>
                          <DropdownMenuItem onClick={() => handleAcceptInvite(user.id)}>
                            <UserCheck className="w-4 h-4 mr-2" />
                            Accept Invite
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      ) : (
                        <>
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAssignProperties(user)}>
                            <Building className="w-4 h-4 mr-2" />
                            Manage Properties
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id)}>
                            {user.status === 'Active' ? (
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
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No users found matching your search.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showAssignPropertiesDialog} onOpenChange={setShowAssignPropertiesDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Property Assignments</DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium">
                  {selectedUser.firstName} {selectedUser.lastName}
                </p>
                <p className="text-sm text-gray-600">{selectedUser.designation}</p>
              </div>

              <div className="space-y-2">
                <Label>Assigned Properties</Label>
                <div className="max-h-60 overflow-y-auto border rounded-lg p-3 space-y-2">
                  {PROPERTIES.slice(0, 15).map((property) => (
                    <div key={property} className="flex items-center space-x-2">
                      <Checkbox
                        id={`assign-${property}`}
                        checked={selectedUser.assignedProperties.includes(property)}
                        onCheckedChange={(checked) => {
                          // Handle property toggle for assign properties
                        }}
                      />
                      <Label htmlFor={`assign-${property}`} className="text-sm font-normal">
                        {property}
                      </Label>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Selected: {selectedUser.assignedProperties.length} properties
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowAssignPropertiesDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProperties}>
              Update Assignments
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUsers;