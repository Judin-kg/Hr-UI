import React, { useEffect, useState } from "react";
import axios from "axios";
import AddDepartmentModal from "./AddDepartmentModal";

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const loadDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/department/all");
      setDepartments(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load departments");
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: 30 }}>
      <h2>Department List</h2>

      {/* ADD DEPARTMENT BUTTON */}
      <button
        onClick={() => setShowModal(true)}
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
          </tr>
        </thead>

        <tbody>
          {departments.map((dept) => (
            <tr key={dept._id}>
              <td>{dept.name}</td>
              <td>{dept.hod || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <AddDepartmentModal
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            loadDepartments();
          }}
        />
      )}
    </div>
  );
}
