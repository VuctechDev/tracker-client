import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import OrganizationSelect from "./OrganizationSelect";
import { request } from "../../utils/api";
import UserSelect from "./UserSelect";
import type { UserType } from "../../queries/users";
import { useQueryClient } from "@tanstack/react-query";

interface Props {}

const UsersForm: React.FC<Props> = () => {
  const queryClient = useQueryClient();
  const [selectedOrg, setSelectedOrg] = useState<null | number>(null);
  const [userName, setUserName] = useState("");
  const [selectedUser, setSelectedUser] = useState<null | UserType>(null);

  const handleUserSubmit = async () => {
    if (!userName.trim() || !selectedOrg) {
      return alert("User name and organization are required");
    }
    if (selectedUser) {
      await request("/bo/users", "PATCH", {
        id: selectedUser.id,
        organizationId: selectedOrg,
      });
    } else {
      await request("/bo/users", "POST", {
        name: userName,
        organizationId: selectedOrg,
      });
    }
    await queryClient.invalidateQueries({ queryKey: ["bo_users"] });
  };

  const handleSelect = (user: UserType) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    if (selectedUser) {
      setSelectedOrg(selectedUser.organizationId);
      setUserName(selectedUser.name);
    }
  }, [selectedUser]);

  return (
    <Box display="flex">
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{ width: "320px" }}
      >
        <Typography variant="h6">
          {selectedUser ? `Update User - ${selectedUser.name}` : "Create User"}
        </Typography>
        <TextField
          label="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required={!selectedUser}
          disabled={!!selectedUser}
        />
        <OrganizationSelect value={selectedOrg} handleSelect={setSelectedOrg} />
        <Button variant="contained" onClick={handleUserSubmit}>
          Submit
        </Button>
      </Box>

      <UserSelect handleSelect={handleSelect} />
    </Box>
  );
};

export default UsersForm;
