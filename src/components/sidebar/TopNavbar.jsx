import { useContext, useState } from "react";
import profileImage from "../../../public/img/undraw_profile.svg";
import { AuthContext } from "../../auth/context/AuthContext";

export const TopNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { login, handlerLogout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Sidebar Toggle */}
      <button className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars"></i>
      </button>

      {/* User Dropdown */}
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>

        <li className="nav-item dropdown no-arrow">
          <button
            className="nav-link border-0 bg-transparent dropdown-toggle"
            onClick={() => setShowDropdown(!showDropdown)}
            id="userDropdown"
            role="button"
            aria-expanded={showDropdown}
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {login.user?.username}
            </span>
            <img
              className="img-profile rounded-circle"
              src={profileImage}
              alt="Perfil"
              width="32"
              height="32"
            />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in show"
              aria-labelledby="userDropdown"
            >          
              <button className="dropdown-item" onClick={handlerLogout}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Cerrar sesión
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};
