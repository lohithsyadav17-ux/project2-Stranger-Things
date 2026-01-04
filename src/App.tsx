import React, { useState } from 'react'
import Hero from './components/Hero'
import GlobalErrorBoundary from './components/GlobalErrorBoundary'
import LoadingScreen from './components/LoadingScreen'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence } from 'framer-motion'
import './App.css'

/**
 * App Component
 * 
 * Root component that manages the initial cinematic loading state 
 * and provides global providers (Helmet, ErrorBoundary).
 */
function App() {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <HelmetProvider>
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
                ) : (
                    <GlobalErrorBoundary key="main-content">
                        <Hero />
                    </GlobalErrorBoundary>
                )}
            </AnimatePresence>
        </HelmetProvider>
    )
}

export default App
