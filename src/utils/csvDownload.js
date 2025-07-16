export const downloadLaborHoursCSV = (employeeData) => {
  const headers = ['Employee Name', 'Department', 'Regular Hours', 'Overtime Hours'];

  // Escape CSV values with quotes if they contain commas or quotes
  const escapeCsvValue = (value) => `"${value.replace(/"/g, '""')}"`;

  const csvRows = employeeData.map(employee => [
    escapeCsvValue(employee.name),
    'Housekeeping', // Default department
    employee.regular.toString(),
    employee.overtime.toString()
  ]);

  const csvContent = [headers, ...csvRows]
    .map(row => row.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `labor_hours_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
