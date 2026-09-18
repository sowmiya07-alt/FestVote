import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { CheckCircle2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const VotingPage = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [nominees, setNominees] = useState([]);
    const [selectedNominee, setSelectedNominee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [categoryId, user]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const statusRes = await api.get(`/votes/status/${categoryId}`);
            if (statusRes.data.hasVoted) {
                toast.error('You have already voted in this category');
                navigate('/dashboard');
                return;
            }

            const [catRes, nomRes] = await Promise.all([
                api.get(`/categories/${categoryId}`),
                api.get(`/nominees/category/${categoryId}`)
            ]);
            setCategory(catRes.data);
            setNominees(nomRes.data);
        } catch (error) {
            toast.error('Error fetching data');
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const submitVote = async () => {
        try {
            setSubmitting(true);
            await api.post('/votes', {
                category_id: categoryId,
                nominee_id: selectedNominee.id
            });
            setShowModal(false);
            navigate('/vote-success', { state: { category: category.name, nominee: selectedNominee.name } });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error submitting vote');
            setShowModal(false);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="loader"></div>;

    return (
        <PageTransition>
            <div className="main-content">
                <div className="mb-4 text-center">
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>{category?.name}</h1>
                    <p className="text-light" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0.5rem auto' }}>
                        {category?.description}
                    </p>
                    <p style={{ fontWeight: 600, color: 'var(--secondary-color)' }}>Choose one nominee.</p>
                </div>

                <div className="grid-cards">
                    {nominees.map(nominee => {
                        const isSelected = selectedNominee?.id === nominee.id;
                        return (
                            <div
                                key={nominee.id}
                                className={`card nominee-card ${isSelected ? 'selected' : ''}`}
                                onClick={() => setSelectedNominee(nominee)}
                            >
                                {isSelected && (
                                    <div style={{ position: 'absolute', top: '15px', right: '15px', color: 'var(--primary-color)', zIndex: 10 }}>
                                        <CheckCircle2 size={28} fill="white" strokeWidth={1} style={{ background: 'var(--primary-color)', borderRadius: '50%' }} />
                                    </div>
                                )}
                                <img
                                    src={nominee.image}
                                    alt={nominee.name}
                                    style={{ width: '110px', height: '110px', borderRadius: '50%', marginBottom: '1.25rem', objectFit: 'cover', background: '#f1f5f9', border: isSelected ? '4px solid var(--primary-color)' : '4px solid transparent', transition: 'all 0.3s ease', padding: '2px' }}
                                />
                                <h3 style={{ marginBottom: '0.25rem', fontSize: '1.25rem' }}>{nominee.name}</h3>
                                <p className="text-light" style={{ fontSize: '0.875rem', marginBottom: '0.75rem', fontWeight: 500 }}>
                                    {nominee.department} • {nominee.year}
                                </p>
                                <p style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>{nominee.description}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="card text-center mt-4" style={{ position: 'sticky', bottom: '2rem', zIndex: 10, boxShadow: 'var(--shadow-glow)' }}>
                    {selectedNominee ? (
                        <div>
                            <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                                Selected Nominee: <strong style={{ color: 'var(--primary-color)' }}>{selectedNominee.name}</strong>
                            </p>
                            <button className="btn btn-primary" onClick={() => setShowModal(true)}>Submit Vote</button>
                        </div>
                    ) : (
                        <p className="text-light text-center">Please select a nominee to continue.</p>
                    )}
                </div>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2 className="mb-2">Confirm Your Vote</h2>
                            <p className="mb-3">You selected <strong>{selectedNominee?.name}</strong> for <strong>{category?.name}</strong>.</p>
                            <p className="text-danger mb-4" style={{ fontSize: '0.875rem' }}>Your vote cannot be changed after submission.</p>
                            <div className="modal-actions">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={submitting}>Cancel</button>
                                <button className="btn btn-primary" onClick={submitVote} disabled={submitting}>
                                    {submitting ? 'Submitting...' : 'Confirm Vote'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PageTransition>
    );
};

export default VotingPage;
