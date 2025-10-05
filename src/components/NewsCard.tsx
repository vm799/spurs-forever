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
    <article className="bg-gradient-to-br from-[#0f1624] to-[#0c1420] rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-[#1a2942] hover:border-[#2a3952] group animate-slide-up hover:scale-[1.02]">
      <div className="p-5 sm:p-7">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-500 mb-4 flex-wrap">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="font-light">{formattedDate}</span>
          <span className="text-slate-400 font-light">•</span>
          <span className="text-slate-300 font-light">{article.source}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-light text-white mb-4 group-hover:text-slate-200 transition-colors leading-snug">
          {article.title}
        </h3>

        {article.description && (
          <p className="text-sm sm:text-base text-slate-400 mb-5 line-clamp-3 leading-relaxed font-light">
            {article.description}
          </p>
        )}

        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-slate-300 font-light hover:text-white transition-all hover:gap-3 text-sm sm:text-base touch-manipulation active:scale-95 group/link"
        >
          Read Article
          <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/link:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </article>
  );
}
