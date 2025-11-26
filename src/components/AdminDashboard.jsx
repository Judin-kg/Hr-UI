import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("https://https://hr-server-41im.onrender.com/api/admin/all-attendance")
      .then(res => setRecords(res.data))
  }, []);

  return (
    <div className="box">
      <h2>Attendance Records</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td>{r.employeeId}</td>
              <td>{r.date}</td>
              <td>{r.time}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
