// import React, { useState } from "react";
// import axios from "axios";

// export default function AddEmployeeModal({ onClose, onSave }) {
//   const [form, setForm] = useState({
//     empId: "",
//     name: "",
//     password: "",
//     role: "employee",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const saveEmployee = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/employee/create", form);
//       alert("Employee Added Successfully");
//       onSave();
//     } catch (err) {
//       alert("Failed to add employee");
//     }
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0, left: 0,
//         width: "100%", height: "100%",
//         background: "rgba(0,0,0,0.5)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         style={{
//           width: "350px",
//           background: "white",
//           padding: 20,
//           borderRadius: 10,
//         }}
//       >
//         <h3>Add Employee</h3>

//         <input
//           name="empId"
//           placeholder="Employee ID"
//           value={form.empId}
//           onChange={handleChange}
//           style={{ width: "100%", marginBottom: 10, padding: 8 }}
//         />

//         <input
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           style={{ width: "100%", marginBottom: 10, padding: 8 }}
//         />

//         <input
//           name="password"
//           placeholder="Password"
//           type="password"
//           value={form.password}
//           onChange={handleChange}
//           style={{ width: "100%", marginBottom: 10, padding: 8 }}
//         />

//         <select
//           name="role"
//           value={form.role}
//           onChange={handleChange}
//           style={{ width: "100%", marginBottom: 10, padding: 8 }}
//         >
//           <option value="employee">Employee</option>
//           <option value="admin">Admin</option>
//         </select>

//         <button
//           onClick={saveEmployee}
//           style={{
//             width: "100%",
//             padding: 10,
//             backgroundColor: "blue",
//             color: "white",
//             border: "none",
//             marginBottom: 10,
//           }}
//         >
//           Save
//         </button>

//         <button
//           onClick={onClose}
//           style={{
//             width: "100%",
//             padding: 10,
//             backgroundColor: "gray",
//             color: "white",
//             border: "none",
//           }}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }























// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddEmployeeModal({ onClose, onSave }) {
//   const [form, setForm] = useState({
//     empId: "",
//     name: "",
//     password: "",
//     role: "employee",
//     department: "",
//   });

//   const [departments, setDepartments] = useState([]);

//   // Load departments from backend
//   const loadDepartments = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/department/all");
//       setDepartments(res.data);
//     } catch (err) {
//       console.log(err);
//       alert("Failed to load departments");
//     }
//   };

//   useEffect(() => {
//     loadDepartments();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const saveEmployee = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/employee/create", form);
//       alert("Employee Added Successfully");
//       onSave();
//     } catch (err) {
//       alert("Failed to add employee");
//     }
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0, left: 0,
//         width: "100%", height: "100%",
//         background: "rgba(0,0,0,0.5)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         style={{
//           width: "350px",
//           background: "white",
//           padding: 20,
//           borderRadius: 10,
//         }}
//       >
//         <h3>Add Employee</h3>

//         <input
//           name="empId"
//           placeholder="Employee ID"
//           value={form.empId}
//           onChange={handleChange}
//           style={{ width: "100%", marginBottom: 10, padding: 8 }}
//         />

//         <input
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           style={{ width: "100%", marginBottom: 10, padding: 8 }}
//         />

//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           style={{ width: "100%", marginBottom: 10, padding: 8 }}
//         />

//         {/* Department Dropdown */}
//         <select
//           name="department"
//           value={form.department}
//           onChange={handleChange}
//           style={{ width: "100%", marginBottom: 10, padding: 8 }}
//         >
//           <option value="">Select Department</option>
//           {departments.map((dept) => (
//             <option key={dept._id} value={dept.name}>
//               {dept.name}
//             </option>
//           ))}
//         </select>

//         <select
//           name="role"
//           value={form.role}
//           onChange={handleChange}
//           style={{ width: "100%", marginBottom: 10, padding: 8 }}
//         >
//           <option value="employee">Employee</option>
//           <option value="admin">Admin</option>
//         </select>

//         <button
//           onClick={saveEmployee}
//           style={{
//             width: "100%",
//             padding: 10,
//             backgroundColor: "blue",
//             color: "white",
//             border: "none",
//             marginBottom: 10,
//           }}
//         >
//           Save
//         </button>

//         <button
//           onClick={onClose}
//           style={{
//             width: "100%",
//             padding: 10,
//             backgroundColor: "gray",
//             color: "white",
//             border: "none",
//           }}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }










import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddEmployeeModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    empId: "",
    name: "",
    password: "",
    role: "employee",
    department: "",
  });

  const [departments, setDepartments] = useState([]);

  // 🔥 Department prefix list (you can edit)
  const prefixMap = {
    "Sales&Marketing": "SM",
    "Human Resource":"HR",
    "Social Media": "IT",
    "Collection": "COL",
    "Workshop": "WS",
    "Showroom Executives": "SRE",
    "Accounts & Back office": "ABO",
   "Customer Relationship (Tellecaller)" : "CR",  
  };

console.log(prefixMap,"deppppppppp");


  // Auto-generate ID
  const generateEmployeeId = (deptName) => {
    const prefix = prefixMap[deptName]; // default prefix
console.log(deptName,"departmenttttttttttt");
console.log(prefix,"prefixxxxxxxxxxx");
    const randomNum = Math.floor(100 + Math.random() * 900); // 100–999

    return `${prefix}-${randomNum}`;
  };

  // Load departments from backend
  const loadDepartments = async () => {
    try {
      const res = await axios.get("https://hr-server-41im.onrender.com/api/department/all");
      setDepartments(res.data);
    } catch (err) {
      alert("Failed to load departments");
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  // When department changes → generate new ID
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      const newEmpId = generateEmployeeId(value);
      setForm({ ...form, department: value, empId: newEmpId });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const saveEmployee = async () => {
    try {
      await axios.post("https://hr-server-41im.onrender.com/api/employee/create", form);
      alert("Employee Added Successfully");
      onSave();
    } catch (err) {
      alert("Failed to add employee");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "350px",
          background: "white",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <h3>Add Employee</h3>

        {/* AUTO-GENERATED EMPLOYEE ID (READ ONLY) */}
        <input
          name="empId"
          placeholder="Employee ID"
          value={form.empId}
          readOnly
          style={{ width: "100%", marginBottom: 10, padding: 8, background: "#f0f0f0" }}
        />

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        {/* Department Dropdown */}
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={saveEmployee}
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "blue",
            color: "white",
            border: "none",
            marginBottom: 10,
          }}
        >
          Save
        </button>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "gray",
            color: "white",
            border: "none",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

