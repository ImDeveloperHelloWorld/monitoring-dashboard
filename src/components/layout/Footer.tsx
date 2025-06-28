import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light text-center text-muted py-2 mt-auto border-top small">
      &copy; {new Date().getFullYear()} System Monitor – All rights reserved.
    </footer>
  );
};

export default Footer;