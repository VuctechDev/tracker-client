import React from "react";
import { Typography } from "@mui/material";
import {
  faCircleCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { orange, red, green } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

interface Props {
  value: number;
}

const config = [
  {
    topValue: 30,
    message: "extremlyInactive",
    icon: faTriangleExclamation,
    color: red[700],
  },
  {
    topValue: 65,
    message: "unusualyInactive",
    icon: faTriangleExclamation,
    color: orange[700],
  },
  {
    topValue: 135,
    message: "everythingLooksFine",
    icon: faCircleCheck,
    color: green[700],
  },
  {
    topValue: 170,
    message: "unusualyActive",
    icon: faTriangleExclamation,
    color: orange[700],
  },
  {
    topValue: Number.POSITIVE_INFINITY,
    message: "extremlyActive",
    icon: faTriangleExclamation,
    color: red[700],
  },
];

const AnalyticsWarning: React.FC<Props> = ({ value }) => {
  const { t } = useTranslation();
  const data = config.find((item) => item.topValue > value);

  return (
    <Typography variant="h6" textAlign="center" mb={2}>
      {t(data?.message ?? "")}
      <FontAwesomeIcon
        icon={data?.icon ?? faTriangleExclamation}
        style={{ fontSize: "17px", color: data?.color, marginLeft: "4px" }}
      />
    </Typography>
  );
};

export default AnalyticsWarning;
