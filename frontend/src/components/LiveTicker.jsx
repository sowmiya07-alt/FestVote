import React from 'react';

const messages = [
    "🎉 Rahul just voted for Best Emcee!",
    "✨ Ananya selected a nominee for Best Singer!",
    "🚀 150+ students have already participated!",
    "🏆 The Best Dancer category is heating up!",
    "🌟 Don't forget to cast yours before midnight!"
];

const LiveTicker = () => {
    return (
        <div className="ticker-wrap">
            <div className="ticker">
                {messages.map((msg, index) => (
                    <span key={index} style={{ margin: '0 3rem' }}>{msg}</span>
                ))}
                {messages.map((msg, index) => (
                    <span key={index + messages.length} style={{ margin: '0 3rem' }}>{msg}</span>
                ))}
            </div>
        </div>
    );
};

export default LiveTicker;
