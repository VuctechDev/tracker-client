import * as React from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { LatLngExpression } from "leaflet";
import { useNavigate } from "react-router-dom";
import { useDevicesPooling } from "../queries/devices";
import { getRelativeTime } from "../utils/getDisplayDate";

interface Props {
  deviceId: string;
  center?: LatLngExpression[];
}

// const config = [
//   {
//     key: "24hDistance",
//     value: 0,
//   },
// ];

const NavDrawer: React.FC<Props> = ({ deviceId, center }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { devices } = useDevicesPooling();

  const device = devices.find((d) => d?.imei === deviceId);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "160px",
        paddingTop: "12px",
        // height: height ? "70vh" : "18vh",
        backgroundColor: "#fff",
        position: "fixed",
        bottom: 0,
        left: 0,
        borderRadius: "16px 16px 0px 0px",
        transition: "height 0.5s",
        zIndex: 9999999,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          mb: "10px",
        }}
      >
        <Typography>
          <span style={{ fontWeight: 600 }}>{t("imei")}:</span> {deviceId}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/geofence", { state: { deviceId, center } })}
        >
          {t("geofence")}
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          pl: "14px",
        }}
      >
        <Typography>
          <span style={{ fontWeight: 600 }}>{t("24hDistance")}</span>{" "}
          {device?.analytics?.last24h}m
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          pl: "14px",
        }}
      >
        <Typography>
          <span style={{ fontWeight: 600 }}>{t("lastHourDistance")}</span>{" "}
          {device?.analytics?.lastHour}m
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          pl: "14px",
        }}
      >
        <Typography>
          <span style={{ fontWeight: 600 }}>{t("lastKilometerMadeIn")}</span>{" "}
          {device?.analytics?.lastKilometerReachedAt
            ? getRelativeTime(
                `${new Date(device?.analytics?.lastKilometerReachedAt)}`
              )
            : "--"}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          pl: "14px",
        }}
      >
        <Typography>
          <span style={{ fontWeight: 600 }}>{t("lastUpdate")}:</span>{" "}
          {getRelativeTime(device?.updatedAt ?? "")}
        </Typography>
      </Box>
      <Button
        sx={{ position: "fixed", right: "18px", bottom: "30px" }}
        variant="outlined"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        {t("logOut")}
      </Button>
    </Box>
  );
};

export default NavDrawer;
