import React from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-primary text-white d-flex align-items-center justify-content-between px-3 py-2 shadow" style={{ height: '56px' }}>
      <div className="d-flex align-items-center gap-3">
        {/* Hamburger menu for mobile */}
        <button className="btn btn-outline-light d-md-none" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          &#9776;
        </button>
        <h1 className="h5 mb-0">System Monitor</h1>
      </div>
    </header>
  );
};

export default Header;
