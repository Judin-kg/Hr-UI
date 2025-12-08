
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";

export default function AttendenceList() {
  const [records, setRecords] = useState([]);

  const loadRecords = async () => {
    try {
      const res = await axios.get("https://hr-server-41im.onrender.com/api/attendance/all");
      setRecords(res.data);
    } catch (err) {
      alert("Failed to load attendance");
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <div className="admin-box">
      <h2>All Attendance Report</h2>

      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>EmployeeName</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((rec, i) => (
            <tr key={i} className={rec.status === "Absent" ? "absent" : "present"}>
                <td>{i + 1}</td>
                <td>{rec.name}</td>
              <td>{rec.employeeId}</td>
              <td>{rec.date}</td>
              <td>{rec.time}</td>
              <td>{rec.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}