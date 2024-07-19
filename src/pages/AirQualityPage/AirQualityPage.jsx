import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import GraphCard from '../../Components/GraphCard/GraphCard';
import Navbar from '../../Components/Navbar/Navbar';
import './AirQualityPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const CO2Page = () => {
  const [co2Data, setCo2Data] = useState([]);
  const [minMaxValues, setMinMaxValues] = useState({
    co2Level: { min: null, max: null },
  });
  const [co2Index, setCo2Index] = useState(0);
  const CHUNK_SIZE = 50;

  useEffect(() => {
    const dbRef = ref(getDatabase(), 'Sensor');

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const co2Data = [];

          Object.keys(data).forEach((key) => {
            const entry = data[key];
            const entryDate = new Date(entry.time);
            const timestamp = `${entryDate.toLocaleDateString()} ${entryDate.toLocaleTimeString()}`;

            if (entry.co2Level !== undefined) {
              co2Data.push({ name: timestamp, value: entry.co2Level });
            }
          });

          setCo2Data(co2Data);
          setMinMaxValues({
            co2Level: {
              min: Math.min(...co2Data.map((d) => d.value)),
              max: Math.max(...co2Data.map((d) => d.value)),
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
          <h2>Air Quality Level (ppm)</h2>
          <GraphCard
            title=""
            data={getDataChunk(co2Data, co2Index)}
            dateRange={getDateRange(co2Data, co2Index)}
            min={minMaxValues.co2Level.min}
            max={minMaxValues.co2Level.max}
            onPrev={() => handlePrev(setCo2Index)}
            onNext={() => handleNext(setCo2Index, co2Data.length)}
          />
           <div className="button-container">
            <button onClick={() => handlePrev(setCo2Index)} disabled={co2Index === 0}>
              <FontAwesomeIcon icon={faArrowLeft} /> Previous
            </button>
            <button onClick={() => handleNext(setCo2Index, co2Data.length)} disabled={co2Index + CHUNK_SIZE >= co2Data.length}>
              Next <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CO2Page;
