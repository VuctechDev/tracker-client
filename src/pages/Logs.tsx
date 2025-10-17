import { useEffect, useState, type FC } from "react";
import { request } from "../utils/api";
import { getDisplayDateTime } from "../utils/getDisplayDate";
import { useDevicesPooling } from "../queries/devices";
import { getInitialDeviceData } from "../utils/getInitialDeviceData";

interface Props {}

const Logs: FC<Props> = () => {
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
  const { devices } = useDevicesPooling();
  const [imei, setImei] = useState("");

  const getLogs = async () => {
    const data = await request(`/logs/${imei}`);
    setLogs(data.data);
  };

  useEffect(() => {
    const { id } = getInitialDeviceData(devices);
    setImei(id);
  }, [devices]);

  useEffect(() => {
    if (imei) {
      getLogs();
    }
  }, [imei]);

  return (
    <div style={{ minHeight: "100vh" }}>
      DEVICES:
      <div style={{ display: "flex", columnGap: "10px", padding: "10px" }}>
        {devices.map((device) => (
          <button onClick={() => setImei(device.imei)} key={device?.imei}>
            {device.name?.toUpperCase()}
          </button>
        ))}
      </div>
      <h2>Logs for IMEI: {imei}</h2>
      {logs.map((log) => (
        <div key={log.id}>
          [{getDisplayDateTime(log.createdAt)}]: PROTOCOL: {log.protocol},
          RECEIVED: {log.received}, ACK: {log.ack}
        </div>
      ))}
    </div>
  );
};

export default Logs;
