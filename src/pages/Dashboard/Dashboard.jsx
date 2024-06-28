import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import Navbar from "../../Components/Navbar/Navbar";
import './Dashboard.css';
import GeneralInfoCard from "../../Components/GeneralInfoCard/GeneralInfoCard";
import GraphCard from "../../Components/GraphCard/GraphCard";
import Box from "../../Components/Box/Box"; // Import the Box component
import beeBoxImage from '../../assets/beebox.png';

const Dashboard = () => {
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "boxes"));
        const boxData = querySnapshot.docs.map((doc) => {
          const data = { id: doc.id, ...doc.data() };
          console.log("Fetched box:", data);  // Log each fetched box
          return data;
        });

        // Filter out the box with id "box2"
        const filteredBoxData = boxData.filter((box) => box.id !== "box2");
        console.log("Filtered boxes:", filteredBoxData);  // Log the filtered boxes

        setBoxes(filteredBoxData);
      } catch (error) {
        console.error("Error fetching boxes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="content">
        <h1>Welcome to <span>BeeWise Haven</span></h1>
        <div className="box-collection">
          {boxes.map((box, index) => (
            <div key={box.id} className="box-analysis-container">
              <h2>Bee Box {index + 1}</h2>
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
                  startDate: box.temperatureData && box.temperatureData.length > 0 ? box.temperatureData[0].name : null,
                  id: box.id
                }}
                index={index + 1}
              />
              <div className="graph-cards-container">
                <GraphCard title="Temperature (°C)" data={box.temperatureData || []} />
                <GraphCard title="Humidity (%)" data={box.humidityData || []} />
                <GraphCard title="CO₂ Level (ppm)" data={box.co2Data || []} />
              </div>
              <GeneralInfoCard />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
