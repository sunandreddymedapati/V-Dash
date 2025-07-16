import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DepartmentTableRow from './DepartmentTableRow';

const DepartmentConfigurationTable = ({
  departments,
  departmentTypes,
  divisions,
  onUpdateDepartment,
  onDeleteDepartment,
  onToggleVisibility,
}) => {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="min-w-32 font-semibold">Department Name</TableHead>
                <TableHead className="min-w-28 font-semibold">Reference Name</TableHead>
                <TableHead className="min-w-32 font-semibold">Department Type</TableHead>
                <TableHead className="min-w-28 font-semibold">Division</TableHead>
                <TableHead className="min-w-20 font-semibold text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((department) => (
                <DepartmentTableRow
                  key={department.id}
                  department={department}
                  departmentTypes={departmentTypes}
                  divisions={divisions}
                  onUpdateDepartment={onUpdateDepartment}
                  onDeleteDepartment={onDeleteDepartment}
                  onToggleVisibility={onToggleVisibility}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentConfigurationTable;
