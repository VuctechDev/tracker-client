import AuthProvider from "./AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useGetOrganization } from "./queries/organizations";
import AuthRoutes from "./routes/AuthRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import Loading from "./components/Loading";

export default function App() {
  const { data, isLoading, isFetched } = useGetOrganization();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (data?.data) i18n.changeLanguage(data?.data?.lang);
  }, [i18n, data?.data]);

  if (isLoading && !isFetched) {
    return <Loading />;
  }

  return (
    <Router>
      <AuthProvider>
        <>
          <AuthRoutes />
          <PublicRoutes />
        </>
      </AuthProvider>
    </Router>
  );
}
