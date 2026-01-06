import React, { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface MagneticProps {
    children: React.ReactElement
    strength?: number
}

const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.5 }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const ref = useRef<HTMLDivElement>(null)

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return
        const { clientX, clientY } = e
        const { left, top, width, height } = ref.current.getBoundingClientRect()

        const centerX = left + width / 2
        const centerY = top + height / 2

        const moveX = (clientX - centerX) * strength
        const moveY = (clientY - centerY) * strength

        setPosition({ x: moveX, y: moveY })
    }, [strength])

    const handleMouseLeave = useCallback(() => {
        setPosition({ x: 0, y: 0 })
    }, [])

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            style={{ display: 'inline-block' }}
        >
            {children}
        </motion.div>
    )
}

export default Magnetic
