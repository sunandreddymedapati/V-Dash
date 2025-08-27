import React, { useState } from 'react';
import MonthYearPicker from '@/components/MonthYearPicker';
import SegmentSelector from '@/components/SegmentSelector';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { PROPERTIES_DATA } from '@/constants/properties';
import OTB30DaysTable from '@/components/OTB30DaysTable';

const generateMockData = (properties) => {
  return properties.map(property => ({
    name: property.name,
    totalRooms: property.rooms,
    actual: {
      roomsSold: Math.floor(property.rooms * (0.65 + Math.random() * 0.2)),
      revenue: Math.floor(property.rooms * (150 + Math.random() * 100)),
      occupancy: Math.floor(65 + Math.random() * 20),
      adr: Math.floor(180 + Math.random() * 80)
    },
    actualOtb: {
      otbRoomsSold: Math.floor(property.rooms * (0.15 + Math.random() * 0.1)),
      roomsSold: Math.floor(property.rooms * (0.85 + Math.random() * 0.15)),
      revenue: Math.floor(property.rooms * (190 + Math.random() * 120)),
      occupancy: Math.floor(85 + Math.random() * 15),
      adr: Math.floor(180 + Math.random() * 80)
    },
    lastYear: {
      roomsSold: Math.floor(property.rooms * (0.60 + Math.random() * 0.15)),
      revenue: Math.floor(property.rooms * (140 + Math.random() * 90)),
      occupancy: Math.floor(60 + Math.random() * 18),
      adr: Math.floor(170 + Math.random() * 70)
    },
    sameTimeLastYear: {
      roomsSold: Math.floor(property.rooms * (0.58 + Math.random() * 0.17)),
      revenue: Math.floor(property.rooms * (135 + Math.random() * 85)),
      occupancy: Math.floor(58 + Math.random() * 20),
      adr: Math.floor(165 + Math.random() * 75)
    },
    budget: {
      roomsSold: Math.floor(property.rooms * (0.70 + Math.random() * 0.15)),
      revenue: Math.floor(property.rooms * (160 + Math.random() * 80)),
      occupancy: Math.floor(70 + Math.random() * 15),
      adr: Math.floor(185 + Math.random() * 70)
    }
  }));
};

const VarianceCell = ({ current, previous }) => {
  const variance = ((current - previous) / previous) * 100;
  const isPositive = variance >= 0;
  
  return (
    <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      <span className="text-xs font-medium">
        {isPositive ? '+' : ''}{variance.toFixed(1)}%
      </span>
    </div>
  );
};

