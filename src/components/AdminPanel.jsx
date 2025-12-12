






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/AdminPanel.css";

// import * as XLSX from "xlsx";
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";

// // Modal Component
// import UpdateAttendanceModal from "./UpdateAttendanceModal";

// export default function AdminPanel() {
//   const [records, setRecords] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);

//   const loadRecords = async () => {
//     try {
//       const res = await axios.get(
//         "https://hr-server-41im.onrender.com/api/attendance/all"
//       );
//       setRecords(res.data);
//     } catch (err) {
//       alert("Failed to load attendance");
//     }
//   };

//   useEffect(() => {
//     loadRecords();
//   }, []);

//   // ▶ EXPORT PDF
//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Today Attendance Report", 14, 10);

//     const tableData = records.map((rec, index) => [
//       index + 1,
//       rec.employeeName,
//       rec.employeeId,
//       rec.date,
//       rec.time,
//       rec.status,
//     ]);

//     autoTable(doc, {
//       head: [["No", "Employee Name", "Employee ID", "Date", "Time", "Status"]],
//       body: tableData,
//       startY: 20,
//     });

//     doc.save("AttendanceReport.pdf");
//   };

//   // ▶ EXPORT EXCEL
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

//       {/* Export Buttons */}
//       <div style={{ marginBottom: "15px" }}>
//         <button onClick={exportPDF} className="export-btn pdf">
//           Export PDF
//         </button>
//         <button onClick={exportExcel} className="export-btn excel">
//           Export Excel
//         </button>
//       </div>

//       <table className="table">
//         <thead>
//           <tr>
//             <th>No</th>
//             <th>Employee Name</th>
//             <th>Employee ID</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Status</th>
//             <th>Edit</th>
//           </tr>
//         </thead>

//         <tbody>
//           {records.map((rec, i) => (
//             <tr
//               key={i}
//               className={rec.status === "Absent" ? "absent" : "present"}
//             >
//               <td>{i + 1}</td>
//               <td>{rec.employeeName}</td>
//               <td>{rec.employeeId}</td>
//               <td>{rec.date}</td>
//               <td>{rec.time}</td>
//               <td>{rec.status}</td>

//               <td>
//                 <button
//                   className="edit-btn"
//                   onClick={() => {
//                     setSelectedRecord(rec);
//                     setOpenModal(true);
//                   }}
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Update Modal */}
//       <UpdateAttendanceModal
//         isOpen={openModal}
//         selectedRecord={selectedRecord}
//         onClose={() => {
//           setOpenModal(false);
//           loadRecords(); // Reload after update
//         }}
//       />
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";

import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import UpdateAttendanceModal from "./UpdateAttendanceModal";

export default function AdminPanel() {
  const [selectedDept, setSelectedDept] = useState(null);
  const [records, setRecords] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const loadRecords = async () => {
    try {
      const res = await axios.get(
        "https://hr-server-41im.onrender.com/api/attendance/all"
      );

      const data = res.data;

      console.log(data,"daaaaaata");
      

      // GROUP BY employeeDepartment ⭐ FIXED
      const groups = {};
      data.forEach((rec) => {
        const dept = rec.employeeDepartment || "No Department";
        console.log(dept,'deppppppppppppp');
        
        if (!groups[dept]) groups[dept] = [];
        groups[dept].push(rec);
      });

      setRecords(data);
      setGrouped(groups);
    } catch (err) {
      alert("Failed to load attendance");
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  // EXPORT PDF
 const exportPDF = () => {
  if (!selectedDept) {
    alert("Please select a department first");
    return;
  }

  const doc = new jsPDF();
  doc.text(`${selectedDept} - Attendance Report`, 14, 10);

  const tableData = grouped[selectedDept].map((rec, index) => [
    index + 1,
    rec.employeeName,
    rec.employeeId,
    rec.employeeDepartment,
    rec.date,
    rec.time,
    rec.status,
  ]);

  autoTable(doc, {
    head: [["No", "Name", "ID", "Department", "Date", "Time", "Status"]],
    body: tableData,
    startY: 20,
  });

  doc.save(`${selectedDept}_AttendanceReport.pdf`);
};

  // EXPORT EXCEL
 const exportExcel = () => {
  if (!selectedDept) {
    alert("Please select a department first");
    return;
  }

  const worksheetData = grouped[selectedDept].map((rec, index) => ({
    No: index + 1,
    Name: rec.employeeName,
    EmployeeID: rec.employeeId,
    Department: rec.employeeDepartment,
    Date: rec.date,
    Time: rec.time,
    Status: rec.status,
  }));

  const ws = XLSX.utils.json_to_sheet(worksheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, selectedDept);

  XLSX.writeFile(wb, `${selectedDept}_Attendance.xlsx`);
};


  return (
    <div className="admin-box">
      <h2>Today Attendance Report (Department-wise)</h2>

      {/* <div style={{ marginBottom: 15 }}>
        <button onClick={exportPDF} className="export-btn pdf">Export PDF</button>
        <button onClick={exportExcel} className="export-btn excel">Export Excel</button>
      </div> */}
      <div style={{ marginBottom: 15 }}>
  <select
    onChange={(e) => setSelectedDept(e.target.value)}
    style={{ padding: 8, marginRight: 10, marginBottom: 15, width: 200 }}
  >
    <option value="">-- Select Department --</option>
    {Object.keys(grouped).map((dept) => (
      <option key={dept} value={dept}>{dept}</option>
    ))}
  </select>

  <button onClick={exportPDF} className="export-btn pdf">Export PDF</button>
  <button onClick={exportExcel} className="export-btn excel">Export Excel</button>
</div>


      {/* DEPARTMENT-WISE TABLES */}
      {Object.keys(grouped).map((dept) => (
        <div key={dept} style={{ marginBottom: 40 }}>
          <h2 style={{ color: "blue" }}>{dept}</h2>

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
              {grouped[dept].map((rec, index) => (
                <tr
                  key={index}
                  className={rec.status === "Absent" ? "absent" : "present"}
                >
                  <td>{index + 1}</td>
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
        </div>
      ))}

      {/* <UpdateAttendanceModal
        isOpen={openModal}
        selectedRecord={selectedRecord}
        onClose={() => {
          setOpenModal(false);
          loadRecords();
        }} */}

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
