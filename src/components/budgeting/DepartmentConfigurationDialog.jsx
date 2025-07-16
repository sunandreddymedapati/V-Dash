import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DepartmentConfigurationTable from './DepartmentConfigurationTable';

const DepartmentConfigurationDialog = ({ open, onOpenChange }) => {
  const [departments, setDepartments] = useState([
    {
      id: 'housekeeping',
      name: 'Housekeeping',
      referenceName: '',
      type: 'Room Attendant',
      division: 'Room',
      isVisible: true
    },
    {
      id: 'ac',
      name: 'A&C',
      referenceName: '',
      type: 'Other',
      division: 'Management',
      isVisible: true
    },
    {
      id: 'front-desk',
      name: 'Front Desk',
      referenceName: '',
      type: 'Other',
      division: 'Front Desk',
      isVisible: true
    },
    {
      id: 'food-beverage',
      name: 'Food & Beverage',
      referenceName: '',
      type: 'Other',
      division: 'F&B',
      isVisible: true
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      referenceName: '',
      type: 'Other',
      division: 'Maintenance',
      isVisible: true
    }
  ]);

  const departmentTypes = ['Other', 'Room Attendant', 'Laundry', 'Ignore'];
  const divisions = [
    'House Person',
    'Front Desk',
    'F&B',
    'Sales & Marketing',
    'Banquet',
    'Parking',
    'Management',
    'Maintenance',
    'Front of House',
    'Security',
    'Not Assigned',
    'Pool',
    'Back of House',
    'Room',
    'Laundry'
  ];

  const handleUpdateDepartment = (id, field, value) => {
    setDepartments(prev =>
      prev.map(dept =>
        dept.id === id ? { ...dept, [field]: value } : dept
      )
    );
  };

  const handleAddDepartment = () => {
    const newId = `department-${Date.now()}`;
    const newDepartment = {
      id: newId,
      name: '',
      referenceName: '',
      type: 'Other',
      division: 'Not Assigned',
      isVisible: true,
      isNew: true
    };
    setDepartments(prev => [...prev, newDepartment]);
  };

  const handleDeleteDepartment = (id) => {
    setDepartments(prev => prev.filter(dept => dept.id !== id));
  };

  const handleToggleVisibility = (id) => {
    setDepartments(prev =>
      prev.map(dept =>
        dept.id === id ? { ...dept, isVisible: !dept.isVisible } : dept
      )
    );
  };

  const handleSave = () => {
    console.log('Saving department configuration:', departments);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Department Configuration</DialogTitle>
          <DialogDescription>
            Configure department settings including names, types, and divisions.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <DepartmentConfigurationTable
            departments={departments}
            departmentTypes={departmentTypes}
            divisions={divisions}
            onUpdateDepartment={handleUpdateDepartment}
            onDeleteDepartment={handleDeleteDepartment}
            onToggleVisibility={handleToggleVisibility}
          />

          <div className="mt-4 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleAddDepartment}
              className="flex items-center gap-2 border-dashed border-2"
            >
              <Plus className="w-4 h-4" />
              Add New Department
            </Button>

            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentConfigurationDialog;
