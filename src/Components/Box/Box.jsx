import React from "react";
import { Link } from "react-router-dom";
import './Box.css';

const Box = ({ box }) => {
  return (
    <div className="box-card">
      <h2>Bee Box {box.id.toString().padStart(2, '0')}</h2>
      <p>Humidity: {box.Humidity}%</p>
      <p>Temperature: {box.Temperature}°C</p>
      <p>CO<sub>2</sub> Level: {box.Co2} ppm</p>
      <span>
        <Link to={`/dashboard/${box.id}`} className="view-link">View Box</Link>
      </span>
    </div>
  );
};

export default Box;
