// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AddEmployeeModal from "./AddEmployeeModal";

// export default function EmployeeList() {
//   const [employees, setEmployees] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const loadEmployees = async () => {
//     try {
//       const res = await axios.get("https://hr-server-41im.onrender.com/api/employee/all");
//       setEmployees(res.data);
//     } catch (err) {
//       alert("Failed to load employees");
//     }
//   };

//   const deleteEmployee = async (empId) => {
//     if (!window.confirm("Are you sure you want to delete this employee?")) return;

//     try {
//       await axios.delete(`https://hr-server-41im.onrender.com/api/employee/delete/${empId}`);
//       loadEmployees(); // refresh list
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   useEffect(() => {
//     loadEmployees();
//   }, []);

//   return (
//     <div style={{ width: "80%", margin: "auto", marginTop: 30 }}>
//       <h2>Employee List</h2>

//       {/* ADD EMPLOYEE BUTTON */}
//       <button
//         onClick={() => setShowModal(true)}
//         style={{
//           padding: "10px 20px",
//           marginBottom: 15,
//           backgroundColor: "green",
//           color: "white",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Add Employee
//       </button>

//       <table border="1" width="100%" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Employee ID</th>
//             <th>Password</th>
//             <th>department</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {employees.map((emp) => (
//             <tr key={emp._id}>
//               <td>{emp.name}</td>
//               <td>{emp.empId}</td>
//               <td>{emp.password}</td>
//               <td>{emp.department}</td>
//               <td>{emp.role}</td>
//               <td>
//                 <button
//                   onClick={() => deleteEmployee(emp._id)}
//                   style={{ background: "red", color: "white", padding: "6px 12px", cursor: "pointer" }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* SHOW MODAL */}
//       {showModal && (
//         <AddEmployeeModal
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
import AddEmployeeModal from "./AddEmployeeModal";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [department, setDepartment] = useState("");

  const loadEmployees = async () => {
    try {
      const res = await axios.get(
        "https://hr-server-41im.onrender.com/api/employee/all"
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

  // 🔹 FILTER BY DEPARTMENT
  useEffect(() => {
    if (!department) {
      setFilteredEmployees(employees);
    } else {
      setFilteredEmployees(
        employees.filter((emp) => emp.department === department)
      );
    }
  }, [department, employees]);

  const deleteEmployee = async (empId) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(
        `https://hr-server-41im.onrender.com/api/employee/delete/${empId}`
      );
      loadEmployees();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // 🔹 UNIQUE DEPARTMENTS
  const departments = [...new Set(employees.map((e) => e.department))];

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: 30 }}>
      <h2>Employee List</h2>

      {/* TOP BAR */}
      <div style={{ display: "flex", gap: 15, marginBottom: 15 }}>
        {/* ADD EMPLOYEE BUTTON */}
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

        {/* 🔽 DEPARTMENT DROPDOWN */}
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
      </div>

      {/* TABLE */}
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Password</th>
            <th>Department</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp._id}>
              <td>{filteredEmployees.indexOf(emp) + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.empId}</td>
              <td>{emp.password}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
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
              <td colSpan="6" style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <AddEmployeeModal
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
