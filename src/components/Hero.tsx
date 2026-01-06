import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Navbar from './Navbar'
import CharacterCard from './CharacterCard'
import EpisodeGuide from './EpisodeGuide'
import ParticleBackground from './ParticleBackground'
import Footer from './Footer'
import GlobalErrorBoundary from './GlobalErrorBoundary'
import { characters } from '../data/characters'
import Magnetic from './Magnetic'
import './Hero.css'

/**
 * Hero Component
 * 
 * The main landing page component featuring the interactive fire reveal effect.
 * Managed with high-performance masking and Framer Motion.
 */
const Hero: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const revealRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const hero = heroRef.current
        const reveal = revealRef.current

        if (!hero || !reveal) return

        let mouseX = 0
        let mouseY = 0
        let x = 0
        let y = 0

        const handleMouseMove = (e: MouseEvent) => {
            const rect = hero.getBoundingClientRect()
            mouseX = e.clientX - rect.left
            mouseY = e.clientY - rect.top
            reveal.classList.add('active')
        }

        const handleMouseLeave = () => {
            reveal.classList.remove('active')
        }

        const animate = () => {
            x += (mouseX - x) * 0.05
            y += (mouseY - y) * 0.05

            reveal.style.setProperty('--x', `${x}px`)
            reveal.style.setProperty('--y', `${y}px`)

            requestAnimationFrame(animate)
        }

        const animationId = requestAnimationFrame(animate)
        hero.addEventListener('mousemove', handleMouseMove)
        hero.addEventListener('mouseleave', handleMouseLeave)

        // Arrow Key Navigation for Character Grid
        const handleGridKeydown = (e: KeyboardEvent) => {
            const active = document.activeElement as HTMLElement
            if (!active || !active.classList.contains('character-card')) return

            const cards = Array.from(document.querySelectorAll('.character-card')) as HTMLElement[]
            const index = cards.indexOf(active)
            if (index === -1) return

            let nextIndex = index
            const cols = window.innerWidth > 900 ? 4 : window.innerWidth > 768 ? 3 : window.innerWidth > 480 ? 2 : 1

            if (e.key === 'ArrowRight') nextIndex = Math.min(index + 1, cards.length - 1)
            if (e.key === 'ArrowLeft') nextIndex = Math.max(index - 1, 0)
            if (e.key === 'ArrowDown') nextIndex = Math.min(index + cols, cards.length - 1)
            if (e.key === 'ArrowUp') nextIndex = Math.max(index - cols, 0)

            if (nextIndex !== index) {
                e.preventDefault()
                cards[nextIndex].focus()
            }
        }

        window.addEventListener('keydown', handleGridKeydown)

        return () => {
            cancelAnimationFrame(animationId)
            hero.removeEventListener('mousemove', handleMouseMove)
            hero.removeEventListener('mouseleave', handleMouseLeave)
            window.removeEventListener('keydown', handleGridKeydown)
        }
    }, [])

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    const navbarVariant = {
        hidden: { y: -50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20
            }
        }
    }

    return (
        <main className="st-container" role="main">
            <Helmet>
                <title>Stranger Things | Unveil the Upside Down</title>
                <meta name="description" content="Enter the world of Hawkins. Unveil the dark secrets of the Upside Down in this interactive Stranger Things experience." />
                <meta property="og:title" content="Stranger Things Experience" />
                <meta property="og:description" content="Unveil the secrets beneath reality." />
                <meta property="og:image" content="/images/v1.png" />
            </Helmet>

            <a href="#characters" className="skip-link"> Skip to main content </a>

            <ParticleBackground />

            <motion.div variants={navbarVariant} initial="hidden" animate="visible">
                <Navbar />
            </motion.div>

            <div className="hero" ref={heroRef} aria-label="Interactive Hero Section">
                <motion.div
                    className="hero-content"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="left">
                        <motion.h1 variants={item}>STRANGER THINGS</motion.h1>
                        <motion.p variants={item}>
                            In a small town where everyone knows everyone, a peculiar incident starts a chain of events that leads to the disappearance of a child, which begins to tear at the fabric of an otherwise peaceful community.
                        </motion.p>
                        <Magnetic strength={0.3}>
                            <motion.a
                                href="https://www.netflix.com/title/80057281"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="st-btn"
                                variants={item}
                                aria-label="Enter the Upside Down on Netflix"
                            >
                                WATCH ON NETFLIX
                            </motion.a>
                        </Magnetic>
                    </div>

                    <div className="right">
                        <motion.h1 variants={item}>THE MIND FLAYER</motion.h1>
                        <motion.p variants={item}>
                            The Mind Flayer is a massive, spider-like entity that rules the Upside Down. It seeks to consume and conquer all realities.
                        </motion.p>
                    </div>
                </motion.div>
                <div className="fire-reveal" ref={revealRef} aria-hidden="true"></div>
            </div>

            <section className="st-extra-content" id="characters">
                <GlobalErrorBoundary>
                    <h2>The Party</h2>
                    <p className="section-subtitle">Meet the heroes of Hawkins</p>
                    <div className="char-grid">
                        {characters.map((char, index) => (
                            <CharacterCard key={char.id} character={char} index={index} />
                        ))}
                    </div>
                </GlobalErrorBoundary>
            </section>

            <section id="episodes">
                <GlobalErrorBoundary>
                    <EpisodeGuide />
                </GlobalErrorBoundary>
            </section>

            <Footer />
        </main>
    )
}

export default Hero
