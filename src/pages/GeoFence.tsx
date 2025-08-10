import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvent,
  Polygon,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L, { type LatLngExpression } from "leaflet";
import Box from "@mui/material/Box";
import UndoIcon from "@mui/icons-material/Undo";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useLocation, useNavigate } from "react-router-dom";
import * as turf from "@turf/turf";
import { request } from "../utils/api";
import { useGetGeofence } from "../queries/geofence";
import { useTranslation } from "react-i18next";

function segmentsFromPoints(points: [number, number][]) {
  const segments: [number, number][][] = [];
  for (let i = 0; i < points.length - 1; i++) {
    segments.push([points[i], points[i + 1]]);
  }
  return segments;
}

function hasIntersection(
  fence: [number, number][],
  newPoint: [number, number]
) {
  if (fence.length < 2) return false;

  const newSegment = [fence[fence.length - 1], newPoint];
  const newLine = turf.lineString(newSegment);

  const segments = segmentsFromPoints([...fence]);
  for (let i = 0; i < segments.length - 1; i++) {
    const segmentLine = turf.lineString(segments[i]);
    const intersects = turf.lineIntersect(newLine, segmentLine);
    if (intersects.features.length > 0) {
      return true;
    }
  }

  return false;
}
const MapClickHandler = ({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) => {
  useMapEvent("click", (e) => {
    console.log(e.latlng);
    const { lat, lng } = e.latlng;
    onMapClick(lat, lng);
  });

  return null;
};

interface Props {}

const blueIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Geofence: React.FC<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { deviceId, center } = location.state;
  const [fence, setFence] = useState<LatLngExpression[]>([]);

  const { data } = useGetGeofence(deviceId);

  const handleUndo = () => setFence((prev) => prev.slice(0, -1));
  const handleReset = () => setFence([]);
  const handleBack = () => navigate("/");
  const handleSave = async () => {
    if (!data?.data) {
      await request("/geofence", "POST", { coordinates: fence, deviceId });
      alert(`${t("created")}!`);
    } else {
      await request("/geofence", "PATCH", { coordinates: fence, deviceId });
      alert(`${t("saved")}!`);
    }
    navigate("/");
  };

  const icons = [
    { content: <ChevronLeftIcon />, callback: handleBack },
    { content: <SaveAltIcon />, callback: handleSave },
    { content: <DeleteOutlineIcon />, callback: handleReset },
    { content: <UndoIcon />, callback: handleUndo },
  ];

  useEffect(() => {
    if (!deviceId) {
      navigate("/");
    }
  }, [deviceId]);

  useEffect(() => {
    if (data?.data?.coordinates) {
      setFence(data?.data.coordinates);
    }
  }, [data]);

  return (
    <Box width={1} sx={{ minHeight: "100vh" }}>
      <Box
        width={1}
        sx={{
          height: "60px",
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 99999,
          p: "4px 6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {icons.map((item, i) => (
          <Box
            onClick={() => item.callback()}
            key={i}
            sx={{
              width: "60px",
              height: "40px",
              border: "1px solid rgb(184, 180, 180)",
              zIndex: 99999,
              p: "4px 6px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.content}
          </Box>
        ))}
      </Box>
      <Box className="mapWrapper">
        <MapContainer
          center={center[0]}
          zoom={15}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <MapClickHandler
            onMapClick={(lat, lng) => {
              const newPoint: [number, number] = [lat, lng];
              const fenceArray = fence as [number, number][];
              if (fenceArray.length === 10) {
                alert(`${t("10pointsMax")}!`);
                return;
              }
              if (hasIntersection(fenceArray, newPoint)) {
                alert(`${t("lineIntersects")}!`);
                return;
              }
              setFence((prev) => [...prev, newPoint]);
            }}
          />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[0, 0]} icon={blueIcon} />

          {fence.length > 0 && (
            <Polygon
              positions={fence}
              pathOptions={{
                color: "blue",
                fillColor: "blue",
                fillOpacity: 0.2,
              }}
            />
          )}
          {/* {fence.length > 1 && <Polyline positions={fence} color="blue" />} */}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default Geofence;
