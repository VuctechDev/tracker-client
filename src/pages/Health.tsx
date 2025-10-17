import { useGetHealth } from "../queries/health";
import { useSelectedDevice } from "../utils/getInitialDeviceData";
import React, { useEffect, useState } from "react";
import { getDisplayDateTime } from "../utils/getDisplayDate";
import { getInitialDeviceData } from "../utils/getInitialDeviceData";

interface Props {}

const Health: React.FC<Props> = () => {
  const { devices } = useSelectedDevice();
  const [imei, setImei] = useState("");
  const { health } = useGetHealth(imei);

  useEffect(() => {
    if (!imei) {
      const { id } = getInitialDeviceData(devices ?? []);
      setImei(id);
    }
  }, [devices, imei]);

  return (
    <div style={{ minHeight: "100vh" }}>
      DEVICES:
      <div style={{ display: "flex", columnGap: "10px", padding: "10px" }}>
        {devices?.map((device) => (
          <button onClick={() => setImei(device.imei)} key={device?.imei}>
            {device.name?.toUpperCase()}
          </button>
        ))}
      </div>
      <h2>Health for IMEI: {imei}</h2>
      {health?.map((item) => (
        <div key={item.id}>
          [{getDisplayDateTime(item.createdAt)}]: STEPS: {item.steps}, HR:{" "}
          {item.heartRate}, TEMP: {item.temp}, ACTIVE: {item.activity}min
        </div>
      ))}
    </div>
  );
};

export default Health;
