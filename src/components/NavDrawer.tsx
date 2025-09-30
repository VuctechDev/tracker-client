import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { LatLngExpression } from "leaflet";
import { useDevicesPooling } from "../queries/devices";
import { getRelativeTime } from "../utils/getDisplayDate";
import BottomNavigation from "./BottomNavigation";
import AccountMenu from "../AccountMenu";
import DeviceSettings from "../DeviceSettings";
import { grey } from "@mui/material/colors";

interface Props {
  deviceId: string;
  center?: LatLngExpression[];
}

const NavDrawer: React.FC<Props> = ({ deviceId, center }) => {
  const [screen, setScreen] = React.useState("settings");
  const { t } = useTranslation();
  const { devices } = useDevicesPooling();

  const device = devices.find((d) => d?.imei === deviceId);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "150px",
        paddingTop: "12px",
        backgroundColor: "#fff",
        position: "fixed",
        bottom: 50,
        left: 0,
        borderRadius: "16px 16px 0px 0px",
        transition: "height 0.5s",
        zIndex: 10,
        borderTop: `1px solid ${grey[300]}`,
      }}
    >
      {screen === "settings" && (
        <DeviceSettings deviceId={deviceId} center={center} />
      )}
      {screen === "analytics" && (
        <>
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
              <span style={{ fontWeight: 600 }}>
                {t("lastKilometerMadeIn")}
              </span>{" "}
              {device?.analytics?.lastKilometerReachedAt
                ? getRelativeTime(
                    `${new Date(device?.analytics?.lastKilometerReachedAt)}`
                  )
                : "--"}
            </Typography>
          </Box>
        </>
      )}
      {screen === "account" && <AccountMenu />}
      <BottomNavigation
        setScreen={(screen: string) => setScreen(screen)}
        screen={screen}
      />
    </Box>
  );
};

export default NavDrawer;
