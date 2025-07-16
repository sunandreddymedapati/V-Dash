import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Settings, Download, Printer, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { startOfMonth } from 'date-fns';

const LaborMeteringTable = ({
  selectedTab,
  setSelectedTab,
  laborMeteringData
}) => {
  const [dateRange, setDateRange] = useState({
    from: startOfMonth(new Date()),
    to: new Date()
  });

  const generateVarianceData = (baseValue, type) => {
    const variance = (Math.random() - 0.5) * 0.3;
    const varianceValue = baseValue * variance;
    const isPositive = varianceValue > 0;

    const displayValue = Math.abs(varianceValue).toFixed(2);

    return {
      value: displayValue,
      isPositive,
      isZero: Math.abs(varianceValue) < 0.01
    };
  };

  const enhancedData = laborMeteringData.map(dept => ({
    ...dept,
    hoursVariance: generateVarianceData(dept.hours, 'hours'),
    costVariance: generateVarianceData(dept.cost, 'cost'),
    revenuePercentVariance: generateVarianceData(dept.revenuePercent, 'percent'),
    mprVariance: dept.mpr > 0 ? generateVarianceData(dept.mpr, 'mpr') : null,
    costPerRoomVariance: generateVarianceData(dept.costPerRoom, 'cost'),
  }));

  const totalLabor = laborMeteringData.reduce((acc, curr) => ({
    hours: acc.hours + curr.hours,
    cost: acc.cost + curr.cost,
    revenuePercent: acc.revenuePercent + curr.revenuePercent,
    mpr: 0,
    costPerRoom: acc.costPerRoom + curr.costPerRoom
  }), { hours: 0, cost: 0, revenuePercent: 0, mpr: 0, costPerRoom: 0 });

  const totalVariances = {
    hours: generateVarianceData(totalLabor.hours, 'hours'),
    cost: generateVarianceData(totalLabor.cost, 'cost'),
    revenuePercent: generateVarianceData(totalLabor.revenuePercent, 'percent'),
    costPerRoom: generateVarianceData(totalLabor.costPerRoom, 'cost'),
  };

  const VarianceBadge = ({ variance, prefix = '', suffix = '' }) => {
    if (!variance || variance.isZero) {
      return (
        <span className="inline-block bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded font-medium ml-2">
          0.00
        </span>
      );
    }

    const bgColor = variance.isPositive ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
    const sign = variance.isPositive ? '+' : '-';

    return (
      <span className={`inline-block ${bgColor} text-xs px-1 py-0.5 rounded font-medium ml-2`}>
        {sign}{prefix}{variance.value}{suffix}
      </span>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Labor Metering</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="p-2" title="Download Daily Labor Tracking File">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="p-2" title="Department Configuration">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="p-2" title="Configure Employee Wages">
              <Banknote className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="p-2" title="Print">
              <Printer className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          {['Daily', 'MTD', 'YTD', 'Custom Dates'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                selectedTab === tab
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {selectedTab === 'Custom Dates' && (
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Date Range:</span>
            <DateRangePicker
              date={dateRange}
              onDateChange={setDateRange}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="bg-blue-100 h-8">
                <TableHead className="sticky left-0 bg-blue-100 font-semibold text-gray-700 min-w-[100px] text-xs px-2">
                  Department
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-700 min-w-[80px] text-xs px-2">Hours</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 min-w-[90px] text-xs px-2">Cost</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 min-w-[90px] text-xs px-2">% of Revenue</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 min-w-[120px] text-xs px-2">Minutes Per Occupied Room</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 min-w-[120px] text-xs px-2">Cost per Occupied Room</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enhancedData.map((dept, index) => (
                <TableRow key={dept.department} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} h-10`}>
                  <TableCell className="sticky left-0 bg-inherit font-medium min-w-[100px] text-sm px-2">
                    {dept.department}
                  </TableCell>
                  <TableCell className="text-center px-2">
                    <div className="flex items-center justify-center">
                      <span className="font-medium text-sm">{dept.hours.toFixed(2)}</span>
                      <VarianceBadge variance={dept.hoursVariance} />
                    </div>
                  </TableCell>
                  <TableCell className="text-center px-2">
                    <div className="flex items-center justify-center">
                      <span className="font-medium text-sm">${dept.cost.toFixed(2)}</span>
                      <VarianceBadge variance={dept.costVariance} prefix="$" />
                    </div>
                  </TableCell>
                  <TableCell className="text-center px-2">
                    <div className="flex items-center justify-center">
                      <span className="font-medium text-sm">{dept.revenuePercent.toFixed(2)}%</span>
                      <VarianceBadge variance={dept.revenuePercentVariance} />
                    </div>
                  </TableCell>
                  <TableCell className="text-center px-2">
                    <div className="flex items-center justify-center">
                      <span className="font-medium text-sm">{dept.mpr > 0 ? dept.mpr.toFixed(2) : '0.00'}</span>
                      {dept.mprVariance && <VarianceBadge variance={dept.mprVariance} />}
                      {!dept.mprVariance && <span className="inline-block bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded font-medium ml-2">0.00</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-center px-2">
                    <div className="flex items-center justify-center">
                      <span className="font-medium text-sm">${dept.costPerRoom.toFixed(2)}</span>
                      <VarianceBadge variance={dept.costPerRoomVariance} prefix="$" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Division Section */}
        <div className="mt-4">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="bg-blue-100 h-8">
                <TableHead className="sticky left-0 bg-blue-100 font-semibold text-gray-700 min-w-[100px] text-xs px-2">
                  Division 🛈
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-700 min-w-[80px] text-xs px-2">Hours</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 min-w-[90px] text-xs px-2">Cost</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 min-w-[90px] text-xs px-2">% of Revenue</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 min-w-[120px] text-xs px-2">Minutes Per Occupied Room</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 min-w-[120px] text-xs px-2">Cost per Occupied Room</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enhancedData.map((dept, index) => (
                <TableRow key={`division-${dept.department}`} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} h-10`}>
                  <TableCell className="sticky left-0 bg-inherit font-medium min-w-[100px] text-sm px-2">
                    {dept.department === 'Housekeeping' ? 'Room' : dept.department}
                  </TableCell>
                  <TableCell className="text-center px-2">
                    <div className="flex items-center justify-center">
                      <span className="font-medium text-sm">{dept.hours.toFixed(2)}</span>
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded font-medium ml-2">0.00</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center px-2">
                    <div className="flex items-center justify-center">
                      <span className="font-medium text-sm">${dept.cost.toFixed(2)}</span>
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded font-medium ml-2">0.00</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center px-2">
                    <div className="flex items-center justify-center">
                      <span className="font-medium text-sm">{dept.revenuePercent.toFixed(2)}%</span>
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded font-medium ml-2">0.00</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center px-2">
                    <div className="flex items-center justify-center">
                      <span className="font-medium text-sm">{dept.mpr > 0 ? dept.mpr.toFixed(2) : '0.00'}</span>
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded font-medium ml-2">0.00</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center px-2">
                    <div className="flex items-center justify-center">
                      <span className="font-medium text-sm">${dept.costPerRoom.toFixed(2)}</span>
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded font-medium ml-2">0.00</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow className="border-t-2 border-gray-300 bg-gray-100 font-semibold h-10">
                <TableCell className="sticky left-0 bg-gray-100 font-bold text-sm px-2">TOTAL</TableCell>
                <TableCell className="text-center px-2">
                  <div className="flex items-center justify-center">
                    <span className="font-bold text-sm">{totalLabor.hours.toFixed(2)}</span>
                    <VarianceBadge variance={totalVariances.hours} />
                  </div>
                </TableCell>
                <TableCell className="text-center px-2">
                  <div className="flex items-center justify-center">
                    <span className="font-bold text-sm">${totalLabor.cost.toFixed(2)}</span>
                    <VarianceBadge variance={totalVariances.cost} prefix="$" />
                  </div>
                </TableCell>
                <TableCell className="text-center px-2">
                  <div className="flex items-center justify-center">
                    <span className="font-bold text-sm">{totalLabor.revenuePercent.toFixed(2)}%</span>
                    <VarianceBadge variance={totalVariances.revenuePercent} />
                  </div>
                </TableCell>
                <TableCell className="text-center px-2">
                  <div className="flex items-center justify-center">
                    <span className="font-bold text-sm">{(totalLabor.hours * 60 / 100).toFixed(2)}</span>
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded font-medium ml-2">0.00</span>
                  </div>
                </TableCell>
                <TableCell className="text-center px-2">
                  <div className="flex items-center justify-center">
                    <span className="font-bold text-sm">${totalLabor.costPerRoom.toFixed(2)}</span>
                    <VarianceBadge variance={totalVariances.costPerRoom} prefix="$" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="p-3 text-xs text-gray-500 bg-gray-50">
          <p>• Map your hotel department names to standard departments using gear icon.</p>
          <p>• For MPR graphs, use Room Attendant department for Housekeeping staff.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LaborMeteringTable;
