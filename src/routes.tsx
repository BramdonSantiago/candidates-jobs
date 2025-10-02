import { BrowserRouter, Routes, Route } from "react-router-dom";
import Candidates from "./pages/Candidates";
import CandidatesManager from "./pages/CandidatesManager";
import Graphs from "./pages/Graphs";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Candidates />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidates-manager" element={<CandidatesManager />} />
        <Route path="/graphs" element={<Graphs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;