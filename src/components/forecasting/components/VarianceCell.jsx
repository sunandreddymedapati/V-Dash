import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercentage, formatNumber } from '../utils/revenueForecastUtils';

const VarianceCell = ({ 
  variance,        // pass API variance string or number
  trend,           // "up" | "down" | "flat"
  isPositive,      // boolean from API
  isCurrency = false, 
  isPercentage = false,
  isWholeNumber = false,
  invertColors = false
}) => {
  if (variance == null || variance === 'No data') {
    return <div className="text-xs text-gray-400">–</div>;
  }

  // normalize variance value (strip $ and % if present)
  let rawValue = variance;
  if (typeof rawValue === 'string') {
    rawValue = rawValue.replace(/[^0-9.-]+/g, '');
  }
  const numericValue = parseFloat(rawValue);

  // Decide color logic (invert if OoO/Comp Rooms)
  const colorLogic = invertColors ? !isPositive : isPositive;

  const formatValue = (val) => {
    if (isCurrency) {
      return formatCurrency(Math.abs(val));
    } else if (isPercentage) {
      return formatPercentage(Math.abs(val));
    } else if (isWholeNumber) {
      return Math.round(Math.abs(val)).toString();
    } else {
      return formatNumber(Math.abs(val));
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="text-center">
        <div className={`flex items-center justify-center space-x-1 ${colorLogic ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? (
            <TrendingUp className="w-2.5 h-2.5" />
          ) : trend === 'down' ? (
            <TrendingDown className="w-2.5 h-2.5" />
          ) : null}
          <span className="text-xs font-medium">{formatValue(numericValue)}</span>
        </div>
      </div>
    </div>
  );
};

export default VarianceCell;
