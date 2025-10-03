import React from "react";
import { Typography, Stack } from "@mui/material";
import PageLayout from "../layouts/PageLayout";
import DemoCard from "../components/DemoCard";
import { useGetAnalytics } from "../queries/analytics";
import { useSelectedDevice } from "../utils/getInitialDeviceData";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DistanceLast7DaysChart from "../components/DistanceLast7DaysChart";
import { HourlyActivityChart } from "../components/HourlyActivityChart";
import AnalyticsWarning from "../components/AnalyticsWarning";
import { red, green } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

interface Props {}

const Analytics: React.FC<Props> = () => {
  const { id } = useSelectedDevice();
  const { analytics } = useGetAnalytics(id);
  const { t } = useTranslation();

  return (
    <PageLayout title={"Analytics"}>
      <AnalyticsWarning value={analytics.percentage} />
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
                style={{ fontSize: "14px", fontWeight: 800, color: green[500] }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faArrowDown}
                style={{ fontSize: "14px", fontWeight: 800, color: red[500] }}
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
        {t("sevenDaysDistanceChart")}
      </Typography>
      <DistanceLast7DaysChart
        apiData={analytics?.rows}
        unit="km"
        height={160}
      />
      <Typography variant="h6" textAlign="center" mt={1} mb={1}>
        {t("24hPerHourChart")}
      </Typography>
      <HourlyActivityChart data={analytics.hourly} />
    </PageLayout>
  );
};

export default Analytics;
