import React from "react";
import { useGetUsersBO, type UserType } from "../../queries/users";
import Box from "@mui/material/Box";

interface Props {
  handleSelect: (user: UserType) => void;
}

const UserSelect: React.FC<Props> = ({ handleSelect }) => {
  const { data } = useGetUsersBO();
  return (
    <Box sx={{ fontSize: "12px", pl: "16px" }}>
      {data?.data.map((user, i) => (
        <Box
          key={user.id}
          sx={{
            display: "flex",
            cursor: "pointer",
            p: "4px",
            background: i % 2 === 0 ? "#eee" : "#fff",
            "& > div": {
              minWidth: "140px",
            },
          }}
          onClick={() => handleSelect(user)}
        >
          <Box>{user.name}</Box>
          <Box>{user.code}</Box>
          <Box>{user.organization.name}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default UserSelect;
