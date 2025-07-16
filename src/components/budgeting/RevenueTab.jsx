import React, { useState, useEffect } from 'react';
import RevenueHeader from './revenue/RevenueHeader';
import RevenueTable from './revenue/RevenueTable';

const RevenueTab = ({ selectedYear }) => {
  const [revenueData, setRevenueData] = useState({});
  const [totalRooms, setTotalRooms] = useState(139);

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  const revenueCategories = [
    { id: 'transient', label: 'Transient', type: 'room' },
    { id: 'group', label: 'Group', type: 'room' },
    { id: 'negotiated', label: 'Negotiated', type: 'room' },
    { id: 'discounted', label: 'Discounted', type: 'room' },
    { id: 'package', label: 'Package', type: 'room' },
    { id: 'online', label: 'Online', type: 'room' },
    { id: 'contract', label: 'Contract', type: 'room' },
    { id: 'pet-fees', label: 'Pet Fees', type: 'other' },
    { id: 'parking', label: 'Parking', type: 'other' },
    { id: 'sundries', label: 'Sundries', type: 'other' },
    { id: 'meeting-room', label: 'Meeting Room', type: 'other' },
    { id: 'breakfast', label: 'Breakfast', type: 'fb' },
    { id: 'lunch', label: 'Lunch', type: 'fb' },
    { id: 'dinner', label: 'Dinner', type: 'fb' },
    { id: 'room-service', label: 'Room Service', type: 'fb' }
  ];

  useEffect(() => {
    const initialData = {};

    // Initialize revenue categories
    revenueCategories.forEach(category => {
      initialData[category.id] = {};
      months.forEach(month => {
        initialData[category.id][month] = 0;
      });
    });

    // Initialize occupancy data
    initialData['occupancy'] = {};
    months.forEach(month => {
      initialData['occupancy'][month] = 0;
    });

    setRevenueData(initialData);
    console.log('Revenue data initialized for year:', selectedYear);
  }, [selectedYear]);

  const handleValueChange = (categoryId, month, value) => {
    const numericValue = parseFloat(value) || 0;
    setRevenueData(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [month]: numericValue
      }
    }));
  };

  const handleTotalRoomsChange = (value) => {
    setTotalRooms(value);
    console.log('Total rooms updated:', value);
  };

  return (
    <div className="space-y-6">
      <RevenueHeader selectedYear={selectedYear} />
      
      <RevenueTable 
        revenueData={revenueData}
        totalRooms={totalRooms}
        onValueChange={handleValueChange}
        onTotalRoomsChange={handleTotalRoomsChange}
      />
    </div>
  );
};

export default RevenueTab;
