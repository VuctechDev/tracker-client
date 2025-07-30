import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useGetDevices, type DeviceType } from "../../queries/devices";

interface Props {
  handleSelect: (device: DeviceType) => void;
}

const DeviceSelect: React.FC<Props> = ({ handleSelect }) => {
  const { data } = useGetDevices();

  useEffect(() => {
    if (data?.data.length) {
      handleSelect(data.data[0]);
    }
  }, [data]);

  return (
    <Box sx={{ fontSize: "12px", pl: "16px" }}>
      {data?.data.map((device, i) => (
        <Box
          key={device.id}
          sx={{
            display: "flex",
            cursor: "pointer",
            p: "4px",
            background: i % 2 === 0 ? "#eee" : "#fff",
            "& > div": {
              minWidth: "150px",
            },
          }}
          onClick={() => handleSelect(device)}
        >
          <Box>{device.name}</Box>
          <Box>{device.imei}</Box>
          <Box>{device.organization.name}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default DeviceSelect;
