import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import CherryPickPDF from "./pages/ExtractPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<LandingPage />} />
          <Route path="extract" element={<CherryPickPDF />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
