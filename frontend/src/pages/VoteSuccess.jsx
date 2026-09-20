import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle, ArrowLeft } from 'lucide-react';

const VoteSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state || {};

    useEffect(() => {
        if (!state.category) {
            navigate('/dashboard');
            return;
        }

        // Shoot beautiful confetti when they hit this page!
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#6366f1', '#ec4899', '#8b5cf6']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#6366f1', '#ec4899', '#8b5cf6']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }, [state, navigate]);

    if (!state.category) return null;

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '2rem' }}>
            <div className="card text-center" style={{ maxWidth: '500px', width: '100%', padding: '3rem 2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', position: 'relative' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                        width: '80px', height: '80px', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 40px rgba(16, 185, 129, 0.3)'
                    }}>
                        <Trophy size={40} color="var(--success-color)" />
                    </div>
                    <div style={{ position: 'absolute', top: '-5px', right: '40%' }}>
                        <CheckCircle size={28} color="var(--primary-color)" fill="white" />
                    </div>
                </div>

                <h1 style={{ marginBottom: '1rem', color: 'var(--text-dark)', fontSize: '2rem' }}>🎉 Vote Submitted Successfully!</h1>
                <p className="text-light" style={{ marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                    Thank you for participating in Cultural Fest Awards 2026.
                </p>

                <div style={{
                    background: '#f8fafc',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    textAlign: 'left',
                    marginBottom: '2rem'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span className="text-light">Award:</span>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--primary-color)' }}>{state.category}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span className="text-light">Your Vote:</span>
                        <strong style={{ fontSize: '1.05rem' }}>{state.nominee}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span className="text-light">Status:</span>
                        <span style={{ color: 'var(--success-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            ✓ Submitted
                        </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="text-light">Date/Time:</span>
                        <span style={{ fontWeight: 500 }}>{new Date().toLocaleString('en-GB')}</span>
                    </div>
                </div>

                <button
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.75rem', fontSize: '1.1rem' }}
                    onClick={() => navigate('/dashboard')}
                >
                    <ArrowLeft size={20} /> Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default VoteSuccess;
