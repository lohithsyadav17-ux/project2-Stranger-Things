import React from 'react';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    className?: string;
}

/**
 * Skeleton Loader Component
 * 
 * Provides a shimmering placeholder for content that is loading.
 * Enhances perceived performance.
 * 
 * @component
 */
const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = '100%',
    borderRadius = '4px',
    className = ''
}) => {
    return (
        <div
            className={`skeleton ${className}`}
            style={{
                width,
                height,
                borderRadius
            }}
            aria-hidden="true"
        />
    );
};

export default Skeleton;
