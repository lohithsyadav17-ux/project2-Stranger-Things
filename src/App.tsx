import React, { useState } from 'react'
import Hero from './components/Hero'
import GlobalErrorBoundary from './components/GlobalErrorBoundary'
import LoadingScreen from './components/LoadingScreen'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence } from 'framer-motion'
import UpsideDownGame from './components/Game/UpsideDownGame'
import AudioControl from './components/AudioControl'
import CustomCursor from './components/CustomCursor'
import Magnetic from './components/Magnetic'
import './App.css'

/**
 * App Component
 * 
 * Root component that manages the initial cinematic loading state 
 * and provides global providers (Helmet, ErrorBoundary).
 */
function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingGame, setIsLoadingGame] = useState(false)

    return (
        <HelmetProvider>
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
                ) : (
                    <GlobalErrorBoundary key="main-content">
                        <Hero />
                        <Magnetic strength={0.4}>
                            <button
                                className="game-launch-btn"
                                onClick={() => setIsLoadingGame(true)}
                                aria-label="Enter the Upside Down Mini Game"
                            >
                                <span className="portal-icon">🌀</span>
                                SURVIVE THE UPSIDE DOWN
                            </button>
                        </Magnetic>
                        {isLoadingGame && <UpsideDownGame onClose={() => setIsLoadingGame(false)} />}
                        <AudioControl />
                        <CustomCursor />
                    </GlobalErrorBoundary>
                )}
            </AnimatePresence>
        </HelmetProvider>
    )
}

export default App
