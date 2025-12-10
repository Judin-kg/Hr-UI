// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AddDepartmentModal from "./AddDepartmentModal";

// export default function DepartmentList() {
//   const [departments, setDepartments] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const loadDepartments = async () => {
//     try {
//       const res = await axios.get("https://hr-server-41im.onrender.com/api/department/all");
//       setDepartments(res.data);
//     } catch (err) {
//       console.log(err);
//       alert("Failed to load departments");
//     }
//   };

//   useEffect(() => {
//     loadDepartments();
//   }, []);

//   return (
//     <div style={{ width: "80%", margin: "auto", marginTop: 30 }}>
//       <h2>Department List</h2>

//       {/* ADD DEPARTMENT BUTTON */}
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
//         Add Department
//       </button>

//       <table border="1" width="100%" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Department Name</th>
//             <th>HOD (Optional)</th>
//           </tr>
//         </thead>

//         <tbody>
//           {departments.map((dept) => (
//             <tr key={dept._id}>
//               <td>{dept.name}</td>
//               <td>{dept.hod || "—"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* MODAL */}
//       {showModal && (
//         <AddDepartmentModal
//           onClose={() => setShowModal(false)}
//           onSave={() => {
//             setShowModal(false);
//             loadDepartments();
//           }}
//         />
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import AddDepartmentModal from "./AddDepartmentModal";
import UpdateDepartmentModal from "./UpdateDepartmentModal";

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);

  const loadDepartments = async () => {
    try {
      const res = await axios.get(
        "https://hr-server-41im.onrender.com/api/department/all"
      );
      setDepartments(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load departments");
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const deleteDept = async (id) => {
    if (!window.confirm("Are you sure to delete this department?")) return;

    try {
      await axios.delete(
        `https://hr-server-41im.onrender.com/api/department/delete/${id}`
      );
      alert("Department Deleted");
      loadDepartments();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: 30 }}>
      <h2>Department List</h2>

      {/* ADD DEPARTMENT BUTTON */}
      <button
        onClick={() => setShowAddModal(true)}
        style={{
          padding: "10px 20px",
          marginBottom: 15,
          backgroundColor: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add Department
      </button>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Department Name</th>
            <th>HOD (Optional)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((dept) => (
            <tr key={dept._id}>
              <td>{dept.name}</td>
              <td>{dept.hod || "—"}</td>

              <td>
                <button
                  onClick={() => {
                    setSelectedDept(dept);
                    setShowUpdateModal(true);
                  }}
                  style={{
                    marginRight: 10,
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteDept(dept._id)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD MODAL */}
      {showAddModal && (
        <AddDepartmentModal
          onClose={() => setShowAddModal(false)}
          onSave={() => {
            setShowAddModal(false);
            loadDepartments();
          }}
        />
      )}

      {/* UPDATE MODAL */}
      {showUpdateModal && selectedDept && (
        <UpdateDepartmentModal
          dept={selectedDept}
          onClose={() => setShowUpdateModal(false)}
          onSave={() => {
            setShowUpdateModal(false);
            loadDepartments();
          }}
        />
      )}
    </div>
  );
}
