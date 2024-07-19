import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import GraphCard from '../../Components/GraphCard/GraphCard';
import Navbar from '../../Components/Navbar/Navbar'; 
import './HumidityPage.css';


const HumidityPage = () => {
  const [humidityData, setHumidityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'humidityData'));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setHumidityData(data);
      } catch (error) {
        console.error('Error fetching humidity data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="content">
    <div className='box-analysis-container'>
    <h2>Humidity Page</h2>
      <GraphCard title="Humidity (%)" data={humidityData} />
    </div>
    </div>
    </>
      
  );
};

export default HumidityPage;
