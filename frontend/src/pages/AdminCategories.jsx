import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { BarChart } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState(null);
    const [resultsCategoryName, setResultsCategoryName] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) fetchCategories();
    }, [user]);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (error) {
            toast.error('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    const viewResults = async (category) => {
        try {
            const res = await api.get(`/results/${category.id}`);
            setResults(res.data);
            setResultsCategoryName(category.name);
        } catch (error) {
            toast.error('Failed to load results');
        }
    };

    if (loading) return <div className="loader"></div>;

    return (
        <div>
            <h1 className="mb-4">Award Categories & Results</h1>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                    <div className="card" style={{ padding: '0' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border-color)', background: '#f8fafc' }}>
                                    <th style={{ padding: '1rem', color: 'var(--text-light)' }}>Category Name</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-light)' }}>Status</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-light)', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(cat => (
                                    <tr key={cat.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '1rem', fontWeight: 500 }}>{cat.name}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                background: cat.status === 'active' ? '#ecfdf5' : '#fef2f2',
                                                color: cat.status === 'active' ? 'var(--success-color)' : 'var(--danger-color)',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.875rem',
                                                fontWeight: 600
                                            }}>
                                                {cat.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button
                                                className="btn btn-secondary"
                                                style={{ padding: '0.5rem', fontSize: '0.875rem' }}
                                                onClick={() => viewResults(cat)}
                                            >
                                                <BarChart size={16} /> Results
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {results && (
                    <div className="card" style={{ flex: 1, position: 'sticky', top: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem' }}>Results: {resultsCategoryName}</h2>
                            <button
                                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-light)' }}
                                onClick={() => setResults(null)}
                            >
                                &times;
                            </button>
                        </div>

                        <p className="text-light mb-4">Total Votes: <strong style={{ color: 'var(--text-dark)' }}>{results.totalVotes}</strong></p>

                        {results.results.length === 0 ? (
                            <p className="text-center text-light">No votes yet.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {results.results.map((r, i) => {
                                    const percentage = results.totalVotes > 0 ? (r.vote_count / results.totalVotes) * 100 : 0;
                                    return (
                                        <div key={r.nominee_id}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <span style={{ fontWeight: 500 }}>
                                                    {i === 0 && r.vote_count > 0 ? '🏆 ' : ''}{r.nominee_name}
                                                </span>
                                                <span style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{r.vote_count} votes ({percentage.toFixed(1)}%)</span>
                                            </div>
                                            <div style={{ height: '12px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                                                <div
                                                    className="progress-bar-animated"
                                                    style={{
                                                        height: '100%',
                                                        background: 'linear-gradient(90deg, var(--primary-color), var(--accent-color))',
                                                        width: `${percentage}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCategories;
