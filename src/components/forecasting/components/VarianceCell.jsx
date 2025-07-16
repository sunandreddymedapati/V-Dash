import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { calculateVariance, formatCurrency, formatPercentage, formatNumber } from '../utils/revenueForecastUtils';

const VarianceCell = ({ 
  actual, 
  comparison, 
  isCurrency = false, 
  isPercentage = false,
  isWholeNumber = false,
  invertColors = false
}) => {
  console.log('VarianceCell calculating variance:', { actual, comparison, isCurrency, isPercentage });
  
  try {
    const { difference, percentChange } = calculateVariance(actual, comparison);
    const isPositive = difference >= 0;
    
    const colorLogic = invertColors ? !isPositive : isPositive;
    
    const formatDifferenceValue = (value) => {
      if (isCurrency) {
        return formatCurrency(Math.abs(value));
      } else if (isPercentage) {
        return formatPercentage(Math.abs(value));
      } else if (isWholeNumber) {
        return Math.round(Math.abs(value)).toString();
      } else {
        return formatNumber(Math.abs(value));
      }
    };
    
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="text-center">
          <div className={`flex items-center justify-center space-x-1 ${colorLogic ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
            <span className="text-xs font-medium">
              {formatDifferenceValue(difference)}
            </span>
          </div>
          <div className={`text-xs ${colorLogic ? 'text-green-500' : 'text-red-500'}`}>
            {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(1)}%
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in VarianceCell:', error);
    return (
      <div className="text-xs text-red-500">
        Error calculating variance
      </div>
    );
  }
};

export default VarianceCell;
