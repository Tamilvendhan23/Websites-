import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="glass-effect mt-12 p-6 rounded-xl text-center">
      <p className="text-black/80">
        © {new Date().getFullYear()} Canteen Management System. All rights reserved.
      </p>
    </footer>
  );
};