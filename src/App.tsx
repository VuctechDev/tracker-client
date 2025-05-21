import { useEffect, useState } from "react";
import Home from "./Home";
import Logs from "./Logs";

export type DeviceType = {
  id: number;
  imei: string;
  code: string;
  battery: number;
  signal: number;
  version: number;
  status: "static" | "dynamic" | "offline";
  interval: string;
  name: string;
  createdAt: string;
};

export default function App() {
  const [page, setPage] = useState("home");
  const [devices, setDevices] = useState<DeviceType[]>([]);

  const getDevices = async () => {
    const res = await fetch(
      "https://gwc0c0wkg44k4sgcgwgsw44g.vuctechdev.online/devices"
    );
    const data = await res.json();
    setDevices(data.data);
  };
  useEffect(() => {
    getDevices();
  }, []);
  return (
    <>
      <div style={{ display: "flex", columnGap: "10px", padding: "10px" }}>
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
