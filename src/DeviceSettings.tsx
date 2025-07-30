import { useState } from "react";
import { Box, Typography, Popover } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CommandCenter from "./CommandCenter";
import { getRelativeTime } from "./utils/getDisplayDate";
import { useDevicesPooling, type DeviceType } from "./queries/devices";

interface Props {
  deviceId: string;
}

const DeviceSettings: React.FC<Props> = ({ deviceId }) => {
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
              <Typography variant="h6">IMEI: {device?.imei}</Typography>
            </Box>

            <Box sx={{ width: "50%" }}>
              <Typography>Battery: {device?.battery}%</Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography>Signal: {device?.signal}%</Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography>Status: {device?.status?.toUpperCase()}</Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography>Version: {device?.version}</Typography>
            </Box>
            <Box sx={{ width: "100%", mt: "6px" }}>
              <Typography>
                Distance in 24h: {device?.analytics?.last24h}m
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography>
                Distance in last hour: {device?.analytics?.lastHour}m
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography>
                Last kilometer made:{" "}
                {getRelativeTime(
                  `${new Date(device?.analytics?.lastKilometerReachedAt)}`
                )}
              </Typography>
            </Box>
            <Box sx={{ width: "100%", mt: "6px"  }}>
              <Typography>
                Last update: {getRelativeTime(device?.updatedAt)}
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
          <div style={{ marginTop: "6px" }}></div>
        </Box>
      </Popover>
    </>
  );
};

export default DeviceSettings;
