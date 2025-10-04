import { useEffect, useState } from 'react';
import { Newspaper, RefreshCw } from 'lucide-react';
import { supabase, NewsArticle } from '../lib/supabase';
import NewsCard from './NewsCard';
import { NewsSkeletonCard } from './SkeletonCard';
import { usePullToRefresh } from '../hooks/usePullToRefresh';

export default function NewsFeed() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('pub_date', { ascending: false })
        .limit(20);

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshNews = async () => {
    setRefreshing(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-spurs-news`,
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );

      if (response.ok) {
        await fetchArticles();
      }
    } catch (error) {
      console.error('Error refreshing news:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  usePullToRefresh({
    onRefresh: refreshNews,
    enabled: !loading && !refreshing,
  });

  return (
    <section className="mb-8 sm:mb-12">
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Newspaper className="w-5 h-5 sm:w-7 sm:h-7 text-[#132257]" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Latest News</h2>
        </div>
        <button
          onClick={refreshNews}
          disabled={refreshing}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-[#132257] text-white rounded-lg hover:bg-[#1a2d6b] transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-95 text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
        >
          <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <NewsSkeletonCard key={i} />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center animate-fade-in">
          <Newspaper className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-base sm:text-lg mb-4">No news articles yet</p>
          <button
            onClick={refreshNews}
            disabled={refreshing}
            className="px-6 py-3 bg-[#132257] text-white rounded-lg hover:bg-[#1a2d6b] transition-all touch-manipulation active:scale-95 font-medium shadow-md hover:shadow-lg disabled:opacity-50"
          >
            Fetch Latest News
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {articles.map((article, index) => (
            <div key={article.id} style={{ animationDelay: `${index * 0.05}s` }}>
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
