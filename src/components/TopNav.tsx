import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import DevicesSelect from "../DevicesSelect";
import { useDevicesPooling, type DeviceType } from "../queries/devices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignalPerfect } from "@fortawesome/free-solid-svg-icons";
import { getInitialDeviceData } from "../utils/getInitialDeviceData";

interface Props {
  selectDevice: (imei: string) => void;
}

const TopNav: React.FC<Props> = ({ selectDevice }) => {
  const { devices } = useDevicesPooling();
  const [selectedDevice, setSelectedDevice] = useState<
    DeviceType | undefined
  >();

  useEffect(() => {
    const { device } = getInitialDeviceData(devices);
    setSelectedDevice(device);
  }, [devices]);

  const handleSelect = (id: string) => {
    selectDevice(id);
    setSelectedDevice(devices.find((d) => d.imei === id));
  };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: "#fff",
        width: "100%",
        height: "50px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10,
        alignItems: "center",
        justifyContent: "space-between",
        display: "none",
        [theme.breakpoints.down("md")]: {
          display: "flex",
        },
      })}
    >
      <DevicesSelect onSelect={handleSelect} selectedDevice={selectedDevice} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          px: "6px",
          width: "100%",
        }}
      >
        <BatteryLevel level={selectedDevice?.battery ?? 0} />
        <SignalLevel level={selectedDevice?.signal ?? 0} />
      </Box>
    </Box>
  );
};

interface BatteryLevelProps {
  level: number;
}

const getColor = (level: number): string => {
  if (!level) return "transparent";
  if (level >= 70) return "#4caf50";
  if (level >= 30) return "#ffeb3b";
  return "#f44336";
};

const BatteryLevel: React.FC<BatteryLevelProps> = ({ level }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      pt="6px"
    >
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            width: 30,
            height: 16,
            border: "2px solid #333",
            borderRadius: "4px",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${level}%`,
              backgroundColor: getColor(level),
            }}
          />
        </Box>
        <Box
          sx={{
            width: 4,
            height: 7,
            backgroundColor: "#333",
            ml: "0px",
            borderRadius: "2px",
          }}
        />
      </Box>
      <Typography variant="body2">{level}%</Typography>
    </Box>
  );
};

interface SignalLevelProps {
  level: number;
}

const SignalLevel: React.FC<SignalLevelProps> = ({ level }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      pt="4px"
    >
      <FontAwesomeIcon
        style={{ fontSize: "18px", fontWeight: 700 }}
        icon={faSignalPerfect}
      />
      <Typography variant="body2">{level}%</Typography>
    </Box>
  );
};

export default TopNav;
