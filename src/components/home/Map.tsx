import React from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  Polygon,
} from "react-leaflet";
import L from "leaflet";
import { useGetGeofence } from "../../queries/geofence";
import { getRelativeTime } from "../../utils/getDisplayDate";
import { useTranslation } from "react-i18next";
import { useGetRoute } from "../../queries/route";

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
  deviceId: string;
  routeData: L.LatLngExpression[];
  showFence: boolean;
}

const HomeMap: React.FC<Props> = ({ deviceId, routeData, showFence }) => {
  const { data: geofence } = useGetGeofence(deviceId);
  const { data } = useGetRoute(deviceId);
  const { t } = useTranslation();
  return (
    <MapContainer
      center={routeData[0] ?? [0, 0]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {routeData.map((position, i) => {
        const curr = data?.data[i];
        const prev = data?.data[i + 1];

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
              {t("speed")}: {data?.data[i]?.speed} km/h <br />
              {t("when")}: {getRelativeTime(data?.data[i]?.createdAt ?? "")}
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

      {routeData.length > 1 && (
        <Polyline positions={routeData} color="orange" />
      )}

      {showFence && (
        <Polygon
          positions={geofence?.data?.coordinates ?? []}
          pathOptions={{
            color: "blue",
            fillColor: "blue",
            fillOpacity: 0.2,
          }}
        />
      )}
    </MapContainer>
  );
};

export default HomeMap;
