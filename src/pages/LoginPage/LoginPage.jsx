import React from "react";
import { useState } from "react";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import './LoginPage.css';
import logo from '../../assets/beelogo.png'; 

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setLoginFail(false);
        setLoginSuccess(true);
        setTimeout(() => {
          setLoginSuccess(false);
          navigate("/dashboard");
        }, 2500);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setLoginError(errorMessage);
      });
  };
  return (
    <div className="login-container">
    <div className="login-box">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <input type="submit" value="Login" />
        {loginSuccess && <div className="success">Logged In successfully!!!</div>}
        {loginFail && <div className="error">{loginError}</div>}
      </form>
      <p>
        Don't have an account ?{" "}
       
        <span>
          <u>
            <a href="/signup">Signup</a>
          </u>
        </span>
        
        
      </p>
    </div>
  </div>
);
};
export default LoginPage;
