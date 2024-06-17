// BoxAnalysis.jsx
import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import GraphCard from "../../Components/GraphCard/GraphCard";
import GeneralInfoCard from "../../Components/GeneralInfoCard/GeneralInfoCard";
import './BoxAnalysis.css'; // Import your CSS file for styling

const BoxAnalysis = () => {
  // Simulated data for demonstration
  const temperatureData = [25, 26, 27, 26, 28, 27]; // Example temperature data
  const humidityData = [50, 55, 52, 58, 60, 56]; // Example humidity data
  const co2Data = [400, 410, 420, 430, 440, 450]; // Example CO2 data
  const weightData = [50, 51, 52, 53, 54, 55]; // Example weight data

  const [sugarSyrupActive, setSugarSyrupActive] = useState(false);

  const toggleSugarSyrup = () => {
    setSugarSyrupActive(!sugarSyrupActive);
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <h1>Box Analysis</h1>
        <div className="card-container">
          <div className="card">
            <GraphCard title="Temperature (°C)" data={temperatureData} />
            
           
          </div>
          <div className="card">
            <GraphCard title="Humidity (%)" data={humidityData} />
           
          </div>
          <div className="card">
            <GraphCard title="CO2 Level (ppm)" data={co2Data} />
            
          </div>
          <div className="card">
            <GraphCard title="Weight (kg)" data={weightData} />
            
          </div>
        </div>
      </div>
      <div className="card">
      <GeneralInfoCard ageOfBeehive={6} />
            <button className={`sugar-syrup-btn ${sugarSyrupActive ? 'active' : ''}`} onClick={toggleSugarSyrup}>
              {sugarSyrupActive ? 'Sugar Syrup Mode: ON' : 'Sugar Syrup Mode: OFF'}
            </button>
      </div>
    </>
  );
};

export default BoxAnalysis;
