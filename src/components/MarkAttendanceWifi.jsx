import React, { useState } from "react";
import axios from "axios";

export default function MarkAttendanceWifi() {
  const [employeeId, setEmployeeId] = useState("");

  const mark = async () => {
    try {
      const res = await axios.post("https://hr-server-41im.onrender.com/api/attendance/mark-wifi", {
        employeeId,
      });

      alert(res.data.message);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div className="box">
      <h2>Mark Attendance (Company WiFi)</h2>

      <input
        placeholder="Enter Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />

      <button onClick={mark}>Mark Attendance</button>
    </div>
  );
}
