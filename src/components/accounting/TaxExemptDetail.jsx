import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Settings, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TaxExemptDetail = ({ selectedDate }) => {
  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const generateDatesForMonth = () => {
    const { month, year } = selectedDate;
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dates = [];
    
    let lastDay = daysInMonth;
    if (year === currentYear && month === currentMonth) {
      lastDay = currentDay - 1;
    }
    
    for (let day = 1; day <= lastDay; day++) {
      const date = new Date(year, month, day);
      dates.push(formatDate(date));
    }
    
    return dates;
  };

  const generateSampleData = () => {
    const dates = generateDatesForMonth();
    
    return dates.map((date) => {
      const occupancyRevenue = Math.random() * 5000 + 2000;
      const occupancyExempted = Math.random() * 500 + 100;
      const occupancyCollected = Math.random() * 300 + 150;
      const occupancyEstimated = Math.random() * 350 + 175;
      const occupancyVariance = occupancyCollected - occupancyEstimated;

      const stateRevenue = Math.random() * 4000 + 1500;
      const stateExempted = Math.random() * 400 + 80;
      const stateCollected = Math.random() * 250 + 120;
      const stateEstimated = Math.random() * 280 + 140;
      const stateVariance = stateCollected - stateEstimated;

      return {
        date,
        occupancyTax: {
          revenue: occupancyRevenue,
          revenueExempted: occupancyExempted,
          taxCollected: occupancyCollected,
          taxEstimated: occupancyEstimated,
          taxVariance: occupancyVariance,
        },
        stateTax: {
          revenue: stateRevenue,
          revenueExempted: stateExempted,
          taxCollected: stateCollected,
          taxEstimated: stateEstimated,
          taxVariance: stateVariance,
        },
        nightlyTotalVariance: occupancyVariance + stateVariance,
      };
    });
  };

  const taxData = generateSampleData();

  const calculateTotals = () => {
    return taxData.reduce((totals, row) => ({
      occupancyTax: {
        revenue: totals.occupancyTax.revenue + row.occupancyTax.revenue,
        revenueExempted: totals.occupancyTax.revenueExempted + row.occupancyTax.revenueExempted,
        taxCollected: totals.occupancyTax.taxCollected + row.occupancyTax.taxCollected,
        taxEstimated: totals.occupancyTax.taxEstimated + row.occupancyTax.taxEstimated,
        taxVariance: totals.occupancyTax.taxVariance + row.occupancyTax.taxVariance,
      },
      stateTax: {
        revenue: totals.stateTax.revenue + row.stateTax.revenue,
        revenueExempted: totals.stateTax.revenueExempted + row.stateTax.revenueExempted,
        taxCollected: totals.stateTax.taxCollected + row.stateTax.taxCollected,
        taxEstimated: totals.stateTax.taxEstimated + row.stateTax.taxEstimated,
        taxVariance: totals.stateTax.taxVariance + row.stateTax.taxVariance,
      },
      nightlyTotalVariance: totals.nightlyTotalVariance + row.nightlyTotalVariance,
    }), {
      occupancyTax: {
        revenue: 0,
        revenueExempted: 0,
        taxCollected: 0,
        taxEstimated: 0,
        taxVariance: 0,
      },
      stateTax: {
        revenue: 0,
        revenueExempted: 0,
        taxCollected: 0,
        taxEstimated: 0,
        taxVariance: 0,
      },
      nightlyTotalVariance: 0,
    });
  };

  const totals = calculateTotals();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Tax Exempt Detail
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px] border-r">Date</TableHead>
                <TableHead className="text-center border-r" colSpan={5}>Occupancy Tax</TableHead>
                <TableHead className="text-center border-r" colSpan={5}>State Tax</TableHead>
                <TableHead className="min-w-[120px] border-r">Nightly Total Variance</TableHead>
                <TableHead className="min-w-[100px]">Actions</TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="border-r"></TableHead>
                <TableHead className="text-xs border-r">Revenue</TableHead>
                <TableHead className="text-xs border-r">Revenue Exempted</TableHead>
                <TableHead className="text-xs border-r">Tax Collected</TableHead>
                <TableHead className="text-xs border-r">Tax Estimated</TableHead>
                <TableHead className="text-xs border-r">Tax Variance</TableHead>
                <TableHead className="text-xs border-r">Revenue</TableHead>
                <TableHead className="text-xs border-r">Revenue Exempted</TableHead>
                <TableHead className="text-xs border-r">Tax Collected</TableHead>
                <TableHead className="text-xs border-r">Tax Estimated</TableHead>
                <TableHead className="text-xs border-r">Tax Variance</TableHead>
                <TableHead className="border-r"></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium border-r py-0.5 px-2">{row.date}</TableCell>
                  
                  <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(row.occupancyTax.revenue)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(row.occupancyTax.revenueExempted)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(row.occupancyTax.taxCollected)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(row.occupancyTax.taxEstimated)}</TableCell>
                  <TableCell className={`text-right font-medium border-r py-0.5 px-2 ${
                    row.occupancyTax.taxVariance < 0 ? 'text-destructive' : 'text-primary'
                  }`}>
                    {formatCurrency(row.occupancyTax.taxVariance)}
                  </TableCell>
                  
                  <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(row.stateTax.revenue)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(row.stateTax.revenueExempted)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(row.stateTax.taxCollected)}</TableCell>
                  <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(row.stateTax.taxEstimated)}</TableCell>
                  <TableCell className={`text-right font-medium border-r py-0.5 px-2 ${
                    row.stateTax.taxVariance < 0 ? 'text-destructive' : 'text-primary'
                  }`}>
                    {formatCurrency(row.stateTax.taxVariance)}
                  </TableCell>
                  
                  <TableCell className={`text-right font-medium border-r py-0.5 px-2 ${
                    row.nightlyTotalVariance < 0 ? 'text-destructive' : 'text-primary'
                  }`}>
                    {formatCurrency(row.nightlyTotalVariance)}
                  </TableCell>
                  
                  <TableCell className="py-0.5 px-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        title="Add Tax Exempt Adjustments"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        title="Add Comment"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              <TableRow className="border-t-2 font-bold bg-muted/50">
                <TableCell className="font-bold border-r py-0.5 px-2">Total</TableCell>
                
                <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(totals.occupancyTax.revenue)}</TableCell>
                <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(totals.occupancyTax.revenueExempted)}</TableCell>
                <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(totals.occupancyTax.taxCollected)}</TableCell>
                <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(totals.occupancyTax.taxEstimated)}</TableCell>
                <TableCell className={`text-right font-bold border-r py-0.5 px-2 ${
                  totals.occupancyTax.taxVariance < 0 ? 'text-destructive' : 'text-primary'
                }`}>
                  {formatCurrency(totals.occupancyTax.taxVariance)}
                </TableCell>
                
                <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(totals.stateTax.revenue)}</TableCell>
                <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(totals.stateTax.revenueExempted)}</TableCell>
                <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(totals.stateTax.taxCollected)}</TableCell>
                <TableCell className="text-right border-r py-0.5 px-2">{formatCurrency(totals.stateTax.taxEstimated)}</TableCell>
                <TableCell className={`text-right font-bold border-r py-0.5 px-2 ${
                  totals.stateTax.taxVariance < 0 ? 'text-destructive' : 'text-primary'
                }`}>
                  {formatCurrency(totals.stateTax.taxVariance)}
                </TableCell>
                
                <TableCell className={`text-right font-bold border-r py-0.5 px-2 ${
                  totals.nightlyTotalVariance < 0 ? 'text-destructive' : 'text-primary'
                }`}>
                  {formatCurrency(totals.nightlyTotalVariance)}
                </TableCell>
                
                <TableCell className="py-0.5 px-2"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxExemptDetail;