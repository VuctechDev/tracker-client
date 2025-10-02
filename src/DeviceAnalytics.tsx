import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDevicesPooling } from "./queries/devices";
import { getInitialDeviceData } from "./utils/getInitialDeviceData";
import { useGetAnalytics } from "./queries/analytics";
import DistanceLast7DaysChart from "./components/DistanceLast7DaysChart";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {}

const DeviceAnalytics: React.FC<Props> = () => {
  const { t } = useTranslation();
  const { devices } = useDevicesPooling();
  const { id } = getInitialDeviceData(devices);
  const { analytics } = useGetAnalytics(id);

  const last24h = analytics?.last24h ?? 0;

  const a = (last24h / analytics?.monthlyAverage) * 100;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        px: "14px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "14px",
        }}
      >
        <Typography>
          <span style={{ fontWeight: 600 }}>{t("24h")}:</span>{" "}
          {(last24h / 1000)?.toFixed(2)}km
        </Typography>
        <Typography>
          <span style={{ fontWeight: 600 }}>
            {t("24h")}/{t("month")}:
          </span>{" "}
          {a?.toFixed(1)}%
          {a > 100 ? (
            <FontAwesomeIcon
              icon={faArrowUp}
              style={{ fontSize: "14px", fontWeight: 800, color: "#4caf50" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faArrowDown}
              style={{ fontSize: "14px", fontWeight: 800, color: "#f44336" }}
            />
          )}
        </Typography>
      </Box>
      <DistanceLast7DaysChart apiData={analytics?.rows} unit="km" />
    </Box>
  );
};

export default DeviceAnalytics;
