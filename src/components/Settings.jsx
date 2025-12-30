// import React, { useEffect, useState } from "react";
// import { FiMoon, FiSun, FiLogOut, FiArrowLeft } from "react-icons/fi";
// import "../styles/Settings.css";

// export default function Settings() {
//   const [darkMode, setDarkMode] = useState(false);

//   /* 🌙 LOAD THEME */
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       setDarkMode(true);
//       document.body.classList.add("dark");
//     }
//   }, []);

//   /* 🌗 TOGGLE THEME */
//   const toggleTheme = () => {
//     if (darkMode) {
//       document.body.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     } else {
//       document.body.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     }
//     setDarkMode(!darkMode);
//   };

//   /* 🚪 LOGOUT */
//   const logout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       localStorage.clear();
//       window.location.href = "/";
//     }
//   };

//   return (
//     <div className="settings-container">
//       {/* HEADER */}
//       <div className="settings-header">
//         <FiArrowLeft size={22} onClick={() => window.history.back()} />
//         <h2>Settings</h2>
//       </div>

//       {/* SETTINGS CARD */}
//       <div className="settings-card">
//         {/* THEME */}
//         <div className="settings-item" onClick={toggleTheme}>
//           <div className="settings-left">
//             {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
//             <span>Dark Theme</span>
//           </div>
//           <label className="switch">
//             <input type="checkbox" checked={darkMode} readOnly />
//             <span className="slider"></span>
//           </label>
//         </div>

//         {/* LOGOUT */}
//         <div className="settings-item logout" onClick={logout}>
//           <div className="settings-left">
//             <FiLogOut size={20} />
//             <span>Logout</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import "../styles/Settings.css";

export default function Settings() {
  const [isDark, setIsDark] = useState(false);

  /* 🔄 Load saved theme */
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    setIsDark(savedTheme === "true");
  }, []);

  /* 🌙 Toggle Dark Mode */
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    // ✅ REQUIRED LINE
    localStorage.setItem("darkMode", newTheme);

    // Optional: apply to body instantly
    document.body.classList.toggle("dark", newTheme);
  };

  /* 🚪 LOGOUT */
  const logout = () => {
    // localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className={`settings-page ${isDark ? "dark" : ""}`}>
      <h2>Settings</h2>

      {/* 🌙 DARK MODE TOGGLE */}
      <div className="setting-item">
        <span>Dark Theme</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={isDark}
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* 🚪 LOGOUT */}
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
