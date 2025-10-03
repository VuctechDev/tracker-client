import React from "react";
import { Typography, Stack } from "@mui/material";
import PageLayout from "../layouts/PageLayout";
import DemoCard from "../components/DemoCard";
import { useGetAnalytics } from "../queries/analytics";
import { useSelectedDevice } from "../utils/getInitialDeviceData";
import {
  faArrowUp,
  faArrowDown,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DistanceLast7DaysChart from "../components/DistanceLast7DaysChart";
import { HourlyActivityChart } from "../components/HourlyActivityChart";

interface Props {}

const Analytics: React.FC<Props> = () => {
  const { id } = useSelectedDevice();
  const { analytics } = useGetAnalytics(id);

  return (
    <PageLayout title={"Analytics"}>
      <Typography variant="h6" textAlign="center" mb={2}>
        Everything looks fine{" "}
        <FontAwesomeIcon
          icon={faCircleCheck}
          style={{ fontSize: "16px", fontWeight: 800, color: "#4caf50" }}
        />
      </Typography>

      <Stack direction="row" spacing={2}>
        <DemoCard title={"24h"}>
          <Typography variant="h6" textAlign="center">
            {analytics.last24hDisplayValue}
          </Typography>
        </DemoCard>
        <DemoCard title={"24h / Ø"}>
          <Typography variant="h6" textAlign="center">
            {analytics.percentageDisplayValue}
            {analytics.percentage > 100 ? (
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
        </DemoCard>
        <DemoCard title={"Month Ø"}>
          <Typography variant="h6" textAlign="center">
            {analytics.monthlyAverageDisplayValue}
          </Typography>
        </DemoCard>
      </Stack>
      <Typography variant="h6" textAlign="center" mt={3}>
        7 days distance chart
      </Typography>
      <DistanceLast7DaysChart
        apiData={analytics?.rows}
        unit="km"
        height={160}
      />
      <Typography variant="h6" textAlign="center" mt={1} mb={1}>
        Last 24h distance per hour chart
      </Typography>
      <HourlyActivityChart data={analytics.hourly} />
    </PageLayout>
  );
};

export default Analytics;
