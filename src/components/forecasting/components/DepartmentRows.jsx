import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DEPARTMENTS, FORMULAS } from './laborForecastConstants';
import { calculateTotal } from './laborForecastUtils';

/**
 * @param {{
 *   days: Array<{ dayNumber: number }>,
 *   laborData: Record<string, Record<string, string>>,
 *   formulaData: Record<string, string>,
 *   onInputChange: (department: string, day: number, value: string) => void,
 *   onFormulaChange: (department: string, value: string) => void
 * }} props
 */
const DepartmentRows = ({
  days,
  laborData,
  formulaData,
  onInputChange,
  onFormulaChange
}) => {
  return (
    <>
      {DEPARTMENTS.map((department) => (
        <TableRow key={department.id} className="hover:bg-gray-50">
          <TableCell className="border-r bg-gray-50 sticky left-0 z-10 min-w-48">
            <div className="font-medium">{department.name}</div>
            <Select 
              value={formulaData[department.id] || 'Hours per day'} 
              onValueChange={(value) => onFormulaChange(department.id, value)}
            >
              <SelectTrigger className="w-full border-0 bg-transparent text-xs mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORMULAS.map((formula) => (
                  <SelectItem key={formula} value={formula}>
                    {formula}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TableCell>
          {days.map((day) => (
            <TableCell key={day.dayNumber} className="p-1 border-r">
              <Input
                type="number"
                value={laborData[department.id]?.[day.dayNumber] || '0'}
                onChange={(e) => onInputChange(department.id, day.dayNumber, e.target.value)}
                className="text-center text-sm border-0 bg-transparent focus:bg-white w-12 h-8"
                placeholder="0"
              />
            </TableCell>
          ))}
          <TableCell className="text-center text-sm font-semibold">
            {calculateTotal(laborData, department.id)}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default DepartmentRows;