const OTBTable = ({ properties, varianceType = 'lastYear' }) => {
  const getComparisonData = (property) => {
    if (varianceType === 'sameTimeLastYear') return property.sameTimeLastYear;
    if (varianceType === 'budget') return property.budget;
    return property.lastYear;
  };
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold w-80">Property Name</TableHead>
            <TableHead className="font-semibold text-center">Total Rooms</TableHead>
            <TableHead className="font-semibold text-center border-l border-gray-200" colSpan={4}>Actual</TableHead>
            <TableHead className="font-semibold text-center border-l border-gray-200" colSpan={5}>Actual + OTB</TableHead>
            <TableHead className="font-semibold text-center border-l border-gray-200" colSpan={4}>Last Year</TableHead>
          </TableRow>
          <TableRow>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead className="text-xs text-center border-l border-gray-200">Rooms Sold</TableHead>
            <TableHead className="text-xs text-center">Revenue</TableHead>
            <TableHead className="text-xs text-center">OCC %</TableHead>
            <TableHead className="text-xs text-center">ADR</TableHead>
            <TableHead className="text-xs text-center border-l border-gray-200">OTB Rooms</TableHead>
            <TableHead className="text-xs text-center">Rooms Sold</TableHead>
            <TableHead className="text-xs text-center">Revenue</TableHead>
            <TableHead className="text-xs text-center">OCC %</TableHead>
            <TableHead className="text-xs text-center">ADR</TableHead>
            <TableHead className="text-xs text-center border-l border-gray-200">Rooms Sold</TableHead>
            <TableHead className="text-xs text-center">Revenue</TableHead>
            <TableHead className="text-xs text-center">OCC %</TableHead>
            <TableHead className="text-xs text-center">ADR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property, index) => {
            const comparisonData = getComparisonData(property);
            return (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium w-80 whitespace-nowrap">{property.name}</TableCell>
                <TableCell className="text-center">{property.totalRooms}</TableCell>
                
                <TableCell className="text-center border-l border-gray-200">
                  <div>{property.actual.roomsSold}</div>
                  <VarianceCell current={property.actual.roomsSold} previous={comparisonData.roomsSold} />
                </TableCell>
                <TableCell className="text-center">
                  <div>${property.actual.revenue.toLocaleString()}</div>
                  <VarianceCell current={property.actual.revenue} previous={comparisonData.revenue} />
                </TableCell>
                <TableCell className="text-center">
                  <div>{property.actual.occupancy}%</div>
                  <VarianceCell current={property.actual.occupancy} previous={comparisonData.occupancy} />
                </TableCell>
                <TableCell className="text-center">
                  <div>${property.actual.adr}</div>
                  <VarianceCell current={property.actual.adr} previous={comparisonData.adr} />
                </TableCell>
                
                <TableCell className="text-center border-l border-gray-200">{property.actualOtb.otbRoomsSold}</TableCell>
                <TableCell className="text-center">
                  <div>{property.actualOtb.roomsSold}</div>
                  <VarianceCell current={property.actualOtb.roomsSold} previous={comparisonData.roomsSold} />
                </TableCell>
                <TableCell className="text-center">
                  <div>${property.actualOtb.revenue.toLocaleString()}</div>
                  <VarianceCell current={property.actualOtb.revenue} previous={comparisonData.revenue} />
                </TableCell>
                <TableCell className="text-center">
                  <div>{property.actualOtb.occupancy}%</div>
                  <VarianceCell current={property.actualOtb.occupancy} previous={comparisonData.occupancy} />
                </TableCell>
                <TableCell className="text-center">
                  <div>${property.actualOtb.adr}</div>
                  <VarianceCell current={property.actualOtb.adr} previous={comparisonData.adr} />
                </TableCell>
                
                <TableCell className="text-center border-l border-gray-200">{comparisonData.roomsSold}</TableCell>
                <TableCell className="text-center">${comparisonData.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-center">{comparisonData.occupancy}%</TableCell>
                <TableCell className="text-center">${comparisonData.adr}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

const OnTheBooks = () => {
  const currentDate = new Date();
  const [selectedMonthYear, setSelectedMonthYear] = useState({
    month: currentDate.getMonth(),
    year: currentDate.getFullYear()
  });
  const [selectedSegment, setSelectedSegment] = useState("all-segments");
  const [selectedVarianceTab, setSelectedVarianceTab] = useState("last-year-variance");

  const [segments, setSegments] = useState([
    { value: 'all-segments', label: 'All Segments', properties: [] },
    { value: 'visions-east', label: 'Visions Hotels East', properties: [] },
    { value: 'visions-west', label: 'Visions Hotels West', properties: [] },
    { value: 'greater-rochester', label: 'Greater Rochester', properties: [] },
    { value: 'finger-lakes', label: 'Finger Lakes Region', properties: [] },
    { value: 'capital-district', label: 'Capital District', properties: [] },
    { value: 'western-ny', label: 'Western New York', properties: [] },
    { value: 'central-ny', label: 'Central New York', properties: [] },
    { value: 'north-country', label: 'North Country', properties: [] },
    { value: 'southern-tier', label: 'Southern Tier', properties: [] }
  ]);

  const mockProperties = generateMockData(PROPERTIES_DATA);

  const handleSegmentUpdate = (updatedSegments) => {
    setSegments(updatedSegments);
  };

  const getVarianceType = () => {
    if (selectedVarianceTab === 'same-time-variance') return 'sameTimeLastYear';
    if (selectedVarianceTab === 'budget-variance') return 'budget';
    return 'lastYear';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4 mb-6">
        <MonthYearPicker 
          value={selectedMonthYear}
          onChange={setSelectedMonthYear}
        />
        
        <SegmentSelector
          selectedSegment={selectedSegment}
          setSelectedSegment={setSelectedSegment}
          segments={segments}
          onSegmentUpdate={handleSegmentUpdate}
          showLabel={false}
          showAddButton={false}
        />
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">On the Books (OTB)</h2>
        
        <Tabs defaultValue="revenue-outlook" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="revenue-outlook">Revenue Outlook</TabsTrigger>
            <TabsTrigger value="otb-30-days">OTB 30 Days</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue-outlook" className="mt-6">
            <OTBTable properties={mockProperties} varianceType={getVarianceType()} />
            
            <Tabs value={selectedVarianceTab} onValueChange={setSelectedVarianceTab} className="w-full mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="last-year-variance">Last Year Variance</TabsTrigger>
                  <TabsTrigger value="same-time-variance">Same Time Last Year Variance</TabsTrigger>
                  <TabsTrigger value="budget-variance">Budget Variance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="last-year-variance" className="mt-4">
                  <div className="text-center text-gray-500 py-8">
                    Last Year Variance Analysis
                  </div>
                </TabsContent>
                
                <TabsContent value="same-time-variance" className="mt-4">
                  <div className="text-center text-gray-500 py-8">
                    Same Time Last Year Variance Analysis
                  </div>
                </TabsContent>
                
                <TabsContent value="budget-variance" className="mt-4">
                  <div className="text-center text-gray-500 py-8">
                    Budget Variance Analysis
                  </div>
                </TabsContent>
            </Tabs>
          </TabsContent>
          
          <TabsContent value="otb-30-days" className="mt-6">
            <OTB30DaysTable />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default OnTheBooks;
