import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./GraphCard.css";

const GraphCard = ({ title, data, dateRange, min, max, onPrev, onNext,height=300 }) => {
  return (
    <div className="graph-card">
      <h3>{title}</h3>
     <br />
      <p style={{textAlign:"center"}}>{dateRange}</p>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[min, max]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    
     
    </div>
  );
};

export default GraphCard;
