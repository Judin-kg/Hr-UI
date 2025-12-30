import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeLogin from "./components/EmployeeLogin";
import MarkAttendanceWifi from "./components/MarkAttendanceWifi";
import AdminDashboard from "./components/AdminDashboard";
import Settings from "./components/Settings";
import EmployeeProfile from "./components/EmployeeProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        <Route path="/mark" element={<MarkAttendanceWifi />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<EmployeeProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

