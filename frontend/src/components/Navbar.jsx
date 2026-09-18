import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PartyPopper, LogOut, User, Moon, Sun } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        if (isDark) {
            document.body.classList.add('dark-mode');
            setDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', newMode.toString());
        if (newMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <PartyPopper className="navbar-icon" />
                    <span>CultFest '26</span>
                </Link>
                <div className="navbar-links">
                    <button
                        onClick={toggleDarkMode}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}
                        title="Toggle Dark Mode"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {!user ? (
                        <>
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/#features" className="nav-link">Awards</Link>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </>
                    ) : user.role === 'admin' ? (
                        <>
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
                            <Link to="/admin/categories" className="nav-link">Categories</Link>
                            <button onClick={handleLogout} className="btn-logout"><LogOut size={18} /> Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <Link to="/my-votes" className="nav-link">My Votes</Link>
                            <div className="user-profile">
                                <User size={18} />
                                <span>{user.name}</span>
                            </div>
                            <button onClick={handleLogout} className="btn-logout"><LogOut size={18} /> Logout</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
