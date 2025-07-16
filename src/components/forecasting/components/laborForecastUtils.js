export const generateDaysArray = (month, year) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = new Date(year, month, day);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return {
      date: `${monthNames[month + 1]}/${String(day).padStart(2, '0')}`,
      dayName: dayNames[date.getDay()],
      dayNumber: day
    };
  });
};

export const calculateTotal = (laborData, department) => {
  const deptData = laborData[department] || {};
  return Object.values(deptData)
    .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
    .toFixed(2);
};

export const calculateDayTotal = (laborData, departments, day) => {
  return departments
    .reduce((sum, dept) => {
      const value = laborData[dept.id]?.[day] || '0';
      return sum + (parseFloat(value) || 0);
    }, 0)
    .toFixed(2);
};

export const calculateGrandTotal = (laborData, departments) => {
  return departments
    .reduce((sum, dept) => {
      return sum + parseFloat(calculateTotal(laborData, dept.id));
    }, 0)
    .toFixed(2);
};
