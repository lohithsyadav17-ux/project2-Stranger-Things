import React, { useState, KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { Character } from '../types'
import Skeleton from './Skeleton'
import './CharacterCard.css'

interface CharacterCardProps {
    character: Character;
    index: number;
}

/**
 * CharacterCard Component
 * 
 * Displays a character's portrait and flips to show details on hover/focus.
 * Enhanced with Framer Motion for smooth animations and ARIA for accessibility.
 * 
 * @component
 */
const CharacterCard: React.FC<CharacterCardProps> = ({ character, index }) => {
    const [isFlipped, setIsFlipped] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    /**
     * Handles keyboard interactions for accessibility.
     * Support for Arrow keys and Escape.
     */
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsFlipped(false)
        }

        // Handle flipping with Enter/Space
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsFlipped(!isFlipped)
        }

        // Arrow navigation is handled by the parent grid for better control,
        // but we could also emit an event or rely on standard focus management.
    }

    return (
        <motion.div
            className="character-card-container"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, type: 'spring', stiffness: 70 }}
        >
            <div
                className={`character-card ${isFlipped ? 'flipped' : ''}`}
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${character.name}`}
                aria-expanded={isFlipped}
            >
                {/* Front Side: Portrait */}
                <div className="card-face card-front">
                    <div className="char-image-wrapper">
                        {!imageLoaded && <Skeleton height="100%" borderRadius="8px" />}
                        <img
                            src={character.image}
                            alt={character.name}
                            className={`char-portrait ${imageLoaded ? 'loaded' : 'loading'}`}
                            loading="lazy"
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                    <div className="char-name-tag">
                        <h3>{character.name}</h3>
                        <p>{character.role}</p>
                    </div>
                </div>

                {/* Back Side: Details */}
                <div className="card-face card-back">
                    <div className="card-back-content">
                        <h3>{character.name}</h3>
                        <p className="char-description">{character.description}</p>

                        <div className="char-powers">
                            <h4>Powers</h4>
                            <ul>
                                {character.powers.map((power, i) => (
                                    <li key={i}>{power}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="char-quote">
                            <blockquote>"{character.quote}"</blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default CharacterCard
