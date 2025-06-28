import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
 const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClose) onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar p-3">
      <nav className="nav flex-column">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `nav-link sidebar-link ${isActive ? 'active' : ''}`
          }
          onClick={handleClick}
        >
        
          📊 Dashboard
        </NavLink>
        <button onClick={handleLogout} className="btn btn-outline-primary mt-3">
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
