import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

/**
 * LoadingScreen Component
 * 
 * A cinematic entry screen that plays the Stranger Things-style logo animation.
 * Masks the initial asset loading and sets the mood.
 * 
 * @component
 */
const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 1000); // Wait for a beat before finishing
                    return 100;
                }
                return prev + Math.random() * 10;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="loading-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="loading-content">
                <motion.h1
                    className="loading-logo"
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                >
                    STRANGER THINGS
                </motion.h1>
                <div className="loading-bar-container">
                    <motion.div
                        className="loading-bar"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
                <p className="loading-status">Connecting to the Upside Down...</p>
            </div>

            <div className="vignette"></div>
        </motion.div>
    );
};

export default LoadingScreen;
