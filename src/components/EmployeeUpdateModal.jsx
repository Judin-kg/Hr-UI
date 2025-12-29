import React, { useState } from "react";
import axios from "axios";

const cloudName = "djuihd2af";
const uploadPreset = "rjatlas";

export default function EmployeeUpdateModal({ employee, onClose, onUpdated }) {
  const [form, setForm] = useState({ ...employee });
  const [preview, setPreview] = useState(employee.image || "");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "salary" && !/^\d*$/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  const uploadImage = async (file) => {
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: data }
    );

    const result = await res.json();
    setUploading(false);
    return result.secure_url;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    const url = await uploadImage(file);
    setForm({ ...form, image: url });
  };

  const updateEmployee = async () => {
    await axios.put(
      `https://hr-server-six.vercel.app/api/employee/update/${employee._id}`,
      form
    );
    alert("Employee updated");
    onUpdated();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Update Employee</h3>

        <input value={form.empId} readOnly style={readonly} />

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          style={input}
        />

        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          style={input}
        />

        <input
          type="number"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
          style={input}
        />

        <select name="role" value={form.role} onChange={handleChange} style={input}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {uploading && <p>Uploading...</p>}
        {preview && (
          <img
            src={preview}
            alt=""
            style={{ width: 100, height: 100, borderRadius: 8, marginTop: 10 }}
          />
        )}

        <button onClick={updateEmployee} style={saveBtn}>
          Update
        </button>
        <button onClick={onClose} style={closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
}

/* STYLES */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.5)",
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

const input = { width: "100%", padding: 8, marginBottom: 10 };
const readonly = { ...input, background: "#f0f0f0" };
const saveBtn = { width: "100%", padding: 10, background: "blue", color: "#fff" };
const closeBtn = { width: "100%", padding: 10, background: "gray", color: "#fff" };
