import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { Copy, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const PLTableRows = ({
  plData,
  expandedSections,
  onCellChange,
  onCopyAcrossMonths,
  onToggleSection
}) => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateRowTotal = (data) => {
    return data.reduce((sum, val) => sum + val, 0);
  };

  const calculateTotalRevenue = (monthIndex) => {
    return plData.roomRevenue[monthIndex] + plData.fnbRevenue[monthIndex] + plData.ancillaryRevenue[monthIndex];
  };

  const calculateTotalCogs = (monthIndex) => {
    return plData.fnbCogs[monthIndex] + plData.ancillaryCogs[monthIndex];
  };

  const calculateGrossProfit = (monthIndex) => {
    return calculateTotalRevenue(monthIndex) - calculateTotalCogs(monthIndex);
  };

  const calculateTotalOpex = (monthIndex) => {
    return plData.labor[monthIndex] +
           plData.salesMarketing[monthIndex] +
           plData.repairsMaintenance[monthIndex] +
           plData.utilities[monthIndex] +
           plData.adminGeneral[monthIndex] +
           plData.franchiseFees[monthIndex] +
           plData.otherOpex[monthIndex];
  };

  const calculateNetOperatingIncome = (monthIndex) => {
    return calculateGrossProfit(monthIndex) - calculateTotalOpex(monthIndex);
  };

  const calculateTotalNonOp = (monthIndex) => {
    return plData.propertyTaxes[monthIndex] +
           plData.insurance[monthIndex] +
           plData.capitalExpenses[monthIndex];
  };

  const calculateNetProfit = (monthIndex) => {
    return calculateNetOperatingIncome(monthIndex) - calculateTotalNonOp(monthIndex);
  };

  const EditableRow = ({
    label,
    category,
    data,
    className = "",
    copyButton = true
  }) => (
    <TableRow className={cn("hover:bg-gray-50/30", className)}>
      <TableCell className="font-medium sticky left-0 bg-white border-r border-gray-200 min-w-[200px]">
        <div className="flex items-center justify-between">
          <span>{label}</span>
          {copyButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopyAcrossMonths(category)}
              className="h-6 w-6 p-0 hover:bg-gray-100"
            >
              <Copy className="w-3 h-3" />
            </Button>
          )}
        </div>
      </TableCell>
      {data.map((value, index) => (
        <TableCell key={index} className="p-1">
          <Input
            type="text"
            value={formatCurrency(value).replace('$', '')}
            onChange={(e) => onCellChange(category, index, e.target.value)}
            className="h-8 text-right border-gray-200 text-sm"
          />
        </TableCell>
      ))}
      <TableCell className="font-semibold text-right bg-blue-50 sticky right-0 border-l border-gray-200">
        {formatCurrency(calculateRowTotal(data))}
      </TableCell>
    </TableRow>
  );

  const CalculatedRow = ({
    label,
    calculator,
    className = ""
  }) => (
    <TableRow className={cn("bg-gray-50 font-semibold", className)}>
      <TableCell className="font-semibold sticky left-0 bg-gray-50 border-r border-gray-200 min-w-[200px]">
        {label}
      </TableCell>
      {months.map((_, index) => (
        <TableCell key={index} className="text-right">
          {formatCurrency(calculator(index))}
        </TableCell>
      ))}
      <TableCell className="font-semibold text-right bg-blue-100 sticky right-0 border-l border-gray-200">
        {formatCurrency(months.reduce((sum, _, idx) => sum + calculator(idx), 0))}
      </TableCell>
    </TableRow>
  );

  const SectionHeader = ({
    title,
    section,
    className = ""
  }) => (
    <TableRow className={cn("bg-blue-600 text-white", className)}>
      <TableCell
        className="font-bold sticky left-0 bg-blue-600 border-r border-blue-500 cursor-pointer"
        onClick={() => onToggleSection(section)}
      >
        <div className="flex items-center space-x-2">
          {expandedSections[section] ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span>{title}</span>
        </div>
      </TableCell>
      <TableCell colSpan={13} className="bg-blue-600"></TableCell>
    </TableRow>
  );

  return (
    <>
      {/* REVENUE SECTION */}
      <SectionHeader title="🔹 REVENUE" section="revenue" />
      {expandedSections.revenue && (
        <>
          <EditableRow label="Room Revenue" category="roomRevenue" data={plData.roomRevenue} />
          <EditableRow label="F&B Revenue" category="fnbRevenue" data={plData.fnbRevenue} />
          <EditableRow label="Ancillary Revenue" category="ancillaryRevenue" data={plData.ancillaryRevenue} />
          <CalculatedRow
            label="Total Revenue"
            calculator={calculateTotalRevenue}
            className="bg-green-50 text-green-800"
          />
        </>
      )}

      {/* COGS SECTION */}
      <SectionHeader title="🔸 COST OF GOODS SOLD" section="cogs" />
      {expandedSections.cogs && (
        <>
          <EditableRow label="F&B COGS" category="fnbCogs" data={plData.fnbCogs} />
          <EditableRow label="Ancillary COGS" category="ancillaryCogs" data={plData.ancillaryCogs} />
          <CalculatedRow
            label="Total COGS"
            calculator={calculateTotalCogs}
            className="bg-red-50 text-red-800"
          />
        </>
      )}

      {/* GROSS PROFIT */}
      <CalculatedRow
        label="🔹 GROSS PROFIT"
        calculator={calculateGrossProfit}
        className="bg-green-100 text-green-900 font-bold"
      />

      {/* OPERATING EXPENSES SECTION */}
      <SectionHeader title="🔸 OPERATING EXPENSES" section="opex" />
      {expandedSections.opex && (
        <>
          <EditableRow label="Labor" category="labor" data={plData.labor} />
          <EditableRow label="Sales & Marketing" category="salesMarketing" data={plData.salesMarketing} />
          <EditableRow label="Repairs & Maintenance" category="repairsMaintenance" data={plData.repairsMaintenance} />
          <EditableRow label="Utilities" category="utilities" data={plData.utilities} />
          <EditableRow label="Admin & General" category="adminGeneral" data={plData.adminGeneral} />
          <EditableRow label="Franchise Fees" category="franchiseFees" data={plData.franchiseFees} />
          <EditableRow label="Other Operating Expenses" category="otherOpex" data={plData.otherOpex} />
          <CalculatedRow
            label="Total Operating Expenses"
            calculator={calculateTotalOpex}
            className="bg-red-50 text-red-800"
          />
        </>
      )}

      {/* NET OPERATING INCOME */}
      <CalculatedRow
        label="🔹 NET OPERATING INCOME"
        calculator={calculateNetOperatingIncome}
        className="bg-blue-100 text-blue-900 font-bold"
      />

      {/* NON-OPERATING COSTS SECTION */}
      <SectionHeader title="🔸 NON-OPERATING COSTS" section="nonop" />
      {expandedSections.nonop && (
        <>
          <EditableRow label="Property Taxes" category="propertyTaxes" data={plData.propertyTaxes} />
          <EditableRow label="Insurance" category="insurance" data={plData.insurance} />
          <EditableRow label="Capital Expenses" category="capitalExpenses" data={plData.capitalExpenses} />
          <CalculatedRow
            label="Total Non-Operating Costs"
            calculator={calculateTotalNonOp}
            className="bg-red-50 text-red-800"
          />
        </>
      )}

      {/* NET PROFIT */}
      <CalculatedRow
        label="🔹 NET PROFIT"
        calculator={calculateNetProfit}
        className="bg-green-200 text-green-900 font-bold text-lg"
      />
    </>
  );
};

export default PLTableRows;
