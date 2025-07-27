import AuthProvider from "./AuthProvider";
import Home from "./Home";
import Logs from "./Logs";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Login";
import QueryProvider from "./QueryProvider";
import LogOut from "./components/LogOut";
import Box from "@mui/material/Box";

export default function App() {
  return (
    <QueryProvider>
      <Router>
        <AuthProvider>
          <>
            <div
              style={{ display: "flex", columnGap: "10px", padding: "10px" }}
              className="header"
            >
              <Link to="/">Home</Link>
              <Link to="/logs">Logs</Link>
              <Box
                width={1}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <LogOut />
              </Box>
            </div>

            <div className="wrapper">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/logs" element={<Logs />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </div>
          </>
        </AuthProvider>
      </Router>
    </QueryProvider>
  );
}
