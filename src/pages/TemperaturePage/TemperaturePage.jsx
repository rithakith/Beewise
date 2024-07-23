import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import GraphCard from '../../Components/GraphCard/GraphCard';
import Navbar from '../../Components/Navbar/Navbar';
import './TemperaturePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faTemperatureLow, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

const TemperaturePage = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [minMaxValues, setMinMaxValues] = useState({
    temperature: { min: null, max: null },
  });
  const [temperatureIndex, setTemperatureIndex] = useState(0);
  const CHUNK_SIZE = 50;

  useEffect(() => {
    const dbRef = ref(getDatabase(), 'Sensor');

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const tempData = [];

          Object.keys(data).forEach((key) => {
            const entry = data[key];
            const entryDate = new Date(entry.time);
            const timestamp = `${entryDate.toLocaleDateString()} ${entryDate.toLocaleTimeString()}`;

            if (entry.temperature !== undefined) {
              tempData.push({ name: timestamp, value: entry.temperature });
            }
          });

          setTemperatureData(tempData);
          setMinMaxValues({
            temperature: {
              min: Math.min(...tempData.map((d) => d.value)),
              max: Math.max(...tempData.map((d) => d.value)),
            },
          });
          setTemperatureIndex(Math.max(0, tempData.length - CHUNK_SIZE));
        } else {
          console.log('No data available');
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
    if (data.length === 0) return '';
    const startDate = new Date(data[index]?.name).toLocaleDateString();
    const endDate = new Date(data[Math.min(index + CHUNK_SIZE - 1, data.length - 1)]?.name).toLocaleDateString();
    return `${startDate} - ${endDate}`;
  };

  return (
    <>
      <Navbar />
      <div className="content-temp">
        <div className="info-card">
          <h2>Temperature</h2><br />
          
          <p>
            Inside the beehive box, maintaining a stable temperature is crucial for the bees' health and productivity.
            The temperature should ideally be between 32°C to 35°C.
          </p>
        </div>
        <div className="min-max-card">
          <div className="min-temp">
            <FontAwesomeIcon icon={faTemperatureLow} className="temp-icon" />
            <div>
              <strong>Min Temperature:</strong>
              <p>{minMaxValues.temperature.min}°C</p>
            </div>
          </div>
          <div className="max-temp">
            <FontAwesomeIcon icon={faTemperatureHigh} className="temp-icon" />
            <div>
              <strong>Max Temperature:</strong>
              <p>{minMaxValues.temperature.max}°C</p>
            </div>
          </div>
        </div>
        <div className="box-analysis-container-tempgraph">
          <h2 className="tempt">Temperature (°C)</h2>
          <GraphCard
            title=""
            data={getDataChunk(temperatureData, temperatureIndex)}
            dateRange={getDateRange(temperatureData, temperatureIndex)}
            min={minMaxValues.temperature.min}
            max={minMaxValues.temperature.max}
            onPrev={() => handlePrev(setTemperatureIndex)}
            onNext={() => handleNext(setTemperatureIndex, temperatureData.length)}
          />
          <div className="button-container">
            <button className="graph-button" onClick={() => handlePrev(setTemperatureIndex)} disabled={temperatureIndex === 0}>
              <FontAwesomeIcon icon={faArrowLeft} /> Previous
            </button>
            <button className="graph-button" onClick={() => handleNext(setTemperatureIndex, temperatureData.length)} disabled={temperatureIndex + CHUNK_SIZE >= temperatureData.length}>
              Next <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemperaturePage;