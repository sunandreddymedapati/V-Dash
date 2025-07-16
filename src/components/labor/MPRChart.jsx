import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Grid3X3, TrendingUp } from 'lucide-react';

const MPRChart = ({ data }) => {
  const [viewMode, setViewMode] = useState('chart');

  const toggleView = () => {
    setViewMode(viewMode === 'chart' ? 'table' : 'chart');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Average Minutes Per Room (MPR)</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleView}
            className="flex items-center gap-2"
          >
            {viewMode === 'chart' ? (
              <Grid3X3 className="w-4 h-4" />
            ) : (
              <TrendingUp className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === 'chart' ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => value}
              />
              <YAxis 
                label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="MPR Actual" />
              <Line type="monotone" dataKey="budgeted" stroke="#10b981" strokeWidth={2} name="MPR Budgeted" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="h-8">
                  <TableHead className="text-center py-1">Date</TableHead>
                  <TableHead className="text-center py-1">MPR Actual</TableHead>
                  <TableHead className="text-center py-1">MPR Budgeted</TableHead>
                  <TableHead className="text-center py-1">Variance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, index) => {
                  const variance = row.actual - row.budgeted;
                  return (
                    <TableRow key={index} className="h-8">
                      <TableCell className="text-center font-medium py-1">{row.date}</TableCell>
                      <TableCell className="text-center py-1">{row.actual}</TableCell>
                      <TableCell className="text-center py-1">{row.budgeted}</TableCell>
                      <TableCell className={`text-center py-1 ${variance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {variance >= 0 ? '+' : ''}{variance}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MPRChart;
