// src/Components/BoxAnalysis/BoxAnalysis.jsx
import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import GraphCard from "../../Components/GraphCard/GraphCard";
import GeneralInfoCard from "../../Components/GeneralInfoCard/GeneralInfoCard";
import "./BoxAnalysis.css";

const BoxAnalysis = () => {
  const data = [
    { name: "Month 1", value: 23 },
    { name: "Month 2", value: 24 },
    { name: "Month 3", value: 25 },
    { name: "Month 4", value: 26 },
    { name: "Month 5", value: 27 },
    { name: "Month 6", value: 28 },
  ];

  return (
    <>
      <Navbar />
      <div className="box-analysis-container">
        
        <h2>Bee Box 01</h2>
        <div className="graph-cards-container">
          <GraphCard title="Temperature (°C)" data={data} />
          <GraphCard title="Humidity (%)" data={data} />
          <GraphCard title="CO₂ Level (ppm)" data={data} />
          <GraphCard title="Weight (kg)" data={data} />
        </div>
        <GeneralInfoCard />
      </div>
    </>
  );
};

export default BoxAnalysis;
