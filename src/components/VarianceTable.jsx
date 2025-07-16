import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Download, CalendarIcon } from 'lucide-react';
import VarianceCell from './forecasting/components/VarianceCell';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import PROPERTIES from '../constants/properties';
import { getPropertyWithRooms } from '../constants/properties';

const VarianceTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [topTab, setTopTab] = useState('daily');
  const [bottomTab, setBottomTab] = useState('last-year');
  const [customStartDate, setCustomStartDate] = useState();
  const [customEndDate, setCustomEndDate] = useState();
  const [startPickerOpen, setStartPickerOpen] = useState(false);
  const [endPickerOpen, setEndPickerOpen] = useState(false);

  useEffect(() => {
    if (topTab !== 'custom') {
      setCustomStartDate(undefined);
      setCustomEndDate(undefined);
    }
  }, [topTab]);

  const getTableData = () => {
    const baseData = PROPERTIES.map((name, i) => ({
      name,
      roomsOccupied: 150 + (i % 10) * 5,
      roomRevenue: 40000 + (i % 7) * 3500,
      fnbRevenue: 10000 + (i % 4) * 2000,
      otherRevenue: 2500 + (i % 3) * 1000,
      grossRevenue: 52500 + (i % 8) * 5000,
      occupancy: 80 + (i % 5) * 3,
      adr: 265 + (i % 6) * 10,
      revpar: 220 + (i % 7) * 7,
      noShow: 3 + (i % 4),
      ooo: 2 + (i % 3),
      compRooms: 6 + (i % 3)
    }));

    const multipliers = {
      daily: 1,
      mtd: 8.5,
      ytd: 95,
      custom: 15
    };

    let multiplier = multipliers[topTab];

    if (topTab === "custom" && customStartDate && customEndDate) {
      const days = (customEndDate.getTime() - customStartDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
      multiplier = days > 0 ? days : 1;
    }

    return baseData.map(hotel => ({
      ...hotel,
      roomsOccupied: Math.round(hotel.roomsOccupied * multiplier),
      roomRevenue: Math.round(hotel.roomRevenue * multiplier),
      fnbRevenue: Math.round(hotel.fnbRevenue * multiplier),
      otherRevenue: Math.round(hotel.otherRevenue * multiplier),
      grossRevenue: Math.round(hotel.grossRevenue * multiplier),
      noShow: Math.round(hotel.noShow * multiplier),
      ooo: Math.round(hotel.ooo * multiplier),
      compRooms: Math.round(hotel.compRooms * multiplier),
    }));
  };

  const getComparisonData = (actualValue) => {
    const variations = {
      'last-year': 0.92,
      'budget': 1.05,
      'year-before': 0.85
    };
    return actualValue * variations[bottomTab];
  };

  const canShowTable = topTab !== 'custom' || (topTab === 'custom' && customStartDate && customEndDate);

  const tableData = canShowTable
    ? getTableData().filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totals = tableData.reduce((acc, hotel) => ({
    roomsOccupied: acc.roomsOccupied + hotel.roomsOccupied,
    roomRevenue: acc.roomRevenue + hotel.roomRevenue,
    fnbRevenue: acc.fnbRevenue + hotel.fnbRevenue,
    otherRevenue: acc.otherRevenue + hotel.otherRevenue,
    grossRevenue: acc.grossRevenue + hotel.grossRevenue,
    occupancy: acc.occupancy + hotel.occupancy,
    adr: acc.adr + hotel.adr,
    revpar: acc.revpar + hotel.revpar,
    noShow: acc.noShow + hotel.noShow,
    ooo: acc.ooo + hotel.ooo,
    compRooms: acc.compRooms + hotel.compRooms,
  }), {
    roomsOccupied: 0, roomRevenue: 0, fnbRevenue: 0, otherRevenue: 0, grossRevenue: 0,
    occupancy: 0, adr: 0, revpar: 0, noShow: 0, ooo: 0, compRooms: 0
  });

  totals.occupancy = totals.occupancy / tableData.length;
  totals.adr = totals.adr / tableData.length;
  totals.revpar = totals.revpar / tableData.length;

  const downloadCSV = () => {
    const headers = [
      'Name', 'Rooms Occupied', 'Room Revenue', 'F&B Revenue', 'Other Revenue',
      'Gross Revenue', 'Occupancy (%)', 'ADR', 'RevPAR', 'No Show', 'OoO', 'Comp Rooms'
    ];

    const csvContent = [
      headers.join(','),
      ...tableData.map(row => [
        `"${row.name}"`, row.roomsOccupied, row.roomRevenue, row.fnbRevenue,
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

  const formatCurrency = (value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatPercentage = (value) => `${value.toFixed(1)}%`;

  return (
    <>
      {/* Your big JSX return remains exactly the same as you shared. */}
      {/* The only change was to remove the TypeScript type from the function declaration. */}
    </>
  );
};

export default VarianceTable;
