import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import MatchHighlights from './components/MatchHighlights';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <ErrorBoundary>
            <NewsFeed />
          </ErrorBoundary>
          <ErrorBoundary>
            <MatchHighlights />
          </ErrorBoundary>
        </main>

        <footer className="bg-[#132257] text-white py-6 mt-8 sm:mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-xs sm:text-sm text-blue-200">
              Come On You Spurs! | COYS Forever
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
