import { format } from 'date-fns';
import PROPERTIES from '../constants/properties';

export const generateColumns = ({
  selectedTimeframe,
  monthYear,
  today = new Date()
}) => {
  const monthYearRequired = ["mtd", "ytd", "trailing-12", "last-3-years"].includes(selectedTimeframe);
  const baseDate = monthYearRequired
    ? new Date(monthYear.year, monthYear.month, today.getDate())
    : today;

  switch (selectedTimeframe) {
    case 'last-15-days':
      return Array.from({ length: 15 }, (_, i) => {
        const date = new Date(baseDate);
        date.setDate(date.getDate() - (14 - i));
        return {
          key: format(date, 'yyyy-MM-dd'),
          label: format(date, 'MM/dd')
        };
      });
    case 'mtd': {
      const startOfCurrentMonth = new Date(monthYear.year, monthYear.month, 1);
      const endDate = (monthYear.year === today.getFullYear() && monthYear.month === today.getMonth())
        ? today
        : new Date(monthYear.year, monthYear.month + 1, 0);
      const daysInMonth = Math.floor((endDate.getTime() - startOfCurrentMonth.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(startOfCurrentMonth);
        date.setDate(date.getDate() + i);
        return {
          key: format(date, 'yyyy-MM-dd'),
          label: format(date, 'MM/dd')
        };
      });
    }
    case 'ytd': {
      const currentMonth = monthYear.month;
      return Array.from({ length: currentMonth + 1 }, (_, i) => {
        const date = new Date(monthYear.year, i, 1);
        return {
          key: format(date, 'yyyy-MM'),
          label: format(date, 'MMM yyyy')
        };
      });
    }
    case 'trailing-12': {
      return Array.from({ length: 12 }, (_, i) => {
        const date = new Date(monthYear.year, monthYear.month - (11 - i), 1);
        return {
          key: format(date, 'yyyy-MM'),
          label: format(date, 'MMM yyyy')
        };
      });
    }
    case 'last-3-years': {
      const columns = [];
      let endYear = monthYear.year;
      let endMonth = monthYear.month;
      for (let offset = 35; offset >= 0; offset--) {
        const date = new Date(endYear, endMonth - offset, 1);
        if (
          date.getFullYear() > endYear
          || (date.getFullYear() === endYear && date.getMonth() > endMonth)
        ) continue;
        columns.push({
          key: format(date, 'yyyy-MM'),
          label: format(date, 'MMM yyyy'),
        });
      }
      return columns;
    }
    default:
      return [];
  }
};

export const generateData = (
  selectedKPI,
  propertyName,
  columnKey
) => {
  const baseValue = Math.random() * 10000;
  switch (selectedKPI) {
    case 'total-revenue':
      return `$${(baseValue * 10).toLocaleString()}`;
    case 'revpar':
      return `$${(baseValue / 100).toFixed(2)}`;
    case 'adr':
      return `$${(baseValue / 50).toFixed(2)}`;
    case 'occupancy':
    case 'occupancy-forecast':
      return `${(Math.random() * 100).toFixed(1)}%`;
    default:
      return `$${baseValue.toLocaleString()}`;
  }
};

export const handleDownload = (
  columns,
  selectedKPI,
  selectedTimeframe,
  monthYear
) => {
  let headers = ['Property Name', ...columns.map(col => col.label)];
  let csv = [headers.join(',')];

  const getCSVValue = (str) => '"' + String(str ?? '').replace(/"/g, '""') + '"';

  for (const property of PROPERTIES) {
    const row = [getCSVValue(property)];
    for (const col of columns) {
      row.push(getCSVValue(generateData(selectedKPI, property, col.key)));
    }
    csv.push(row.join(','));
  }

  const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = `revenue_kpi_export_${selectedTimeframe}_${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

export const handlePrint = (ref) => {
  if (!ref.current) return;
  const printContent = ref.current.innerHTML;
  const w = window.open('', '', 'width=1200,height=900');
  if (!w) return;
  w.document.write(`
    <html>
    <head>
    <title>Revenue KPIs Print</title>
    <link href="/index.css" rel="stylesheet" type="text/css" />
    <style>
      body { font-family: sans-serif; }
      table { border-collapse: collapse; width: 100%; }
      th, td { padding: 6px 8px; border: 1px solid #e5e7eb; }
      th { background: #f4f4f5; }
    </style>
    </head>
    <body>
    ${printContent}
    </body>
    </html>
  `);
  w.document.close();
  w.focus();
  setTimeout(() => {
    w.print();
    w.close();
  }, 200);
};
