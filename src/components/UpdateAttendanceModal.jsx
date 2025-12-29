import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UpdateAttendanceModal.css";

export default function UpdateAttendanceModal({ isOpen, onClose, selectedRecord }) {
  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    status: "",
    time: ""
  });

  useEffect(() => {
    if (selectedRecord) {
      setForm({
        employeeId: selectedRecord.employeeId,
        date: selectedRecord.date,
        status: selectedRecord.status,
        time: selectedRecord.time || ""
      });
    }
  }, [selectedRecord]);

  const updateNow = async () => {
    try {
      const res = await axios.put("https://hr-server-six.vercel.app/api/attendance/update", form);
      alert(res.data.message);
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating attendance");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="update-modal-overlay">
      <div className="update-modal">
        <h2>Update Attendance</h2>

        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            value={form.employeeId}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="">Select Status</option>
            <option value="Present">Present</option>
             <option value="late">late</option>
            <option value="Half Day">Half Day</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <div className="form-group">
          <label>Time (Optional)</label>
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
        </div>

        <div className="btn-row">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="update-btn" onClick={updateNow}>Update</button>
        </div>
      </div>
    </div>
  );
}
