// HourlyActivityChart.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Skeleton, Alert, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

type HourlyPoint = {
  hour: string; // "YYYY-MM-DD HH:00"
  hourTs: string | Date; // ISO string or Date
  totalDistance: number; // km
  samples: number; // count
};

type Props = {
  data?: HourlyPoint[];
  height?: number;
  loading?: boolean;
};

export const HourlyActivityChart: React.FC<Props> = ({
  data,
  height = 160,
  loading = false,
}) => {
  const { t } = useTranslation();
  const prepared = React.useMemo(() => {
    if (!data?.length) return [];
    return data.map((d) => {
      const date =
        d.hourTs instanceof Date ? d.hourTs : new Date(d.hourTs ?? d.hour);
      return {
        ...d,
        ts: date.getTime(), // <-- use epoch ms, not toISOString()
      };
    });
  }, [data]);
  const unit = "km";
  const unitSuffix = unit === "km" ? "km" : "m";
  const numberFmt = (n: number) =>
    unit === "km"
      ? n.toLocaleString(undefined, { maximumFractionDigits: 1 })
      : n.toLocaleString();

  return (
    <Box sx={{ height }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" width={120} />
          <Skeleton variant="rectangular" height={height - 120} />
        </Stack>
      ) : !prepared.length ? (
        <Alert severity="info">No data in the last 24 hours.</Alert>
      ) : (
        <Box sx={{ width: "100%", height: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={prepared}
              margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="ts"
                tickFormatter={(v) =>
                  new Date(v).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    timeZone: "Europe/Paris",
                  })
                }
              />
              <YAxis hide />
              <Tooltip
                formatter={(v) => [
                  `${numberFmt(Number(v) / 1000)} ${unitSuffix}`,
                  t("distance"),
                ]}
                labelFormatter={(v) =>
                  new Date(v).toLocaleString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    timeZone: "Europe/Paris",
                  })
                }
              />
              <Line
                type="monotone"
                dataKey="totalDistance"
                name="totalDistance"
                dot={false}
                stroke="#111827"
                fill="#111827"
                strokeWidth={2}
                isAnimationActive={false}
              />
              {/* <Brush
                  dataKey="ts"
                  height={18}
                  travellerWidth={8}
                  tickFormatter={(v) => new Date(v).toLocaleTimeString(undefined, { hour: "2-digit", hour12: false, timeZone: TZ })}
                /> */}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};
