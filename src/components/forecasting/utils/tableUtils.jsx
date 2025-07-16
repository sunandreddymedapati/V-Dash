import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export const hotelOptions = [
  { value: 'hotel1', label: 'Grand Plaza Hotel – GPH001' },
  { value: 'hotel2', label: 'City Center Inn – CCI002' },
  { value: 'hotel3', label: 'Oceanview Resort – OVR003' }
];

export const yearOptions = [
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' }
];

/**
 * @typedef {Object} VarianceCellProps
 * @property {number} actual
 * @property {number} comparison
 */

/**
 * Renders a variance cell with up/down trend icon and percentage.
 * @param {VarianceCellProps} props
 */
export function VarianceCell({ actual, comparison }) {
  const variance = ((actual - comparison) / comparison) * 100;
  const roundedVariance = Math.round(variance * 100) / 100;
  const isPositive = roundedVariance >= 0;

  return (
    <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
      {isPositive ? (
        <TrendingUp className="w-3 h-3" />
      ) : (
        <TrendingDown className="w-3 h-3" />
      )}
      <span className="font-medium">
        {isPositive ? '+' : ''}
        {roundedVariance.toFixed(1)}%
      </span>
    </div>
  );
}
