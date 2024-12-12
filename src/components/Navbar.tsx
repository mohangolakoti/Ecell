import { Menu, X, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NotificationCenter from './NotificationCenter';
import { useAuth } from '../contexts/AuthContext';
import Ecell from '../constants/ecell_logo.svg'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/about', label: 'About' },
    { path: '/team', label: 'Team' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={Ecell} alt="logo" className='w-16 ' />
              <span className="text-xl font-bold text-white mt-4 font-Montserrat ">
                E-Cell VITB
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="flex items-baseline space-x-4 font-Roboto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link text-base  ${
                    isActive(link.path)
                      ? ' text-red-600'
                      : 'text-white hover:text-red-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {user && <NotificationCenter />}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            {user && <NotificationCenter />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${
                  isActive(link.path)
                    ? 'bg-red-600 text-white'
                    : 'text-black hover:text-white hover:bg-red-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}