import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency, formatPercentage, formatNumber } from '../utils/revenueForecastUtils';
import VarianceCell from './VarianceCell';

const ComparisonTable = ({
  title,
  actualData,
  comparisonData,
  actualLabel,
  comparisonLabel
}) => {
  console.log('ComparisonTable rendering with data:', { title, actualData, comparisonData });

  return (
    <Card className="bg-white rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Metric</TableHead>
              <TableHead className="text-right">{actualLabel}</TableHead>
              <TableHead className="text-right">{comparisonLabel}</TableHead>
              <TableHead className="text-right">Variance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Occupied Rooms</TableCell>
              <TableCell className="text-right">{formatNumber(actualData.occupiedRooms || 0)}</TableCell>
              <TableCell className="text-right">{formatNumber(comparisonData.occupiedRooms || 0)}</TableCell>
              <TableCell className="text-right">
                <VarianceCell
                  actual={actualData.occupiedRooms || 0}
                  comparison={comparisonData.occupiedRooms || 0}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Occupancy %</TableCell>
              <TableCell className="text-right">{formatPercentage(actualData.occupancyPercent || 0)}</TableCell>
              <TableCell className="text-right">{formatPercentage(comparisonData.occupancyPercent || 0)}</TableCell>
              <TableCell className="text-right">
                <VarianceCell
                  actual={actualData.occupancyPercent || 0}
                  comparison={comparisonData.occupancyPercent || 0}
                  isPercentage
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">ADR</TableCell>
              <TableCell className="text-right">{formatCurrency(actualData.adr || 0)}</TableCell>
              <TableCell className="text-right">{formatCurrency(comparisonData.adr || 0)}</TableCell>
              <TableCell className="text-right">
                <VarianceCell
                  actual={actualData.adr || 0}
                  comparison={comparisonData.adr || 0}
                  isCurrency
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">RevPAR</TableCell>
              <TableCell className="text-right">{formatCurrency(actualData.revpar || 0)}</TableCell>
              <TableCell className="text-right">{formatCurrency(comparisonData.revpar || 0)}</TableCell>
              <TableCell className="text-right">
                <VarianceCell
                  actual={actualData.revpar || 0}
                  comparison={comparisonData.revpar || 0}
                  isCurrency
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Room Revenue</TableCell>
              <TableCell className="text-right">{formatCurrency(actualData.roomRevenue || 0)}</TableCell>
              <TableCell className="text-right">{formatCurrency(comparisonData.roomRevenue || 0)}</TableCell>
              <TableCell className="text-right">
                <VarianceCell
                  actual={actualData.roomRevenue || 0}
                  comparison={comparisonData.roomRevenue || 0}
                  isCurrency
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ComparisonTable;
