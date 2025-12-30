import React from 'react';
import { Link } from 'react-router-dom';
import { CloudSun } from 'lucide-react';

const Navbar = () => (
  <nav className="bg-white shadow-sm p-4 mb-8">
    <div className="container mx-auto flex justify-between items-center px-4">
      <Link to="/" className="flex items-center gap-2 text-2xl font-black text-blue-600">
        <CloudSun size={32} /> PRONOSTICO
      </Link>
    </div>
  </nav>
);
export default Navbar;