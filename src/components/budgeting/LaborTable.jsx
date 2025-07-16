import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const DEPARTMENTS = [
  'A&G',
  'Food & Beverage', 
  'Front Desk',
  'Housekeeping',
  'Maintenance'
];

const LaborTable = ({ selectedYear }) => {
  const [laborData, setLaborData] = useState({});
  const [formulaData, setFormulaData] = useState({});

  const handleInputChange = (department, month, value) => {
    setLaborData(prev => ({
      ...prev,
      [department]: {
        ...prev[department],
        [month]: value
      }
    }));
  };

  const handleFormulaChange = (department, value) => {
    setFormulaData(prev => ({
      ...prev,
      [department]: value
    }));
  };

  const renderDepartmentRows = (department) => (
    <>
      {/* Main department row */}
      <TableRow className="border-b">
        <TableCell className="font-medium bg-gray-50 border-r">{department}</TableCell>
        <TableCell className="bg-gray-50 border-r">
          <Select value={formulaData[department] || 'Hours per day'} onValueChange={(value) => handleFormulaChange(department, value)}>
            <SelectTrigger className="w-full border-0 bg-transparent">
              <SelectValue />
              <ChevronDown className="h-4 w-4 ml-2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hours per day">Hours per day</SelectItem>
              <SelectItem value="Hours per room">Hours per room</SelectItem>
              <SelectItem value="Fixed hours">Fixed hours</SelectItem>
            </SelectContent>
          </Select>
        </TableCell>
        {MONTHS.map((month) => (
          <TableCell key={month} className="p-1 border-r">
            <Input
              type="number"
              value={laborData[department]?.[month] || '0'}
              onChange={(e) => handleInputChange(department, month, e.target.value)}
              className="text-center text-sm border-0 bg-transparent focus:bg-white"
              placeholder="0"
            />
          </TableCell>
        ))}
        <TableCell className="text-center border-r">0</TableCell>
        <TableCell className="text-center">0</TableCell>
      </TableRow>
      
      {/* Advance config row */}
      <TableRow className="bg-gray-100">
        <TableCell className="border-r"></TableCell>
        <TableCell className="border-r">
          <Button variant="link" className="text-blue-600 text-sm p-0 h-auto">
            Advance config
          </Button>
        </TableCell>
        {MONTHS.map((month) => (
          <TableCell key={`${department}-advance-${month}`} className="p-1 border-r bg-gray-100">
            <Input
              type="number"
              value="0"
              className="text-center text-sm border-0 bg-gray-100"
              readOnly
            />
          </TableCell>
        ))}
        <TableCell className="text-center border-r bg-gray-100">0</TableCell>
        <TableCell className="text-center bg-gray-100">0</TableCell>
      </TableRow>
    </>
  );

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Labor Planning</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="min-w-32 font-semibold border-r">Department</TableHead>
                <TableHead className="min-w-32 font-semibold border-r">Formula</TableHead>
                {MONTHS.map((month) => (
                  <TableHead key={month} className="text-center font-semibold border-r min-w-20">
                    {month}
                  </TableHead>
                ))}
                <TableHead className="text-center font-semibold border-r min-w-24">Average $ Per Hour</TableHead>
                <TableHead className="text-center font-semibold min-w-32">Fixed Monthly Salary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEPARTMENTS.map((department) => renderDepartmentRows(department))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LaborTable;
