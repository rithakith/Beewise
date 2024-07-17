import React from "react";
import './Box.css';
import beeBoxImage from '../../assets/beebox.png';  // Adjust the path as needed

const Box = ({ box, index }) => {
  return (
    <div className="box-container">
      <div className="box-main-info">
        <div className="bee-box-content">
          <h2>Bee Box {index.toString().padStart(2, '0')}</h2>
          <img src={beeBoxImage} alt="Bee Box" className="bee-box-image" />
        </div>
        <div className="info">
          <p>Humidity: {box.humidity}%</p>
          <p>Temperature: {box.temperature}°C</p>
          <p>CO<sub>2</sub> Level: {box.co2Level} ppm</p>
        </div>
      </div>
    </div>
  );
};

export default Box;
