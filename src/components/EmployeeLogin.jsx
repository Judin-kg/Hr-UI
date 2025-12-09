


// import React, { useState } from "react";
// import '../styles/EmployeeLogin.css';
// import axios from "axios";

// export default function Login() {
//   const [empId, setEmpId] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async () => {
//     try {
//       const res = await axios.post("https://hr-server-41im.onrender.com/api/employee/login", {
//         empId,
//         password,
//       });

//       alert(res.data.message);

//       const role = res.data.role;

//       if (role === "admin") {
//         window.location.href = "/admin";
//       } else {
//         window.location.href = "/mark";
//       }

//     } catch (err) {
//       alert("Invalid Login");
//     }
//   };

//   return (
//     <div className="box">
//       <h2>Login</h2>

//       <input 
//         placeholder="Employee ID" 
//         value={empId} 
//         onChange={(e) => setEmpId(e.target.value)} 
//       />

//       <input 
//         type="password" 
//         placeholder="Password" 
//         value={password} 
//         onChange={(e) => setPassword(e.target.value)} 
//       />

//       <button onClick={login}>Login</button>
//     </div>
//   );
// }




import React, { useState } from "react";
import "../styles/EmployeeLogin.css";
import axios from "axios";

export default function Login() {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!empId || !password) {
      alert("Enter Employee ID & Password");
      return;
    }

    setLoading(true); // start loading

    try {
      const res = await axios.post(
        "https://hr-server-41im.onrender.com/api/employee/login",
        { empId, password }
      );

      alert(res.data.message);

      const role = res.data.role;

      if (role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/mark";
      }
    } catch (err) {
      alert("Invalid Login");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="box">
      <h2>Login</h2>

      <input
        placeholder="Employee ID"
        value={empId}
        onChange={(e) => setEmpId(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {loading && (
        <div className="loader" style={{ marginTop: "10px" }}>
          🔄 Please wait...
        </div>
      )}
    </div>
  );
}
