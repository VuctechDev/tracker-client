import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login";
import PublicLayout from "../layouts/PublicLayout";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
