import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelectedDevice } from "./utils/getInitialDeviceData";
import { useGetAnalytics } from "./queries/analytics";
import DistanceLast7DaysChart from "./components/DistanceLast7DaysChart";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

interface Props {}

const DeviceAnalytics: React.FC<Props> = () => {
  const { t } = useTranslation();
  const { id } = useSelectedDevice();
  const { analytics } = useGetAnalytics(id);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        px: "14px",
        pt: "4px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "4px",
        }}
      >
        <Typography>
          <span style={{ fontWeight: 600 }}>{t("24hDistance")}</span>{" "}
          {analytics.last24hDisplayValue}
        </Typography>
        <FontAwesomeIcon
          onClick={() => navigate("/analytics")}
          style={{ fontSize: "20px", fontWeight: 400 }}
          icon={faFileLines}
        />
      </Box>
      <DistanceLast7DaysChart apiData={analytics?.rows} unit="km" />
    </Box>
  );
};

export default DeviceAnalytics;
