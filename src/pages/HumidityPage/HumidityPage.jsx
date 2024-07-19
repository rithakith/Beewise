import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import GraphCard from '../../Components/GraphCard/GraphCard';
import Navbar from '../../Components/Navbar/Navbar'; 
import './HumidityPage.css';

const CHUNK_SIZE = 100;

const HumidityPage = () => {
  const [humidityData, setHumidityData] = useState([]);
  const [minMaxValues, setMinMaxValues] = useState({
    humidity: { min: null, max: null },
  });
  const [humidityIndex, setHumidityIndex] = useState(0);

  useEffect(() => {
    const dbRef = ref(getDatabase(), "Sensor");

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const humData = [];

          Object.keys(data).forEach((key) => {
            const entry = data[key];
            const entryDate = new Date(entry.time);
            const timestamp = `${entryDate.toLocaleDateString()} ${entryDate.toLocaleTimeString()}`;

            if (entry.humidity !== undefined) {
              humData.push({ name: timestamp, value: entry.humidity });
            }
          });

          setHumidityData(humData);

          setMinMaxValues({
            humidity: {
              min: Math.min(...humData.map((d) => d.value)),
              max: Math.max(...humData.map((d) => d.value)),
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

  const handlePrev = (indexSetter) => {
    indexSetter((prevIndex) => (prevIndex - CHUNK_SIZE < 0 ? 0 : prevIndex - CHUNK_SIZE));
  };

  const handleNext = (indexSetter, dataLength) => {
    indexSetter((prevIndex) => (prevIndex + CHUNK_SIZE >= dataLength ? prevIndex : prevIndex + CHUNK_SIZE));
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
        <div className="box-analysis-container">
          <h2>Humidity (%)</h2>
          <GraphCard
            title=""
            data={getDataChunk(humidityData, humidityIndex)}
            dateRange={getDateRange(humidityData, humidityIndex)}
            min={minMaxValues.humidity.min}
            max={minMaxValues.humidity.max}
            onPrev={() => handlePrev(setHumidityIndex)}
            onNext={() => handleNext(setHumidityIndex, humidityData.length)}
          />
          <div className="button-container">
            <button onClick={() => handlePrev(setHumidityIndex)} disabled={humidityIndex === 0}>
              Previous
            </button>
            <button onClick={() => handleNext(setHumidityIndex, humidityData.length)} disabled={humidityIndex + CHUNK_SIZE >= humidityData.length}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HumidityPage;
