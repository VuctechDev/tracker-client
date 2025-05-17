import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L, { type LatLngExpression } from "leaflet";
import { getDisplayDateTime } from "./utils/getDisplayDate";

const blueIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redDot = L.divIcon({
  className: "",
  html: `<div style="
    background-color: red;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0,0,0,0.5);
  "></div>`,
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});

export default function App() {
  const [route, setRoute] = useState<LatLngExpression[]>([]);
  const [data, setData] = useState<
    { speed: number; lat: number; long: number; createdAt: string }[]
  >([]);
  const [devices, setDevices] = useState<
    {
      id: number;
      imei: string;
      code: string;
      battery: number;
      signal: number;
      version: number;
      status: "static" | "dynamic";
      createdAt: string;
    }[]
  >([]);

  const get = async () => {
    const res = await fetch(
      `https://gwc0c0wkg44k4sgcgwgsw44g.vuctechdev.online/data`
    );
    const data = await res.json();
    setData(data.data);
  };
  const getDevices = async () => {
    const res = await fetch(
      "https://gwc0c0wkg44k4sgcgwgsw44g.vuctechdev.online/devices"
    );
    const data = await res.json();
    setDevices(data.data);
  };

  useEffect(() => {
    get();
    getDevices();
    const int = setInterval(() => get(), 10000);
    return () => {
      clearInterval(int);
    };
  }, []);

  // useEffect(() => {
  //   if(devices.length) {
  //     get();
  //     const int = setInterval(() => get(), 10000);
  //     return () => {
  //       clearInterval(int);
  //     };
  //   }

  // }, [devices]);

  useEffect(() => {
    setRoute(() =>
      data.map((item) => {
        return [item.lat, item.long];
      })
    );
  }, [data]);

  return (
    <div className="wrapper">
      <div className="mapWrapper">
        {!!route.length && (
          <MapContainer
            center={route[0] ?? [0, 0]}
            zoom={14}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {route.map((position, i) => (
              <Marker
                key={i}
                position={position}
                icon={i === 0 ? blueIcon : redDot}
              >
                <Popup>
                  Reading #{i + 1} <br />
                  Speed: {data[i]?.speed} km/h <br />
                  Time: {getDisplayDateTime(data[i]?.createdAt)}
                </Popup>
              </Marker>
            ))}

            {route.length > 1 && <Polyline positions={route} color="orange" />}
          </MapContainer>
        )}
      </div>
      <div className="devicesCardWrapper">
        {devices.map((item) => (
          <div key={item.id} className="devicesCard">
            <p>IMEI: {item.imei}</p>
            <p>Battery: {item.battery}%</p> <p>Signal: {item.signal}%</p>
            <p>Status: {item.status?.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
