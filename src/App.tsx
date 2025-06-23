import { useState } from "react";
import Home from "./Home";
import Logs from "./Logs";
import { useDevicesPolling } from "./hooks/useDevicesPolling";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  const devices = useDevicesPolling();

  return (
    <Router>
      <div
        style={{ display: "flex", columnGap: "10px", padding: "10px" }}
        className="header"
      >
        <Link to="/">Home</Link>
        <Link to="/logs">Logs</Link>
      </div>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home devices={devices} />} />
          <Route path="/logs" element={<Logs devices={devices} />} />
          <Route path="/login" element={<Logs devices={devices} />} />
        </Routes>
      </div>
    </Router>
  );
}
