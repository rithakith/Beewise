import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import './Signup.css';
import logo from '../../assets/beelogo.png';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpFail, setSignUpFail] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: username });

        console.log(user);
        setSignUpFail(false);
        setSignUpSuccess(true);
        setTimeout(() => {
          setSignUpSuccess(false);
          navigate("/dashboard");
        }, 2500);
      })
      .catch((error) => {
        setSignUpFail(true);
        const errorMessage = error.message;
        console.log(errorMessage);
        setSignUpError(error.message);
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input type="submit" value="Sign up" />
          {signUpSuccess && <div className="success">Signed up successfully!!!</div>}
          {signUpFail && <div className="error">{signUpError}</div>}
        </form>
        <p>
          Already have an account?{" "}
          <span>
            <u>
            <a href="/login">Login</a>
            </u>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
