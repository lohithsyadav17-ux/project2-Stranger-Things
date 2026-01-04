import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HelmetProvider } from 'react-helmet-async'
import Hero from './Hero'

describe('Hero', () => {
    it('renders the main title', () => {
        render(
            <HelmetProvider>
                <Hero />
            </HelmetProvider>
        )
        const titles = screen.getAllByText('STRANGER THINGS')
        expect(titles.length).toBeGreaterThan(0)
    })

    it('renders both sides of the hero content', () => {
        render(
            <HelmetProvider>
                <Hero />
            </HelmetProvider>
        )
        expect(screen.getByText('THE MIND FLAYER')).toBeInTheDocument()
    })

    it('contains the skip link', () => {
        render(
            <HelmetProvider>
                <Hero />
            </HelmetProvider>
        )
        expect(screen.getByText('Skip to main content')).toBeInTheDocument()
    })
})
