import { Route, Routes } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import LandingPage from "@/pages/LandingPage";
import { APPROUTES } from "@/constant/routes";
import HomePage from "@/pages/HomePage";
import ExtractPage from "@/pages/ExtractPage";
function App() {
  return (
    <>
      <Routes>
        <Route path={APPROUTES.Base} element={<MainLayout />}>
          <Route path={APPROUTES.Landing} element={<LandingPage />} />
          <Route path={APPROUTES.Home} element={<HomePage />} />
          <Route path={`${APPROUTES.extract}/:id`} element={<ExtractPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
