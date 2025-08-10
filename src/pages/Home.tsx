import type { FC } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  Polygon,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L, { type LatLngExpression } from "leaflet";
import { getRelativeTime } from "../utils/getDisplayDate";
import DevicesSelect from "../DevicesSelect";
import DeviceSettings from "../DeviceSettings";
import SideBanner from "../SideBanner";
import AccountMenu from "../AccountMenu";
import { useDevicesPooling } from "../queries/devices";
import { useGetRoute } from "../queries/route";
import { useGetGeofence } from "../queries/geofence";
import CommandCenter from "../components/CommandCenter";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";

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

interface Props {}

const Home: FC<Props> = () => {
  const { t } = useTranslation();
  const [route, setRoute] = useState<LatLngExpression[]>([]);
  const [deviceId, setDeviceId] = useState<string>("");
  const [showRoute, setShowRoute] = useState<boolean>(
    !!localStorage.getItem("showRoute")
  );
  const [showFence, setShowFence] = useState<boolean>(false);
  const { data } = useGetGeofence(deviceId);

  const { data: routeData, isFetching, isFetched } = useGetRoute(deviceId);
  const { data: devicesData } = useDevicesPooling();
  const devices = devicesData?.data ?? [];

  useEffect(() => {
    if (devices?.length && !deviceId) {
      setDeviceId(devices[0]?.imei);
    }
  }, [devices]);

  useEffect(() => {
    if (routeData?.data) {
      setRoute(() =>
        routeData?.data?.map((item) => {
          return [item.lat, item.long];
        })
      );
    }
  }, [routeData]);

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

  const handleFenceDisplay = () => setShowFence((prev) => !prev);

  const routeDisplayData = showRoute ? route : route.slice(0, 1);

  return (
    <div className="wrapper">
      <div className="mobileNav">
        <AccountMenu />
        {deviceId && (
          <DeviceSettings deviceId={deviceId} center={route?.slice(0, 1)} />
        )}
        <DevicesSelect onSelect={selectDevice} />
      </div>
      <SideBanner
        deviceId={deviceId}
        data={routeData?.data[0]}
        showRoute={showRoute}
        handleVariantChange={handleVariantChange}
        handleFenceDisplay={handleFenceDisplay}
      />
      <div className="mapWrapper">
        {isFetching && !isFetched && <Loading />}
        {/* {!loading && !routeDisplayData?.length && (
          <Typography>No records yet received from the device!</Typography>
        )} */}
        {!!routeDisplayData?.length && (
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
              const curr = routeData?.data[i];
              const prev = routeData?.data[i + 1];

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
                    {t("reading")} #{i + 1} <br />
                    {t("speed")}: {routeData?.data[i]?.speed} km/h <br />
                    {t("when")}:{" "}
                    {getRelativeTime(routeData?.data[i]?.createdAt ?? "")}
                    {isTimeGap && (
                      <>
                        <br />
                        {t("pause")}: {displayTime}
                      </>
                    )}
                  </Popup>
                </Marker>
              );
            })}

            {routeDisplayData.length > 1 && (
              <Polyline positions={route} color="orange" />
            )}

            {showFence && (
              <Polygon
                positions={data?.data?.coordinates ?? []}
                pathOptions={{
                  color: "blue",
                  fillColor: "blue",
                  fillOpacity: 0.2,
                }}
              />
            )}
          </MapContainer>
        )}
      </div>
      <div className="devicesCardWrapper">
        {devices?.map((item) => (
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
            {item?.analytics && (
              <>
                <p>Distance in 24h: {item?.analytics?.last24h}m</p>
                <p>Distance in last hour: {item?.analytics?.lastHour}m</p>
                <p>
                  Last kilometer made:{" "}
                  {item?.analytics?.lastKilometerReachedAt
                    ? getRelativeTime(
                        `${new Date(item?.analytics?.lastKilometerReachedAt)}`
                      )
                    : "--"}
                </p>
                <p>Version: {item.version}</p>
              </>
            )}
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
