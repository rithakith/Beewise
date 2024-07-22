import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import GraphCard from '../../Components/GraphCard/GraphCard';
import Navbar from '../../Components/Navbar/Navbar';
import './WeightPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faWeightHanging, faWeight } from '@fortawesome/free-solid-svg-icons';

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

            if (entry.weight !== undefined) {
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
          setWeightIndex(Math.max(0, weightData.length - CHUNK_SIZE));

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
      <div className="content-wei">
        <div className="info-card">
          <h2>Weight</h2><br />
          <p>
            Inside the beehive box, maintaining an optimal weight is essential for monitoring hive health and productivity.
            The weight should ideally be consistent with expected hive growth and activity patterns.
          </p>
        </div>
        <div className="min-max-card">
          <div className="min-weight">
            <FontAwesomeIcon icon={faWeightHanging} className="weight-icon" />
            <div>
              <strong>Min Weight:</strong>
              <p>{minMaxValues.weight.min} g</p>
            </div>
          </div>
          <div className="max-weight">
            <FontAwesomeIcon icon={faWeight} className="weight-icon" />
            <div>
              <strong>Max Weight:</strong>
              <p>{minMaxValues.weight.max} g</p>
            </div>
          </div>
        </div>
        <div className="box-analysis-container-weigraph">
          <h2 className='weightt'>Weight (g)</h2>
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
            <button className='graph-button' onClick={() => handlePrev(setWeightIndex)} disabled={weightIndex === 0}>
              <FontAwesomeIcon icon={faArrowLeft} /> Previous
            </button>
            <button className='graph-button' onClick={() => handleNext(setWeightIndex, weightData.length)} disabled={weightIndex + CHUNK_SIZE >= weightData.length}>
              Next <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeightPage;
