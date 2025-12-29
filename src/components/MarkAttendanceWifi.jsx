












// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/Attendence.css";
// import { FiHome, FiBell, FiClock, FiSettings } from "react-icons/fi";

// export default function MarkAttendanceWifi() {
//   const [time, setTime] = useState("");
//   const [date, setDate] = useState("");
//   const [marked, setMarked] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [employeeId, setEmployeeId] = useState("");
//   const [employeeName, setEmployeeName] = useState("");
  
//    const [locationMsg, setLocationMsg] = useState("Checking office network...");

//   // ⏰ TIME & DATE
//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       setTime(
//         now.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         })
//       );
//       setDate(
//         now.toLocaleDateString("en-US", {
//           weekday: "long",
//           month: "short",
//           day: "numeric",
//         })
//       );
//     };

//     updateTime();
//     const interval = setInterval(updateTime, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   console.log(localStorage,"localllllllllllllllllll");
  

//   // 👤 LOAD EMPLOYEE FROM LOGIN
//   useEffect(() => {
//     const id = localStorage.getItem("employeeId");
//     const name = localStorage.getItem("employeeName");
   
//       const department = localStorage.getItem("employeeDepartment");
     
//     if (id) setEmployeeId(id);
//     if (name) setEmployeeName(name);
     
//   }, []);

  
  
//   // 🟢 MARK ATTENDANCE
//   const markAttendance = async () => {
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "https://hr-server-41im.onrender.com/api/attendance/mark-wifi",
//         { employeeId }
//       );

//       setMarked(true);
//       setLocationMsg("📍 Office WiFi detected");
//       alert(res.data.message);
//     } catch (err) {
//       setLocationMsg("📍 You are not in Office reach");
//       alert(err.response?.data?.message || "Attendance failed");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="att-container">

       
//       {/* TIME */}
//       <div className="time-box">
//         <h1>{time}</h1>
//         <p>{date}</p>
//         <p style={{ marginTop: 5, color: "#555" }}>
//           Welcome, <b>{employeeName}</b>
//         </p>
//       </div>
    

//       {/* ATTENDANCE BUTTON */}
//       <div className="center-btn">
//         <button
//           className={`shift-btn ${marked ? "marked" : ""}`}
//           onClick={markAttendance}
//           disabled={marked || loading}
//         >
//           {!marked && !loading && (
//             <span className="finger-icon">👉</span>
//           )}

//           <p>
//             {loading
//               ? "Marking..."
//               : marked
//               ? "Attendance Marked"
//               : "Mark Attendance"}
//           </p>
//         </button>
//       </div>

//       {/* LOCATION */}
//       <p className="location-text">{locationMsg}</p>

//       {/* BOTTOM NAVIGATION */}
//       <div className="bottom-nav">
//         <div className="nav-item">
//           <FiHome size={22} />
//           <span>Home</span>
//         </div>
//         <div className="nav-item">
//           <FiBell size={22} />
//           <span>Notifications</span>
//         </div>
//         <div className="nav-item">
//           <FiClock size={22} />
//           <span>History</span>
//         </div>
//         <div className="nav-item">
//           <FiSettings size={22} />
//           <span>Settings</span>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Attendence.css";
import { FiHome, FiBell, FiClock, FiSettings } from "react-icons/fi";

export default function MarkAttendanceWifi() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [marked, setMarked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeImage, setEmployeeImage] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const [locationMsg, setLocationMsg] = useState("Checking office network...");

  /* ⏰ TIME & DATE */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  /* 👤 LOAD EMPLOYEE FROM LOGIN */
  useEffect(() => {
    setEmployeeId(localStorage.getItem("employeeId") || "");
    setEmployeeName(localStorage.getItem("employeeName") || "");
    setEmployeeImage(localStorage.getItem("employeeImage") || "");
    setEmployeeSalary(localStorage.getItem("employeeSalary") || "");
    setEmployeeDepartment(localStorage.getItem("employeeDepartment") || "");
  }, []);

  /* 🟢 MARK ATTENDANCE */
  const markAttendance = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        "https://hr-server-six.vercel.app/api/attendance/mark-wifi",
        { employeeId }
      );

      setMarked(true);
      setLocationMsg("📍 Office WiFi detected");
      alert(res.data.message);
    } catch (err) {
      setLocationMsg("📍 You are not in Office reach");
      alert(err.response?.data?.message || "Attendance failed");
    }

    setLoading(false);
  };

  return (
    <div className="att-container">
      {/* 👤 EMPLOYEE CARD */}
      <div className="employee-card">
        <img
          src={employeeImage || "/default-avatar.png"}
          
          alt="Employee"
          className="employee-avatar"
        />

        <h3>{employeeName}</h3>
        <p className="emp-meta">
          <b>Department:</b> {employeeDepartment || "-"}
        </p>
        <p className="emp-meta">
          <b>Salary:</b> ₹ {employeeSalary || "-"}
        </p>
      </div>

      {/* ⏰ TIME */}
      <div className="time-box">
        <h1>{time}</h1>
        <p>{date}</p>
      </div>

      {/* 🟢 ATTENDANCE BUTTON */}
      <div className="center-btn">
        <button
          className={`shift-btn ${marked ? "marked" : ""}`}
          onClick={markAttendance}
          disabled={marked || loading}
        >
          {!marked && !loading && (
            <span className="finger-icon">👉</span>
          )}

          <p>
            {loading
              ? "Marking..."
              : marked
              ? "Attendance Marked"
              : "Mark Attendance"}
          </p>
        </button>
      </div>

      {/* 📍 LOCATION */}
      <p className="location-text">{locationMsg}</p>

      {/* 🔻 BOTTOM NAV */}
      <div className="bottom-nav">
        <div className="nav-item">
          <FiHome size={22} />
          <span>Home</span>
        </div>
        <div className="nav-item">
          <FiBell size={22} />
          <span>Notifications</span>
        </div>
        <div className="nav-item">
          <FiClock size={22} />
          <span>History</span>
        </div>
        <div className="nav-item">
          <FiSettings size={22} />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}









