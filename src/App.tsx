// src/App.tsx
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Impr from "./pages/Impr";
import Popup from "./pages/Popup";

export default function App() {
  return (
    <Routes>
      <Route index element={<Popup />} />
      <Route path="popup" element={<Popup />} />

      <Route path="app" element={<Sidebar />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="impr" element={<Impr />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
