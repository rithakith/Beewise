import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import Navbar from "../../Components/Navbar/Navbar";
import "./Dashboard.css";
import GeneralInfoCard from "../../Components/GeneralInfoCard/GeneralInfoCard";
import GraphCard from "../../Components/GraphCard/GraphCard";
import Box from "../../Components/Box/Box"; // Import the Box component
import beeBoxImage from "../../assets/beebox.png";
import { getDatabase, ref, onValue } from "firebase/database";

const Dashboard = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [co2Data, setCo2Data] = useState([]);
  const [weightData, setWeightData] = useState([]); // New state for weight data

  const [latestData, setLatestData] = useState({
    temperature: null,
    humidity: null,
    co2Level: null,
    weight: null, // Latest weight data
  });

  const [minMaxValues, setMinMaxValues] = useState({
    temperature: { min: null, max: null },
    humidity: { min: null, max: null },
    co2Level: { min: null, max: null },
    weight: { min: null, max: null }, // Min and max values for weight data
  });

  const [temperatureIndex, setTemperatureIndex] = useState(0);
  const [humidityIndex, setHumidityIndex] = useState(0);
  const [co2Index, setCo2Index] = useState(0);
  const [weightIndex, setWeightIndex] = useState(0); // New index state for weight data

  const CHUNK_SIZE = 50;

  useEffect(() => {
    const dbRef = ref(getDatabase(), "Sensor");

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const tempData = [];
          const humData = [];
          const co2Data = [];
          const weightData = []; // Array to hold weight data

          let latestTemp = null;
          let latestHum = null;
          let latestCo2 = null;
          let latestWeight = null; // Variable to hold latest weight data

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
            if (entry.CO2lvl !== undefined) {
              co2Data.push({ name: timestamp, value: entry.CO2lvl });
              latestCo2 = entry.CO2lvl;
            }
            if (entry.weight !== undefined) { // Check for weight data
              weightData.push({ name: timestamp, value: entry.weight });
              latestWeight = entry.weight;
            }
          });

          setTemperatureData(tempData);
          setHumidityData(humData);
          setCo2Data(co2Data);
          setWeightData(weightData); // Update state with weight data
          setLatestData({
            temperature: latestTemp,
            humidity: latestHum,
            co2Level: latestCo2,
            weight: latestWeight, // Update latest weight data
          });

          setMinMaxValues({
            temperature: {
              min: Math.min(...tempData.map((d) => d.value)),
              max: Math.max(...tempData.map((d) => d.value)),
            },
            humidity: {
              min: Math.min(...humData.map((d) => d.value)),
              max: Math.max(...humData.map((d) => d.value)),
            },
            co2Level: {
              min: Math.min(...co2Data.map((d) => d.value)),
              max: Math.max(...co2Data.map((d) => d.value)),
            },
            weight: { // Update min and max values for weight data
              min: Math.min(...weightData.map((d) => d.value)),
              max: Math.max(...weightData.map((d) => d.value)),
            },
          });
        } else {
          console.log("No data available");
        }
      },
      (error) => {
        console.error(error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handlePrev = (indexSetter, currentIndex) => {
    indexSetter((prevIndex) =>
      prevIndex - CHUNK_SIZE < 0 ? 0 : prevIndex - CHUNK_SIZE
    );
  };

  const handleNext = (indexSetter, currentIndex, dataLength) => {
    indexSetter((prevIndex) =>
      prevIndex + CHUNK_SIZE >= dataLength ? prevIndex : prevIndex + CHUNK_SIZE
    );
  };

  const getDataChunk = (data, index) => {
    return data.slice(index, index + CHUNK_SIZE);
  };

  const getDateRange = (data, index) => {
    if (data.length === 0) return "";
    const startDate = new Date(data[index]?.name).toLocaleDateString();
    const endDate = new Date(
      data[Math.min(index + CHUNK_SIZE - 1, data.length - 1)]?.name
    ).toLocaleDateString();
    return `${startDate} - ${endDate}`;
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <div className="box-collection">
          <div className="box-analysis-container">
            <h2>Dashboard</h2>
            <Box
              box={{
                humidity: latestData.humidity,
                temperature: latestData.temperature,
                co2Level: latestData.co2Level,
                weight: latestData.weight, // Pass latest weight data
                maxTemperature: Math.max(
                  ...temperatureData.map((d) => d.value)
                ),
                minTemperature: Math.min(
                  ...temperatureData.map((d) => d.value)
                ),
                startDate:
                  temperatureData.length > 0 ? temperatureData[0].name : null,
                id: 1,
              }}
            />
            <div className="graph-cards-container">
              <GraphCard
                title="Temperature (°C)"
                data={getDataChunk(temperatureData, temperatureIndex)}
                dateRange={getDateRange(temperatureData, temperatureIndex)}
                latestReading={latestData.temperature} // Pass latest reading
                min={minMaxValues.temperature.min}
                max={minMaxValues.temperature.max}
                onPrev={() => handlePrev(setTemperatureIndex, temperatureIndex)}
                onNext={() =>
                  handleNext(
                    setTemperatureIndex,
                    temperatureIndex,
                    temperatureData.length
                  )
                }
              />
              <GraphCard
                title="Humidity (%)"
                data={getDataChunk(humidityData, humidityIndex)}
                dateRange={getDateRange(humidityData, humidityIndex)}
                latestReading={latestData.humidity} // Pass latest reading
                min={minMaxValues.humidity.min}
                max={minMaxValues.humidity.max}
                onPrev={() => handlePrev(setHumidityIndex, humidityIndex)}
                onNext={() =>
                  handleNext(
                    setHumidityIndex,
                    humidityIndex,
                    humidityData.length
                  )
                }
              />
              <GraphCard
                title="Air Quality level (ppm)"
                data={getDataChunk(co2Data, co2Index)}
                dateRange={getDateRange(co2Data, co2Index)}
                latestReading={latestData.co2Level} // Pass latest reading
                min={minMaxValues.co2Level.min}
                max={minMaxValues.co2Level.max}
                onPrev={() => handlePrev(setCo2Index, co2Index)}
                onNext={() => handleNext(setCo2Index, co2Index, co2Data.length)}
              />
              <GraphCard
                title="Weight (g)" // Title updated for weight data
                data={getDataChunk(weightData, weightIndex)}
                dateRange={getDateRange(weightData, weightIndex)}
                latestReading={latestData.weight} // Pass latest reading
                min={minMaxValues.weight.min}
                max={minMaxValues.weight.max}
                onPrev={() => handlePrev(setWeightIndex, weightIndex)}
                onNext={() => handleNext(setWeightIndex, weightIndex, weightData.length)}
              />
            </div>
            <GeneralInfoCard
              startDate={
                temperatureData && temperatureData.length > 0
                  ? temperatureData[0].name
                  : null
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
