import React, { useState } from "react";
import axios from "axios";

export default function EmployeeLogin() {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("https://hr-server-41im.onrender.com/api/employee/login", {
        empId,
        password,
      });

      alert(res.data.message);
      window.location.href = "/mark";
    } catch (err) {
      alert("Invalid Login");
    }
  };

  return (
    <div className="box">
      <h2>Employee Login</h2>

      <input placeholder="Employee ID" value={empId} onChange={(e) => setEmpId(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={login}>Login</button>
    </div>
  );
}
