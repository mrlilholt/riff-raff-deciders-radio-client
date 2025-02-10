import React from 'react';
import './MobileLayout.css';

const MobileLayout = ({ children }) => {
    return (
        <div className="mobile-layout">
            <header className="mobile-header">
                <h1>Riff Raff Deciders Radio</h1>
            </header>
            <main className="mobile-content">
                {children}
            </main>
            <footer className="mobile-footer">
                <p>&copy; {new Date().getFullYear()} Riff Raff Deciders Radio</p>
            </footer>
        </div>
    );
};

export default MobileLayout;