import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };
  return (
    <Button size="small" onClick={logOut}>
      {t("logOut")}
    </Button>
  );
};

export default LogOut;
