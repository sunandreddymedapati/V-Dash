import React from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Building2, TrendingUp } from 'lucide-react';

const hotelOptions = [
  { value: 'hotel1', label: 'Grand Plaza Hotel – GPH001' },
  { value: 'hotel2', label: 'City Center Inn – CCI002' },
  { value: 'hotel3', label: 'Oceanview Resort – OVR003' },
];

const periodOptions = [
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
];

/**
 * @param {{
 *   selectedHotel: string,
 *   selectedPeriod: string,
 *   onHotelChange: (value: string) => void,
 *   onPeriodChange: (value: string) => void
 * }} props
 */
export default function ForecastingHeader({
  selectedHotel,
  selectedPeriod,
  onHotelChange,
  onPeriodChange
}) {
  const selectedHotelData = hotelOptions.find(hotel => hotel.value === selectedHotel);

  return (
    <Card className="bg-white rounded-xl shadow-md border border-gray-100">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Forecasting ({selectedHotelData?.label || 'Hotel Name – Property Code'})
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Real-time revenue and operational forecasting
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-gray-500" />
              <Select value={selectedHotel} onValueChange={onHotelChange}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select hotel..." />
                </SelectTrigger>
                <SelectContent>
                  {hotelOptions.map((hotel) => (
                    <SelectItem key={hotel.value} value={hotel.value}>
                      {hotel.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <Select value={selectedPeriod} onValueChange={onPeriodChange}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Period..." />
                </SelectTrigger>
                <SelectContent>
                  {periodOptions.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
