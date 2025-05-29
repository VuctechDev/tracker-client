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
    const res = await fetch(
      `https://gwc0c0wkg44k4sgcgwgsw44g.vuctechdev.online/data/${deviceId}`
    );
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
