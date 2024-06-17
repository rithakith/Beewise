// BoxAnalysis.jsx
import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import GraphCard from "../../Components/GraphCard/GraphCard"; // Adjust path as needed
import GeneralInfoCard from "../../Components/GeneralInfoCard/GeneralInfoCard"; // Adjust path as needed

const BoxAnalysis = () => {
  // Simulated data for demonstration
  const temperatureData = [25, 26, 27, 26, 28, 27]; // Example temperature data
  const humidityData = [50, 55, 52, 58, 60, 56]; // Example humidity data
  const co2Data = [400, 410, 420, 430, 440, 450]; // Example CO2 data
  const weightData = [50, 51, 52, 53, 54, 55]; // Example weight data

  return (
    <>
      <Navbar />
      <div className="content">
        <h1>Box Analysis</h1>
        <div className="graph-cards">
          <GraphCard title="Temperature (°C)" data={temperatureData} />
          <GraphCard title="Humidity (%)" data={humidityData} />
          <GraphCard title="CO2 Level (ppm)" data={co2Data} />
          <GraphCard title="Weight (kg)" data={weightData} />
        </div>
        <GeneralInfoCard ageOfBeehive={6} /> {/* Example age of beehive */}
        <button className="activate-sugar-syrup-btn">Activate Sugar Syrup Mode</button>
      </div>
    </>
  );
};

export default BoxAnalysis;
