import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
        <div className="mb-2 sm:mb-0">
          © {new Date().getFullYear()} Visions Hotels. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
