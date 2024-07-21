import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import GraphCard from '../../Components/GraphCard/GraphCard';
import Navbar from '../../Components/Navbar/Navbar';
import './WeightPage.css';

const WeightPage = () => {
  const [weightData, setWeightData] = useState([]);
  const [minMaxValues, setMinMaxValues] = useState({
    weight: { min: null, max: null },
  });
  const [weightIndex, setWeightIndex] = useState(0);
  const CHUNK_SIZE = 50;

  useEffect(() => {
    const dbRef = ref(getDatabase(), 'Sensor');

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const weightData = [];

          Object.keys(data).forEach((key) => {
            const entry = data[key];
            const entryDate = new Date(entry.time);
            const timestamp = `${entryDate.toLocaleDateString()} ${entryDate.toLocaleTimeString()}`;

            if (entry.weight !== undefined) { // Correct key for weight data
              weightData.push({ name: timestamp, value: entry.weight });
            }
          });

          setWeightData(weightData);
          setMinMaxValues({
            weight: {
              min: Math.min(...weightData.map((d) => d.value)),
              max: Math.max(...weightData.map((d) => d.value)),
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
          <h2>Weight Data (g)</h2>
          <GraphCard
            title=""
            data={getDataChunk(weightData, weightIndex)}
            dateRange={getDateRange(weightData, weightIndex)}
            min={minMaxValues.weight.min}
            max={minMaxValues.weight.max}
            onPrev={() => handlePrev(setWeightIndex)}
            onNext={() => handleNext(setWeightIndex, weightData.length)}
          />
          <div className="button-container">
            <button onClick={() => handlePrev(setWeightIndex)} disabled={weightIndex === 0}>
              Previous
            </button>
            <button onClick={() => handleNext(setWeightIndex, weightData.length)} disabled={weightIndex + CHUNK_SIZE >= weightData.length}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeightPage;
