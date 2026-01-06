import React, { useState, useEffect, useRef } from 'react';

const AMBIENT_TRACK_URL = 'https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3'; // A subtle synth-like track

const AudioControl: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Attempt to autoplay or resume based on session storage
        const savedState = sessionStorage.getItem('audio_playing');
        if (savedState === 'true') {
            // We can't actually autoplay reliably without user interaction, 
            // so we'll wait for the first user click if session says it should be playing.
        }
    }, []);

    const toggleAudio = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio(AMBIENT_TRACK_URL);
            audioRef.current.loop = true;
            audioRef.current.volume = 0.3;
        }

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
        }

        const newState = !isPlaying;
        setIsPlaying(newState);
        sessionStorage.setItem('audio_playing', String(newState));
    };

    return (
        <div className="audio-control">
            <button
                onClick={toggleAudio}
                className={`audio-toggle ${isPlaying ? 'playing' : ''}`}
                aria-label={isPlaying ? "Mute Ambient Sound" : "Unmute Ambient Sound"}
            >
                <div className="icon-container">
                    {isPlaying ? (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73L19.73 21 21 19.73 4.27 3zM14 7h4V3h-6v5.18l2 2z" />
                        </svg>
                    )}
                </div>
                <span className="audio-text">{isPlaying ? "ON" : "OFF"}</span>

                {isPlaying && (
                    <div className="sound-waves">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}
            </button>

            <style>{`
        .audio-control {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          z-index: 1000;
        }

        .audio-toggle {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 0, 0, 0.5);
          color: #fff;
          padding: 0.6rem 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          border-radius: 4px;
          font-family: 'Space Mono', monospace;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.1);
          min-width: 100px;
        }

        .audio-toggle:hover {
          background: rgba(20, 0, 0, 0.8);
          border-color: #ff0000;
          box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
        }

        .audio-toggle.playing {
          border-color: #ff0000;
          text-shadow: 0 0 5px #ff0000;
        }

        .icon-container {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .audio-text {
          font-size: 0.75rem;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .sound-waves {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 12px;
        }

        .sound-waves span {
          width: 2px;
          background: #ff0000;
          animation: wave 1s ease-in-out infinite;
        }

        .sound-waves span:nth-child(2) { animation-delay: 0.2s; }
        .sound-waves span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes wave {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }

        @media (max-width: 600px) {
          .audio-control {
            bottom: 1rem;
            left: 1rem;
          }
        }
      `}</style>
        </div>
    );
};

export default AudioControl;
