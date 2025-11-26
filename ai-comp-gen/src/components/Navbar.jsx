import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { HiSun, HiMoon } from "react-icons/hi2";
import { RiSettings3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LuWandSparkles } from "react-icons/lu";
import * as bootstrap from "bootstrap";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  // Enable Bootstrap tooltips
  useEffect(() => {
    const bootstrap = window.bootstrap;
    if (bootstrap) {
      const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
      );
      [...tooltipTriggerList].forEach(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
      );
    }
 }, []);

  // Sync dark mode to body
  useEffect(() => {
  if (darkMode) {
    document.body.classList.add("full-dark");
  } else {
    document.body.classList.remove("full-dark");
  }
}, [darkMode]);


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4 py-3 shadow-md! sticky-top">
      {/* LOGO */}
      <Link
        to="/"
        className="navbar-brand d-flex align-items-center gap-2 fs-3 ms-5 mt-2 gradient-logo"
      >
        <LuWandSparkles size={28} className="gradient-logo" />
        <span className="fw-bold">GenUI</span>
      </Link>

      {/* Toggle for mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* MAIN NAV CONTENT */}
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
          {/* LIGHT / DARK MODE */}
          <li
            className="nav-item icon-wrapper"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Toggle Theme"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <HiMoon size={24} /> : <HiSun size={24} />}
          </li>

          {/* USER DROPDOWN */}
          <li
            className="nav-item position-relative icon-wrapper"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Your Account"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowSettingsMenu(false);
            }}
          >
            <FaUser size={20} />

            {showUserMenu && (
              <div className="dropdown-menu-custom">
                <Link className="dropdown-item" to="/profile">
                  My Profile
                </Link>
                <hr className="dropdown-divider" />
                <p className="dropdown-item">Logout</p>
              </div>
            )}
          </li>

          {/* SETTINGS DROPDOWN */}
          <li
            className="nav-item position-relative icon-wrapper"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Settings"
            onClick={() => {
              setShowSettingsMenu(!showSettingsMenu);
              setShowUserMenu(false);
            }}
          >
            <RiSettings3Fill size={22} />

            {showSettingsMenu && (
              <div className="dropdown-menu-custom">
                <p className="dropdown-item">Preferences</p>
                <p className="dropdown-item">Appearance</p>
                <p className="dropdown-item">Notification Settings</p>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

// import React, { useState, useEffect } from "react";
// import { FaUser } from "react-icons/fa";
// import { HiSun, HiMoon } from "react-icons/hi2";
// import { RiSettings3Fill } from "react-icons/ri";
// import { Link } from "react-router-dom";
// import { LuWandSparkles } from "react-icons/lu";
// import * as bootstrap from "bootstrap";

// function Navbar() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [showSettingsMenu, setShowSettingsMenu] = useState(false);

//   // Initialize Bootstrap tooltips once
//   useEffect(() => {
//     const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
//     tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
//   }, []);

//   // Sync dark mode to body
//   useEffect(() => {
//     document.body.classList.toggle("dark-mode", darkMode);
//     document.body.classList.toggle("light-mode", !darkMode);
//   }, [darkMode]);

//   return (
//     <nav className={`navbar navbar-expand-lg ${darkMode ? "dark-mode" : "light-mode"} px-4 py-3 shadow-sm sticky-top`}>
//       {/* LOGO */}
//       <Link
//   to="/"
//   className={`navbar-brand d-flex align-items-center gap-2 fs-3 ms-5 mt-2 ${
//     darkMode ? "logo-dark" : "gradient-logo"
//   }`}
// >
//   <LuWandSparkles size={28} className={darkMode ? "logo-dark" : "gradient-logo"} />
//   <span className="fw-bold gradient-logo">GenUI</span>
// </Link>


//       {/* Toggle for mobile */}
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarContent"
//         aria-controls="navbarContent"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       {/* MAIN NAV CONTENT */}
//       <div className="collapse navbar-collapse" id="navbarContent">
//         <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
//           {/* LIGHT / DARK MODE */}
//           <li
//             className="nav-item icon-wrapper"
//             data-bs-toggle="tooltip"
//             data-bs-placement="bottom"
//             title="Toggle Theme"
//             onClick={() => setDarkMode(!darkMode)}
//           >
//             {darkMode ? <HiMoon size={24} /> : <HiSun size={24} />}
//           </li>

//           {/* USER DROPDOWN */}
//           <li
//             className="nav-item position-relative icon-wrapper"
//             data-bs-toggle="tooltip"
//             data-bs-placement="bottom"
//             title="Your Account"
//             onClick={() => {
//               setShowUserMenu(!showUserMenu);
//               setShowSettingsMenu(false);
//             }}
//           >
//             <FaUser size={20} />
//             {showUserMenu && (
//               <div className="dropdown-menu-custom">
//                 <Link className="dropdown-item" to="/profile">
//                   My Profile
//                 </Link>
//                 <hr className="dropdown-divider" />
//                 <p className="dropdown-item">Logout</p>
//               </div>
//             )}
//           </li>

//           {/* SETTINGS DROPDOWN */}
//           <li
//             className="nav-item position-relative icon-wrapper"
//             data-bs-toggle="tooltip"
//             data-bs-placement="bottom"
//             title="Settings"
//             onClick={() => {
//               setShowSettingsMenu(!showSettingsMenu);
//               setShowUserMenu(false);
//             }}
//           >
//             <RiSettings3Fill size={22} />
//             {showSettingsMenu && (
//               <div className="dropdown-menu-custom">
//                 <p className="dropdown-item">Preferences</p>
//                 <p className="dropdown-item">Appearance</p>
//                 <p className="dropdown-item">Notification Settings</p>
//               </div>
//             )}
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
