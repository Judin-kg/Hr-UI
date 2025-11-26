import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeLogin from "./components/EmployeeLogin";
import MarkAttendanceWifi from "./components/MarkAttendanceWifi";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        <Route path="/mark" element={<MarkAttendanceWifi />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

