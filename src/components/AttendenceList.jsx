



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/AdminPanel.css";

// export default function AttendenceList() {
//   const [records, setRecords] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   // Filters
//   const [department, setDepartment] = useState("");
//   const [empName, setEmpName] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const loadRecords = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/attendance/date"
//       );
//       setRecords(res.data);
//       setFiltered(res.data);
//     } catch (err) {
//       alert("Failed to load attendance");
//     }
//   };

//   useEffect(() => {
//     loadRecords();
//   }, []);

//   // 🔍 APPLY ALL FILTERS
//   const applyFilters = () => {
//     let result = records;

//     // Department filter
//     if (department) {
//       result = result.filter(
//         (rec) =>
//           rec.employeeDepartment &&
//           rec.employeeDepartment
//             .toLowerCase()
//             .includes(department.toLowerCase())
//       );
//     }

//     // Employee Name filter
//     if (empName) {
//       result = result.filter((rec) =>
//         rec.employeeName.toLowerCase().includes(empName.toLowerCase())
//       );
//     }

//     // From & To Date filter
//     if (fromDate) {
//       result = result.filter((rec) => rec.date >= fromDate);
//     }
//     if (toDate) {
//       result = result.filter((rec) => rec.date <= toDate);
//     }

//     setFiltered(result);
//   };

//   return (
//     <div className="admin-box">
//       <h2>All Attendance Report</h2>

//       {/* 🔥 FILTERS UI */}
//       <div className="filters" style={{ marginBottom: 20 }}>
//         <input
//           placeholder="Search Department"
//           value={department}
//           onChange={(e) => setDepartment(e.target.value)}
//           style={{ marginRight: 10 }}
//         />

//         <input
//           placeholder="Search Employee Name"
//           value={empName}
//           onChange={(e) => setEmpName(e.target.value)}
//           style={{ marginRight: 10 }}
//         />

//         <input
//           type="date"
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//           style={{ marginRight: 10 }}
//         />

//         <input
//           type="date"
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//           style={{ marginRight: 10 }}
//         />

//         <button onClick={applyFilters}>Apply Filters</button>
//       </div>

//       {/* TABLE */}
//       <table className="table">
//         <thead>
//           <tr>
//             <th>No</th>
//             <th>Employee Name</th>
//             <th>Employee ID</th>
//             <th>Department</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filtered.map((rec, i) => (
//             <tr
//               key={i}
//               className={rec.status === "Absent" ? "absent" : "present"}
//             >
//               <td>{i + 1}</td>
//               <td>{rec.employeeName}</td>
//               <td>{rec.employeeId}</td>
//               <td>{rec.employeeDepartment || "—"}</td>
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

export default function AttendenceList() {
  const [records, setRecords] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Filters
  const [department, setDepartment] = useState("");
  const [empName, setEmpName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const loadRecords = async () => {
    try {
      const res = await axios.get("https://hr-server-41im.onrender.com/api/attendance/date");
      setRecords(res.data);
      setFiltered(res.data);
    } catch (err) {
      alert("Failed to load attendance");
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  // 🔍 APPLY ALL FILTERS
  const applyFilters = () => {
    let result = records;

    if (department) {
      result = result.filter(
        (rec) =>
          rec.employeeDepartment &&
          rec.employeeDepartment
            .toLowerCase()
            .includes(department.toLowerCase())
      );
    }

    if (empName) {
      result = result.filter((rec) =>
        rec.employeeName.toLowerCase().includes(empName.toLowerCase())
      );
    }

    if (fromDate) {
      result = result.filter((rec) => rec.date >= fromDate);
    }

    if (toDate) {
      result = result.filter((rec) => rec.date <= toDate);
    }

    setFiltered(result);
    setCurrentPage(1); // reset to page 1 after filter
  };

  // 🔢 PAGINATION LOGIC
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filtered.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };


 // 📄 EXPORT PDF (Filtered Data)
  // -----------------------------
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("Attendance Report", 14, 10);

    const tableData = filtered.map((rec, index) => [
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

    doc.save("AttendanceReport.pdf");
  };

  // -----------------------------
  // 📊 EXPORT EXCEL (Filtered Data)
  // -----------------------------
  const exportExcel = () => {
    const worksheetData = filtered.map((rec, index) => ({
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
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, "AttendanceReport.xlsx");
  };
  

  return (
    <div className="admin-box">
      <h2>All Attendance Report</h2>

      {/* 🔥 FILTERS */}
      <div className="filters" style={{ marginBottom: 20 }}>
        <input
          placeholder="Search Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{ marginRight: 10 }}
        />

        <input
          placeholder="Search Employee Name"
          value={empName}
          onChange={(e) => setEmpName(e.target.value)}
          style={{ marginRight: 10 }}
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={{ marginRight: 10 }}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={{ marginRight: 10 }}
        />

        <button onClick={applyFilters} className="btn-border" style={{borderRadius:"5px", marginTop:"5px", backgroundColor:"silver"}}>Apply Filters</button>
      </div>


      {/* EXPORT BUTTONS */}
      <div style={{ marginBottom: 15 }}>
        <button className="export-btn pdf" onClick={exportPDF}>
          Export PDF
        </button>
        <button className="export-btn excel" onClick={exportExcel}>
          Export Excel
        </button>
      </div>

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Department</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {currentRecords.map((rec, i) => (
            <tr
              key={i}
              className={rec.status === "Absent" ? "absent" : "present"}
            >
              <td>{indexOfFirst + i + 1}</td>
              <td>{rec.employeeName}</td>
              <td>{rec.employeeId}</td>
              <td>{rec.employeeDepartment || "—"}</td>
              <td>{rec.date}</td>
              <td>{rec.time}</td>
              <td>{rec.status}</td>
            </tr>
          ))}

          {currentRecords.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINATION UI */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <button disabled={currentPage === 1} onClick={prevPage}>
          ◀ Prev
        </button>

        <span>
          Page <b>{currentPage}</b> of <b>{totalPages}</b>
        </span>

        <button disabled={currentPage === totalPages} onClick={nextPage}>
          Next ▶
        </button>
      </div>
    </div>
  );
}
