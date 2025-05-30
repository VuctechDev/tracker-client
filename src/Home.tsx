import type { FC } from "react";
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
import { getRelativeTime } from "./utils/getDisplayDate";
import CommandCenter from "./CommandCenter";
import DevicesSelect from "./DevicesSelect";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DeviceSettings from "./DeviceSettings";
import type { DeviceType } from "./hooks/useDevicesPolling";
import { useRoutesPollin } from "./hooks/useRoutesPollin";
import SideBanner from "./SideBanner";

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
const orangeDot = L.divIcon({
  className: "",
  html: `<div style="
      background-color: green;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      box-shadow: 0 0 2px rgba(0,0,0,0.5);
    "></div>`,
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});

interface Props {
  devices: DeviceType[];
}

const Home: FC<Props> = ({ devices }) => {
  const [route, setRoute] = useState<LatLngExpression[]>([]);
  const [deviceId, setDeviceId] = useState<string>("");
  const [showRoute, setShowRoute] = useState<boolean>(
    !!localStorage.getItem("showRoute")
  );
  const data = useRoutesPollin(deviceId);

  useEffect(() => {
    if (devices.length && !deviceId) {
      setDeviceId(devices[0]?.imei);
    }
  }, [devices]);

  useEffect(() => {
    setRoute(() =>
      data.map((item) => {
        return [item.lat, item.long];
      })
    );
  }, [data]);

  const selectDevice = (id: string) => {
    if (id !== deviceId) {
      setDeviceId(id);
      setRoute([]);
    }
  };

  const handleVariantChange = () => {
    setShowRoute((prev) => {
      if (prev) {
        localStorage.removeItem("showRoute");
      } else {
        localStorage.setItem("showRoute", "true");
      }
      return !prev;
    });
  };

  const routeDisplayData = showRoute ? route : route.slice(0, 1);

  return (
    <div className="wrapper">
      <div className="mobileNav">
        <div>
          <PersonOutlineIcon fontSize="medium" />
        </div>
        {deviceId && <DeviceSettings deviceId={deviceId} devices={devices} />}
        <DevicesSelect devices={devices} onSelect={selectDevice} />
      </div>
      <SideBanner
        data={data[0]}
        showRoute={showRoute}
        handleVariantChange={handleVariantChange}
      />
      <div className="mapWrapper">
        {!!routeDisplayData.length && (
          <MapContainer
            center={route[0] ?? [0, 0]}
            zoom={17}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {routeDisplayData.map((position, i) => {
              const curr = data[i];
              const prev = data[i + 1];

              const currTime = new Date(curr?.createdAt || 0).getTime();
              const prevTime = new Date(prev?.createdAt || 0).getTime();

              const diffMs = Math.abs(currTime - prevTime);
              const isTimeGap = i > 0 && diffMs > 60_000 && prev;

              const icon = i === 0 ? blueIcon : isTimeGap ? orangeDot : redDot;

              const hours = Math.floor(diffMs / 3600000);
              const minutes = Math.floor((diffMs % 3600000) / 60000);
              const seconds = Math.floor((diffMs % 60000) / 1000);

              const displayTime =
                isTimeGap &&
                `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(
                  2,
                  "0"
                )}m ${String(seconds).padStart(2, "0")}s`;
              return (
                <Marker key={i} position={position} icon={icon}>
                  <Popup>
                    Reading #{i + 1} <br />
                    Speed: {data[i]?.speed} km/h <br />
                    When: {getRelativeTime(data[i]?.createdAt)}
                    {isTimeGap && (
                      <>
                        <br />
                        Pause: {displayTime}
                      </>
                    )}
                  </Popup>
                </Marker>
              );
            })}

            {routeDisplayData.length > 1 && (
              <Polyline positions={route} color="orange" />
            )}
          </MapContainer>
        )}
      </div>
      <div className="devicesCardWrapper">
        {devices.map((item) => (
          <div
            key={item.id}
            className="devicesCard"
            onClick={() => selectDevice(item.imei)}
            style={{
              backgroundColor: deviceId === item.imei ? "#a5efbf" : "#fff",
            }}
          >
            <h3>Device: {item.name}</h3>
            <p>IMEI: {item.imei}</p>
            <p>Battery: {item.battery}%</p> <p>Signal: {item.signal}%</p>
            <p>Status: {item.status?.toUpperCase()}</p>
            <p>Version: {item.version}</p>
            {item.status !== "offline" && (
              <CommandCenter
                id={item.imei}
                value={
                  devices.find((device) => item.imei === device.imei)
                    ?.interval ?? "60"
                }
              />
            )}
            <div style={{ padding: "8px", marginTop: "6px" }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
