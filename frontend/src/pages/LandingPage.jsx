import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, UserCheck, Zap } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="hero-section text-center" style={{ padding: '4rem 1rem', background: 'linear-gradient(135deg, #fdf4ff 0%, #e0e7ff 100%)' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                    Vote for Your Favorite Cultural Stars
                </h1>
                <p className="text-light mb-4" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Your vote decides the winners of Cultural Fest Awards 2026. Join the celebration and make your voice heard!
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/login" className="btn btn-primary">Start Voting</Link>
                    <a href="#features" className="btn btn-secondary">Learn More</a>
                </div>
            </header>

            <section id="features" style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 className="text-center mb-4" style={{ fontSize: '2rem' }}>Why Vote?</h2>
                <div className="grid-cards">
                    <div className="card text-center">
                        <ShieldCheck size={48} className="text-second" style={{ margin: '0 auto 1rem' }} />
                        <h3>Fair Voting</h3>
                        <p className="text-light mt-2">Transparent voting process ensuring every vote is properly counted.</p>
                    </div>
                    <div className="card text-center">
                        <UserCheck size={48} className="text-primary" style={{ margin: '0 auto 1rem' }} />
                        <h3>One Student, One Vote</h3>
                        <p className="text-light mt-2">Secure system guarantees no duplicate votes for any category.</p>
                    </div>
                    <div className="card text-center">
                        <Zap size={48} color="#f59e0b" style={{ margin: '0 auto 1rem' }} />
                        <h3>Instant Confirmation</h3>
                        <p className="text-light mt-2">Get immediate status updates once your vote is securely submitted.</p>
                    </div>
                </div>
            </section>

            <footer style={{ background: '#1e293b', color: 'white', padding: '2rem', textAlign: 'center', marginTop: 'auto' }}>
                <p>© 2026 Cultural Fest Awards. All Rights Reserved.</p>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.5rem' }}>College Name • contact@collegefest.edu</p>
            </footer>
        </div>
    );
};

export default LandingPage;
