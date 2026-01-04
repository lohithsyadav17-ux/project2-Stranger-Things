import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { episodes } from '../data/episodes'
import './EpisodeGuide.css'

/**
 * EpisodeGuide Component
 * 
 * An interactive guide featuring season tabs and expandable episode details.
 * Optimized for accessibility with ARIA live regions and keyboard support.
 * 
 * @component
 */
const EpisodeGuide: React.FC = () => {
    const seasonKeys = Object.keys(episodes) as Array<keyof typeof episodes>
    const [activeSeason, setActiveSeason] = useState<keyof typeof episodes>(seasonKeys[0])
    const [expandedEpisode, setExpandedEpisode] = useState<number | null>(null)

    const currentSeason = episodes[activeSeason]

    return (
        <section className="episode-guide" id="episodes" aria-labelledby="guide-title">
            <h2 id="guide-title" className="guide-title">Episode Guide</h2>

            {/* Season Tabs */}
            <div className="season-tabs" role="tablist" aria-label="Stranger Things Seasons">
                {seasonKeys.map((key) => (
                    <button
                        key={key}
                        role="tab"
                        aria-selected={activeSeason === key}
                        aria-controls={`season-panel-${key}`}
                        id={`season-tab-${key}`}
                        className={`season-tab ${activeSeason === key ? 'active' : ''}`}
                        onClick={() => {
                            setActiveSeason(key)
                            setExpandedEpisode(null)
                        }}
                    >
                        {key.replace('season', 'Season ')}
                    </button>
                ))}
            </div>

            {/* Season Panel */}
            <div
                id={`season-panel-${activeSeason}`}
                role="tabpanel"
                aria-labelledby={`season-tab-${activeSeason}`}
                className="season-panel"
                aria-live="polite"
            >
                <div className="season-info">
                    <h3>{currentSeason.title}</h3>
                    <p className="season-year">Released: {currentSeason.releaseDate}</p>
                </div>

                <div className="episodes-list">
                    {currentSeason.episodes.map((episode) => (
                        <div
                            key={episode.number}
                            className={`episode-card ${expandedEpisode === episode.number ? 'expanded' : ''}`}
                        >
                            <button
                                className="episode-header"
                                onClick={() => setExpandedEpisode(
                                    expandedEpisode === episode.number ? null : episode.number
                                )}
                                aria-expanded={expandedEpisode === episode.number}
                            >
                                <span className="ep-number">Chapter {episode.number}</span>
                                <span className="ep-title">{episode.title}</span>
                                <span className="ep-duration">{episode.duration}</span>
                            </button>

                            <AnimatePresence>
                                {expandedEpisode === episode.number && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="episode-details"
                                    >
                                        <p>{episode.description}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EpisodeGuide
