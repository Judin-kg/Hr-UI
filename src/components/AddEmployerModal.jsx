// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function AddEmployerModal({ onClose, onSave }) {
//   const [form, setForm] = useState({
    
//     name: "",
//     department: "",
//     teamHead: "",
//   });

//   const [departments, setDepartments] = useState([]);
//   const [teamHeads, setTeamHeads] = useState([]);

  

 

//   // 🔹 Load departments
//   const loadDepartments = async () => {
//     const res = await axios.get(
//       "http://localhost:5000/api/department/all"
//     );
//     setDepartments(res.data);
//   };

//   // 🔹 Load team heads
//   const loadTeamHeads = async () => {
//     const res = await axios.get(
//       "http://localhost:5000/api/teamhead/all"
//     );
//     setTeamHeads(res.data);
//   };

//   useEffect(() => {
//     loadDepartments();
//     loadTeamHeads();
//   }, []);

//   // 🔹 Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "department") {
//       setForm({
//         ...form,
//         department: value,
//         teamHead: "",
//       });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   // 🔹 Save Employee
//   const saveEmployee = async () => {
//     if (!form.name ||!form.department) {
//       alert("All fields required");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:5000/api/employer/create",
//         form
//       );
//       alert("Employee added successfully");
//       onSave();
//     } catch (err) {
//       alert("Failed to add employee");
//     }
//   };

//   return (
//     <div style={overlay}>
//       <div style={modal}>
//         <h3>Add Employee</h3>

        

//         <input
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           style={input}
//         />

       

//         {/* DEPARTMENT */}
//         <select
//           name="department"
//           value={form.department}
//           onChange={handleChange}
//           style={input}
//         >
//           <option value="">Select Department</option>
//           {departments.map((d) => (
//             <option key={d._id} value={d.name}>
//               {d.name}
//             </option>
//           ))}
//         </select>

//         {/* TEAM HEAD */}
//         {/* <select
//           name="teamHead"
//           value={form.teamHead}
//           onChange={handleChange}
//           style={input}
//         >
//           <option value="">Select Team Head</option>
//           {teamHeads
//             .filter((th) => th.department === form.department)
//             .map((th) => (
//               <option key={th._id} value={th._id}>
//                 {th.name} ({th.empId})
//               </option>
//             ))}
//         </select> */}


// <select
//   value={form.teamHead}
//   onChange={(e) =>
//     setForm({ ...form, teamHead: e.target.value })
//   }
// >
//   <option value="">Select Team Head</option>

//   {teamHeads.map((th) => (
//     <option key={th._id} value={th.name}>
//       {th.name}
//     </option>
//   ))}
// </select>


       
       

//         <button style={saveBtn} onClick={saveEmployee}>
//           Save
//         </button>

//         <button style={closeBtn} onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ================= STYLES ================= */

// const overlay = {
//   position: "fixed",
//   inset: 0,
//   background: "rgba(0,0,0,0.5)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// };

// const modal = {
//   width: 360,
//   background: "#fff",
//   padding: 20,
//   borderRadius: 8,
// };

// const input = {
//   width: "100%",
//   padding: 8,
//   marginBottom: 10,
// };

// const inputReadonly = {
//   ...input,
//   background: "#f0f0f0",
// };

// const saveBtn = {
//   width: "100%",
//   padding: 10,
//   background: "blue",
//   color: "white",
//   border: "none",
//   marginBottom: 10,
// };

// const closeBtn = {
//   width: "100%",
//   padding: 10,
//   background: "gray",
//   color: "white",
//   border: "none",
// };




import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AddEmployerModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    department: "",
    teamHead: "",
    image: "",
  });

  const [departments, setDepartments] = useState([]);
  const [teamHeads, setTeamHeads] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  /* 🔐 Cloudinary config */
  const cloudName = "djuihd2af";
  const uploadPreset = "rjatlas";

  /* ================= LOAD DATA ================= */

  const loadDepartments = async () => {
    const res = await axios.get("https://hr-server-six.vercel.app/api/department/all");
    setDepartments(res.data);
  };

  const loadTeamHeads = async () => {
    const res = await axios.get("https://hr-server-six.vercel.app/api/teamhead/all");
    setTeamHeads(res.data);
  };

  useEffect(() => {
    loadDepartments();
    loadTeamHeads();
  }, []);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      setForm({ ...form, department: value, teamHead: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  /* ================= IMAGE UPLOAD ================= */

  const uploadImageToCloudinary = async () => {
    if (!imageFile) return "";

    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url;
  };

  /* ================= SAVE ================= */

  const saveEmployee = async () => {
    if (!form.name || !form.department) {
      alert("Name & Department are required");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImageToCloudinary();

      await axios.post("https://hr-server-six.vercel.app/api/employer/create", {
        ...form,
        image: imageUrl,
      });

      alert("Employee added successfully");
      onSave();
    } catch (err) {
      alert("Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Add Employee</h3>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
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

        {/* TEAM HEAD */}
        <select
          name="teamHead"
          value={form.teamHead}
          onChange={handleChange}
          style={input}
        >
          <option value="">Select Team Head</option>
          {teamHeads
            .filter((th) => th.department === form.department)
            .map((th) => (
              <option key={th._id} value={th.name}>
                {th.name}
              </option>
            ))}
        </select>

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={input}
        />

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            style={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: 6,
              display: "block",
              marginBottom: 10,
            }}
          />
        )}

        <button style={saveBtn} onClick={saveEmployee} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>

        <button style={closeBtn} onClick={onClose}>
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
  borderRadius: 8,
};

const input = {
  width: "100%",
  padding: 8,
  marginBottom: 10,
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
