import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import MatchHighlights from './components/MatchHighlights';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1624] to-[#0a0e1a]">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <ErrorBoundary>
            <NewsFeed />
          </ErrorBoundary>
          <ErrorBoundary>
            <MatchHighlights />
          </ErrorBoundary>
        </main>

        <footer className="bg-gradient-to-r from-[#0c1420] to-[#0f1a2e] text-white py-8 mt-12 border-t border-[#1a2942]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-slate-400 font-light tracking-wide">
              Come On You Spurs | COYS Forever
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
