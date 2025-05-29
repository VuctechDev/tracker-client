import { useState } from "react";
import Home from "./Home";
import Logs from "./Logs";
import { useDevicesPolling } from "./hooks/useDevicesPolling";

export default function App() {
  const [page, setPage] = useState("home");
  const devices = useDevicesPolling();

  return (
    <>
      <div
        style={{ display: "flex", columnGap: "10px", padding: "10px" }}
        className="header"
      >
        <button onClick={() => setPage("home")}>HOME</button>
        <button onClick={() => setPage("logs")}>LOGS</button>
      </div>
      <div className="wrapper">
        {page === "home" && <Home devices={devices} />}
        {page === "logs" && <Logs devices={devices} />}
      </div>
    </>
  );
}
