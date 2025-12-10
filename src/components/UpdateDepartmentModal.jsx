import React, { useState } from "react";
import axios from "axios";

export default function UpdateDepartmentModal({ dept, onClose, onSave }) {
  const [name, setName] = useState(dept.name);
  const [hod, setHod] = useState(dept.hod || "");

  const updateDepartment = async () => {
    if (!name.trim()) {
      alert("Department name required");
      return;
    }

    try {
      await axios.put(
        `https://hr-server-41im.onrender.com/api/department/update/${dept._id}`,
        {
          name,
          hod,
        }
      );

      alert("Department updated successfully");
      onSave();
    } catch (err) {
      alert("Failed to update department");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 10,
          width: 350,
        }}
      >
        <h3>Update Department</h3>

        <input
          placeholder="Department Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 10 }}
        />

        <input
          placeholder="HOD (Optional)"
          value={hod}
          onChange={(e) => setHod(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 10 }}
        />

        <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
          <button
            onClick={updateDepartment}
            style={{
              flex: 1,
              padding: "8px 12px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Update
          </button>

          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "8px 12px",
              backgroundColor: "gray",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
