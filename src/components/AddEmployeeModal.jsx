











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

//   // 🔥 Department prefix list (you can edit)
//   const prefixMap = {
//     "Sales&Marketing": "SM",
//     "HR":"HR",
//     "Social Media": "IT",
//     "Collection": "COL",
//     "Workshop": "WS",
//     "Showroom Executives": "SRE",
//     "Accounts & Back office": "ABO",
//    "Customer Relationship (Tellecaller)" : "CR",  
//   };

// console.log(prefixMap,"deppppppppp");


//   // Auto-generate ID
//   const generateEmployeeId = (deptName) => {
//     const prefix = prefixMap[deptName]; // default prefix
// console.log(deptName,"departmenttttttttttt");
// console.log(prefix,"prefixxxxxxxxxxx");
//     const randomNum = Math.floor(100 + Math.random() * 900); // 100–999

//     return `${prefix}-${randomNum}`;
//   };

//   // Load departments from backend
//   const loadDepartments = async () => {
//     try {
//       const res = await axios.get("https://hr-server-41im.onrender.com/api/department/all");
//       setDepartments(res.data);
//     } catch (err) {
//       alert("Failed to load departments");
//     }
//   };

//   useEffect(() => {
//     loadDepartments();
//   }, []);

//   // When department changes → generate new ID

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;


//   //   if (name === "department") {
//   //     const newEmpId = generateEmployeeId(value);
//   //     setForm({ ...form, department: value, empId: newEmpId });
//   //   } else {
//   //     setForm({ ...form, [name]: value });
//   //   }
//   // };


//   const handleChange = (e) => {
//   const { name, value } = e.target;

//   // 🔒 Salary must be numeric
//   if (name === "salary") {
//     if (!/^\d*$/.test(value)) return;
//   }

//   // 🔁 Department → auto-generate empId
//   if (name === "department") {
//     const newEmpId = generateEmployeeId(value);
//     setForm((prev) => ({
//       ...prev,
//       department: value,
//       empId: newEmpId,
//     }));
//   } 
//   else {
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }
// };


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

//         {/* AUTO-GENERATED EMPLOYEE ID (READ ONLY) */}
//         <input
//           name="empId"
//           placeholder="Employee ID"
//           value={form.empId}
//           readOnly
//           style={{ width: "100%", marginBottom: 10, padding: 8, background: "#f0f0f0" }}
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

       

//         <input
//   type="number"          // 🔥 only numbers
//   name="salary"
//   placeholder="Salary"
//   value={form.salary}
//   onChange={handleChange}
//   style={{ width: "100%", marginBottom: 10, padding: 8 }}
// />


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

/* 🔥 CLOUDINARY CONFIG */
const cloudName = "djuihd2af";
  const uploadPreset = "rjatlas";

export default function AddEmployeeModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    empId: "",
    name: "",
    password: "",
    role: "employee",
    department: "",
    salary: "",
    image: "",
  });

  const [departments, setDepartments] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  /* 🔥 Department → Prefix Map */
  const prefixMap = {
    "Sales&Marketing": "SM",
    "HR": "HR",
    "Social Media": "IT",
    "Collection": "COL",
    "Workshop": "WS",
    "Showroom Executives": "SRE",
    "Accounts & Back office": "ABO",
    "Customer Relationship (Tellecaller)": "CR",
  };

  /* 🔹 Generate Employee ID */
  const generateEmployeeId = (dept) => {
    const prefix = prefixMap[dept] || "EMP";
    const random = Math.floor(100 + Math.random() * 900);
    return `${prefix}-${random}`;
  };

  /* 🔹 Load Departments */
  useEffect(() => {
    axios
      .get("https://hr-server-six.vercel.app/api/department/all")
      .then((res) => setDepartments(res.data))
      .catch(() => alert("Failed to load departments"));
  }, []);

  /* 🔹 Handle Input Change */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Salary → numbers only
    if (name === "salary" && !/^\d*$/.test(value)) return;

    // Department → auto empId
    if (name === "department") {
      setForm((prev) => ({
        ...prev,
        department: value,
        empId: generateEmployeeId(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  /* 🔹 Upload Image to Cloudinary */
  const uploadImageToCloudinary = async (file) => {
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    setUploading(false);
    return result.secure_url;
  };

  /* 🔹 Image Change */
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
    const imageUrl = await uploadImageToCloudinary(file);

    setForm((prev) => ({ ...prev, image: imageUrl }));
  };

  /* 🔹 Save Employee */
  const saveEmployee = async () => {
    if (!form.name || !form.password || !form.department) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await axios.post(
        "https://hr-server-six.vercel.app/api/employee/create",
        form
      );
      alert("Employee added successfully");
      onSave();
    } catch (err) {
      alert("Failed to add employee");
    }
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Add Employee</h3>

        {/* EMP ID */}
        <input
          value={form.empId}
          readOnly
          placeholder="Employee ID"
          style={readonly}
        />

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={input}
        />

        {/* DEPARTMENT */}
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          style={input}
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d._id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        {/* ROLE */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={input}
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        {/* SALARY */}
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          style={input}
        />

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: 10 }}
        />

        {uploading && <p>Uploading image...</p>}

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            style={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: 8,
              marginBottom: 10,
            }}
          />
        )}

        <button onClick={saveEmployee} style={saveBtn}>
          Save
        </button>

        <button onClick={onClose} style={closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modal = {
  width: 360,
  background: "#fff",
  padding: 20,
  borderRadius: 10,
};

const input = {
  width: "100%",
  padding: 8,
  marginBottom: 10,
};

const readonly = {
  ...input,
  background: "#f0f0f0",
};

const saveBtn = {
  width: "100%",
  padding: 10,
  background: "blue",
  color: "white",
  border: "none",
  marginBottom: 10,
};

const closeBtn = {
  width: "100%",
  padding: 10,
  background: "gray",
  color: "white",
  border: "none",
};

