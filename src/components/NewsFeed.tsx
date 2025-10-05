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
    <section className="mb-10 sm:mb-14">
      <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-gradient-to-br from-[#1a2942] to-[#0f1a2e] p-2.5 rounded-xl">
            <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 text-slate-200" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">Latest <span className="font-semibold">News</span></h2>
        </div>
        <button
          onClick={refreshNews}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#1a2942] to-[#0f1a2e] text-white rounded-xl hover:from-[#2a3952] hover:to-[#1f2a3e] transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-95 text-sm sm:text-base font-light shadow-xl border border-[#2a3952] hover:shadow-2xl"
        >
          <RefreshCw className={`w-4 h-4 sm:w-4 sm:h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
          {[...Array(4)].map((_, i) => (
            <NewsSkeletonCard key={i} />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="bg-gradient-to-br from-[#0f1624] to-[#0c1420] rounded-2xl shadow-2xl p-10 sm:p-14 text-center animate-fade-in border border-[#1a2942]">
          <Newspaper className="w-14 h-14 sm:w-18 sm:h-18 text-slate-600 mx-auto mb-5" />
          <p className="text-slate-400 text-base sm:text-lg mb-6 font-light">No news articles yet</p>
          <button
            onClick={refreshNews}
            disabled={refreshing}
            className="px-7 py-3.5 bg-gradient-to-r from-[#1a2942] to-[#0f1a2e] text-white rounded-xl hover:from-[#2a3952] hover:to-[#1f2a3e] transition-all touch-manipulation active:scale-95 font-light shadow-xl border border-[#2a3952] hover:shadow-2xl disabled:opacity-50"
          >
            Fetch Latest News
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
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
