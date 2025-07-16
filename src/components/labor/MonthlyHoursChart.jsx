import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const MonthlyHoursChart = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Labor Hours – Monthly</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Housekeeping" fill="#3b82f6" />
            <Bar dataKey="FrontOffice" fill="#10b981" />
            <Bar dataKey="FB" fill="#f59e0b" />
            <Bar dataKey="Maintenance" fill="#ef4444" />
            <Bar dataKey="Admin" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyHoursChart;
