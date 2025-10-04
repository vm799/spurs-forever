import { Calendar, ExternalLink } from 'lucide-react';
import { NewsArticle } from '../lib/supabase';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const formattedDate = new Date(article.pub_date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-[#132257] group animate-slide-up">
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3 flex-wrap">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{formattedDate}</span>
          <span className="text-[#132257] font-medium">{article.source}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-[#132257] transition-colors leading-snug">
          {article.title}
        </h3>

        {article.description && (
          <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {article.description}
          </p>
        )}

        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#132257] font-semibold hover:text-[#1a2d6b] transition-all hover:gap-3 text-sm sm:text-base touch-manipulation active:scale-95"
        >
          Read Full Article
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
        </a>
      </div>
    </article>
  );
}
