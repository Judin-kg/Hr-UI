// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminDashboard() {
//   const [records, setRecords] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/attendance/all")
//       .then(res => setRecords(res.data))
//   }, []);

//   return (
//     <div className="box">
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



import React, {useState } from "react";
import AdminPanel from "./AdminPanel";
// import "../admincomponents/AdminDashboard.css"; // Assuming you have a CSS file for styles

import "./AdminDashboard.css";
import EmployeeList from "./EmployeeList";
import DepartmentList from "./DepartmentList";
import AttendenceList from "./AttendenceList";
// import EmployeeCalendar from "./EmployeeCalendar";








// Sidebar items
const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "employee", label: "Employee" },
  { key: "department", label: "Department"},
  { key: "attendence", label: "AttendenceList"},
  // { key: "employeecard", label: "EmployeeCard" },
  { key: "report", label: "Report" },
  
];

function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (key) => {
    setActive(key);
    setIsOpen(false);
  };



  return (



 <div className="admin-wrap">
      {/* Top Navbar */}
      <header className="navbar navbar-light bg-white border-bottom sticky-top">
        <div className="container-fluid">
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-secondary d-lg-none"
              aria-label="Toggle sidebar"
              aria-controls="sidebar"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((v) => !v)}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <span className="navbar-brand mb-0 h1">Admin</span>
          </div>
          <div className="d-none d-sm-block small text-muted">
            {NAV_ITEMS.find((n) => n.key === active)?.label}
          </div>
        </div>
      </header>

      <div className="d-flex min-vh-100">
        {/* Sidebar */}
        <nav
          id="sidebar"
          className={`sidebar bg-light border-end ${isOpen ? "open" : ""}`}
          aria-label="Sidebar"
        >
          <div className="p-3 d-flex flex-column h-100">
            <div className="fs-5 fw-semibold mb-3 text-secondary">Menu</div>
            <ul className="nav nav-pills flex-column gap-1">
              {NAV_ITEMS.map((item) => (
                <li className="nav-item" key={item.key}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item.key)}
                    className={`nav-link w-100 text-start ${
                      active === item.key ? "active" : ""
                    }`}
                    aria-current={active === item.key ? "page" : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-auto small text-muted">
              <hr />
              <div>v1.0</div>
            </div>
          </div>
        </nav>

        {/* Clickable backdrop for mobile */}
        {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)} />}

        {/* Main Content */}
        <main className="content flex-grow-1">
          <div className="container-fluid py-4">
            <h1 className="h3 mb-3">
              {NAV_ITEMS.find((n) => n.key === active)?.label}
            </h1>

            {active === "dashboard" && (
              <div className="row g-3">
               

                

                <div className="col-12 col-xl-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="card-title">Overview</div>
                      <p className="mb-0">
                        Welcome to HR dashboard. Pick a section from the left to get started.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row g-3">
                 <AdminPanel />
                </div>
              </div>
            )}

            {active === "employee" && <EmployeeList/>}
            {active === "department" && <DepartmentList />}
            {active === "attendence" && <AttendenceList />}
            {/* {active === "employeecard" && <EmployeeCalendar />} */}
            
          </div>
        </main>
      </div>
    </div>

    

 
  );
}

// ✅ Exporting component
export default AdminDashboard;