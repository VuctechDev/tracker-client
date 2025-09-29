import Box from "@mui/material/Box";
import { useGetGeofence } from "./queries/geofence";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiamondTurnRight,
  faRoute,
  faCropSimple,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

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

  const displayGeofenceButton = !!geofence?.data?.coordinates?.length;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "160px",
        right: "10px",
        width: "42px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        rowGap: "16px",
        borderRadius: "12px",
        padding: "16px 0px",
      }}
    >
      {displayGeofenceButton && (
        <Box
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            border: "1px solid rgb(120, 120, 120)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleFenceDisplay}
        >
          <FontAwesomeIcon
            icon={faCropSimple}
            style={{ fontSize: "22px", fontWeight: 400 }}
          />
        </Box>
      )}
      {!!data && (
        <Box
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            border: "1px solid rgb(120, 120, 120)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <a
            href={`https://www.google.com/maps?q=${data.lat},${data.long}`}
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faDiamondTurnRight}
              style={{ fontSize: "24px", fontWeight: 400, color: "#111827" }}
            />
          </a>
        </Box>
      )}
      <Box
        sx={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          border: "1px solid rgb(120, 120, 120)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          // userSelect: "none",
          // outline: "none",
          // "&:focus": { outline: "none" },
          // "&:active": { boxShadow: "none" },
        }}
        onClick={handleVariantChange}
        // tabIndex={-1}
      >
        {showRoute ? (
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{ fontSize: "22px", fontWeight: 400 }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faRoute}
            style={{ fontSize: "22px", fontWeight: 400 }}
          />
        )}
      </Box>
    </Box>
  );
};

export default SideBanner;
