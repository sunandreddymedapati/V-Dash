import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Phone,
  Search,
  Building
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PROPERTIES from '@/constants/properties';
import EditDetailsDialog from '@/components/EditDetailsDialog';
import ChangePasswordDialog from '@/components/ChangePasswordDialog';

const EditProfile = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false);

  const [userData, setUserData] = useState({
    name: "Jason D'Agostino",
    initials: "JD",
    email: "jason.dagostino@company.com",
    phone: "+1 555-123-4567",
    whatsapp: "+15551234567",
    writtenLanguage: "English (US)",
    spokenLanguage: "English (US)",
    timezone: "(GMT-5) Eastern Standard Time",
    designation: "Corporate Director",
    firstName: "Jason",
    lastName: "D'Agostino",
    mobile: "555-123-4567",
    phoneCountryCode: "US +1",
    mobileCountryCode: "US +1",
    socialMessaging: "WhatsApp",
    whatsappNumber: "+15551234567"
  });

  const userProperties = [
    {
      name: PROPERTIES[0],
      id: "12443",
      role: "Administrator",
      location: "Fishkill, NY, USA"
    },
    {
      name: PROPERTIES[2],
      id: "1113157",
      role: "Administrator",
      location: "Olean, NY, USA"
    },
    {
      name: PROPERTIES[5],
      id: "10949",
      role: "Administrator",
      location: "Watertown, NY, USA"
    }
  ];

  const handleSaveUserData = (newData) => {
    setUserData(prevData => ({
      ...prevData,
      ...newData,
      name: `${newData.firstName} ${newData.lastName}`,
      initials: `${newData.firstName.charAt(0)}${newData.lastName.charAt(0)}`
    }));
  };

  const handleChangePassword = (passwordData) => {
    console.log('Password change requested:', passwordData);
  };

  const filteredProperties = userProperties.filter(property =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.id.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account information and properties</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-white">{userData.initials}</span>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
                <p className="text-sm text-gray-500">{userData.designation}</p>
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

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditDialog(true)}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowChangePasswordDialog(true)}
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">My properties</h3>
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
            <div className="grid grid-cols-9 gap-4 px-4 py-2 text-sm font-medium text-gray-500 border-b">
              <div className="col-span-6">Property</div>
              <div className="col-span-3">Role</div>
            </div>

            {filteredProperties.map((property) => (
              <div key={property.id} className="grid grid-cols-9 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors rounded-lg">
                <div className="col-span-6 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-blue-600 hover:underline cursor-pointer">
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

                <div className="col-span-3 flex items-center">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Administrator
                  </Badge>
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

      <EditDetailsDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        userData={userData}
        onSave={handleSaveUserData}
      />

      <ChangePasswordDialog
        open={showChangePasswordDialog}
        onOpenChange={setShowChangePasswordDialog}
        onSave={handleChangePassword}
      />
    </div>
  );
};

export default EditProfile;