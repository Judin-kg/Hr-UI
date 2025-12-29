





// import React, { useState } from "react";
// import "../styles/EmployeeLogin.css";
// import axios from "axios";

// export default function Login() {
//   const [empId, setEmpId] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const login = async () => {
//     if (!empId || !password) {
//       alert("Enter Employee ID & Password");
//       return;
//     }

//     setLoading(true); // start loading

//     try {
//       // const res = await axios.post(
//       //   "https://hr-server-41im.onrender.com/api/employee/login",
//       //   { empId, password }
//       // );
//       const res = await axios.post(
//   "https://hr-server-41im.onrender.com/api/employee/login",
//   { empId, password }
// );

// alert(res.data.message);
// console.log(res,"ressss");

// // ⭐ SAVE EMPLOYEE DETAILS
// localStorage.setItem("employeeId", empId);
// localStorage.setItem("employeeName", res.data.user.name); // <-- add this

// const role = res.data.role;

// if (role === "admin") {
//   window.location.href = "/admin";
// } else {
//   window.location.href = "/mark";
// }

//   } catch (err) {
//       alert("Invalid Login");
//     } finally {
//       setLoading(false); // stop loading
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

//       <button onClick={login} disabled={loading}>
//         {loading ? "Logging in..." : "Login"}
//       </button>

//       {loading && (
//         <div className="loader" style={{ marginTop: "10px" }}>
//           🔄 Please wait...
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState } from "react";
import "../styles/EmployeeLogin.css";
import axios from "axios";
 import image from "../utils/photo.jpg";

export default function EmployeeLogin() {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!empId || !password) {
      alert("Enter Employee ID & Password");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://hr-server-six.vercel.app/api/employee/login",
        { empId, password }
      );

      alert(res.data.message);

      // ⭐ SAVE EMPLOYEE DETAILS
      localStorage.setItem("employeeId", empId);
      localStorage.setItem("employeeName", res.data.user.name);
      localStorage.setItem("employeeRole", res.data.role);
      localStorage.setItem("employeeImage", res.data.user.image);
      localStorage.setItem("employeeSalary", res.data.user.salary);
      localStorage.setItem("employeeDepartment", res.data.user.department);
      

      // ROLE BASED REDIRECT
      if (res.data.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/mark";
      }
    } catch (err) {
      alert("Invalid Login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="att-page">
      <div className="att-card">
        {/* HERO */}
        <div className="att-hero">
          <img
            className="att-hero-img"
            src={image}
            alt="Hero"
          />
          <div className="att-hero-overlay" />
        </div>

        {/* FORM */}
        <form className="att-form" onSubmit={handleSubmit}>
          <div className="att-input">
            <input
              type="text"
              placeholder="Employee ID"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
            />
          </div>

          <div className="att-input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="att-login-btn" type="submit" disabled={loading}>
            {loading ? "Logging..." : "Login"}
          </button>

          {loading && (
            <p style={{ textAlign: "center", fontSize: 12 }}>
              🔄 Please wait...
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
