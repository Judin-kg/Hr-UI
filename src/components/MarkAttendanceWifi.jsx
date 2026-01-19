













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
//   const [employeeImage, setEmployeeImage] = useState("");
//   const [employeeSalary, setEmployeeSalary] = useState("");
//   const [employeeDepartment, setEmployeeDepartment] = useState("");
//   const [locationMsg, setLocationMsg] = useState("Checking office network...");

//   /* ⏰ TIME & DATE */
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

//   /* 👤 LOAD EMPLOYEE FROM LOGIN */
//   useEffect(() => {
//     setEmployeeId(localStorage.getItem("employeeId") || "");
//     setEmployeeName(localStorage.getItem("employeeName") || "");
//     setEmployeeImage(localStorage.getItem("employeeImage") || "");
//     setEmployeeSalary(localStorage.getItem("employeeSalary") || "");
//     setEmployeeDepartment(localStorage.getItem("employeeDepartment") || "");
//   }, []);

//   /* 🟢 MARK ATTENDANCE */
//   const markAttendance = async () => {
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "https://hr-server-six.vercel.app/api/attendance/mark-wifi",
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
//       {/* ⏰ TIME */}
//        <div className="time-box">
//         <h1>{time}</h1>
//         <p>{date}</p>
//       </div>
//       {/* 👤 EMPLOYEE CARD */}
//       <div className="employee-card">
//         <img
//           src={employeeImage || "/default-avatar.png"}
          
//           alt="Employee"
//           className="employee-avatar"
//         />

//         <h3>{employeeName}</h3>
//         <p className="emp-meta">
//           <b>Department:</b> {employeeDepartment || "-"}
//         </p>
//         {/* <p className="emp-meta">
//           <b>Salary:</b> ₹ {employeeSalary || "-"}
//         </p> */}
//       </div>

//       {/* ⏰ TIME */}
//       {/* <div className="time-box">
//         <h1>{time}</h1>
//         <p>{date}</p>
//       </div> */}

//       {/* 🟢 ATTENDANCE BUTTON */}
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

//       {/* 📍 LOCATION */}
//       <p className="location-text">{locationMsg}</p>

//       {/* 🔻 BOTTOM NAV */}
//       <div className="bottom-nav">
//         <div className="nav-item">
//           <FiHome size={22} />
//           <span>Home</span>
//         </div>
       
//         <div className="nav-item">
//           <FiClock size={22} />
//           <span>Profile</span>
//         </div>
//         <div className="nav-item" onClick={() => (window.location.href = "/settings")}>
//           <FiSettings size={22} />
//           <span>Settings</span>
//         </div>
//       </div>
//     </div>
//   );
// }









// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/Attendence.css";
// import { FiHome, FiClock, FiSettings } from "react-icons/fi";

// export default function MarkAttendanceWifi() {
//   const [time, setTime] = useState("");
//   const [date, setDate] = useState("");
//   const [marked, setMarked] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [employeeId, setEmployeeId] = useState("");
//   const [employeeName, setEmployeeName] = useState("");
//   const [employeeImage, setEmployeeImage] = useState("");
//   const [employeeDepartment, setEmployeeDepartment] = useState("");
//   const [locationMsg, setLocationMsg] = useState("Checking office network...");
//   const [darkMode, setDarkMode] = useState(false);

//   /* 🌙 LOAD THEME */
//   useEffect(() => {
//     setDarkMode(localStorage.getItem("darkMode") === "true");
//   }, []);

//   /* ⏰ TIME & DATE */
//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       setTime(
//         now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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

//   /* 👤 LOAD EMPLOYEE */
//   useEffect(() => {
//     setEmployeeId(localStorage.getItem("employeeId") || "");
//     setEmployeeName(localStorage.getItem("employeeName") || "");
//     setEmployeeImage(localStorage.getItem("employeeImage") || "");
//     setEmployeeDepartment(localStorage.getItem("employeeDepartment") || "");
//   }, []);

