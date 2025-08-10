import { Link, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import LogOut from "../components/LogOut";
import { useTranslation } from "react-i18next";

export default function AuthLayout() {
  const { t } = useTranslation();

  return (
    <>
      <Box
        style={{ display: "flex", columnGap: "10px", padding: "10px" }}
        className="header"
      >
        <Link to="/">{t("home")}</Link>
        <Link to="/logs">{t("logs")}</Link>
        <Box
          width={1}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "16px",
          }}
        >
          <LogOut />
        </Box>
      </Box>

      <Box className="wrapper" width={1}>
        <Outlet />
      </Box>
    </>
  );
}
