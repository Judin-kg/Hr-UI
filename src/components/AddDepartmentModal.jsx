import React, { useState } from "react";
import axios from "axios";

export default function AddDepartmentModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    hod: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveDepartment = async () => {
    if (!form.name) {
      alert("Department name is required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/department/add", form);
      alert("Department Added Successfully");
      onSave();
    } catch (err) {
      console.log(err);
      alert("Failed to add department");
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
          width: "350px",
          background: "white",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <h3>Add Department</h3>

        <input
          name="name"
          placeholder="Department Name"
          value={form.name}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          name="hod"
          placeholder="HOD (Optional)"
          value={form.hod}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <button
          onClick={saveDepartment}
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
