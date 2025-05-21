import { useState } from "react";
import Home from "./Home";
import Logs from "./Logs"; 

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <>
      <div style={{ display: "flex", columnGap: "10px", padding: "10px" }}>
        <button onClick={() => setPage("home")}>HOME</button>
        <button onClick={() => setPage("logs")}>LOGS</button>
      </div>
      <div className="wrapper">
        {page === "home" && <Home />}
        {page === "logs" && <Logs />}
      </div>
    </>
  );
}
