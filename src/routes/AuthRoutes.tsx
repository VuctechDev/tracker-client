import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Logs from "../pages/Logs";
import Backoffice from "../pages/Backoffice";
import AuthLayout from "../layouts/AuthLayout";
import Geofence from "../pages/Geofence2";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/bo" element={<Backoffice />} />
        <Route path="/geofence" element={<Geofence />} />
      </Route>
    </Routes>
  );
}
