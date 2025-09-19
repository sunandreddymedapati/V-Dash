import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePropertyStore } from '@/store/propertyStore';

const RevenueKPITable = ({
  properties,
  columns,
  generateData,
  selectedKPI, // NEW: to decide formatting
}) => {
  const storeProperties = usePropertyStore((s) => s.properties);

  const formatProperty = React.useCallback(
    (propertyName) => {
      const match = Array.isArray(storeProperties)
        ? storeProperties.find(p => p?.name === propertyName)
        : undefined;
      return match && typeof match.rooms === 'number'
        ? `${match.name} (${match.rooms})`
        : propertyName;
    },
    [storeProperties]
  );

  // Minimal formatting helpers (currency/percentage)
  const toNumber = (v) => {
    if (v === null || v === undefined || v === '') return null;
    if (typeof v === 'number') return Number.isFinite(v) ? v : null;
    const n = Number(String(v).replace(/[^0-9.-]+/g, ''));
    return Number.isFinite(n) ? n : null;
  };

  const formatCurrency = (v) => {
    const n = toNumber(v);
    if (n === null) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  };

  const formatPercentage = (v) => {
    let n = toNumber(v);
    if (n === null) return '';
    // If API sends 0-1, convert to %
    if (n > 0 && n <= 1) n = n * 100;
    return `${n.toFixed(2)}%`;
  };

  const KPI_FORMAT = {
    total_revenue: 'currency',
    room_revenue: 'currency',
    other_revenue: 'currency',
    revpar: 'currency',
    adr: 'currency',
    cash: 'currency',
    bank_cards: 'currency',
    tax: 'currency',
    city_ledger: 'currency',
    guest_ledger: 'currency',
    occupancy: 'percentage',
  };

  const formatValue = React.useCallback(
    (raw) => {
      const kind = KPI_FORMAT[selectedKPI];
      if (kind === 'currency') return formatCurrency(raw);
      if (kind === 'percentage') return formatPercentage(raw);
      return raw ?? '';
    },
    [selectedKPI]
  );

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full">
        <div className="max-h-[420px] overflow-y-auto">
          <Table className="w-full">
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead className="sticky left-0 bg-white z-20 min-w-[200px] border-r">
                  Property Name
                </TableHead>
                {columns.map((column) => (
                  <TableHead key={column.key} className="text-center min-w-[100px] whitespace-nowrap">
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property, index) => (
                <TableRow key={index}>
                  <TableCell className="sticky left-0 bg-white z-10 font-medium border-r">
                    {formatProperty(property)}
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.key} className="text-center">
                      {formatValue(generateData(property, column.key))}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RevenueKPITable;
