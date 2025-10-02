import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "./BottomNavigation";
import AccountMenu from "../AccountMenu";
import DeviceSettings from "../DeviceSettings";
import { grey } from "@mui/material/colors";
import DeviceAnalytics from "../DeviceAnalytics";

interface Props {
  deviceId: string;
}

const NavDrawer: React.FC<Props> = ({ deviceId }) => {
  const [screen, setScreen] = React.useState("settings");

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
      {screen === "settings" && <DeviceSettings deviceId={deviceId} />}
      {screen === "analytics" && <DeviceAnalytics />}
      {screen === "account" && <AccountMenu />}
      <BottomNavigation
        setScreen={(screen: string) => setScreen(screen)}
        screen={screen}
      />
    </Box>
  );
};

export default NavDrawer;
