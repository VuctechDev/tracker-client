import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "../pages/Home";
import Logs from "../pages/Logs";
import Backoffice from "../pages/Backoffice";
import AuthLayout from "../layouts/AuthLayout";
import Loading from "../components/Loading";
import App2 from "../App2";
import Analytics from "../pages/Analytics";
import Health from "../pages/Health";

const Geofence = lazy(() => import("../pages/Geofence2"));

export default function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/bo" element={<Backoffice />} />
        <Route path="/app2" element={<App2 />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/health" element={<Health />} />
        
        <Route
          path="/geofence"
          element={
            <Suspense fallback={<Loading />}>
              <Geofence />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
