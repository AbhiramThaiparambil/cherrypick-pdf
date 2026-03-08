import { Route, Routes } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import LandingPage from "@/pages/LandingPage";
import { APPROUTES } from "@/constant/routes";
import HomePage from "@/pages/HomePage";
import ExtractPage from "@/pages/ExtractPage";
import ProtectedRoute from "./layouts/ProtectedRoute";
import AuthRoute from "./layouts/AuthRoute";
import useRefreshSession from "./hooks/useRefreshSession";
function App() {
  useRefreshSession();
  return (
    <>
      <Routes>
        <Route path={APPROUTES.Base} element={<MainLayout />}>
          <Route
            path={APPROUTES.Landing}
            element={
              <AuthRoute>
                <LandingPage />
              </AuthRoute>
            }
          />
          <Route
            path={APPROUTES.Home}
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${APPROUTES.extract}/:id`}
            element={
              <ProtectedRoute>
                <ExtractPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
