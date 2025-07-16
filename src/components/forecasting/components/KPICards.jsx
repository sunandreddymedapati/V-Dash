import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercentage, formatNumber, calculateVariance } from '../utils/revenueForecastUtils';

/**
 * @param {{
 *   kpiData?: {
 *     forecast?: any,
 *     budget?: any,
 *     actualOTB?: any,
 *     projectedEOM?: any,
 *     actualBudget?: any
 *   },
 *   loading?: boolean
 * }} props
 */
const KPICards = ({ kpiData, loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {/* First Row - 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="bg-white rounded-xl shadow-sm">
              <CardContent className="p-6">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Second Row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i + 2} className="bg-white rounded-xl shadow-sm">
              <CardContent className="p-6">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const renderVarianceIndicator = (actual, forecast, isCurrency = false, isPercentage = false) => {
    const { difference, percentChange } = calculateVariance(actual, forecast);
    const isPositive = difference >= 0;

    const formatValue = (value) => {
      if (isCurrency) return formatCurrency(Math.abs(value));
      if (isPercentage) return formatPercentage(Math.abs(value));
      return formatNumber(Math.abs(value));
    };

    return (
      <div className="mt-1 flex items-center justify-center space-x-1">
        <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span className="text-xs font-medium">
            {formatValue(difference)}
          </span>
        </div>
        <div className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          ({percentChange >= 0 ? '+' : ''}{percentChange.toFixed(1)}%)
        </div>
      </div>
    );
  };

  const firstRowSections = [
    { title: 'Forecast', data: kpiData?.forecast, color: 'bg-blue-100 border-blue-200', showVariance: false },
    { title: 'Budget', data: kpiData?.budget, color: 'bg-purple-100 border-purple-200', showVariance: false }
  ];

  const secondRowSections = [
    { title: 'Actual v. Forecast', data: kpiData?.actualOTB, color: 'bg-green-100 border-green-200', showVariance: true, compareData: kpiData?.forecast },
    { title: 'Projected EOM v. Budget', data: kpiData?.projectedEOM, color: 'bg-orange-100 border-orange-200', showVariance: true, compareData: kpiData?.budget },
    { title: 'Actual v. Budget', data: kpiData?.actualBudget, color: 'bg-gray-100 border-gray-200', showVariance: true, compareData: kpiData?.budget }
  ];

  const renderKPICard = (section, index) => (
    <Card key={index} className={`${section.color} border`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-center underline">{section.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-center">
          <div className="text-xs text-gray-600">Occupied Rooms</div>
          <div className="font-semibold">{formatNumber(section.data?.occupiedRooms || 0)}</div>
          {section.showVariance && section.compareData && (
            renderVarianceIndicator(section.data?.occupiedRooms || 0, section.compareData?.occupiedRooms || 0)
          )}
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600">Occupancy %</div>
          <div className="font-semibold">{formatPercentage(section.data?.occupancyPercent || 0)}</div>
          {section.showVariance && section.compareData && (
            renderVarianceIndicator(section.data?.occupancyPercent || 0, section.compareData?.occupancyPercent || 0, false, true)
          )}
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600">ADR</div>
          <div className="font-semibold">{formatCurrency(section.data?.adr || 0)}</div>
          {section.showVariance && section.compareData && (
            renderVarianceIndicator(section.data?.adr || 0, section.compareData?.adr || 0, true)
          )}
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600">RevPAR</div>
          <div className="font-semibold">{formatCurrency(section.data?.revpar || 0)}</div>
          {section.showVariance && section.compareData && (
            renderVarianceIndicator(section.data?.revpar || 0, section.compareData?.revpar || 0, true)
          )}
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600">Room Revenue</div>
          <div className="font-semibold">{formatCurrency(section.data?.roomRevenue || 0)}</div>
          {section.showVariance && section.compareData && (
            renderVarianceIndicator(section.data?.roomRevenue || 0, section.compareData?.roomRevenue || 0, true)
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      {/* First Row - Forecast and Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {firstRowSections.map((section, index) => renderKPICard(section, index))}
      </div>

      {/* Second Row - Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {secondRowSections.map((section, index) => renderKPICard(section, index))}
      </div>
    </div>
  );
};

export default KPICards;
