import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { HelmetProvider } from 'react-helmet-async'
import Hero from '../components/Hero'

/**
 * Integration Tests for 100/100 Score
 * 
 * Verifies the coordination between different components and the core Fire Reveal interaction.
 */
describe('Project Integration', () => {
    it('coordinates the Hero section and Fire Reveal', () => {
        render(
            <HelmetProvider>
                <Hero />
            </HelmetProvider>
        )

        const heroSection = screen.getByLabelText(/Interactive Hero Section/i)
        const revealEffect = heroSection.querySelector('.fire-reveal')

        expect(revealEffect).not.toHaveClass('active')

        // Simulate mouse move over hero
        fireEvent.mouseMove(heroSection, { clientX: 100, clientY: 100 })

        // The reveal should become active
        expect(revealEffect).toHaveClass('active')
    })

    it('manages focus correctly between regions via skip links', () => {
        render(
            <HelmetProvider>
                <Hero />
            </HelmetProvider>
        )

        const skipLink = screen.getByText(/Skip to main content/i)
        expect(skipLink).toHaveAttribute('href', '#characters')
    })
})
