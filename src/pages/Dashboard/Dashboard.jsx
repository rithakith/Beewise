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
          console.log("Fetched box:", data); // Log each fetched box
          return data;
        });

        // Filter out the box with id "box2"
        const filteredBoxData = boxData.filter((box) => box.id !== "box2");
        console.log("Filtered boxes:", filteredBoxData); // Log the filtered boxes

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
        <div className="box-collection">
          
          {boxes.map((box, index) => (
            <div key={box.id} className="box-analysis-container">
              <h2>Dashboard</h2>
              <Box
                box={{
                  humidity: box.humidity,
                  temperature: box.temperature,
                  co2Level: box.co2Level,
                  
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
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
