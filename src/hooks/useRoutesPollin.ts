import { useEffect, useState } from "react";

export type RouteType = {
  speed: number;
  lat: number;
  long: number;
  createdAt: string;
};

export const useRoutesPollin = (deviceId: string) => {
  const [data, setData] = useState<RouteType[]>([]);

  const get = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/data/${deviceId}`);
    const data = await res.json();
    setData(data.data);
  };
  useEffect(() => {
    if (deviceId) {
      get();
      const int = setInterval(() => get(), 10000);
      return () => {
        clearInterval(int);
      };
    }
  }, [deviceId]);

  return data;
};
