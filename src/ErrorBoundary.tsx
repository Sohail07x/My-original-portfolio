import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Portfolio Error Boundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md p-8 rounded-3xl bg-[#141414] border border-[#2a2a2a] shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto mb-4 font-mono">
              !
            </div>
            <h1 className="text-2xl font-serif italic mb-2">
              Something went wrong loading the view
            </h1>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              An unexpected render issue occurred. You can reload the page to restart
              the portfolio experience.
            </p>
            {this.state.error && (
              <pre className="text-[11px] text-left p-3 rounded-xl bg-black/60 border border-white/10 text-red-300 overflow-x-auto mb-6 font-mono">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
