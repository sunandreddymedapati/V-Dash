import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, CalendarIcon } from 'lucide-react';
import { formatCurrency } from '@/components/forecasting/utils/formatUtils';
import { DateRangePicker } from '@/components/ui/date-range-picker';

const BusinessPerformanceSummary = () => {
  const [activeTab, setActiveTab] = useState('Daily');
  const [varianceTab, setVarianceTab] = useState('Budget Variance');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState();

  const tabs = ['Daily', 'MTD', 'YTD', 'Custom Dates'];
  const varianceTabs = ['Last Year Variance', 'Budget Variance', 'Year Before Last Variance'];

  const getDataByPeriod = (period) => {
    const baseData = [
      { name: 'Best Western Fish Kill & Suites (139)', id: 'bw-fish-kill' },
      { name: 'Best Western Maple City Inn (62)', id: 'bw-maple' },
      { name: 'Best Western Plus University Inn (60)', id: 'bw-plus' },
      { name: 'Best Western Rochester Marketplace Inn (94)', id: 'bw-rochester' },
      { name: 'Best Western Syracuse Downtown Hotel and Suites (68)', id: 'bw-syracuse' },
      { name: 'The Clarkson Inn (40)', id: 'clarkson' },
      { name: 'TownePlace Suites by Marriott Albany Downtown/Medical Center (106)', id: 'tp-albany' },
      { name: 'TownePlace Suites by Marriott New Hartford (95)', id: 'tp-hartford' }
    ];

    const periodMultipliers = {
      'Daily': { rooms: 1, revenue: 1 },
      'MTD': { rooms: 8.5, revenue: 8.5 },
      'YTD': { rooms: 112, revenue: 112 },
      'Custom Dates': { rooms: 1, revenue: 1 }
    };

    const multiplier = periodMultipliers[period];

    return baseData.map((hotel, index) => {
      const baseRooms = 150 + (index * 5);
      const baseRoomRevenue = 40000 + (index * 3500);
      const baseFnbRevenue = 10000 + (index * 2000);
      const baseOtherRevenue = 2500 + (index * 1000);

      return {
        ...hotel,
        roomsOccupied: Math.round(baseRooms * multiplier.rooms),
        roomRevenue: baseRoomRevenue * multiplier.revenue,
        fnbRevenue: baseFnbRevenue * multiplier.revenue,
        otherRevenue: baseOtherRevenue * multiplier.revenue,
        grossRevenue: (baseRoomRevenue + baseFnbRevenue + baseOtherRevenue) * multiplier.revenue,
        occupancy: 80.0 + (index * 1.5),
        adr: 265.00 + (index * 10),
        revpar: 220.00 + (index * 7)
      };
    });
  };

  const getVarianceData = (varianceType) => {
    const varianceMultipliers = {
      'Last Year Variance': { factor: 1, positive: true },
      'Budget Variance': { factor: 1.2, positive: true },
      'Year Before Last Variance': { factor: 0.8, positive: false }
    };

    const variance = varianceMultipliers[varianceType];
    
    return {
      rooms: Math.round(12 * variance.factor) * (variance.positive ? 1 : -1),
      revenue: Math.round(3200 * variance.factor) * (variance.positive ? 1 : -1),
      fnb: Math.round(800 * variance.factor) * (variance.positive ? 1 : -1),
      other: Math.round(200 * variance.factor) * (variance.positive ? 1 : -1),
      gross: Math.round(4200 * variance.factor) * (variance.positive ? 1 : -1),
      occupancy: (6.40 * variance.factor) * (variance.positive ? 1 : -1),
      adr: (21.20 * variance.factor) * (variance.positive ? 1 : -1),
      revpar: (17.60 * variance.factor) * (variance.positive ? 1 : -1),
      percentage: 8.7 * (variance.positive ? 1 : -1)
    };
  };

  const hotelData = getDataByPeriod(activeTab);
  const varianceData = getVarianceData(varianceTab);
  
  const filteredData = hotelData.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatVariance = (value, isPercentage = false) => {
    const isPositive = value >= 0;
    const arrow = isPositive ? '↗' : '↘';
    const color = isPositive ? 'text-green-600' : 'text-red-600';
    const formattedValue = isPercentage 
      ? `${Math.abs(value).toFixed(2)}%` 
      : formatCurrency(Math.abs(value));
    
    return (
      <span className={color}>
        {arrow} {formattedValue}
      </span>
    );
  };

  const renderCustomDateSection = () => {
    if (activeTab !== 'Custom Dates') return null;

    return (
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Custom Dates (Select Dates)</h3>
        <div className="flex gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <Button variant="outline" className="w-40 justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Pick start date
            </Button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <Button variant="outline" className="w-40 justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Pick end date
            </Button>
          </div>
        </div>
        <p className="text-gray-500 text-center mt-4">
          Please select a start and end date to display data for the selected range.
        </p>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">Business Performance Summary</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search Property..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Time Period Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Custom Date Selection */}
        {renderCustomDateSection()}

        {/* Performance Table */}
        {activeTab !== 'Custom Dates' && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 bg-background z-10 min-w-[250px]">Name</TableHead>
                  <TableHead className="text-center">Rooms Occupied</TableHead>
                  <TableHead className="text-center">Room Revenue</TableHead>
                  <TableHead className="text-center">F&B Revenue</TableHead>
                  <TableHead className="text-center">Other Revenue</TableHead>
                  <TableHead className="text-center">Gross Revenue</TableHead>
                  <TableHead className="text-center">Occupancy (%)</TableHead>
                  <TableHead className="text-center">ADR</TableHead>
                  <TableHead className="text-center">RevPAR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((hotel, index) => (
                  <TableRow key={index}>
                    <TableCell className="sticky left-0 bg-background z-10 font-medium">
                      {hotel.name}
                    </TableCell>
                    <TableCell className="text-center">
                      <div>{hotel.roomsOccupied.toLocaleString()}</div>
                      <div className="text-xs">{formatVariance(varianceData.rooms)}</div>
                      <div className="text-xs text-green-600">+{Math.abs(varianceData.percentage).toFixed(1)}%</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div>{formatCurrency(hotel.roomRevenue)}</div>
                      <div className="text-xs">{formatVariance(varianceData.revenue)}</div>
                      <div className="text-xs text-green-600">+{Math.abs(varianceData.percentage).toFixed(1)}%</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div>{formatCurrency(hotel.fnbRevenue)}</div>
                      <div className="text-xs">{formatVariance(varianceData.fnb)}</div>
                      <div className="text-xs text-green-600">+{Math.abs(varianceData.percentage).toFixed(1)}%</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div>{formatCurrency(hotel.otherRevenue)}</div>
                      <div className="text-xs">{formatVariance(varianceData.other)}</div>
                      <div className="text-xs text-green-600">+{Math.abs(varianceData.percentage).toFixed(1)}%</div>
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      <div>{formatCurrency(hotel.grossRevenue)}</div>
                      <div className="text-xs">{formatVariance(varianceData.gross)}</div>
                      <div className="text-xs text-green-600">+{Math.abs(varianceData.percentage).toFixed(1)}%</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div>{hotel.occupancy.toFixed(1)}%</div>
                      <div className="text-xs">{formatVariance(varianceData.occupancy, true)}</div>
                      <div className="text-xs text-green-600">+{Math.abs(varianceData.percentage).toFixed(1)}%</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div>{formatCurrency(hotel.adr)}</div>
                      <div className="text-xs">{formatVariance(varianceData.adr)}</div>
                      <div className="text-xs text-green-600">+{Math.abs(varianceData.percentage).toFixed(1)}%</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div>{formatCurrency(hotel.revpar)}</div>
                      <div className="text-xs">{formatVariance(varianceData.revpar)}</div>
                      <div className="text-xs text-green-600">+{Math.abs(varianceData.percentage).toFixed(1)}%</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Variance Tabs */}
        <div className="flex justify-center space-x-1 mt-6 bg-gray-100 p-1 rounded-lg max-w-2xl mx-auto">
          {varianceTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setVarianceTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                varianceTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessPerformanceSummary;