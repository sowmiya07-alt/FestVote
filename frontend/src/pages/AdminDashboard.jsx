import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Users, Trophy, Star, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalStudents: 0, totalCategories: 0, totalNominees: 0, totalVotes: 0 });
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/results/stats');
                setStats(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchStats();
    }, [user]);

    if (loading) return <div className="loader"></div>;

    const data = [
        { name: 'Voted', value: stats.totalVotes },
        { name: 'Remaining Votes', value: Math.max(0, (stats.totalStudents * stats.totalCategories) - stats.totalVotes) }
    ];
    const COLORS = ['#6366f1', '#e2e8f0'];

    return (
        <div>
            <h1 className="mb-4">Admin Dashboard</h1>

            <div className="grid-cards mb-4">
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#e0e7ff', padding: '1rem', borderRadius: '0.5rem', color: 'var(--primary-color)' }}>
                        <Users size={32} />
                    </div>
                    <div>
                        <p className="text-light" style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Students</p>
                        <h2 style={{ fontSize: '1.75rem', margin: 0 }}>{stats.totalStudents}</h2>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#fce7f3', padding: '1rem', borderRadius: '0.5rem', color: 'var(--secondary-color)' }}>
                        <Trophy size={32} />
                    </div>
                    <div>
                        <p className="text-light" style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Award Categories</p>
                        <h2 style={{ fontSize: '1.75rem', margin: 0 }}>{stats.totalCategories}</h2>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', color: '#d97706' }}>
                        <Star size={32} />
                    </div>
                    <div>
                        <p className="text-light" style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Nominees</p>
                        <h2 style={{ fontSize: '1.75rem', margin: 0 }}>{stats.totalNominees}</h2>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#ecfdf5', padding: '1rem', borderRadius: '0.5rem', color: 'var(--success-color)' }}>
                        <CheckCircle size={32} />
                    </div>
                    <div>
                        <p className="text-light" style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Votes</p>
                        <h2 style={{ fontSize: '1.75rem', margin: 0 }}>{stats.totalVotes}</h2>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div className="card" style={{ flex: '1 1 500px' }}>
                    <h3 className="mb-2">Voting Engagement</h3>
                    <p className="text-light mb-4 text-sm">Visualizing overall student voting participation across all categories.</p>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={data}
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: 'var(--shadow-md)', backgroundColor: 'var(--card-bg)', color: 'var(--text-dark)' }}
                                    itemStyle={{ color: 'var(--text-dark)', fontWeight: 500 }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card" style={{ flex: '1 1 300px' }}>
                    <h3>Welcome to Admin Panel</h3>
                    <p className="text-light mt-2" style={{ lineHeight: 1.6 }}>
                        From here you can manage award categories, nominees, and view live results of the Cultural Fest voting. Use the sidebar to navigate to different sections.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
