import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddTeamHeadModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    department: "",
  });

  const [departments, setDepartments] = useState([]);

  // 🔥 Department → Prefix mapping
  const prefixMap = {
    "Sales&Marketing": "SM",
    "Human Resource": "HR",
    "Social Media": "IT",
    "Collection": "COL",
    "Workshop": "WS",
    "Showroom Executives": "SRE",
    "Accounts & Back office": "ABO",
    "Customer Relationship (Tellecaller)": "CR",
  };

  // 🔹 Auto-generate TeamHead ID
  const generateEmpId = (deptName) => {
    const prefix = prefixMap[deptName] || "TH";
    const random = Math.floor(100 + Math.random() * 900);
    return `${prefix}-${random}`;
  };

  // 🔹 Load departments
  const loadDepartments = async () => {
    try {
      const res = await axios.get(
        "https://hr-server-six.vercel.app/api/department/all"
      );
      setDepartments(res.data);
    } catch (err) {
      alert("Failed to load departments");
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      setForm({
        ...form,
        department: value,
        empId: generateEmpId(value),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // 🔹 Submit
  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.empId || !form.department) {
      alert("All fields required");
      return;
    }

    try {
      await axios.post(
        "https://hr-server-six.vercel.app/api/teamhead/add",
        form
      );
      alert("Team Head Added Successfully");
      onSave();
    } catch (err) {
      alert("Failed to add team head");
    }
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Add Team Head</h3>

        <form onSubmit={submit}>
        <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={input}
          />

          {/* Department Select */}
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            style={input}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>

          <div style={{ marginTop: 15 }}>
            <button type="submit" style={saveBtn}>
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              style={cancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
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
  width: "350px",
  background: "white",
  padding: 20,
  borderRadius: 10,
};

const input = {
  width: "100%",
  padding: 8,
  marginBottom: 10,
};

const inputReadonly = {
  ...input,
  background: "#f0f0f0",
};

const saveBtn = {
  padding: "8px 15px",
  background: "blue",
  color: "white",
  border: "none",
};

const cancelBtn = {
  padding: "8px 15px",
  background: "gray",
  color: "white",
  border: "none",
  marginLeft: 10,
};
