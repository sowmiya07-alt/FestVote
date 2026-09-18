import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, List, Users, BarChart, LogOut, Trophy } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './AdminSidebar.css';

const AdminLayout = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: 'var(--background-color)' }}>
            <aside className="admin-sidebar" style={{ width: '250px', background: 'white', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)' }}>
                        <Trophy /> Admin Panel
                    </h2>
                </div>
                <nav style={{ flex: 1, padding: '1rem 0' }}>
                    <NavLink to="/admin/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} end>
                        <LayoutDashboard size={20} /> Dashboard
                    </NavLink>
                    <NavLink to="/admin/categories" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <List size={20} /> Award Categories
                    </NavLink>
                </nav>
                <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <button onClick={() => logout()} className="btn btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
