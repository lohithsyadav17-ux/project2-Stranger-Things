import React from 'react'
import './Navbar.css'

/**
 * Navbar Component
 * 
 * Fixed navigation bar featuring the site logo and smooth-scroll links.
 * 
 * @component
 */
const Navbar: React.FC = () => {
    return (
        <nav className="navbar" role="navigation" aria-label="Main Navigation">
            <div className="nav-logo" aria-label="Stranger Things Logo">
                STRANGER THINGS
            </div>
            <div className="nav-links">
                <a href="#characters" className="nav-link">Characters</a>
                <a href="#episodes" className="nav-link">Episodes</a>
            </div>
        </nav>
    )
}

export default Navbar
