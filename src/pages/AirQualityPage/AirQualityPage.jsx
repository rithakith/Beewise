import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import GraphCard from "../../Components/GraphCard/GraphCard";
import Navbar from "../../Components/Navbar/Navbar";
import "./AirQualityPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCloud, faCloudMeatball } from "@fortawesome/free-solid-svg-icons";

const AirQualityPage = () => {
  const [co2Data, setCo2Data] = useState([]);
  const [minMaxValues, setMinMaxValues] = useState({
    co2: { min: null, max: null },
  });
  const [co2Index, setCo2Index] = useState(0);
  const CHUNK_SIZE = 50;

  useEffect(() => {
    const dbRef = ref(getDatabase(), "Sensor");

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

            if (entry.co2 !== undefined) {
              co2Data.push({ name: timestamp, value: entry.co2 });
            }
          });

          setCo2Data(co2Data);
          setMinMaxValues({
            co2: {
              min: Math.min(...co2Data.map((d) => d.value)),
              max: Math.max(...co2Data.map((d) => d.value)),
            },
          });
          setCo2Index(Math.max(0, co2Data.length - CHUNK_SIZE));

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
    indexSetter((prevIndex) =>
      prevIndex - CHUNK_SIZE < 0 ? 0 : prevIndex - CHUNK_SIZE
    );
  };

  const handleNext = (indexSetter, dataLength) => {
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
      <div className="content-air">
        <div className="info-card">
          <h2>CO<sub>2</sub> Levels</h2><br />
          <p>
            Monitoring CO<sub>2</sub> levels is crucial for maintaining optimal air quality within the beehive. 
            High levels can indicate poor ventilation or other issues that could impact the health of the bees.
          </p>
        </div>
        <div className="min-max-card">
          <div className="min-co2">
            <FontAwesomeIcon icon={faCloudMeatball} className="co2-icon" />
            <div>
              <strong>Min CO<sub>2</sub> Level:</strong>
              <p>{minMaxValues.co2.min} ppm</p>
            </div>
          </div>
          <div className="max-co2">
            <FontAwesomeIcon icon={faCloud} className="co2-icon" />
            <div>
              <strong>Max CO<sub>2</sub> Level:</strong>
              <p>{minMaxValues.co2.max} ppm</p>
            </div>
          </div>
        </div>
        <div className="box-analysis-container-airgraph">
          <h2 className='co2-title'>
            CO<sub>2</sub> Level (ppm)
          </h2>
          <GraphCard
            title=""
            data={getDataChunk(co2Data, co2Index)}
            dateRange={getDateRange(co2Data, co2Index)}
            min={minMaxValues.co2.min}
            max={minMaxValues.co2.max}
            onPrev={() => handlePrev(setCo2Index)}
            onNext={() => handleNext(setCo2Index, co2Data.length)}
          />
          <div className="button-container">
            <button className="graph-button"
              onClick={() => handlePrev(setCo2Index)}
              disabled={co2Index === 0}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Previous
            </button>
            <button className="graph-button"
              onClick={() => handleNext(setCo2Index, co2Data.length)}
              disabled={co2Index + CHUNK_SIZE >= co2Data.length}
            >
              Next <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AirQualityPage;
