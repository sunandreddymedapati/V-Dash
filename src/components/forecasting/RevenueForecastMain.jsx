import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Calendar as CalendarIcon, 
  Download, 
  Upload, 
  BarChart3, 
  Table as TableIcon,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';

const RevenueForecastMain = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeframe, setTimeframe] = useState('30D');
  const [compareFilter, setCompareFilter] = useState('This Year');
  const [viewMode, setViewMode] = useState('chart');
  const [showBudget, setShowBudget] = useState(true);
  const [showLY, setShowLY] = useState(true);

  // Generate sample forecast data
  const generateForecastData = () => {
    const days = timeframe === '7D' ? 7 : timeframe === '15D' ? 15 : 30;
    const data = [];
    
    for (let i = 0; i < days; i++) {
      const date = addDays(selectedDate, i);
      const baseADR = 280 + Math.random() * 40;
      const baseOccupancy = 70 + Math.random() * 25;
      const roomsSold = Math.floor(baseOccupancy * 2);
      
      data.push({
        date: format(date, 'MMM d'),
        forecastedADR: Math.round(baseADR * 100) / 100,
        forecastedOccupancy: Math.round(baseOccupancy * 100) / 100,
        roomsSold,
        roomRevenue: Math.round(roomsSold * baseADR),
        budgetRevenue: Math.round(roomsSold * baseADR * 1.05),
        lyRevenue: Math.round(roomsSold * baseADR * 0.95),
        budgetADR: Math.round((baseADR * 1.05) * 100) / 100,
        budgetOccupancy: Math.round((baseOccupancy + 2) * 100) / 100,
        lyADR: Math.round((baseADR * 0.95) * 100) / 100,
        lyOccupancy: Math.round((baseOccupancy - 3) * 100) / 100,
      });
    }
    
    return data;
  };

  const forecastData = generateForecastData();

  const formatCurrency = (value) => `$${value.toLocaleString()}`;
  const formatPercentage = (value) => `${value.toFixed(1)}%`;

  const calculateVariance = (actual, comparison) => {
    const variance = ((actual - comparison) / comparison) * 100;
    return Math.round(variance * 100) / 100;
  };

  const VarianceCell = ({ actual, comparison }) => {
    const variance = calculateVariance(actual, comparison);
    const isPositive = variance >= 0;
    
    return (
      <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        <span className="font-medium">
          {isPositive ? '+' : ''}{variance.toFixed(1)}%
        </span>
      </div>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <p className="text-blue-600">ADR: {formatCurrency(data.forecastedADR)}</p>
            <p className="text-yellow-600">Occupancy: {formatPercentage(data.forecastedOccupancy)}</p>
            <p className="text-gray-700">Revenue: {formatCurrency(data.roomRevenue)}</p>
            <p className="text-gray-700">Rooms Sold: {data.roomsSold}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-white rounded-xl shadow-md border border-gray-100">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Revenue Forecast – 30-Day Outlook
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Forward-looking performance metrics and variance analysis
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              {/* Compare Filter */}
              <Select value={compareFilter} onValueChange={setCompareFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="This Year">This Year</SelectItem>
                  <SelectItem value="Last Year">Last Year</SelectItem>
                  <SelectItem value="Budget">Budget</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Timeframe Tabs */}
          <div className="flex items-center justify-between mt-4">
            <Tabs value={timeframe} onValueChange={setTimeframe} className="w-auto">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="7D" className="data-[state=active]:bg-white">7D</TabsTrigger>
                <TabsTrigger value="15D" className="data-[state=active]:bg-white">15D</TabsTrigger>
                <TabsTrigger value="30D" className="data-[state=active]:bg-white">30D</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'chart' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('chart')}
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                Chart
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <TableIcon className="w-4 h-4 mr-1" />
                Table
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Chart/Table Section */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
        <CardContent className="p-6">
          {viewMode === 'chart' ? (
            <div className="space-y-6">
              {/* Chart Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowBudget(!showBudget)}
                    className="flex items-center space-x-1"
                  >
                    {showBudget ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>Budget</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowLY(!showLY)}
                    className="flex items-center space-x-1"
                  >
                    {showLY ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>Last Year</span>
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    PNG
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    CSV
                  </Button>
                </div>
              </div>

              {/* Chart */}
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                    <YAxis yAxisId="left" stroke="#3b82f6" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" stroke="#eab308" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="forecastedADR"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Forecasted ADR ($)"
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="forecastedOccupancy"
                      stroke="#eab308"
                      strokeWidth={2}
                      name="Forecasted Occupancy (%)"
                      dot={{ fill: '#eab308', strokeWidth: 2, r: 3 }}
                    />
                    
                    {showBudget && (
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="budgetADR"
                        stroke="#6b7280"
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        name="Budget ADR ($)"
                        dot={false}
                      />
                    )}
                    
                    {showLY && (
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="lyADR"
                        stroke="#10b981"
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        name="LY ADR ($)"
                        dot={false}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Table Controls */}
              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export CSV
                </Button>
              </div>

              {/* Forecast Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left min-w-[80px]">Date</TableHead>
                      <TableHead className="text-center">Rooms Sold</TableHead>
                      <TableHead className="text-center">ADR</TableHead>
                      <TableHead className="text-center">Occupancy %</TableHead>
                      <TableHead className="text-center">Room Revenue</TableHead>
                      <TableHead className="text-center">Budget Revenue</TableHead>
                      <TableHead className="text-center">Variance % vs Budget</TableHead>
                      <TableHead className="text-center">LY Revenue</TableHead>
                      <TableHead className="text-center">Variance % vs LY</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forecastData.map((row, index) => (
                      <TableRow key={index} className={calculateVariance(row.roomRevenue, row.budgetRevenue) < -10 ? 'bg-red-50' : ''}>
                        <TableCell className="font-medium">{row.date}</TableCell>
                        <TableCell className="text-center">{row.roomsSold}</TableCell>
                        <TableCell className="text-center">{formatCurrency(row.forecastedADR)}</TableCell>
                        <TableCell className="text-center">{formatPercentage(row.forecastedOccupancy)}</TableCell>
                        <TableCell className="text-center font-medium">{formatCurrency(row.roomRevenue)}</TableCell>
                        <TableCell className="text-center">{formatCurrency(row.budgetRevenue)}</TableCell>
                        <TableCell className="text-center">
                          <VarianceCell actual={row.roomRevenue} comparison={row.budgetRevenue} />
                        </TableCell>
                        <TableCell className="text-center">{formatCurrency(row.lyRevenue)}</TableCell>
                        <TableCell className="text-center">
                          <VarianceCell actual={row.roomRevenue} comparison={row.lyRevenue} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload & Notes Section */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Forecast File
              </Button>
              <span className="text-sm text-gray-500">
                If forecast data is unavailable, please contact Support
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueForecastMain;
