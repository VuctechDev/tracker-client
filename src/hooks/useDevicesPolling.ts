import { useEffect, useState } from "react";

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
  updatedAt: string;
};

export const useDevicesPolling = () => {
  const [data, setData] = useState<DeviceType[]>([]);

  const getDevices = async () => {
    const res = await fetch(
      "https://gwc0c0wkg44k4sgcgwgsw44g.vuctechdev.online/devices"
    );
    const data = await res.json();
    setData(data.data);
  };
  useEffect(() => {
    getDevices();
    const int = setInterval(() => getDevices(), 30000);
    return () => {
      clearInterval(int);
    };
  }, []);

  return data;
};
