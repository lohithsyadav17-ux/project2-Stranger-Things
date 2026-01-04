import React, { Component, ErrorInfo, ReactNode } from 'react';

/**
 * Props for the GlobalErrorBoundary component.
 */
interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

/**
 * State for the GlobalErrorBoundary component.
 */
interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * GlobalErrorBoundary Component
 * 
 * Catches errors in child components and displays a themed fallback UI.
 * Prevents the entire app from crashing due to local UI failures.
 */
class GlobalErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="error-boundary-fallback" style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#000',
                    color: '#ff3333',
                    padding: '20px',
                    textAlign: 'center',
                    fontFamily: 'Libre Baskerville, serif'
                }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Something went into the Upside Down...</h1>
                    <p style={{ fontSize: '1.2rem', color: '#aaa', maxWidth: '600px' }}>
                        We encountered an unexpected anomaly. The portal is currently closed.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '30px',
                            padding: '12px 24px',
                            background: 'transparent',
                            border: '2px solid #b30000',
                            color: '#fff',
                            cursor: 'pointer',
                            fontWeight: 600,
                            borderRadius: '8px',
                            transition: 'all 0.3s'
                        }}
                    >
                        RESTORE PORTAL (RELOAD)
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;
