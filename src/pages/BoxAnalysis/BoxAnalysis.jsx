// src/Components/BoxAnalysis/BoxAnalysis.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import GraphCard from "../../Components/GraphCard/GraphCard";
import GeneralInfoCard from "../../Components/GeneralInfoCard/GeneralInfoCard";
import { getDatabase, ref, child, get } from "firebase/database";

import "./BoxAnalysis.css";

const BoxAnalysis = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [co2Data, setCo2Data] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Sensor`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const tempData = [];
          const humData = [];
          const co2Data = [];

          Object.keys(data).forEach((key) => {
            const entry = data[key];
            const timestamp = new Date(entry.time).toLocaleTimeString();

            if (entry.temperature !== undefined) {
              tempData.push({ name: timestamp, value: entry.temperature });
            }
            if (entry.humidity !== undefined) {
              humData.push({ name: timestamp, value: entry.humidity });
            }
            if (entry.co2Level !== undefined) {
              co2Data.push({ name: timestamp, value: entry.co2Level });
            }
          });

          setTemperatureData(tempData);
          setHumidityData(humData);
          setCo2Data(co2Data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="box-analysis-container">
        <h2>Bee Box 01</h2>
        <div className="graph-cards-container">
          <GraphCard title="Temperature (°C)" data={temperatureData} />
          <GraphCard title="Humidity (%)" data={humidityData} />
          <GraphCard title="CO₂ Level (ppm)" data={co2Data} />
        </div>
        <GeneralInfoCard />
      </div>
    </>
  );
};

export default BoxAnalysis;