//   /* 🟢 MARK ATTENDANCE */
//   const markAttendance = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "https://hr-server-six.vercel.app/api/attendance/mark-wifi",
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
//     <div className={`att-container ${darkMode ? "dark" : ""}`}>
//       {/* TIME */}
//       <div className="time-box">
//         <h1>{time}</h1>
//         <p>{date}</p>
//       </div>

//       {/* EMPLOYEE CARD */}
//       <div className="employee-card">
//         <img
//           src={employeeImage || "/default-avatar.png"}
//           alt="Employee"
//           className="employee-avatar"
//         />
//         <h3>{employeeName}</h3>
//         <p className="emp-meta">
//           <b>Department:</b> {employeeDepartment || "-"}
//         </p>
//       </div>

//       {/* BUTTON */}
//       <div className="center-btn">
//         <button
//           className={`shift-btn ${marked ? "marked" : ""}`}
//           onClick={markAttendance}
//           disabled={marked || loading}
//         >
//           {!marked && !loading && <span className="finger-icon">👉</span>}
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

//       {/* NAV */}
//       <div className="bottom-nav">
//         <div className="nav-item">
//           <FiHome size={22} />
//           <span>Home</span>
//         </div>
//         <div className="nav-item"
//          onClick={() => (window.location.href = "/profile")} >
//           <FiClock size={22} />
//           <span>Profile</span>
//         </div>
//         <div
//           className="nav-item"
//           onClick={() => (window.location.href = "/settings")}
//         >
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
import { FiHome, FiClock, FiSettings } from "react-icons/fi";

export default function MarkAttendanceWifi() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [marked, setMarked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeImage, setEmployeeImage] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const [locationMsg, setLocationMsg] = useState("Checking office network...");
  const [darkMode, setDarkMode] = useState(false);

  /* 🌙 LOAD THEME */
  useEffect(() => {
    setDarkMode(localStorage.getItem("darkMode") === "true");
  }, []);

  /* ⏰ TIME & DATE */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
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

  /* 👤 LOAD EMPLOYEE */
  useEffect(() => {
    setEmployeeId(localStorage.getItem("employeeId") || "");
    setEmployeeName(localStorage.getItem("employeeName") || "");
    setEmployeeImage(localStorage.getItem("employeeImage") || "");
    setEmployeeDepartment(localStorage.getItem("employeeDepartment") || "");
  }, []);

  /* 📍 GET GPS LOCATION */
  const getLocationAndMark = () => {
    if (!navigator.geolocation) {
      alert("GPS not supported on this device");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await axios.post(
            "https://hr-server-six.vercel.app/api/attendance/mark-wifi",
            { employeeId, latitude, longitude }
          );
          setMarked(true);
          setLocationMsg("📍 Office location verified");
          alert(res.data.message);
        } catch (err) {
          alert(err.response?.data?.message || "Outside office location");
        }
        setLoading(false);
      },
      () => {
        alert("Location permission denied");
        setLoading(false);
      }
    );
  };

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
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 403) {
        setLocationMsg("📍 WiFi failed, checking GPS location...");
        getLocationAndMark(); // fallback to GPS
      } else {
        alert("Attendance failed");
        setLoading(false);
      }
    }
  };

  return (
    <div className={`att-container ${darkMode ? "dark" : ""}`}>
      <div className="time-box">
        <h1>{time}</h1>
        <p>{date}</p>
      </div>

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
      </div>

      <div className="center-btn">
        <button
          className={`shift-btn ${marked ? "marked" : ""}`}
          onClick={markAttendance}
          disabled={marked || loading}
        >
          {!marked && !loading && <span className="finger-icon">👉</span>}
          <p>
            {loading
              ? "Checking Location..."
              : marked
              ? "Attendance Marked"
              : "Mark Attendance"}
          </p>
        </button>
      </div>

      <p className="location-text">{locationMsg}</p>

      <div className="bottom-nav">
        <div className="nav-item">
          <FiHome size={22} />
          <span>Home</span>
        </div>
        <div className="nav-item" onClick={() => (window.location.href = "/profile")}>
          <FiClock size={22} />
          <span>Profile</span>
        </div>
        <div className="nav-item" onClick={() => (window.location.href = "/settings")}>
          <FiSettings size={22} />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}




