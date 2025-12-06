// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import '../styles/AdminPanel.css';
// export default function AdminPanel() {
//   const [records, setRecords] = useState([]);

//   useEffect(() => {
//     axios.get("https://hr-server-41im.onrender.com/api/attendance/all")
//       .then(res => setRecords(res.data))
//   }, []);

//   return (
//     <div className="tab">
//       <h2>Attendance Records</h2>

//       <table border="1" width="100%">
//         <thead>
//           <tr>
//             <th>Employee</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.map((r, i) => (
//             <tr key={i}>
//               <td>{r.employeeId}</td>
//               <td>{r.date}</td>
//               <td>{r.time}</td>
//               <td>{r.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";

export default function AdminPanel() {
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
      <h2>Today Attendance Report</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((rec, i) => (
            <tr key={i} className={rec.status === "Absent" ? "absent" : "present"}>
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
