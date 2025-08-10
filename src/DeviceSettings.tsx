import { useState } from "react";
import { Box, Typography, Popover, Button } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { getRelativeTime } from "./utils/getDisplayDate";
import { useDevicesPooling, type DeviceType } from "./queries/devices";
import { useNavigate } from "react-router-dom";
import type { LatLngExpression } from "leaflet";
import CommandCenter from "./components/CommandCenter";
import { useTranslation } from "react-i18next";

interface Props {
  deviceId: string;
  center?: LatLngExpression[];
}

const DeviceSettings: React.FC<Props> = ({ deviceId, center }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: devicesData } = useDevicesPooling();
  const devices = devicesData?.data ?? [];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const device = devices.find((d) => d.imei === deviceId) ?? ({} as DeviceType);

  const isDev = import.meta.env.VITE_NODE_ENV === "dev";

  return (
    <>
      <Box className="mobileNavVevices2" onClick={handleClick}>
        <Typography variant="body1">{device?.name}</Typography> <SettingsIcon />
      </Box>
      <Popover
        closeAfterTransition
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        style={{ marginTop: "4px" }}
      >
        <Box sx={{ p: 1.5, width: "100%" }} className="devicesCardWrapper2">
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h6">
                {t("imei")}: {device?.imei}
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography>
                {t("battery")}: {device?.battery}%
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography>
                {t("signal")}: {device?.signal}%
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography>
                {t("status")}: {t(device?.status).toUpperCase()}
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography>
                {t("version")}: {device?.version}
              </Typography>
            </Box>
            <Box sx={{ width: "100%", mt: "6px" }}>
              <Typography>
                {t("24hDistance")} {device?.analytics?.last24h}m
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography>
                {t("lastHourDistance")} {device?.analytics?.lastHour}m
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography>
                {t("lastKilometerMadeIn")}{" "}
                {device?.analytics?.lastKilometerReachedAt
                  ? getRelativeTime(
                      `${new Date(device?.analytics?.lastKilometerReachedAt)}`
                    )
                  : "--"}
              </Typography>
            </Box>
            <Box sx={{ width: "100%", mt: "6px" }}>
              <Typography>
                {t("lastUpdate")}: {getRelativeTime(device?.updatedAt)}
              </Typography>
            </Box>
          </Box>
          {device?.status !== "offline" && isDev && (
            <CommandCenter
              id={device?.imei}
              value={
                devices.find((device) => device?.imei === device.imei)
                  ?.interval ?? "60"
              }
            />
          )}
          <Box sx={{ mt: "12px" }}>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              onClick={() =>
                navigate("/geofence", { state: { deviceId, center } })
              }
            >
              {t("geofence")}
            </Button>
          </Box>
          <div style={{ marginTop: "6px" }}></div>
        </Box>
      </Popover>
    </>
  );
};

export default DeviceSettings;
