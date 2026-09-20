import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle } from 'lucide-react';

const MyVotes = () => {
    const [votes, setVotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const res = await api.get('/votes/my-votes');
                setVotes(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchVotes();
    }, [user]);

    if (loading) return <div className="loader"></div>;

    return (
        <div className="main-content">
            <h1 className="mb-4">My Votes</h1>

            {votes.length === 0 ? (
                <div className="card text-center" style={{ padding: '3rem 2rem' }}>
                    <p className="text-light" style={{ fontSize: '1.2rem' }}>You have not voted in any categories yet.</p>
                </div>
            ) : (
                <div className="card" style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                                <th style={{ padding: '1rem', color: 'var(--text-light)' }}>Award</th>
                                <th style={{ padding: '1rem', color: 'var(--text-light)' }}>Nominee</th>
                                <th style={{ padding: '1rem', color: 'var(--text-light)' }}>Status</th>
                                <th style={{ padding: '1rem', color: 'var(--text-light)' }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {votes.map(vote => (
                                <tr key={vote.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>{vote.category_name}</td>
                                    <td style={{ padding: '1rem' }}>{vote.nominee_name}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--success-color)', background: '#ecfdf5', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600 }}>
                                            <CheckCircle size={14} /> Submitted
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>
                                        {new Date(vote.voted_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyVotes;
