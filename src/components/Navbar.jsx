import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Award, LogOut, User } from 'lucide-react';
import { useAuth } from './AuthProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Awards', path: '/awards' },
    { name: 'Results', path: '/results' },
  ];

  if (user) {
    navLinks.splice(1, 0, { name: 'Dashboard', path: '/dashboard' });
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand-500 p-2 rounded-lg group-hover:bg-brand-400 transition-colors">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">FestVote</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-brand-400' : 'text-slate-300 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4 ml-4">
                <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white">
                  <User className="w-4 h-4" />
                  {user.name.split(' ')[0]}
                </Link>
                <button 
                  onClick={logout}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="bg-brand-500 hover:bg-brand-400 text-white px-6 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-brand-500/30"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`block px-3 py-3 rounded-md text-base font-medium ${location.pathname === link.path ? 'bg-white/10 text-brand-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/profile" className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:bg-white/5 hover:text-white">
                  Profile
                </Link>
                <button 
                  onClick={logout}
                  className="w-full text-left block px-3 py-3 rounded-md text-base font-medium text-red-400 hover:bg-red-400/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className="block mt-4 text-center bg-brand-500 hover:bg-brand-400 text-white px-6 py-3 rounded-md text-base font-medium transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
