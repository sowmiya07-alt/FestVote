import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
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
        if (!email || !password) return;

        try {
            setLoading(true);
            await login(email, password);
        } catch (err) {
            // Handled in context
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '2rem' }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%', borderTop: '4px solid var(--danger-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--danger-color)' }}>
                    <ShieldAlert size={48} />
                </div>
                <h2 className="text-center mb-1">Admin Portal</h2>
                <p className="text-center text-light mb-4">Secure Administrative Login</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label">Admin Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="e.g. admin@college.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    <button type="submit" className="btn btn-danger" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Secure Login'}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <Link to="/" style={{ color: 'var(--text-light)', textDecoration: 'none', fontSize: '0.875rem' }}>
                        &larr; Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
