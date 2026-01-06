import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const CustomCursor: React.FC = () => {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 700 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    const [isPointer, setIsPointer] = useState(false)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const checkPointer = () => {
            const target = document.activeElement || document.querySelector(':hover')
            if (target) {
                const style = window.getComputedStyle(target)
                setIsPointer(style.cursor === 'pointer')
            }
        }

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mouseover', checkPointer)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mouseover', checkPointer)
        }
    }, [cursorX, cursorY])

    return (
        <>
            <motion.div
                className="custom-cursor"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    scale: isPointer ? 1.5 : 1
                }}
            />
            <style>{`
        .custom-cursor {
          position: fixed;
          left: -10px;
          top: -10px;
          width: 20px;
          height: 20px;
          border: 2px solid #ff0000;
          border-radius: 50%;
          pointer-events: none;
          z-index: 100000;
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
          mix-blend-mode: difference;
        }
        
        @media (max-width: 900px) {
          .custom-cursor { display: none; }
        }
      `}</style>
        </>
    )
}

export default CustomCursor
