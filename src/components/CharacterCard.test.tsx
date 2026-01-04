import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CharacterCard from './CharacterCard'
import { Character } from '../types'

const mockCharacter: Character = {
    id: 'eleven',
    name: 'Eleven',
    role: 'The Psychic',
    image: '/images/eleven.png',
    description: 'A mysterious girl...',
    powers: ['Telekinesis'],
    quote: 'Friends don\'t lie.'
}

describe('CharacterCard', () => {
    it('renders the character name and role', () => {
        render(<CharacterCard character={mockCharacter} index={0} />)
        const names = screen.getAllByText('Eleven')
        expect(names.length).toBeGreaterThan(0)
        expect(screen.getByText('The Psychic')).toBeInTheDocument()
    })

    it('flips when hovered', () => {
        render(<CharacterCard character={mockCharacter} index={0} />)
        const card = screen.getByRole('button')

        fireEvent.mouseEnter(card)
        expect(card).toHaveClass('flipped')

        fireEvent.mouseLeave(card)
        expect(card).not.toHaveClass('flipped')
    })

    it('flips when focused', () => {
        render(<CharacterCard character={mockCharacter} index={0} />)
        const card = screen.getByRole('button')

        fireEvent.focus(card)
        expect(card).toHaveClass('flipped')

        fireEvent.blur(card)
        expect(card).not.toHaveClass('flipped')
    })

    it('flips back on Escape key', () => {
        render(<CharacterCard character={mockCharacter} index={0} />)
        const card = screen.getByRole('button')

        fireEvent.focus(card)
        expect(card).toHaveClass('flipped')

        fireEvent.keyDown(card, { key: 'Escape' })
        expect(card).not.toHaveClass('flipped')
    })

    it('toggles on Enter key', () => {
        render(<CharacterCard character={mockCharacter} index={0} />)
        const card = screen.getByRole('button')

        fireEvent.keyDown(card, { key: 'Enter' })
        expect(card).toHaveClass('flipped')

        fireEvent.keyDown(card, { key: 'Enter' })
        expect(card).not.toHaveClass('flipped')
    })
})
