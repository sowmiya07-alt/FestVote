import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') navigate('/admin/dashboard');
            else navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!identifier || !password) return;

        try {
            setLoading(true);
            await login(identifier, password);
        } catch (err) {
            // Internal toast handled in authContext, wait let's update AuthContext to throw and handle here?
            // Instructions specify the login form itself distinguishes if AuthContext throws, actually let's just let authcontext handle the UI toast.
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '2rem' }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-1">Welcome Back 👋</h2>
                <p className="text-center text-light mb-4">Login to cast your vote</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label">College ID / Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. STU2024001 or email"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p style={{ fontSize: '0.875rem' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600 }}>Register</Link>
                    </p>
                </div>

                <div className="text-center mt-3">
                    <Link to="/" style={{ color: 'var(--text-light)', textDecoration: 'none', fontSize: '0.875rem' }}>
                        &larr; Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
