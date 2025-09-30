import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AccountMenu: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="outlined"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        {t("logOut")}
      </Button>
    </Box>
  );
};

export default AccountMenu;
