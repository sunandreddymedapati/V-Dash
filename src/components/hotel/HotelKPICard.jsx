import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const HotelKPICard = ({
  title,
  value,
  variance,
  trend,
  isPositive,
  loading = false,
  varianceSuffix = "LYV",
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <Skeleton className="h-4 w-24 mb-3" />
        <Skeleton className="h-8 w-16 mb-2" />
        <Skeleton className="h-4 w-20" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border bg-white p-6 shadow-lg cursor-pointer transition-colors duration-200 hover:bg-blue-50 hover:shadow-xl",
        isPositive ? "hover:border-green-400" : "hover:border-red-400"
      )}
    >
      <div className="flex items-start justify-between min-h-[96px]">
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-700 mb-2">{title}</h3>
          <p className="text-2xl font-extrabold text-gray-900 mb-1">{value}</p>
          <div className="flex items-center space-x-1">
            {trend === 'up' ? (
              <TrendingUp className={cn("w-4 h-4", isPositive ? "text-green-500" : "text-red-500")} />
            ) : (
              <TrendingDown className={cn("w-4 h-4", isPositive ? "text-green-500" : "text-red-500")} />
            )}
            <span className={cn(
              "text-xs font-semibold",
              isPositive ? "text-green-600" : "text-red-600"
            )}>
              {variance} from {varianceSuffix}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelKPICard;
