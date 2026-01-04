import React, { useMemo } from 'react'
import './ParticleBackground.css'

/**
 * ParticleBackground Component
 * 
 * Creates an ambient floating ash/ember effect for atmospheric depth.
 * CSS-only animations for maximum performance.
 * 
 * @component
 */
const ParticleBackground: React.FC = () => {
    // Generate static particle data to avoid re-renders
    const particles = useMemo(() => {
        return Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 3 + 1}px`,
            delay: `${Math.random() * 15}s`,
            duration: `${Math.random() * 20 + 10}s`,
            opacity: Math.random() * 0.5 + 0.2
        }))
    }, [])

    return (
        <div className="particles-container" aria-hidden="true">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        animationDelay: p.delay,
                        animationDuration: p.duration,
                        opacity: p.opacity
                    } as React.CSSProperties}
                />
            ))}
        </div>
    )
}

export default ParticleBackground
