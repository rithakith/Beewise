import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Navbar from "../../Components/Navbar/Navbar";
import './Dashboard.css';
import GeneralInfoCard from "../../Components/GeneralInfoCard/GeneralInfoCard";
import GraphCard from "../../Components/GraphCard/GraphCard";
import Box from "../../Components/Box/Box"; // Import the Box component
import beeBoxImage from '../../assets/beebox.png';

const Dashboard = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [co2Data, setCo2Data] = useState([]);

  const [latestData, setLatestData] = useState({
    temperature: null,
    humidity: null,
    co2Level: null,
  });

  const [minMaxValues, setMinMaxValues] = useState({
    temperature: { min: null, max: null },
    humidity: { min: null, max: null },
    co2Level: { min: null, max: null },
  });

  const [temperatureIndex, setTemperatureIndex] = useState(0);
  const [humidityIndex, setHumidityIndex] = useState(0);
  const [co2Index, setCo2Index] = useState(0);

  const CHUNK_SIZE = 50;

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

        Object.keys(data).forEach((key) => {
          const entry = data[key];
          const entryDate = new Date(entry.time);
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
        });

        setTemperatureData(tempData);
        setHumidityData(humData);
        setCo2Data(co2Data);
        setLatestData({
          temperature: latestTemp,
          humidity: latestHum,
          co2Level: latestCo2,
        });

        setMinMaxValues({
          temperature: {
            min: Math.min(...tempData.map(d => d.value)),
            max: Math.max(...tempData.map(d => d.value)),
          },
          humidity: {
            min: Math.min(...humData.map(d => d.value)),
            max: Math.max(...humData.map(d => d.value)),
          },
          co2Level: {
            min: Math.min(...co2Data.map(d => d.value)),
            max: Math.max(...co2Data.map(d => d.value)),
          },
        });
      } else {
        console.log("No data available");
      }
    }, (error) => {
      console.error(error);
    });

    return () => unsubscribe();
  }, []);

  const handlePrev = (indexSetter, currentIndex) => {
    indexSetter(prevIndex => (prevIndex - CHUNK_SIZE < 0 ? 0 : prevIndex - CHUNK_SIZE));
  };

  const handleNext = (indexSetter, currentIndex, dataLength) => {
    indexSetter(prevIndex => (prevIndex + CHUNK_SIZE >= dataLength ? prevIndex : prevIndex + CHUNK_SIZE));
  };

  const getDataChunk = (data, index) => {
    return data.slice(index, index + CHUNK_SIZE);
  };

  const getDateRange = (data, index) => {
    if (data.length === 0) return '';
    const startDate = new Date(data[index]?.name).toLocaleDateString();
    const endDate = new Date(data[Math.min(index + CHUNK_SIZE - 1, data.length - 1)]?.name).toLocaleDateString();
    return `${startDate} - ${endDate}`;
  };

  return (
    <>
      <Navbar />
      <div className="content">
      
        <div className="box-collection">
          {boxes.map((box, index) => (
            <div key={box.id} className="box-analysis-container">
              <h2>Bee Box </h2>
              <Box
                box={{
                  humidity: box.humidity,
                  temperature: box.temperature,
                  co2Level: box.co2Level,
                  maxTemperature: Math.max(...(box.temperatureData || []).map(d => d.value)),
                  minTemperature: Math.min(...(box.temperatureData || []).map(d => d.value)),
                  maxHumidity: Math.max(...(box.humidityData || []).map(d => d.value)),
                  minHumidity: Math.min(...(box.humidityData || []).map(d => d.value)),
                  maxCo2Level: Math.max(...(box.co2Data || []).map(d => d.value)),
                  minCo2Level: Math.min(...(box.co2Data || []).map(d => d.value)),
                  id: box.id
                }}
                index={index + 1}
              />
              <div className="graph-cards-container">
                <GraphCard title="Temperature (°C)" data={box.temperatureData || []} />
                <GraphCard title="Humidity (%)" data={box.humidityData || []} />
                <GraphCard title="CO₂ Level (ppm)" data={box.co2Data || []} />
                <GraphCard title="Weight (kg)" data={box.weightData || []} />
              </div>
              <GeneralInfoCard startDate={box.temperatureData && box.temperatureData.length > 0 ? box.temperatureData[0].name : null} />
            </div>
            <GeneralInfoCard startDate={temperatureData && temperatureData.length > 0 ? temperatureData[0].name : null} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
