import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export default function PublicLayout() {
  return (
    <Box className="public-wrapper">
      <Outlet />
    </Box>
  );
}
