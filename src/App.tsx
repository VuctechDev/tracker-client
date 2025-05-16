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
    { speed: number; lat: number; long: number }[]
  >([]);

  const get = async () => {
    const res = await fetch(
      "https://gwc0c0wkg44k4sgcgwgsw44g.vuctechdev.online/data"
    );
    const data = await res.json();
    setData(data.data);
  };

  useEffect(() => {
    get();
    const int = setInterval(() => get(), 10000);
    return () => {
      clearInterval(int);
    };
  }, []);

  useEffect(() => {
    setRoute(() =>
      data.map((item) => {
        return [item.lat, item.long];
      })
    );
  }, [data]);

  return (
    <div style={{ height: "100vh", width: "1200px" }}>
      {route.length && (
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
                Speed: {data[i]?.speed} km/h
              </Popup>
            </Marker>
          ))}

          {route.length > 1 && <Polyline positions={route} color="orange" />}
        </MapContainer>
      )}
    </div>
  );
}
