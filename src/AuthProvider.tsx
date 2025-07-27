import { useEffect, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactElement;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [location.pathname]);

  return <>{children}</>;
};

export default AuthProvider;
