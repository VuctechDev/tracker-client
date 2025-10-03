import { Box } from "@mui/material";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { useTranslation } from "react-i18next";

type ApiRow = { day: string; totalDistance: number };

type Props = {
  apiData: ApiRow[];
  unit?: "m" | "km";
  height?: number;
};

const DistanceLast7DaysChart: React.FC<Props> = ({
  apiData,
  unit = "m",
  height = 110,
}) => {
  const { t } = useTranslation();

  const buildLastNDays = (n: number) => {
    const days: string[] = [];
    const today = new Date();
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
      days.push(iso);
    }
    return days;
  };

  const days = buildLastNDays(7);
  const map = new Map(apiData?.map((r) => [r.day, r.totalDistance]));
  const data = days?.map((day) => {
    const raw = map.get(day) ?? 0;
    const value = unit === "km" ? raw / 1000 : raw;
    const d = new Date(`${day}T00:00:00`);
    const label = d.toLocaleDateString(undefined, {
      month: "2-digit",
      day: "2-digit",
    });
    return { day, label, value };
  });

  const unitSuffix = unit === "km" ? "km" : "m";
  const numberFmt = (n: number) =>
    unit === "km"
      ? n.toLocaleString(undefined, { maximumFractionDigits: 1 })
      : n.toLocaleString();

  return (
    <Box sx={{ width: "100%", height, marginTop: "auto" }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 16, right: 16, bottom: 8, left: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" />
          <YAxis hide />
          <Tooltip
            formatter={(v) => [
              `${numberFmt(Number(v))} ${unitSuffix}`,
              t("distance"),
            ]}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.day ?? ""}
          />
          <Bar
            dataKey="value"
            name={`Distance (${unitSuffix})`}
            fill="#111827"
            barSize={25}
            radius={[3, 3, 0, 0]}
          />
          <ReferenceLine y={0} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DistanceLast7DaysChart;
