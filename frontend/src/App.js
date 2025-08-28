import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddVehiclePage from "./pages/AddVehiclePage";
import SearchAndBookPage from "./pages/SearchAndBookPage";
import "./App.css";

function App() {
  return (
    <Router>
      <header className="navbar">
        <h1>FleetLink - Logistics Vehicle Booking System</h1>
        <nav>
       <Link to="/">
        <button className="btn btn-search">Search & Book</button>
      </Link>

      <Link to="/add-vehicle">
        <button className="btn btn-add">Add Vehicle</button>
      </Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<SearchAndBookPage />} />
          <Route path="/add-vehicle" element={<AddVehiclePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
