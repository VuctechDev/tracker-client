import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Button size="small" onClick={logOut}>
      Odjava
    </Button>
  );
};

export default LogOut;
