import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Trophy, CheckCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import LiveTicker from '../components/LiveTicker';

const Dashboard = () => {
    const [categories, setCategories] = useState([]);
    const [votingStatus, setVotingStatus] = useState({});
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [user]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get('/categories');
            setCategories(res.data);

            const statusObj = {};
            for (let cat of res.data) {
                const statRes = await api.get(`/votes/status/${cat.id}`);
                statusObj[cat.id] = statRes.data.hasVoted;
            }
            setVotingStatus(statusObj);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loader"></div>;

    return (
        <PageTransition>
            <LiveTicker />
            <div className="main-content">
                <div className="mb-4">
                    <h1 style={{ fontSize: '2rem' }}>Welcome, {user.name} 👋</h1>
                    <p className="text-light">Cast Your Vote for the Cultural Fest Awards.</p>
                </div>

                <div className="grid-cards">
                    {categories.filter(c => c.status === 'active').map(category => {
                        const hasVoted = votingStatus[category.id];
                        return (
                            <div key={category.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <Trophy color="var(--primary-color)" />
                                    <h3 style={{ margin: 0 }}>{category.name}</h3>
                                </div>
                                <p className="text-light mb-3" style={{ flexGrow: 1 }}>{category.description}</p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {hasVoted ? (
                                        <>
                                            <span style={{ color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                                <CheckCircle size={18} /> Vote Submitted
                                            </span>
                                            <button className="btn btn-secondary" disabled>Voted</button>
                                        </>
                                    ) : (
                                        <>
                                            <span style={{ color: 'var(--text-light)', fontWeight: 500 }}>Not Voted</span>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => navigate(`/vote/${category.id}`)}
                                            >
                                                Vote Now
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {categories.length === 0 && (
                    <div className="card text-center text-light">
                        No award categories available at the moment.
                    </div>
                )}
            </div>
        </PageTransition>
    );
};

export default Dashboard;
