import React, { useState } from 'react';
import { Calendar, Upload, Eye, Save, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const NightAudit = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [reports, setReports] = useState([
    { id: '1', name: 'Transactions Report', uploaded: false },
    { id: '2', name: 'Occupancy Forecast Report', uploaded: true },
    { id: '3', name: 'City Ledger Aging', uploaded: false },
    { id: '4', name: "Manager's Report", uploaded: true },
    { id: '5', name: 'Transaction Summary Report', uploaded: false },
  ]);

  const [roomAttendants, setRoomAttendants] = useState([
    {
      id: '1',
      employeeName: 'Maria Rodriguez',
      clockedIn: true,
      checkoutRooms: 0,
      stayoverRooms: 0,
      suiteRooms: 0,
      deepCleaningRooms: 0,
      noServiceRooms: 0,
      laundryHours: '',
      publicSpaceHours: '',
      otherHours: ''
    },
    {
      id: '2',
      employeeName: 'Jennifer Smith',
      clockedIn: false,
      checkoutRooms: 0,
      stayoverRooms: 0,
      suiteRooms: 0,
      deepCleaningRooms: 0,
      noServiceRooms: 0,
      laundryHours: '',
      publicSpaceHours: '',
      otherHours: ''
    },
    {
      id: '3',
      employeeName: 'Carlos Santos',
      clockedIn: true,
      checkoutRooms: 0,
      stayoverRooms: 0,
      suiteRooms: 0,
      deepCleaningRooms: 0,
      noServiceRooms: 0,
      laundryHours: '',
      publicSpaceHours: '',
      otherHours: ''
    }
  ]);

  const missingReports = reports.filter(report => !report.uploaded);
  const hotelName = "Grand Plaza Hotel"; // This would come from props/context

  const handleFileUpload = (reportId, file) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, uploaded: true, file }
        : report
    ));
  };

  const updateAttendantData = (attendantId, field, value) => {
    setRoomAttendants(prev => prev.map(attendant =>
      attendant.id === attendantId
        ? { ...attendant, [field]: value }
        : attendant
    ));
  };

  const handleSaveEntries = () => {
    console.log('Saving entries:', roomAttendants);
    // Backend save logic would go here
  };

  const handleSubmitToManager = () => {
    console.log('Submitting to manager:', { reports, roomAttendants, date: selectedDate });
    // Backend submission logic would go here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Night Audit ({hotelName})</h1>
        {missingReports.length > 0 && (
          <div className="flex items-center space-x-2 text-amber-600">
            <span className="text-sm font-medium">Missing Reports</span>
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
              {missingReports.length} pending
            </span>
          </div>
        )}
        <p className="text-gray-600">Complete Night Audit Steps</p>
      </div>

      {/* Section 1: Report Uploads */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Report Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="border border-gray-200 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">
                    {report.name}
                  </Label>
                  <div className="flex items-center space-x-1">
                    {report.uploaded ? (
                      <span className="text-green-600 text-xl">✅</span>
                    ) : (
                      <span className="text-amber-500 text-xl">⚠️</span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(report.id, file);
                      }
                    }}
                    className="text-sm"
                  />
                  
                  {report.uploaded && (
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Room Attendant Entry */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Enter Room Attendant Data
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Employee Name</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-700">Clocked In?</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-700">Checkout Rooms</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-700">Stayover Rooms</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-700">Suite Rooms</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-700">Deep Cleaning</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-700">No Service/DND</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-700">Laundry Hours</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-700">Public Space Hours</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-700">Other Hours</th>
                </tr>
              </thead>
              <tbody>
                {roomAttendants.map((attendant) => (
                  <tr key={attendant.id} className="border-b border-gray-100">
                    <td className="py-3 px-2">
                      <span className="text-sm font-medium text-gray-900">
                        {attendant.employeeName}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Checkbox
                        checked={attendant.clockedIn}
                        onCheckedChange={(checked) => 
                          updateAttendantData(attendant.id, 'clockedIn', checked)
                        }
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Input
                        type="number"
                        min="0"
                        value={attendant.checkoutRooms}
                        onChange={(e) => 
                          updateAttendantData(attendant.id, 'checkoutRooms', parseInt(e.target.value) || 0)
                        }
                        className="w-20 text-center"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Input
                        type="number"
                        min="0"
                        value={attendant.stayoverRooms}
                        onChange={(e) => 
                          updateAttendantData(attendant.id, 'stayoverRooms', parseInt(e.target.value) || 0)
                        }
                        className="w-20 text-center"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Input
                        type="number"
                        min="0"
                        value={attendant.suiteRooms}
                        onChange={(e) => 
                          updateAttendantData(attendant.id, 'suiteRooms', parseInt(e.target.value) || 0)
                        }
                        className="w-20 text-center"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Input
                        type="number"
                        min="0"
                        value={attendant.deepCleaningRooms}
                        onChange={(e) => 
                          updateAttendantData(attendant.id, 'deepCleaningRooms', parseInt(e.target.value) || 0)
                        }
                        className="w-20 text-center"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Input
                        type="number"
                        min="0"
                        value={attendant.noServiceRooms}
                        onChange={(e) => 
                          updateAttendantData(attendant.id, 'noServiceRooms', parseInt(e.target.value) || 0)
                        }
                        className="w-20 text-center"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Input
                        type="time"
                        value={attendant.laundryHours}
                        onChange={(e) => 
                          updateAttendantData(attendant.id, 'laundryHours', e.target.value)
                        }
                        className="w-24"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Input
                        type="time"
                        value={attendant.publicSpaceHours}
                        onChange={(e) => 
                          updateAttendantData(attendant.id, 'publicSpaceHours', e.target.value)
                        }
                        className="w-24"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Input
                        type="time"
                        value={attendant.otherHours}
                        onChange={(e) => 
                          updateAttendantData(attendant.id, 'otherHours', e.target.value)
                        }
                        className="w-24"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={handleSaveEntries}>
              <Save className="w-4 h-4 mr-2" />
              Save Entries
            </Button>
            <Button onClick={handleSubmitToManager}>
              <Send className="w-4 h-4 mr-2" />
              Submit to Manager
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NightAudit;
