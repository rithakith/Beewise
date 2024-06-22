import React, { useEffect, useState } from "react";
import Box from "../../Components/Box/Box";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import Navbar from "../../Components/Navbar/Navbar";
import './Dashboard.css';
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
            <Box key={box.id} box={box} index={index + 1} />
          ))}
          <div className="box-card add-new-box">
            <h2>Add New Bee Box</h2>
            <img src={beeBoxImage} alt="Bee Box" className="bee-box-image" />
            <span>+</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
