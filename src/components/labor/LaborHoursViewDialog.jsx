import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const LaborHoursViewDialog = ({
  open,
  onOpenChange,
  employeeData
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Labor Hours Details</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow className="h-8">
                <TableHead className="w-48 px-2 py-1 text-sm">Employee Name</TableHead>
                <TableHead className="w-32 px-2 py-1 text-sm">Department</TableHead>
                <TableHead className="w-24 px-2 py-1 text-right text-sm">Regular Hours</TableHead>
                <TableHead className="w-24 px-2 py-1 text-right text-sm">Overtime Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeData.map((employee, index) => (
                <TableRow key={index} className="h-8">
                  <TableCell className="font-medium px-2 py-1 text-sm">{employee.name}</TableCell>
                  <TableCell className="px-2 py-1 text-sm">Housekeeping</TableCell>
                  <TableCell className="text-right px-2 py-1 text-sm">{employee.regular.toFixed(1)}</TableCell>
                  <TableCell className="text-right px-2 py-1 text-sm">{employee.overtime.toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LaborHoursViewDialog;
