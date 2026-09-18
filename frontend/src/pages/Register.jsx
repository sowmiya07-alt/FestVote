import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        college_id: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const { registerStudent, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') navigate('/admin/dashboard');
            else navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, college_id, email, password, confirmPassword } = formData;

        if (!name || !name.trim()) return toast.error("Please enter your full name.");
        if (!college_id || !college_id.trim()) return toast.error("Please enter your College ID.");
        if (!email || !/\S+@\S+\.\S+/.test(email)) return toast.error("Please enter a valid email address.");
        if (!password || password.length < 6) return toast.error("Password must have minimum 6 characters.");
        if (password !== confirmPassword) return toast.error("Passwords do not match.");

        try {
            setLoading(true);
            await registerStudent({ name, college_id, email, password });
            navigate('/login');
        } catch (err) {
            // toast is handled in context
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '2rem' }}>
            <div className="card" style={{ maxWidth: '450px', width: '100%' }}>
                <h2 className="text-center mb-1">Create Your Account</h2>
                <p className="text-center text-light mb-4">Register as a student to vote</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="e.g. Rahul Sharma"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label">College ID</label>
                        <input
                            type="text"
                            name="college_id"
                            className="form-control"
                            placeholder="e.g. STU2024001"
                            value={formData.college_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label">College Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="e.g. student@college.edu"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Min 6 characters"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            placeholder="Min 6 characters"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p style={{ fontSize: '0.875rem' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
