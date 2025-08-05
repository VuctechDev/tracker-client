import { Box, Button, TextField } from "@mui/material";
import { useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../utils/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const code = useRef(localStorage.getItem("code") ?? "");
  const login = async () => {
    try {
      const data = await request("/auth/start-session", "POST", {
        code: code.current,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("code", code.current);
      navigate("/");
    } catch (error) {
      alert("ERROR");
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    code.current = e.target.value;
  };
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
      <TextField variant="outlined" label="Lozinka" onChange={handleInput} />
      <Button onClick={login} variant="contained">
        Prijava
      </Button>
    </Box>
  );
};

export default LoginPage;
