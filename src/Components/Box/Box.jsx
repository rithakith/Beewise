// src/Components/Box/Box.jsx
import React from "react";
import { Link } from "react-router-dom";
import './Box.css';
import beeBoxImage from '../../assets/beebox.png';  // Adjust the path as needed

const Box = ({ box, index }) => {
  return (
    <div className="box-container">
      <div className="box-main-info">
        <h2>Bee Box {index.toString().padStart(2, '0')}</h2>
        <img src={beeBoxImage} alt="Bee Box" className="bee-box-image" />
        <p>Humidity: {box.humidity}%</p>
        <p>Temperature: {box.temperature}°C</p>
        <p>CO<sub>2</sub> Level: {box.co2Level} ppm</p>
      </div>
      <div className="box-additional-info">
        <h3>Analysis</h3>
        <p>Max Temperature: {box.maxTemperature}°C</p>
        <p>Min Temperature: {box.minTemperature}°C</p>
        <p>Max Humidity: {box.maxHumidity}%</p>
        <p>Min Humidity: {box.minHumidity}%</p>
        <p>Start Date: {box.startDate ? new Date(box.startDate).toLocaleDateString() : 'Invalid Date'}</p>
        
      </div>
    </div>
  );
};

export default Box;
