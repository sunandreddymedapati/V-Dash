import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Trash2, Eye, EyeOff } from 'lucide-react';

const DepartmentTableRow = ({
  department,
  departmentTypes,
  divisions,
  onUpdateDepartment,
  onDeleteDepartment,
  onToggleVisibility,
}) => {
  return (
    <TableRow className="hover:bg-gray-50/30">
      <TableCell className="p-2">
        {department.isNew ? (
          <Input
            value={department.name}
            onChange={(e) => onUpdateDepartment(department.id, 'name', e.target.value)}
            className="text-sm border-gray-200 focus:border-blue-300"
            placeholder="Enter department name"
          />
        ) : (
          <span className="text-sm font-medium">{department.name}</span>
        )}
      </TableCell>
      
      <TableCell className="p-2">
        <Input
          value={department.referenceName}
          onChange={(e) => onUpdateDepartment(department.id, 'referenceName', e.target.value)}
          className="text-sm border-gray-200 focus:border-blue-300"
        />
      </TableCell>

      <TableCell className="p-2">
        <RadioGroup
          value={department.type}
          onValueChange={(value) => onUpdateDepartment(department.id, 'type', value)}
          className="flex flex-col gap-1"
        >
          {departmentTypes.map((type) => (
            <div key={type} className="flex items-center space-x-1">
              <RadioGroupItem value={type} id={`${department.id}-${type}`} className="w-3 h-3" />
              <Label htmlFor={`${department.id}-${type}`} className="text-xs">
                {type}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </TableCell>

      <TableCell className="p-2">
        <Select
          value={department.division}
          onValueChange={(value) => onUpdateDepartment(department.id, 'division', value)}
        >
          <SelectTrigger className="text-sm h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {divisions.map((division) => (
              <SelectItem key={division} value={division}>
                {division}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell className="p-2">
        <div className="flex items-center justify-center gap-1">
          {!department.isNew && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => onToggleVisibility(department.id)}
              className="w-6 h-6 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
            >
              {department.isVisible ? (
                <Eye className="w-3 h-3" />
              ) : (
                <EyeOff className="w-3 h-3" />
              )}
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDeleteDepartment(department.id)}
            className="w-6 h-6 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default DepartmentTableRow;
