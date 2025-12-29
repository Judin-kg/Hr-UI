// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AddEmployerModal from "./AddEmployerModal";

// export default function EmployerList() {
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [department, setDepartment] = useState("");

//   const loadEmployees = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/employer/getAll"
//       );
//       setEmployees(res.data);
//       setFilteredEmployees(res.data);
//     } catch (err) {
//       alert("Failed to load employees");
//     }
//   };

//   useEffect(() => {
//     loadEmployees();
//   }, []);

//   // 🔹 FILTER BY DEPARTMENT
//   useEffect(() => {
//     if (!department) {
//       setFilteredEmployees(employees);
//     } else {
//       setFilteredEmployees(
//         employees.filter((emp) => emp.department === department)
//       );
//     }
//   }, [department, employees]);

//   const deleteEmployee = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this employee?")) return;

//     try {
//       await axios.delete(
//         `http://localhost:5000/api/employer/delete/${id}`
//       );
//       loadEmployees();
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   // 🔹 UNIQUE DEPARTMENTS
//   const departments = [...new Set(employees.map((e) => e.department))];

//   return (
//     <div style={{ width: "80%", margin: "auto", marginTop: 30 }}>
//       <h2>Employee List</h2>

//       {/* TOP BAR */}
//       <div style={{ display: "flex", gap: 15, marginBottom: 15 }}>
//         {/* ADD EMPLOYEE BUTTON */}
//         <button
//           onClick={() => setShowModal(true)}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "green",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Add Employee
//         </button>

//         {/* 🔽 DEPARTMENT DROPDOWN */}
//         <select
//           value={department}
//           onChange={(e) => setDepartment(e.target.value)}
//           style={{ padding: 10 }}
//         >
//           <option value="">All Departments</option>
//           {departments.map((dept, i) => (
//             <option key={i} value={dept}>
//               {dept}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* TABLE */}
//       <table border="1" width="100%" cellPadding="10">
//         <thead>
//           <tr>
//             <th>No</th>
//             <th>Name</th>
//             <th>Department</th>
//             <th>TeamHead</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filteredEmployees.map((emp) => (
//             <tr key={emp._id}>
//               <td>{filteredEmployees.indexOf(emp) + 1}</td>
//               <td>{emp.name}</td>
//               <td>{emp.department}</td>
//               <td>{emp.teamHead}</td>
              
//               <td>
//                 <button
//                   onClick={() => deleteEmployee(emp._id)}
//                   style={{
//                     background: "red",
//                     color: "white",
//                     padding: "6px 12px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}

//           {filteredEmployees.length === 0 && (
//             <tr>
//               <td colSpan="6" style={{ textAlign: "center" }}>
//                 No employees found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* MODAL */}
//       {showModal && (
//         <AddEmployerModal
//           onClose={() => setShowModal(false)}
//           onSave={() => {
//             setShowModal(false);
//             loadEmployees();
//           }}
//         />
//       )}
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import axios from "axios";
import AddEmployerModal from "./AddEmployerModal";

export default function EmployerList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [department, setDepartment] = useState("");
  const [teamHead, setTeamHead] = useState(""); // 🔥 NEW

  const loadEmployees = async () => {
    try {
      const res = await axios.get(
        "https://hr-server-six.vercel.app/api/employer/getAll"
      );
      setEmployees(res.data);
      setFilteredEmployees(res.data);
    } catch (err) {
      alert("Failed to load employees");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // 🔹 FILTER BY DEPARTMENT + TEAMHEAD
  useEffect(() => {
    let data = employees;

    if (department) {
      data = data.filter((emp) => emp.department === department);
    }

    if (teamHead) {
      data = data.filter(
        (emp) =>
          emp.teamHead?.name === teamHead || emp.teamHead === teamHead
      );
    }

    setFilteredEmployees(data);
  }, [department, teamHead, employees]);

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(
        `https://hr-server-six.vercel.app/api/employer/delete/${id}`
      );
      loadEmployees();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // 🔹 UNIQUE DEPARTMENTS
  const departments = [...new Set(employees.map((e) => e.department))];

  // 🔹 UNIQUE TEAMHEADS (SAFE)
  const teamHeads = [
    ...new Set(
      employees
        .map((e) => e.teamHead?.name || e.teamHead)
        .filter(Boolean)
    ),
  ];

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: 30 }}>
      <h2>Employee List</h2>

      {/* TOP BAR */}
      <div style={{ display: "flex", gap: 15, marginBottom: 15 }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Employee
        </button>

        {/* DEPARTMENT FILTER */}
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{ padding: 10 }}
        >
          <option value="">All Departments</option>
          {departments.map((dept, i) => (
            <option key={i} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* 🔥 TEAMHEAD FILTER */}
        <select
          value={teamHead}
          onChange={(e) => setTeamHead(e.target.value)}
          style={{ padding: 10 }}
        >
          <option value="">All Team Heads</option>
          {teamHeads.map((th, i) => (
            <option key={i} value={th}>
              {th}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Department</th>
            <th>TeamHead</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((emp, index) => (
            <tr key={emp._id}>
              <td>{index + 1}</td>
               {/* 🔥 IMAGE */}
              <td style={{ textAlign: "center" }}>
                {emp.image ? (
                  <img
                    src={emp.image}
                    alt={emp.name}
                    style={{
                      width: 50,
                      height: 50,
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  "-"
                )}
              </td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.teamHead?.name || emp.teamHead || "-"}</td>
              <td>
                <button
                  onClick={() => deleteEmployee(emp._id)}
                  style={{
                    background: "red",
                    color: "white",
                    padding: "6px 12px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredEmployees.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <AddEmployerModal
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            loadEmployees();
          }}
        />
      )}
    </div>
  );
}
