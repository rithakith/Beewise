// src/Components/BoxAnalysis/BoxAnalysis.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import GraphCard from "../../Components/GraphCard/GraphCard";
import GeneralInfoCard from "../../Components/GeneralInfoCard/GeneralInfoCard";
import Box from "../../Components/Box/Box"; // Import the Box component
import { getDatabase, ref, onValue } from "firebase/database";

import "./BoxAnalysis.css";

const BoxAnalysis = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [co2Data, setCo2Data] = useState([]);

  const [latestData, setLatestData] = useState({
    temperature: null,
    humidity: null,
    co2Level: null,
  });

  useEffect(() => {
    const dbRef = ref(getDatabase(), 'Sensor');
    
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const tempData = [];
        const humData = [];
        const co2Data = [];

        let latestTemp = null;
        let latestHum = null;
        let latestCo2 = null;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        Object.keys(data).forEach((key) => {
          const entry = data[key];
          const entryDate = new Date(entry.time);

          if (entryDate >= today) {
            const timestamp = `${entryDate.toLocaleDateString()} ${entryDate.toLocaleTimeString()}`;

            if (entry.temperature !== undefined) {
              tempData.push({ name: timestamp, value: entry.temperature });
              latestTemp = entry.temperature;
            }
            if (entry.humidity !== undefined) {
              humData.push({ name: timestamp, value: entry.humidity });
              latestHum = entry.humidity;
            }
            if (entry.co2Level !== undefined) {
              co2Data.push({ name: timestamp, value: entry.co2Level });
              latestCo2 = entry.co2Level;
            }
          }
        });

        setTemperatureData(tempData);
        setHumidityData(humData);
        setCo2Data(co2Data);
        setLatestData({
          temperature: latestTemp,
          humidity: latestHum,
          co2Level: latestCo2,
        });
      } else {
        console.log("No data available");
      }
    }, (error) => {
      console.error(error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <div className="box-analysis-container">
        <h2>Bee Box 01</h2>
        <Box
          box={{
            humidity: latestData.humidity,
            temperature: latestData.temperature,
            co2Level: latestData.co2Level,
            maxTemperature: Math.max(...temperatureData.map(d => d.value)),
            minTemperature: Math.min(...temperatureData.map(d => d.value)),
            maxHumidity: Math.max(...humidityData.map(d => d.value)),
            minHumidity: Math.min(...humidityData.map(d => d.value)),
            startDate: temperatureData.length > 0 ? temperatureData[0].name : null,
            id: 1
          }}
          index={1}
        />
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
