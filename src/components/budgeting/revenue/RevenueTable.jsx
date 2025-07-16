import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import HotelInfoSection from './HotelInfoSection';
import RevenueTableHeader from './RevenueTableHeader';
import RevenueRow from './RevenueRow';
import OccupancyRow from './OccupancyRow';
import TotalRow from './TotalRow';
import SectionHeader from './SectionHeader';
import { REVENUE_CATEGORIES } from './RevenueConstants';

function RevenueTable({ 
  revenueData, 
  totalRooms,
  onValueChange,
  onTotalRoomsChange
}) {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
      <CardContent className="p-0">
        <HotelInfoSection 
          totalRooms={totalRooms}
          onTotalRoomsChange={onTotalRoomsChange}
        />

        <div className="overflow-x-auto">
          <Table>
            <RevenueTableHeader />
            <TableBody>
              {/* Room Revenue Categories */}
              {REVENUE_CATEGORIES.filter(cat => cat.type === 'room').map((category) => (
                <RevenueRow
                  key={category.id}
                  category={category}
                  revenueData={revenueData}
                  onValueChange={onValueChange}
                />
              ))}

              {/* Room Revenue Total */}
              <TotalRow
                title="Room Revenue"
                type="room"
                revenueData={revenueData}
              />

              {/* Occupancy Row */}
              <OccupancyRow
                revenueData={revenueData}
                onValueChange={onValueChange}
              />

              {/* F&B Revenue Header */}
              <SectionHeader title="F&B Revenue" />

              {/* F&B Revenue Categories */}
              {REVENUE_CATEGORIES.filter(cat => cat.type === 'fb').map((category) => (
                <RevenueRow
                  key={category.id}
                  category={category}
                  revenueData={revenueData}
                  onValueChange={onValueChange}
                  bgColorClass="bg-green-50/50 border-l border-green-200"
                />
              ))}

              {/* Total F&B Revenue */}
              <TotalRow
                title="Total F&B Revenue"
                type="fb"
                revenueData={revenueData}
                bgColor="bg-green-50"
                textColor="text-green-900"
              />

              {/* Other Revenue Categories */}
              {REVENUE_CATEGORIES.filter(cat => cat.type === 'other').map((category) => (
                <RevenueRow
                  key={category.id}
                  category={category}
                  revenueData={revenueData}
                  onValueChange={onValueChange}
                />
              ))}

              {/* Room & Other Revenue Total */}
              <TotalRow
                title="Room & Other Revenue"
                type={['room', 'other']}
                revenueData={revenueData}
              />
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default RevenueTable;
