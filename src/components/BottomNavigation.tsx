import React from "react";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faGears,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { grey } from "@mui/material/colors";

interface Props {
  screen: string;
  setScreen: (screen: string) => void;
}

const config = [
  { screen: "settings", icon: faGears },
  { screen: "analytics", icon: faChartSimple },
  { screen: "account", icon: faUser },
];

const BottomNavigation: React.FC<Props> = ({ screen, setScreen }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "52px",
        backgroundColor: "#fff",
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        pb: "8px",
        backdropFilter: "saturate(180%) blur(6px)",
        borderTop: `1px solid ${grey[200]}`,
      }}
    >
      {config.map((item) => (
        <FontAwesomeIcon
          key={item.screen}
          style={{
            fontSize: "22px",
            color: screen === item.screen ? grey[900] : grey[400],
            transition: "all 0.2s",
          }}
          icon={item.icon}
          onClick={() => setScreen(item.screen)}
        />
      ))}
    </Box>
  );
};

export default BottomNavigation;
