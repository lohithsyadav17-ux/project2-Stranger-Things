import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navbar from './Navbar'

describe('Navbar', () => {
    it('renders correctly', () => {
        render(<Navbar />)
        expect(screen.getByText('STRANGER THINGS')).toBeInTheDocument()
    })

    it('contains navigation links', () => {
        render(<Navbar />)
        expect(screen.getByText('Characters')).toBeInTheDocument()
        expect(screen.getByText('Episodes')).toBeInTheDocument()
    })

    it('has accessible roles', () => {
        render(<Navbar />)
        expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
})
