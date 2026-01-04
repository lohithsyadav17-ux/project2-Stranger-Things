import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EpisodeGuide from './EpisodeGuide'

describe('EpisodeGuide', () => {
    it('renders the title', () => {
        render(<EpisodeGuide />)
        expect(screen.getByText('Episode Guide')).toBeInTheDocument()
    })

    it('switches seasons on click', () => {
        render(<EpisodeGuide />)
        const season2Tab = screen.getByText('Season 2')
        fireEvent.click(season2Tab)
        expect(screen.getByText('Season 2: The Gate')).toBeInTheDocument()
    })

    it('expands episode details', () => {
        render(<EpisodeGuide />)
        const episode = screen.getByText('Chapter One: The Vanishing of Will Byers')
        fireEvent.click(episode)
        expect(screen.getByText(/young Will sees something terrifying/)).toBeInTheDocument()
    })
})
