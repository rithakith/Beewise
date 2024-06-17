// GraphCard.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraphCard = ({ title, data }) => {
  // Example data structure: [{name: 'Jan', value: 30}, {name: 'Feb', value: 40}, ...]
  const chartData = data.map((value, index) => ({ name: `Month ${index + 1}`, value }));

  return (
    <div className="graph-card">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphCard;
