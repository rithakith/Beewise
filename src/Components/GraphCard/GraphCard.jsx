import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./GraphCard.css";

const GraphCard = ({ title, data, dateRange, min, max, onPrev, onNext }) => {
  return (
    <div className="graph-card">
      <h3>{title}</h3>
      <p style={{textAlign:"center"}}>{dateRange}</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[min, max]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <div className="graph-controls">
        <button onClick={onPrev}>Previous</button>
        <button onClick={onNext}>Next</button>
      </div>
      <div className="graph-stats">
        <p>Max: {max}</p>
        <p>Min: {min}</p>
      </div>
    </div>
  );
};

export default GraphCard;
