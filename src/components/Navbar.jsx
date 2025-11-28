import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ navItems, activeSection, onNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (id) => {
    onNavClick(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-purple-900/30">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer font-mono"
          onClick={() => handleNav("home")}
        >
          &lt;DevSec /&gt;
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-purple-400 ${
                activeSection === item.id ? "text-purple-400" : "text-gray-400"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-purple-400"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-b border-purple-900/30">
          <div className="flex flex-col p-4 space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="flex items-center gap-3 text-gray-300 hover:text-purple-400"
                >
                  {Icon && <Icon size={18} />}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
