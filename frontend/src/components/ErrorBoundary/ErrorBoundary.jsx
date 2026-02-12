import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-[#f8f6f5]">
                    <div className="text-center p-8 bg-white rounded-2xl shadow-card">
                        <h1 className="text-2xl font-bold text-[#181311] mb-2">Something went wrong.</h1>
                        <p className="text-[#8a6b60]">Please refresh the page or try again later.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-6 py-2 bg-[#f45925] text-white rounded-xl font-bold"
                        >
                            Reload App
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;