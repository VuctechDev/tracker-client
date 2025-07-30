import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import OrganizationSelect from "./OrganizationSelect";
import { request } from "../../utils/api";
import { useQueryClient } from "@tanstack/react-query";
import type { DeviceType } from "../../queries/devices";
import DeviceSelect from "./DeviceSelect";

interface Props {}

const DevicesForm: React.FC<Props> = () => {
  const queryClient = useQueryClient();
  const [selectedOrg, setSelectedOrg] = useState<null | number>(null);
  const [deviceName, setDeviceName] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<null | DeviceType>(null);

  const handleUserSubmit = async () => {
    if (!deviceName.trim() || !selectedOrg) {
      return alert("User name and organization are required");
    }

    await request("/bo/devices", "PATCH", {
      id: selectedDevice?.id,
      organizationId: selectedOrg,
      name: deviceName,
    });

    await queryClient.invalidateQueries({ queryKey: ["bo_devices"] });
  };

  const handleSelect = (device: DeviceType) => {
    setSelectedDevice(device);
  };

  useEffect(() => {
    if (selectedDevice) {
      setSelectedOrg(selectedDevice.organizationId);
      setDeviceName(selectedDevice.name);
    }
  }, [selectedDevice]);

  return (
    <Box display="flex">
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{ width: "320px" }}
      >
        <Typography variant="h6">
          {`Update Device - ${selectedDevice?.imei}`}
        </Typography>
        <TextField
          label="Device Name"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          required
        />
        <OrganizationSelect value={selectedOrg} handleSelect={setSelectedOrg} />
        <Button variant="contained" onClick={handleUserSubmit}>
          Submit
        </Button>
      </Box>

      <DeviceSelect handleSelect={handleSelect} />
    </Box>
  );
};

export default DevicesForm;
