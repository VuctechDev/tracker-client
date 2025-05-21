import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Logs from "./Logs"; // <-- Add this new component

export default function App() {
  return (
    <Router>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logs/:imei" element={<Logs />} />
        </Routes>
      </div>
    </Router>
  );
}
