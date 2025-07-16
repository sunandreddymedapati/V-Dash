import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

function parseValue(value, kpi) {
  if (!value) return 0;
  if (kpi === 'occupancy' || kpi === 'occupancy-forecast') {
    const n = parseFloat(String(value).replace('%', ''));
    return isNaN(n) ? 0 : n;
  }
  const n = parseFloat(String(value).replace(/[$,]/g, ""));
  return isNaN(n) ? 0 : n;
}

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#FF8042', '#a5b4fc',
  '#f472b6', '#38bdf8', '#f59e42', '#34d399', '#f87171', '#6366f1', '#d946ef'
];

const RevenueKPILineChart = ({
  properties,
  columns,
  generateData,
  selectedKPI,
}) => {
  if (!columns || columns.length === 0) {
    console.warn("RevenueKPILineChart: No columns available", columns);
    return (
      <div className="flex justify-center items-center h-80 text-gray-400">
        No data available to render the graph.
      </div>
    );
  }
  if (!properties || properties.length === 0) {
    console.warn("RevenueKPILineChart: No properties available", properties);
    return (
      <div className="flex justify-center items-center h-80 text-gray-400">
        No properties found.
      </div>
    );
  }

  const chartData = columns.map(col => {
    const entry = { time: col.label };
    properties.forEach(property => {
      entry[property] = parseValue(generateData(property, col.key), selectedKPI);
    });
    return entry;
  });

  const allDataZero = chartData.every(entry =>
    properties.every(property => entry[property] === 0)
  );

  if (allDataZero) {
    console.warn('RevenueKPILineChart: All data points are zero for all properties and columns.', chartData);
    return (
      <div className="flex justify-center items-center h-80 text-gray-400">
        No meaningful data to display on the graph.
      </div>
    );
  }

  if (chartData.length === 0 || properties.length === 0) {
    return (
      <div className="flex justify-center items-center h-80 text-gray-400">
        No chart data to render.
      </div>
    );
  }

  const displayedProperties = properties.slice(0, 10);

  return (
    <div className="w-full py-2 pr-2 pl-1" style={{ minHeight: 400 }}>
      <ResponsiveContainer width="100%" minHeight={360} height={420}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} minTickGap={2} />
          <YAxis
            tick={{ fontSize: 12 }}
            domain={['auto', 'auto']}
            tickFormatter={v => selectedKPI.includes('occupancy') ? `${v}%` : `$${v}`}
          />
          <Tooltip
            formatter={v => selectedKPI.includes('occupancy') ? `${v}%` : `$${v}`}
            labelFormatter={x => `Date: ${x}`}
          />
          <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: 12 }} />
          {displayedProperties.map((property, idx) =>
            <Line
              key={property}
              type="monotone"
              dataKey={property}
              stroke={COLORS[idx % COLORS.length]}
              dot={false}
              strokeWidth={2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      {properties.length > 10 && (
        <div className="mt-3 text-xs text-gray-400 text-center">
          Only showing first 10 properties for graph clarity.
        </div>
      )}
    </div>
  );
};

export default RevenueKPILineChart;
