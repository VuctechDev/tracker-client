import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Logs() {
  const { imei } = useParams<{ imei: string }>();
  const [logs, setLogs] = useState<
    {
      id: number;
      imei: string;
      protocol: string;
      received: string;
      ack: string;
      createdAt: string;
    }[]
  >([]);

  const getLogs = async () => {
    const res = await fetch(
      `https://gwc0c0wkg44k4sgcgwgsw44g.vuctechdev.online/logs/${imei}`
    );
    const data = await res.json();
    setLogs(data.data);
  };

  useEffect(() => {
    if (imei) {
      getLogs();
    }
  }, [imei]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <h2>Logs for IMEI: {imei}</h2>
      {logs.map((log) => (
        <div key={log.id}>
          {log.createdAt}: PROTOCOL: {log.protocol}, RECEIVED: {log.received},
          ACK: {log.ack}
        </div>
      ))}
    </div>
  );
}
