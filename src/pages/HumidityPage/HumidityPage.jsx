import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import GraphCard from '../../Components/GraphCard/GraphCard';
import Navbar from '../../Components/Navbar/Navbar'; // Ensure correct import path
import './HumidityPage.css';


const HumidityPage = () => {
  const [humidityData, setHumidityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'humidityData'));
        const data = querySnapshot.docs.map((doc) => ({
          name: doc.id, // Assuming doc.id is the timestamp or date
          value: doc.data().humidity, // Adjust based on your data structure
        }));
        setHumidityData(data);
      } catch (error) {
        console.error('Error fetching humidity data: ', error);
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
      <div className='box-analysis-container'>
        <h2>Humidity Page</h2>
        {humidityData.length > 0 ? (
          <GraphCard title="Humidity (%)" data={humidityData} />
        ) : (
          <div>No humidity data available.</div>
        )}
      </div>
      </div>
    </>
  );
};

export default HumidityPage;
