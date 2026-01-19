// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/Profile.css";

// export default function EmployeeProfile() {
//   const [attendance, setAttendance] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);

//   const employeeId = localStorage.getItem("employeeId");
//   const employeeName = localStorage.getItem("employeeName");
//   const employeeDepartment = localStorage.getItem("employeeDepartment");
//   const employeeImage = localStorage.getItem("employeeImage");

//   /* 🌙 LOAD THEME */
//   useEffect(() => {
//     setDarkMode(localStorage.getItem("darkMode") === "true");
//   }, []);

//   /* 📅 LOAD ATTENDANCE BY ID */
//   useEffect(() => {
//     if (!employeeId) return;

//     const fetchAttendance = async () => {
//       try {
//         const res = await axios.get(
//           `https://hr-server-six.vercel.app/api/attendance/employee/${employeeId}`
//         );
//         setAttendance(res.data);
//       } catch (err) {
//         alert("Failed to load attendance");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttendance();
//   }, [employeeId]);

//   if (loading) {
//     return <p style={{ textAlign: "center" }}>Loading attendance...</p>;
//   }

//   return (
//     <div className={`profile-page ${darkMode ? "dark" : ""}`}>
//       {/* 👤 HEADER */}
//       <div className="profile-header">
//         <img
//           src={employeeImage || "/default-avatar.png"}
//           alt="Employee"
//           className="profile-avatar"
//         />
//         <h2>{employeeName}</h2>
//         <p>{employeeDepartment}</p>
//         <p className="emp-id">ID: {employeeId}</p>
//       </div>

//       {/* 📊 ATTENDANCE LIST */}
//       <div className="attendance-list">
//         <h3>Last 30 Days Attendance</h3>

//         {attendance.map((item, index) => (
//           <div
//             key={index}
//             className={`attendance-row ${item.status.toLowerCase()}`}
//           >
//             <span>{item.date}</span>
//             <span>{item.time}</span>
//             <span className={`status ${item.status.toLowerCase()}`}>
//               {item.status}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }








import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profile.css";

export default function EmployeeProfile() {
  const [attendance, setAttendance] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const employeeId = localStorage.getItem("employeeId");
  const employeeName = localStorage.getItem("employeeName");
  const employeeDepartment = localStorage.getItem("employeeDepartment");
  const employeeImage = localStorage.getItem("employeeImage");

  /* 🌙 LOAD THEME */
  useEffect(() => {
    setDarkMode(localStorage.getItem("darkMode") === "true");
  }, []);

  /* 📅 LOAD ATTENDANCE */
  useEffect(() => {
    if (!employeeId) return;

    const fetchAttendance = async () => {
      try {
        const res = await axios.get(
          `https://hr-server-six.vercel.app/api/attendance/employee/${employeeId}`
        );

        setAttendance(res.data);

        // Map date → status (for calendar)
        const map = {};
        res.data.forEach((a) => {
          map[a.date] = a.status;
        });
        setAttendanceMap(map);
      } catch {
        alert("Failed to load attendance");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [employeeId]);

  /* 📆 CALENDAR LOGIC */
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= totalDays; d++) days.push(d);

  const formatDate = (day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading attendance...</p>;
  }

  return (
    <div className={`profile-page ${darkMode ? "dark" : ""}`}>
      {/* 👤 HEADER */}
      <div className="profile-header">
        <img
          src={employeeImage || "/default-avatar.png"}
          alt="Employee"
          className="profile-avatar"
        />
        <h2>{employeeName}</h2>
        <p>{employeeDepartment}</p>
        <p className="emp-id">ID: {employeeId}</p>
      </div>

      {/* 📅 MONTHLY CALENDAR */}
      <div className="calendar-section">
        <div className="calendar-header">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
            ◀
          </button>
          <span>
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </span>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
            ▶
          </button>
        </div>

        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="day-name">
              {d}
            </div>
          ))}

          {days.map((day, i) => {
            if (!day) return <div key={i} className="empty"></div>;

            const status = attendanceMap[formatDate(day)];

            return (
              <div
                key={i}
                className={`day-cell ${
                  status ? status.toLowerCase().replace(" ", "-") : ""
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* 📊 ATTENDANCE LIST */}
      <div className="attendance-list">
        <h3>Recent Attendance</h3>

        {attendance.map((item, index) => (
          <div key={index} className="attendance-row">
            <span>{item.date}</span>
            <span>{item.time}</span>
            <span className={`status ${item.status.toLowerCase()}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}



