import RouteIcon from "@mui/icons-material/Route";
import Box from "@mui/material/Box";
import DirectionsIcon from "@mui/icons-material/Directions";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TransformIcon from "@mui/icons-material/Transform";
import { useGetGeofence } from "./queries/geofence";

interface Props {
  deviceId: string;
  data?: { lat: number; long: number };
  showRoute: boolean;
  handleVariantChange: () => void;
  handleFenceDisplay: () => void;
}

const SideBanner: React.FC<Props> = ({
  deviceId,
  data,
  showRoute,
  handleVariantChange,
  handleFenceDisplay,
}) => {
  const { data: geofence } = useGetGeofence(deviceId);
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "10px",
        width: "42px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        rowGap: "20px",
        border: "1px solid rgb(184, 180, 180)",
        borderRadius: "12px",
        backgroundColor: "#fff",
        padding: "16px 0px",
      }}
    >
      {!!geofence?.data && (
        <Box
          component="div"
          onClick={handleFenceDisplay}
          sx={{ cursor: "pointer" }}
        >
          <TransformIcon color="success" fontSize="large" />
        </Box>
      )}
      {!!data && (
        <a
          href={`https://www.google.com/maps?q=${data.lat},${data.long}`}
          target="_blank"
        >
          <DirectionsIcon color="primary" fontSize="large" />
        </a>
      )}
      <Box onClick={handleVariantChange} sx={{ cursor: "pointer" }}>
        {showRoute ? (
          <LocationOnIcon color="warning" fontSize="large" />
        ) : (
          <RouteIcon color="warning" fontSize="large" />
        )}
      </Box>
    </Box>
  );
};

export default SideBanner;
