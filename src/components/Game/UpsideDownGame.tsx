import React, { useState, useEffect, useCallback, useRef } from 'react';
import Leaderboard from './Leaderboard';

// --- Types ---
interface GameItem {
    id: number;
    type: 'demogorgon' | 'eggo' | 'clock';
    x: number;
    y: number;
    status: 'active' | 'vanishing' | 'collected';
}

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    life: number;
}

// --- SVG Assets ---
const DemogorgonSVG = () => (
    <svg viewBox="0 0 100 100" className="game-svg">
        <circle cx="50" cy="50" r="10" fill="#200" />
        <path d="M50 40 L40 10 L60 10 Z" fill="#800" className="petal" />
        <path d="M60 50 L90 40 L90 60 Z" fill="#800" className="petal" />
        <path d="M50 60 L60 90 L40 90 Z" fill="#800" className="petal" />
        <path d="M40 50 L10 60 L10 40 Z" fill="#800" className="petal" />
        <path d="M43 43 L20 20 L30 15 Z" fill="#800" className="petal" />
        <path d="M57 43 L80 20 L70 15 Z" fill="#800" className="petal" />
        <path d="M57 57 L80 80 L70 85 Z" fill="#800" className="petal" />
        <path d="M43 57 L20 80 L30 85 Z" fill="#800" className="petal" />
        <circle cx="50" cy="50" r="5" fill="#f00" />
    </svg>
);

const EggoSVG = () => (
    <svg viewBox="0 0 100 100" className="game-svg">
        <circle cx="50" cy="50" r="45" fill="#f1c40f" stroke="#d35400" strokeWidth="5" />
        <line x1="20" y1="20" x2="80" y2="80" stroke="#d35400" strokeWidth="2" />
        <line x1="20" y1="50" x2="80" y2="50" stroke="#d35400" strokeWidth="2" />
        <line x1="20" y1="80" x2="80" y2="20" stroke="#d35400" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="80" stroke="#d35400" strokeWidth="2" />
    </svg>
);

const ClockSVG = () => (
    <svg viewBox="0 0 100 100" className="game-svg clock-hazard">
        <circle cx="50" cy="50" r="45" fill="#333" stroke="#f00" strokeWidth="4" />
        <text x="50" y="30" fontSize="12" fill="#f00" textAnchor="middle">XII</text>
        <line x1="50" y1="50" x2="50" y2="25" stroke="#f00" strokeWidth="2" className="clock-hand" />
        <line x1="50" y1="50" x2="70" y2="50" stroke="#f00" strokeWidth="1" className="clock-hand sec" />
        <circle cx="50" cy="50" r="2" fill="#f00" />
    </svg>
);

const UpsideDownGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [level, setLevel] = useState(1);
    const [items, setItems] = useState<GameItem[]>([]);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isGlitched, setIsGlitched] = useState(false);

    const [floatingTexts, setFloatingTexts] = useState<{ id: number; x: number; y: number; text: string }[]>([]);

    const gameAreaRef = useRef<HTMLDivElement>(null);
    const nextId = useRef(0);
    const particleId = useRef(0);
    const floatId = useRef(0);

    const addFloatingText = (x: number, y: number, text: string) => {
        const id = floatId.current++;
        setFloatingTexts(prev => [...prev, { id, x, y, text }]);
        setTimeout(() => {
            setFloatingTexts(prev => prev.filter(f => f.id !== id));
        }, 800);
    };

    const createParticles = (x: number, y: number, color: string) => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < 10; i++) {
            newParticles.push({
                id: particleId.current++,
                x,
                y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                color,
                life: 1.0
            });
        }
        setParticles(prev => [...prev, ...newParticles]);
    };

    useEffect(() => {
        if (particles.length === 0) return;
        const interval = setInterval(() => {
            setParticles(prev => prev
                .map(p => ({
                    ...p,
                    x: p.x + p.vx,
                    y: p.y + p.vy,
                    life: p.life - 0.05
                }))
                .filter(p => p.life > 0)
            );
        }, 30);
        return () => clearInterval(interval);
    }, [particles]);

    const spawnItem = useCallback(() => {
        if (!gameAreaRef.current || gameState !== 'playing') return;
        const { width, height } = gameAreaRef.current.getBoundingClientRect();

        const rand = Math.random();
        let type: GameItem['type'] = 'demogorgon';
        if (rand > 0.9) type = 'clock';
        else if (rand > 0.75) type = 'eggo';

        const newItem: GameItem = {
            id: nextId.current++,
            type,
            x: Math.random() * (width - 80),
            y: Math.random() * (height - 80),
            status: 'active'
        };

        setItems(prev => [...prev, newItem]);

        // Dynamic lifetime based on level
        const lifetime = Math.max(800, 2000 - (level * 100));

        setTimeout(() => {
            setItems(prev => {
                const item = prev.find(i => i.id === newItem.id);
                if (item && item.status === 'active') {
                    if (item.type === 'demogorgon') {
                        setLives(l => {
                            const nl = l - 1;
                            if (nl <= 0) setGameState('gameover');
                            return nl;
                        });
                    }
                    return prev.filter(i => i.id !== newItem.id);
                }
                return prev;
            });
        }, lifetime);
    }, [gameState, level]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameState === 'playing') {
            const spawnRate = Math.max(400, 1200 - (level * 80));
            interval = setInterval(spawnItem, spawnRate);
        }
        return () => clearInterval(interval);
    }, [gameState, spawnItem, level]);

    useEffect(() => {
        if (gameState === 'playing') {
            const nextLevel = Math.floor(score / 200) + 1;
            if (nextLevel > level) setLevel(nextLevel);
        }
    }, [score, level, gameState]);

    const handleItemClick = (e: React.MouseEvent, item: GameItem) => {
        if (item.status !== 'active') return;

        const rect = gameAreaRef.current?.getBoundingClientRect();
        const clickX = e.clientX - (rect?.left || 0);
        const clickY = e.clientY - (rect?.top || 0);

        if (item.type === 'clock') {
            setIsGlitched(true);
            setTimeout(() => setIsGlitched(false), 500);
            setLives(l => {
                const nl = l - 1;
                if (nl <= 0) setGameState('gameover');
                return nl;
            });
            createParticles(clickX, clickY, '#f00');
        } else {
            setScore(s => s + (item.type === 'eggo' ? 50 : 10));
            createParticles(clickX, clickY, item.type === 'eggo' ? '#f1c40f' : '#800');
        }

        setItems(prev => prev.filter(i => i.id !== item.id));
    };

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setLives(3);
        setLevel(1);
        setItems([]);
        setParticles([]);
    };

    return (
        <div className={`game-overlay ${isGlitched ? 'glitch-active' : ''}`}>
            <div className="game-container" ref={gameAreaRef}>
                <button className="close-game" onClick={onClose}>×</button>

                {gameState === 'start' && (
                    <div className="start-screen">
                        <h1 className="game-title">ESCAPE THE UPSIDE DOWN</h1>
                        <div className="legend">
                            <div className="legend-item">
                                <DemogorgonSVG /> <span>BANISH TO SURVIVE (+10)</span>
                            </div>
                            <div className="legend-item">
                                <EggoSVG /> <span>COLLECT FOR BOUNTY (+50)</span>
                            </div>
                            <div className="legend-item">
                                <ClockSVG /> <span>AVOID VECNA'S CURSE (-1 LIFE)</span>
                            </div>
                        </div>
                        <button className="play-btn" onClick={startGame}>ENTER PORTAL</button>
                    </div>
                )}

                {gameState === 'playing' && (
                    <>
                        <div className="game-stats">
                            <div className="stat-group">
                                <span className="label">SCORE</span>
                                <span className="value">{score}</span>
                            </div>
                            <div className="stat-group">
                                <span className="label">LEVEL</span>
                                <span className="value">{level}</span>
                            </div>
                            <div className="stat-group">
                                <span className="label">LIVES</span>
                                <span className="value">{'❤️'.repeat(Math.max(0, lives))}</span>
                            </div>
                        </div>

                        {items.map(item => (
                            <div
                                key={item.id}
                                className={`game-item ${item.type}`}
                                style={{ left: item.x, top: item.y }}
                                onClick={(e) => handleItemClick(e, item)}
                            >
                                {item.type === 'demogorgon' && <DemogorgonSVG />}
                                {item.type === 'eggo' && <EggoSVG />}
                                {item.type === 'clock' && <ClockSVG />}
                            </div>
                        ))}

                        {particles.map(p => (
                            <div
                                key={p.id}
                                className="particle"
                                style={{
                                    left: p.x,
                                    top: p.y,
                                    backgroundColor: p.color,
                                    opacity: p.life,
                                    transform: `scale(${p.life})`
                                }}
                            />
                        ))}

                        {floatingTexts.map(f => (
                            <div
                                key={f.id}
                                className="floating-text"
                                style={{ left: f.x, top: f.y }}
                            >
                                {f.text}
                            </div>
                        ))}
                    </>
                )}

                {gameState === 'gameover' && (
                    <Leaderboard currentScore={score} onRestart={startGame} />
                )}
            </div>

            <style>{`
                .game-overlay {
                    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                    background: radial-gradient(circle, #100 0%, #000 100%);
                    display: flex; justify-content: center; align-items: center;
                    z-index: 10000; font-family: 'Space Mono', monospace;
                }

                .game-container {
                    position: relative; width: 95%; max-width: 900px; height: 85vh;
                    background: #050505; border: 4px solid #ff0000;
                    box-shadow: 0 0 50px rgba(255, 0, 0, 0.2);
                    overflow: hidden; cursor: crosshair;
                }

                .game-title {
                    color: #ff0000; font-size: clamp(2rem, 5vw, 3.5rem);
                    margin-bottom: 2rem; text-shadow: 0 0 15px #ff0000;
                    letter-spacing: 4px;
                }

                .legend {
                    display: flex; flex-direction: column; gap: 1rem;
                    margin-bottom: 2rem; text-align: left;
                }

                .legend-item {
                    display: flex; align-items: center; gap: 1rem;
                    font-size: 1rem; color: #ccc;
                }

                .legend-item svg { width: 40px; height: 40px; }

                .game-stats {
                    position: absolute; top: 0; left: 0; width: 100%;
                    padding: 1.5rem; display: flex; justify-content: space-around;
                    background: linear-gradient(to bottom, rgba(255,0,0,0.1), transparent);
                    pointer-events: none; z-index: 5;
                }

                .stat-group { display: flex; flex-direction: column; align-items: center; }
                .label { font-size: 0.7rem; color: #ff0000; opacity: 0.7; }
                .value { font-size: 1.5rem; color: #fff; font-weight: bold; }

                .game-item {
                    position: absolute; width: 80px; height: 80px;
                    transition: transform 0.1s; animation: item-spawn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    filter: drop-shadow(0 0 8px rgba(255,0,0,0.3));
                }

                .game-item:hover { transform: scale(1.1); }

                .particle {
                    position: absolute; width: 6px; height: 6px;
                    border-radius: 50%; pointer-events: none;
                }

                .floating-text {
                    position: absolute; color: #fff; font-weight: bold;
                    pointer-events: none; animation: float-up 0.8s ease-out forwards;
                    text-shadow: 0 0 10px #ff0000; z-index: 20;
                }

                .glitch-active { animation: screen-glitch 0.2s infinite; }

                @keyframes float-up {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(-50px); opacity: 0; }
                }

                @keyframes item-spawn {
                    from { transform: scale(0) rotate(-20deg); opacity: 0; }
                    to { transform: scale(1) rotate(0); opacity: 1; }
                }

                @keyframes screen-glitch {
                    0% { transform: translate(0); filter: hue-rotate(0deg); }
                    25% { transform: translate(5px, -5px); filter: hue-rotate(90deg); }
                    50% { transform: translate(-5px, 5px); }
                    75% { transform: translate(2px, 2px); }
                    100% { transform: translate(0); }
                }

                .petal { animation: petal-pulse 2s infinite ease-in-out; transform-origin: center; }
                @keyframes petal-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .clock-hand { transform-origin: center; animation: clock-rotate 10s infinite linear; }
                .clock-hand.sec { animation-duration: 2s; }
                @keyframes clock-rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .play-btn {
                    padding: 1rem 3rem; background: #ff0000; color: #000;
                    border: none; font-size: 1.5rem; font-weight: bold;
                    cursor: pointer; transition: all 0.3s;
                    box-shadow: 0 0 20px rgba(255,0,0,0.4);
                }

                .play-btn:hover { background: #fff; transform: scale(1.05); }

                .close-game {
                    position: absolute; right: 1.5rem; top: 1.5rem;
                    background: none; border: none; color: #666;
                    font-size: 2.5rem; cursor: pointer; transition: color 0.3s;
                    z-index: 10;
                }
                .close-game:hover { color: #ff0000; }
            `}</style>
        </div>
    );
};

export default UpsideDownGame;
