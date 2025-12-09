


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/AdminPanel.css";

// import * as XLSX from "xlsx";

// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
// export default function AdminPanel() {
//   const [records, setRecords] = useState([]);

//   const loadRecords = async () => {
//     try {
//       const res = await axios.get("https://hr-server-41im.onrender.com/api/attendance/all");
//       setRecords(res.data);
//     } catch (err) {
//       alert("Failed to load attendance");
//     }
//   };

//   useEffect(() => {
//     loadRecords();
//   }, []);


//     // EXPORT TO PDF
//   // ---------------------------------
//  const exportPDF = () => {
//   const doc = new jsPDF();
//   doc.text("Today Attendance Report", 14, 10);

//   const tableData = records.map((rec, index) => [
//     index + 1,
//     rec.employeeName,
//     rec.employeeId,
//     rec.date,
//     rec.time,
//     rec.status,
//   ]);

//   autoTable(doc, {
//     head: [["No", "Employee Name", "Employee ID", "Date", "Time", "Status"]],
//     body: tableData,
//     startY: 20
//   });

//   doc.save("AttendanceReport.pdf");
// };
//   // ---------------------------------
//   // EXPORT TO EXCEL
//   // ---------------------------------
//   const exportExcel = () => {
//     const worksheetData = records.map((rec, index) => ({
//       No: index + 1,
//       EmployeeName: rec.employeeName,
//       EmployeeID: rec.employeeId,
//       Date: rec.date,
//       Time: rec.time,
//       Status: rec.status,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(worksheetData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

//     XLSX.writeFile(workbook, "AttendanceReport.xlsx");
//   };
//   return (
//     <div className="admin-box">
//       <h2>Today Attendance Report</h2>

//        {/* Export Buttons */}
//       <div style={{ marginBottom: "15px" }}>
//         <button onClick={exportPDF} className="export-btn pdf">Export PDF</button>
//         <button onClick={exportExcel} className="export-btn excel">Export Excel</button>
//       </div>

//       <table className="table">
//         <thead>
//           <tr>
//             <th>No</th>
//             <th>EmployeeName</th>
//             <th>Employee ID</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {records.map((rec, i) => (
//             <tr key={i} className={rec.status === "Absent" ? "absent" : "present"}>
//                 <td>{i + 1}</td>
//                 <td>{rec.employeeName}</td>
//               <td>{rec.employeeId}</td>
//               <td>{rec.date}</td>
//               <td>{rec.time}</td>
//               <td>{rec.status}</td>
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

import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Modal Component
import UpdateAttendanceModal from "./UpdateAttendanceModal";

export default function AdminPanel() {
  const [records, setRecords] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const loadRecords = async () => {
    try {
      const res = await axios.get(
        "https://hr-server-41im.onrender.com/api/attendance/all"
      );
      setRecords(res.data);
    } catch (err) {
      alert("Failed to load attendance");
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  // ▶ EXPORT PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Today Attendance Report", 14, 10);

    const tableData = records.map((rec, index) => [
      index + 1,
      rec.employeeName,
      rec.employeeId,
      rec.date,
      rec.time,
      rec.status,
    ]);

    autoTable(doc, {
      head: [["No", "Employee Name", "Employee ID", "Date", "Time", "Status"]],
      body: tableData,
      startY: 20,
    });

    doc.save("AttendanceReport.pdf");
  };

  // ▶ EXPORT EXCEL
  const exportExcel = () => {
    const worksheetData = records.map((rec, index) => ({
      No: index + 1,
      EmployeeName: rec.employeeName,
      EmployeeID: rec.employeeId,
      Date: rec.date,
      Time: rec.time,
      Status: rec.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    XLSX.writeFile(workbook, "AttendanceReport.xlsx");
  };

  return (
    <div className="admin-box">
      <h2>Today Attendance Report</h2>

      {/* Export Buttons */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={exportPDF} className="export-btn pdf">
          Export PDF
        </button>
        <button onClick={exportExcel} className="export-btn excel">
          Export Excel
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {records.map((rec, i) => (
            <tr
              key={i}
              className={rec.status === "Absent" ? "absent" : "present"}
            >
              <td>{i + 1}</td>
              <td>{rec.employeeName}</td>
              <td>{rec.employeeId}</td>
              <td>{rec.date}</td>
              <td>{rec.time}</td>
              <td>{rec.status}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setSelectedRecord(rec);
                    setOpenModal(true);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      <UpdateAttendanceModal
        isOpen={openModal}
        selectedRecord={selectedRecord}
        onClose={() => {
          setOpenModal(false);
          loadRecords(); // Reload after update
        }}
      />
    </div>
  );
}
