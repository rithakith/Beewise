import React from "react";
import { Link } from "react-router-dom";
import './Box.css';
import beeBoxImage from '../../assets/beebox.png';  // Adjust the path as needed

const Box = ({ box, index }) => {
  return (
    <Link to={`/dashboard/${box.id}`} className="box-card-link">
      <div className="box-card">
        <h2>Bee Box {index.toString().padStart(2, '0')}</h2>
        <img src={beeBoxImage} alt="Bee Box" className="bee-box-image" />
        <p>Humidity: {box.humidity}%</p>
        <p>Temperature: {box.temperature}°C</p>
        <p>CO<sub>2</sub> Level: {box.co2Level} ppm</p>
      </div>
    </Link>
  );
};

export default Box;
