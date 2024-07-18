import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import './Navbar.css';
import logo from '../../assets/beelogo.png';

const Navbar = () => {
  const [name, setName] = useState("User");
  const [logoutError, setLogoutError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout Success");
        navigate("/");
      })
      .catch((error) => {
        setLogoutError(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setName(user.displayName);
      } else {
        console.log("User is logged out");
        setUser(null);
        setName("User");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogoClick = (event) => {
    event.preventDefault(); // Prevent default navigation behavior
    // Optionally, you can add custom behavior here if needed
  };

  return (
    <div className="sidebar">
      <header className="header">
        <a href="/" className="logo" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" />
        </a>
      </header>

      <nav className="navbar">
        <a href="/dashboard">Dashboard</a>
        <a href="/temperature">Temperature</a>
        <a href="/humidity">Humidity </a>
        <a href="/airquality">Air Quality Level</a>
        <a href="/weight">Weight </a>
        
        {user ? (
          <>
            <span className="user-name-box">Hi, {name}</span>
            <button onClick={handleSignout} className="sign-out-btn">SIGN OUT</button>
          </>
        ) : (
          <a href="/login" className="login-btn">LOGIN</a>
        )}
      </nav>

      {logoutError && <div className="error-message">Error: {logoutError}</div>}
    </div>
  );
};

export default Navbar;
