import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateAllDaysOfMonth } from './dailyForecastUtils';
import DailyForecastTableHeaders from './DailyForecastTableHeaders';
import DailyForecastTableRow from './DailyForecastTableRow';

const DailyForecastTable = ({ selectedMonthYear, selectedHotel }) => {
  console.log('DailyForecastTable - selectedHotel:', selectedHotel);

  const [varianceTab, setVarianceTab] = useState('last-year');

  // Default to current month/year if not provided
  const currentDate = new Date();
  const monthYear = selectedMonthYear || {
    month: currentDate.getMonth(),
    year: currentDate.getFullYear()
  };

  const [dailyData, setDailyData] = useState(() =>
    generateAllDaysOfMonth(monthYear, selectedHotel)
  );

  // Regenerate data when selectedHotel or selectedMonthYear changes
  useEffect(() => {
    console.log('Regenerating daily forecast data for hotel:', selectedHotel);
    const newData = generateAllDaysOfMonth(monthYear, selectedHotel);
    setDailyData(newData);
  }, [selectedHotel, monthYear.month, monthYear.year]);

  const handleCopyFromOTB = () => {
    const updatedData = dailyData.map(row => ({
      ...row,
      transientForecast: {
        occ: row.actualOTB.occ,
        adr: row.actualOTB.adr,
        revenue: row.actualOTB.revenue
      }
    }));
    setDailyData(updatedData);
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Daily Forecast Breakdown
          {selectedHotel && ` - ${selectedHotel}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <DailyForecastTableHeaders onCopyFromOTB={handleCopyFromOTB} />
            <TableBody>
              {dailyData.map((row, index) => (
                <DailyForecastTableRow
                  key={index}
                  row={row}
                  index={index}
                  varianceType={varianceTab}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Variance Tabs at Bottom */}
        <div className="mt-6 pt-4 border-t">
          <Tabs value={varianceTab} onValueChange={setVarianceTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="last-year">Last Year Variance</TabsTrigger>
              <TabsTrigger value="same-time-last-year">Same Time Last Year Variance</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyForecastTable;
