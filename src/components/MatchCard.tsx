import { Calendar, Trophy, ExternalLink } from 'lucide-react';
import { MatchHighlight } from '../lib/supabase';

interface MatchCardProps {
  match: MatchHighlight;
}

export default function MatchCard({ match }: MatchCardProps) {
  const formattedDate = new Date(match.match_date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-[#132257] animate-slide-up">
      <div className="bg-gradient-to-r from-[#132257] to-[#1a2d6b] text-white p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2 text-xs sm:text-sm">
          <div className="flex items-center gap-1 sm:gap-2">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate max-w-[120px] sm:max-w-none">{match.competition}</span>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
            Tottenham vs {match.opponent}
          </h3>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-200 tracking-wider">{match.score}</p>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#132257] rounded-full animate-pulse"></span>
          Goals
        </h4>

        {match.goals && match.goals.length > 0 ? (
          <div className="space-y-2 sm:space-y-3">
            {match.goals.map((goal, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex-1 min-w-0 mr-3">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{goal.player}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{goal.minute}'</p>
                </div>
                {goal.video_link && (
                  <a
                    href={goal.video_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 sm:gap-2 px-3 py-2 bg-[#132257] text-white rounded-md hover:bg-[#1a2d6b] transition-all text-xs sm:text-sm font-medium touch-manipulation active:scale-95 shrink-0"
                  >
                    Watch
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4 text-sm sm:text-base">No goal highlights available</p>
        )}
      </div>
    </article>
  );
}
