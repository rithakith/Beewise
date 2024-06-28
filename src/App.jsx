import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoxCollection from "./pages/BoxCollection/BoxCollection";
import Dashboard from "./pages/Dashboard/Dashboard";
import Signup from "./pages/Signup/Signup";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./App.css";


function App() {
  return (
  
 <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LoginPage}></Route>
          <Route path="/login" Component={LoginPage}></Route>
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/boxes" Component={BoxCollection} />
          <Route path="/signup" Component={Signup} />
        </Routes>
      </BrowserRouter>
    </>
    
   
  );
  
}

export default App;
