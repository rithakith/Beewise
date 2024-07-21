import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import GraphCard from '../../Components/GraphCard/GraphCard';
import Navbar from '../../Components/Navbar/Navbar';
import './AirQualityPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const AirQualityPage = () => {
  const [airQualityData, setAirQualityData] = useState([]);
  const [minMaxValues, setMinMaxValues] = useState({
    airQuality: { min: null, max: null },
  });
  const [airQualityIndex, setAirQualityIndex] = useState(0);
  const CHUNK_SIZE = 50;

  useEffect(() => {
    const dbRef = ref(getDatabase(), 'Sensor');

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const airQualityData = [];

          Object.keys(data).forEach((key) => {
            const entry = data[key];
            const entryDate = new Date(entry.time);
            const timestamp = `${entryDate.toLocaleDateString()} ${entryDate.toLocaleTimeString()}`;

            if (entry.airQuality !== undefined) {
              airQualityData.push({ name: timestamp, value: entry.airQuality });
            }
          });

          setAirQualityData(airQualityData);
          setMinMaxValues({
            airQuality: {
              min: Math.min(...airQualityData.map((d) => d.value)),
              max: Math.max(...airQualityData.map((d) => d.value)),
            },
          });
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
      <div className="content-air">
        <div className="box-analysis-container-airgraph">
          <h2>CO<sub>2</sub> Level (ppm)</h2>
          <GraphCard
            title=""
            data={getDataChunk(airQualityData, airQualityIndex)}
            dateRange={getDateRange(airQualityData, airQualityIndex)}
            min={minMaxValues.airQuality.min}
            max={minMaxValues.airQuality.max}
            onPrev={() => handlePrev(setAirQualityIndex)}
            onNext={() => handleNext(setAirQualityIndex, airQualityData.length)}
          />

          <div className="button-container">
            <button onClick={() => handlePrev(setAirQualityIndex)} disabled={airQualityIndex === 0}>
            <FontAwesomeIcon icon={faArrowLeft} /> Previous
            </button>
            <button onClick={() => handleNext(setAirQualityIndex, airQualityData.length)} disabled={airQualityIndex + CHUNK_SIZE >= airQualityData.length}>
            Next <FontAwesomeIcon icon={faArrowRight} />


            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AirQualityPage;
