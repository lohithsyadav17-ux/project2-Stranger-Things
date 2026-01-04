import React from 'react'
import './Footer.css'

/**
 * Footer Component
 *
 * A themed footer with Netflix attribution and author credits.
 * Matches the dark Stranger Things aesthetic.
 *
 * @component
 */
const Footer: React.FC = () => {
    return (
        <footer className="st-footer" role="contentinfo">
            <div className="footer-content">
                <div className="footer-logo">STRANGER THINGS</div>

                <p className="footer-tagline">
                    The Upside Down awaits...
                </p>

                <div className="footer-links">
                    <a
                        href="https://www.netflix.com/title/80057281"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Watch on Netflix"
                    >
                        Watch on Netflix
                    </a>
                </div>

                <p className="footer-credits">
                    Stranger Things is a Netflix Original Series.
                    <br />
                    This is a fan-made project for educational purposes.
                </p>

                <p className="footer-copyright">
                    © {new Date().getFullYear()} Made with ❤️ by Lohith S
                </p>
            </div>
        </footer>
    )
}

export default Footer
