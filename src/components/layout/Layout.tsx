import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './Layout.css'; // <-- Import custom styles

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex flex-column vh-100">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Sidebar and Backdrop for Mobile */}
      {sidebarOpen && (
        <>
          <div
            className={`mobile-sidebar slide-in`}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
          <div
            className="mobile-backdrop fade-in"
            onClick={() => setSidebarOpen(false)}
          />
        </>
      )}

      {/* Main layout */}
      <div className="d-flex flex-grow-1 mt-0">
        {/* Desktop sidebar */}
        <div className="d-none d-md-block bg-light border-end p-3" style={{ width: '250px' }}>
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-grow-1 p-3 bg-white overflow-auto" style={{ minHeight: 'calc(100vh - 56px)' }}>
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
