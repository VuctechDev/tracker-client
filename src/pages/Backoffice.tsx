import React, { useState } from "react";
import { Box, Tabs, Tab, TextField, Typography, Button } from "@mui/material";
import { request } from "../utils/api";
import UsersForm from "../components/bo/Users";
import DevicesForm from "../components/bo/Devices";

interface Props {}

const Backoffice: React.FC<Props> = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [orgName, setOrgName] = useState("");

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleOrgSubmit = async () => {
    if (!orgName.trim()) return alert("Organization name is required");
    await request("/bo/organizations", "POST", { name: orgName });
  };

  return (
    <Box p={2} width="100vw">
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Organizations" />
        <Tab label="Users" />
        <Tab label="Devices" />
      </Tabs>

      <Box mt={4}>
        {tabIndex === 0 && (
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{ maxWidth: "320px" }}
          >
            <Typography variant="h6">Create Organization</Typography>
            <TextField
              label="Organization Name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              required
            />
            <Button variant="contained" onClick={handleOrgSubmit}>
              Submit
            </Button>
          </Box>
        )}

        {tabIndex === 1 && <UsersForm />}

        {tabIndex === 2 && <DevicesForm />}
      </Box>
    </Box>
  );
};

export default Backoffice;
