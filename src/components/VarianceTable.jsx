import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Download } from 'lucide-react';
import VarianceCell from './forecasting/components/VarianceCell';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { api } from '@/store/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useDateStore } from '@/store/dateStore';

const VarianceTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [topTab, setTopTab] = useState('daily');
  const [bottomTab, setBottomTab] = useState('last-year');

  // Custom Date Range State
  const [customStartDate, setCustomStartDate] = useState();
  const [customEndDate, setCustomEndDate] = useState();
  const [startPickerOpen, setStartPickerOpen] = useState(false);
  const [endPickerOpen, setEndPickerOpen] = useState(false);

  // API state
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dateFromStore = useDateStore((s) => s.selectedDate?.from);

  // Fetch KPI data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const dateParam = dateFromStore
          ? format(dateFromStore, 'yyyy-MM-dd')
          : format(new Date(), 'yyyy-MM-dd');

        const res = await api.get("reports/revenue-kpi/by-property", {
          params: { date: dateParam },
        });
        setApiData(res.data || []); // response is already JSON
      } catch (err) {
        console.error("Error fetching KPI data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dateFromStore]);

  // If switching away from custom, clear dates
  useEffect(() => {
    if (topTab !== 'custom') {
      setCustomStartDate(undefined);
      setCustomEndDate(undefined);
    }
  }, [topTab]);

  const canShowTable =
    topTab !== 'custom' || (topTab === 'custom' && customStartDate && customEndDate);

  // Transform API response into table rows
  const tableData = (apiData || []).map((property) => {
    const metrics = property?.data?.[topTab]?.[bottomTab] || [];
    const row = {};
    metrics.forEach((m) => {
      row[m.title] = m.value;
      row[`${m.title}_variance`] = m.variance;
      row[`${m.title}_trend`] = m.trend;
      row[`${m.title}_isPositive`] = m.isPositive;
    });

    return {
      name: property.property_name,
      rooms: property.rooms,

      roomsOccupied: (row["Rooms Sold"]) || 0,
      roomRevenue: parseFloat((row["Room Revenue"] || "0").replace(/[^0-9.-]+/g, "")),
      otherRevenue: parseFloat((row["Other Revenue"] || "0").replace(/[^0-9.-]+/g, "")),
      grossRevenue: parseFloat((row["Gross Revenue"] || "0").replace(/[^0-9.-]+/g, "")),
      occupancy: parseFloat((row["Occupancy %"] || "0").replace("%", "")),
      adr: parseFloat((row["ADR"] || "0").replace(/[^0-9.-]+/g, "")),
      revpar: parseFloat((row["RevPAR"] || "0").replace(/[^0-9.-]+/g, "")),
      noShow: Number(row["No Shows"]) || 0,
      ooo: Number(row["OoO"]) || 0,
      compRooms: Number(row["Comp Rooms"]) || 0,

      // now carry variance/trend/isPositive grouped by metric
      variance: {
        roomsOccupied: row["Rooms Sold_variance"],
        roomRevenue: row["Room Revenue_variance"],
        otherRevenue: row["Other Charges_variance"],
        grossRevenue: row["Gross Revenue_variance"],
        occupancy: row["Occupancy %_variance"],
        adr: row["ADR_variance"],
        revpar: row["RevPAR_variance"],
        noShow: row["No Shows_variance"],
        ooo: row["OoO_variance"],
        compRooms: row["Comp Rooms_variance"],
      },
      trend: {
        roomsOccupied: row["Rooms Sold_trend"],
        roomRevenue: row["Room Revenue_trend"],
        otherRevenue: row["Other Charges_trend"],
        grossRevenue: row["Gross Revenue_trend"],
        occupancy: row["Occupancy %_trend"],
        adr: row["ADR_trend"],
        revpar: row["RevPAR_trend"],
        noShow: row["No Shows_trend"],
        ooo: row["OoO_trend"],
        compRooms: row["Comp Rooms_trend"],
      },
      isPositive: {
        roomsOccupied: row["Rooms Sold_isPositive"],
        roomRevenue: row["Room Revenue_isPositive"],
        otherRevenue: row["Other Charges_isPositive"],
        grossRevenue: row["Gross Revenue_isPositive"],
        occupancy: row["Occupancy %_isPositive"],
        adr: row["ADR_isPositive"],
        revpar: row["RevPAR_isPositive"],
        noShow: row["No Shows_isPositive"],
        ooo: row["OoO_isPositive"],
        compRooms: row["Comp Rooms_isPositive"],
      },
    };
  });


  // Portfolio totals
  const totals = tableData.reduce(
    (acc, hotel) => ({
      roomsOccupied: acc.roomsOccupied + hotel.roomsOccupied,
      roomRevenue: acc.roomRevenue + hotel.roomRevenue,
      otherRevenue: acc.otherRevenue + hotel.otherRevenue,
      grossRevenue: acc.grossRevenue + hotel.grossRevenue,
      occupancy: acc.occupancy + hotel.occupancy,
      adr: acc.adr + hotel.adr,
      revpar: acc.revpar + hotel.revpar,
      noShow: acc.noShow + hotel.noShow,
      ooo: acc.ooo + hotel.ooo,
      compRooms: acc.compRooms + hotel.compRooms,
    }),
    {
      roomsOccupied: 0,
      roomRevenue: 0,
      otherRevenue: 0,
      grossRevenue: 0,
      occupancy: 0,
      adr: 0,
      revpar: 0,
      noShow: 0,
      ooo: 0,
      compRooms: 0,
    }
  );

  if (tableData.length > 0) {
    totals.occupancy = totals.occupancy / tableData.length;
    totals.adr = totals.adr / tableData.length;
    totals.revpar = totals.revpar / tableData.length;
  }

  const downloadCSV = () => {
    const headers = [
      'Name', 'Rooms Occupied', 'Room Revenue', 'Other Revenue',
      'Gross Revenue', 'Occupancy (%)', 'ADR', 'RevPAR', 'No Show', 'OoO', 'Comp Rooms'
    ];

    const csvContent = [
      headers.join(','),
      ...tableData.map(row => [
        `"${row.name}"`, row.roomsOccupied, row.roomRevenue,
        row.otherRevenue, row.grossRevenue, row.occupancy, row.adr,
        row.revpar, row.noShow, row.ooo, row.compRooms
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'business-performance-summary.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (value) =>
    `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatPercentage = (value) => `${value.toFixed(2)}%`;



  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Business Performance Summary</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search Property..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-400"
            />
          </div>
          <Button
            onClick={downloadCSV}
            variant="outline"
            size="icon"
            className="h-10 w-10"
            title="Download CSV"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={topTab} onValueChange={setTopTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="mtd">MTD</TabsTrigger>
          <TabsTrigger value="ytd">YTD</TabsTrigger>
          {/* <TabsTrigger value="custom">
            {topTab === 'custom' && (!customStartDate || !customEndDate)
              ? 'Custom Dates (Select Dates)'
              : 'Custom Dates'}
          </TabsTrigger> */}
        </TabsList>
      </Tabs>

      {/* Show date range inputs if on custom tab */}
      {topTab === 'custom' && (
        <div className="flex items-center gap-6 mb-4">
          <div>
            <label className="block text-xs mb-1 text-gray-600 dark:text-gray-300">Start Date</label>
            <Popover open={startPickerOpen} onOpenChange={setStartPickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[170px] justify-start text-left font-normal",
                    !customStartDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {customStartDate ? format(customStartDate, "PPP") : <span>Pick start date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={customStartDate}
                  onSelect={(d) => {
                    setCustomStartDate(d);
                    setStartPickerOpen(false);
                    if (!customEndDate) setEndPickerOpen(true);
                  }}
                  disabled={date =>
                    (!!customEndDate && date > customEndDate) ||
                    date > new Date()
                  }
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="block text-xs mb-1 text-gray-600 dark:text-gray-300">End Date</label>
            <Popover open={endPickerOpen} onOpenChange={setEndPickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[170px] justify-start text-left font-normal",
                    !customEndDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {customEndDate ? format(customEndDate, "PPP") : <span>Pick end date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={customEndDate}
                  onSelect={(d) => {
                    setCustomEndDate(d);
                    setEndPickerOpen(false);
                  }}
                  disabled={date =>
                    (!!customStartDate && date < customStartDate) ||
                    date > new Date()
                  }
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}

      { loading ? (
          <div className="p-6 space-y-4" aria-busy="true" role="status">
            {/* Header controls skeleton */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>

            {/* Table skeleton */}
            <div className="rounded-md border">
              {/* Header row skeleton */}
              <div className="grid grid-cols-12 gap-2 p-3 border-b">
                <Skeleton className="h-5 w-40 col-span-3" />
                <Skeleton className="h-5 w-20 col-span-1" />
                <Skeleton className="h-5 w-20 col-span-1" />
                <Skeleton className="h-5 w-20 col-span-1" />
                <Skeleton className="h-5 w-20 col-span-1" />
                <Skeleton className="h-5 w-20 col-span-1" />
                <Skeleton className="h-5 w-20 col-span-1" />
                <Skeleton className="h-5 w-20 col-span-1" />
                <Skeleton className="h-5 w-20 col-span-1" />
                <Skeleton className="h-5 w-20 col-span-1" />
                <Skeleton className="h-5 w-20 col-span-1" />
                <Skeleton className="h-5 w-20 col-span-1" />
              </div>

              {/* Body rows skeleton */}
              <div className="divide-y">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 p-3">
                    <Skeleton className="h-5 w-52 col-span-3" />
                    <Skeleton className="h-5 w-16 col-span-1" />
                    <Skeleton className="h-5 w-16 col-span-1" />
                    <Skeleton className="h-5 w-16 col-span-1" />
                    <Skeleton className="h-5 w-16 col-span-1" />
                    <Skeleton className="h-5 w-16 col-span-1" />
                    <Skeleton className="h-5 w-16 col-span-1" />
                    <Skeleton className="h-5 w-16 col-span-1" />
                    <Skeleton className="h-5 w-16 col-span-1" />
                    <Skeleton className="h-5 w-16 col-span-1" />
                    <Skeleton className="h-5 w-16 col-span-1" />
                    <Skeleton className="h-5 w-16 col-span-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) :   
        ( canShowTable && (
        <div className="mb-6">
          <ScrollArea className="h-[600px] w-full rounded-md border">
            <Table className="min-w-[1400px]">
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                  <TableHead className="sticky left-0 bg-gray-50 dark:bg-gray-700 z-20 min-w-[200px] font-semibold">Name</TableHead>
                  <TableHead className="text-center font-semibold min-w-[120px]">Rooms Occupied</TableHead>
                  <TableHead className="text-center font-semibold min-w-[130px]">Room Revenue</TableHead>
                  <TableHead className="text-center font-semibold min-w-[130px]">Other Revenue</TableHead>
                  <TableHead className="text-center font-semibold min-w-[130px]">Gross Revenue</TableHead>
                  <TableHead className="text-center font-semibold min-w-[120px]">Occupancy (%)</TableHead>
                  <TableHead className="text-center font-semibold min-w-[100px]">ADR</TableHead>
                  <TableHead className="text-center font-semibold min-w-[100px]">RevPAR</TableHead>
                  <TableHead className="text-center font-semibold min-w-[100px]">No Show</TableHead>
                  <TableHead className="text-center font-semibold min-w-[100px]">OoO</TableHead>
                  <TableHead className="text-center font-semibold min-w-[120px]">Comp Rooms</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((hotel, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <TableCell className="sticky left-0 bg-white dark:bg-gray-800 z-10 font-medium min-w-[200px]">
                      {hotel?.rooms ? `${hotel.name} (${hotel.rooms})` : hotel.name}
                    </TableCell>

                    {/* Rooms Occupied */}
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className="font-medium">{hotel.roomsOccupied ?? '-'}</div>
                        <VarianceCell
                          variance={hotel.variance?.roomsOccupied}
                          trend={hotel.trend?.roomsOccupied}
                          isPositive={hotel.isPositive?.roomsOccupied}
                          isWholeNumber
                        />
                      </div>
                    </TableCell>

                    {/* Room Revenue */}
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className="font-medium">
                          {hotel.roomRevenue != null ? formatCurrency(hotel.roomRevenue) : '-'}
                        </div>
                        <VarianceCell
                          variance={hotel.variance?.roomRevenue}
                          trend={hotel.trend?.roomRevenue}
                          isPositive={hotel.isPositive?.roomRevenue}
                          isCurrency
                        />
                      </div>
                    </TableCell>

                    {/* Other Revenue */}
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className="font-medium">
                          {hotel.otherRevenue != null ? formatCurrency(hotel.otherRevenue) : '-'}
                        </div>
                        <VarianceCell
                          variance={hotel.variance?.otherRevenue}
                          trend={hotel.trend?.otherRevenue}
                          isPositive={hotel.isPositive?.otherRevenue}
                          isCurrency
                        />
                      </div>
                    </TableCell>

                    {/* Gross Revenue */}
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className="font-medium">
                          {hotel.grossRevenue != null ? formatCurrency(hotel.grossRevenue) : '-'}
                        </div>
                        <VarianceCell
                          variance={hotel.variance?.grossRevenue}
                          trend={hotel.trend?.grossRevenue}
                          isPositive={hotel.isPositive?.grossRevenue}
                          isCurrency
                        />
                      </div>
                    </TableCell>

                    {/* Occupancy */}
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className="font-medium">
                          {hotel.occupancy != null ? formatPercentage(hotel.occupancy) : '-'}
                        </div>
                        <VarianceCell
                          variance={hotel.variance?.occupancy}
                          trend={hotel.trend?.occupancy}
                          isPositive={hotel.isPositive?.occupancy}
                          isPercentage
                        />
                      </div>
                    </TableCell>

                    {/* ADR */}
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className="font-medium">
                          {hotel.adr != null ? formatCurrency(hotel.adr) : '-'}
                        </div>
                        <VarianceCell
                          variance={hotel.variance?.adr}
                          trend={hotel.trend?.adr}
                          isPositive={hotel.isPositive?.adr}
                          isCurrency
                        />
                      </div>
                    </TableCell>

                    {/* RevPAR */}
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className="font-medium">
                          {hotel.revpar != null ? formatCurrency(hotel.revpar) : '-'}
                        </div>
                        <VarianceCell
                          variance={hotel.variance?.revpar}
                          trend={hotel.trend?.revpar}
                          isPositive={hotel.isPositive?.revpar}
                          isCurrency
                        />
                      </div>
                    </TableCell>

                    {/* No Show */}
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className="font-medium">{hotel.noShow ?? '-'}</div>
                        <VarianceCell
                          variance={hotel.variance?.noShow}
                          trend={hotel.trend?.noShow}
                          isPositive={hotel.isPositive?.noShow}
                          isWholeNumber
                        />
                      </div>
                    </TableCell>

                    {/* OoO */}
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className="font-medium">{hotel.ooo ?? '-'}</div>
                        <VarianceCell
                          variance={hotel.variance?.ooo}
                          trend={hotel.trend?.ooo}
                          isPositive={hotel.isPositive?.ooo}
                          isWholeNumber
                          invertColors
                        />
                      </div>
                    </TableCell>

                    {/* Comp Rooms */}
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className="font-medium">{hotel.compRooms ?? '-'}</div>
                        <VarianceCell
                          variance={hotel.variance?.compRooms}
                          trend={hotel.trend?.compRooms}
                          isPositive={hotel.isPositive?.compRooms}
                          isWholeNumber
                          invertColors
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {/* Portfolio Totals row (keep as-is, usually no variance) */}
                <TableRow className="bg-gray-100 dark:bg-gray-600 font-semibold border-t-2 sticky bottom-0">
                  <TableCell className="sticky left-0 bg-gray-100 dark:bg-gray-600 z-20 font-bold">
                    Portfolio Totals
                  </TableCell>

                  {/* Rooms Occupied */}
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-bold">{totals?.roomsOccupied ?? '-'}</div>
                      {/* <VarianceCell variance={null} trend={null} isWholeNumber /> */}
                    </div>
                  </TableCell>

                  {/* Room Revenue */}
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-bold">
                        {totals?.roomRevenue != null ? formatCurrency(totals.roomRevenue) : '-'}
                      </div>
                      {/* <VarianceCell variance={null} trend={null} isCurrency /> */}
                    </div>
                  </TableCell>

                  {/* Other Revenue */}
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-bold">
                        {totals?.otherRevenue != null ? formatCurrency(totals.otherRevenue) : '-'}
                      </div>
                      {/* <VarianceCell variance={null} trend={null} isCurrency /> */}
                    </div>
                  </TableCell>

                  {/* Gross Revenue */}
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-bold">
                        {totals?.grossRevenue != null ? formatCurrency(totals.grossRevenue) : '-'}
                      </div>
                      {/* <VarianceCell variance={null} trend={null} isCurrency /> */}
                    </div>
                  </TableCell>

                  {/* Occupancy (%) */}
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-bold">
                        {totals?.occupancy != null ? formatPercentage(totals.occupancy) : '-'}
                      </div>
                      {/* <VarianceCell variance={null} trend={null} isPercentage /> */}
                    </div>
                  </TableCell>

                  {/* ADR */}
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-bold">
                        {totals?.adr != null ? formatCurrency(totals.adr) : '-'}
                      </div>
                      {/* <VarianceCell variance={null} trend={null} isCurrency /> */}
                    </div>
                  </TableCell>

                  {/* RevPAR */}
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-bold">
                        {totals?.revpar != null ? formatCurrency(totals.revpar) : '-'}
                      </div>
                      {/* <VarianceCell variance={null} trend={null} isCurrency /> */}
                    </div>
                  </TableCell>

                  {/* No Show */}
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-bold">{totals?.noShow ?? '-'}</div>
                      {/* <VarianceCell variance={null} trend={null} isWholeNumber /> */}
                    </div>
                  </TableCell>

                  {/* OoO */}
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-bold">{totals?.ooo ?? '-'}</div>
                      {/* <VarianceCell variance={null} trend={null} isWholeNumber invertColors /> */}
                    </div>
                  </TableCell>

                  {/* Comp Rooms */}
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-bold">{totals?.compRooms ?? '-'}</div>
                      {/* <VarianceCell variance={null} trend={null} isWholeNumber invertColors /> */}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>

            </Table>
          </ScrollArea>
        </div>
        ))
      }
      {/* Only show table if not on custom OR both dates selected on custom */}


      {topTab === 'custom' && (!customStartDate || !customEndDate) && (
        <div className="text-gray-500 text-center font-medium mb-8">
          Please select a start and end date to display data for the selected range.
        </div>
      )}

      <Tabs value={bottomTab} onValueChange={setBottomTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="last-year">Last Year Variance</TabsTrigger>
          {/* <TabsTrigger value="budget">Budget Variance</TabsTrigger> */}
          {/* <TabsTrigger value="year-before">Year Before Last Variance</TabsTrigger> */}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default VarianceTable;
