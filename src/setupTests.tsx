import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock IntersectionObserver for Framer Motion
class IntersectionObserverMock {
    observe() { return null; }
    disconnect() { return null; }
    unobserve() { return null; }
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserverMock,
});

// Mock ResizeObserver (required by some Framer Motion features)
class ResizeObserverMock {
    observe() { return null; }
    unobserve() { return null; }
    disconnect() { return null; }
}

Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: ResizeObserverMock,
});

// Mock matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => { },
        removeListener: () => { },
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => { },
    }),
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = () => { };

/**
 * Mock Framer Motion to silence 'whileInView' and 'viewport' prop warnings during tests.
 * We replace the motion components with standard HTML elements.
 */
vi.mock('framer-motion', async (importOriginal) => {
    const actual = await importOriginal<typeof import('framer-motion')>();
    return {
        ...actual,
        motion: {
            ...actual.motion,
            div: ({ children, whileInView, viewport, initial, animate, variants, ...props }: any) => (
                <div {...props} > {children} </div>
            ),
            main: ({ children, ...props }: any) => <main {...props} > {children} </main>,
            section: ({ children, ...props }: any) => <section {...props} > {children} </section>,
            span: ({ children, ...props }: any) => <span {...props} > {children} </span>,
            nav: ({ children, ...props }: any) => <nav {...props} > {children} </nav>,
            h1: ({ children, ...props }: any) => <h1 {...props} >{children}</h1>,
            p: ({ children, ...props }: any) => <p {...props} >{children}</p>,
            a: ({ children, ...props }: any) => <a {...props} >{children}</a>,
        },
        AnimatePresence: ({ children }: any) => <>{children} </>,
    };
});
