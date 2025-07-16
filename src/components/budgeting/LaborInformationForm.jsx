import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LaborInformationForm = ({ selectedYear }) => {
  const [laborInfo, setLaborInfo] = useState({
    checkoutRoomPercent: '',
    occupiedRoomsToCleanPercent: '',
    minutesPerCheckoutRoom: '',
    minutesPerStayOverRoom: '',
    minutesPerSuiteRoom: '',
    minutesPerDeepCleaningRoom: '',
    minutesPerDNDRoom: '',
    minutesPerRoomForLaundry: '',
    extraMinutesForRoomAttendant: ''
  });

  const handleInputChange = (field, value) => {
    setLaborInfo(prev => ({
      ...prev,
      [field]: value
    }));
    console.log(`Labor info updated - ${field}:`, value);
  };

  const isValidData = (value) => {
    return value.trim() !== '' && !isNaN(parseFloat(value)) && parseFloat(value) >= 0;
  };

  const laborInfoFields = [
    { key: 'checkoutRoomPercent', label: 'Check out room %', type: 'percent' },
    { key: 'occupiedRoomsToCleanPercent', label: '% of occupied rooms to be cleaned', type: 'percent' },
    { key: 'minutesPerCheckoutRoom', label: 'Minutes per checkout room', type: 'minutes' },
    { key: 'minutesPerStayOverRoom', label: 'Minutes per stay over room', type: 'minutes' },
    { key: 'minutesPerSuiteRoom', label: 'Minutes per suite room', type: 'minutes' },
    { key: 'minutesPerDeepCleaningRoom', label: 'Minutes per deep cleaning room', type: 'minutes' },
    { key: 'minutesPerDNDRoom', label: 'Minutes per DND room', type: 'minutes' },
    { key: 'minutesPerRoomForLaundry', label: 'Minutes per room for laundry', type: 'minutes' },
    { key: 'extraMinutesForRoomAttendant', label: 'Extra Minutes for room attendant who cleaned rooms', type: 'minutes' }
  ];

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          LABOR INFORMATION
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {laborInfoFields.map((field, index) => {
            const fieldValue = laborInfo[field.key];
            const hasValidData = isValidData(fieldValue);
            
            return (
              <div key={field.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 w-8">
                    {index + 1}.
                  </span>
                  <Label className="text-sm text-gray-700 min-w-0 flex-1">
                    {field.label}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={fieldValue}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className="w-24 text-center text-sm"
                    placeholder="0"
                    min="0"
                    step={field.type === 'percent' ? '0.1' : '1'}
                  />
                  <div
                    className={`w-1 h-8 rounded transition-colors duration-200 ${
                      hasValidData ? 'bg-green-500' : 'bg-red-400'
                    }`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LaborInformationForm;
