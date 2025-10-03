import { Box, Button, TextField } from "@mui/material";
import { useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../utils/api";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const code = useRef(localStorage.getItem("code") ?? "");
  const login = async () => {
    try {
      const data = await request("/auth/start-session", "POST", {
        code: code.current,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("code", code.current);
      navigate("/", { replace: true });
    } catch (error) {
      alert("ERROR");
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    code.current = e.target.value;
  };

  // const authCode = import.meta.env.VITE_AUTH_CODE;
  const authCode = "";

  return (
    <Box
      sx={{
        width: "100vw",
        paddingTop: "20%",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: "16px",
      }}
    >
      <TextField
        variant="outlined"
        label={t("password")}
        onChange={handleInput}
        defaultValue={authCode ?? localStorage.getItem("code")}
      />
      <Button onClick={login} variant="contained">
        {t("signIn")}
      </Button>
    </Box>
  );
};

export default LoginPage;
