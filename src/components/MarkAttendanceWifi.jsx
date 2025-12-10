


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function MarkAttendanceWifi() {
//   const [employeeId, setEmployeeId] = useState("");
//   const [employeeName, setEmployeeName] = useState("");

//   useEffect(() => {
//     const savedId = localStorage.getItem("employeeId");
//     const savedName = localStorage.getItem("employeeName");

//     if (savedId) setEmployeeId(savedId);
//     if (savedName) setEmployeeName(savedName);
//   }, []);

//   const mark = async () => {
//     try {
//       const res = await axios.post(
//         "https://hr-server-41im.onrender.com/api/attendance/mark-wifi",
//         { employeeId }
//       );

//       alert(res.data.message);
//     } catch (e) {
//       alert(e.response?.data?.message || "Error marking attendance");
//     }
//   };

//   return (
//     <div className="box">
//       <h2>Mark Attendance (Company WiFi)</h2>

//       {/* ⭐ DISPLAY EMPLOYEE NAME */}
//       <h3>Welcome, {employeeName}</h3>

//       <input
//         value={employeeId}
//         readOnly
//       />

//       <button onClick={mark}>Mark Attendance</button>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MarkAttendanceWifi() {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem("employeeId");
    const savedName = localStorage.getItem("employeeName");

    if (savedId) setEmployeeId(savedId);
    if (savedName) setEmployeeName(savedName);
  }, []);

  const mark = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://hr-server-41im.onrender.com/api/attendance/mark-wifi",
        { employeeId }
      );

      alert(res.data.message);
    } catch (e) {
      alert(e.response?.data?.message || "Error marking attendance");
    }
    setLoading(false);
  };

  return (
    <div className="box">
      <h2>Mark Attendance (Company WiFi)</h2>

      {/* ⭐ DISPLAY EMPLOYEE NAME */}
      <h3>Welcome, {employeeName}</h3>

      <input value={employeeId} readOnly />

      <button onClick={mark} disabled={loading}>
        {loading ? "Marking..." : "Mark Attendance"}
      </button>
    </div>
  );
}

