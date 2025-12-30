import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profile.css";

export default function EmployeeProfile() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const employeeId = localStorage.getItem("employeeId");
  const employeeName = localStorage.getItem("employeeName");
  const employeeDepartment = localStorage.getItem("employeeDepartment");
  const employeeImage = localStorage.getItem("employeeImage");

  /* 🌙 LOAD THEME */
  useEffect(() => {
    setDarkMode(localStorage.getItem("darkMode") === "true");
  }, []);

  /* 📅 LOAD ATTENDANCE BY ID */
  useEffect(() => {
    if (!employeeId) return;

    const fetchAttendance = async () => {
      try {
        const res = await axios.get(
          `https://hr-server-six.vercel.app/api/attendance/employee/${employeeId}`
        );
        setAttendance(res.data);
      } catch (err) {
        alert("Failed to load attendance");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [employeeId]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading attendance...</p>;
  }

  return (
    <div className={`profile-page ${darkMode ? "dark" : ""}`}>
      {/* 👤 HEADER */}
      <div className="profile-header">
        <img
          src={employeeImage || "/default-avatar.png"}
          alt="Employee"
          className="profile-avatar"
        />
        <h2>{employeeName}</h2>
        <p>{employeeDepartment}</p>
        <p className="emp-id">ID: {employeeId}</p>
      </div>

      {/* 📊 ATTENDANCE LIST */}
      <div className="attendance-list">
        <h3>Last 30 Days Attendance</h3>

        {attendance.map((item, index) => (
          <div
            key={index}
            className={`attendance-row ${item.status.toLowerCase()}`}
          >
            <span>{item.date}</span>
            <span>{item.time}</span>
            <span className={`status ${item.status.toLowerCase()}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
