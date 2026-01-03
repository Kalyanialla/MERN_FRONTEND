// src/components/Vitals/VitalsChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VitalsChart = ({ data, vitalType }) => {
  if (!data || data.length === 0) {
    return <div className="no-data">No data available for chart</div>;
  }

  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: item.value,
  }));

  return (
    <div className="chart-container">
      <h3>{vitalType} Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#2196F3" 
            strokeWidth={2}
            dot={{ fill: '#2196F3' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VitalsChart;