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
    <article className="bg-gradient-to-br from-[#0f1624] to-[#0c1420] rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-[#1a2942] hover:border-[#2a3952] animate-slide-up hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-[#0c1420] via-[#0f1a2e] to-[#0c1420] text-white p-4 sm:p-5 border-b border-[#1a2942]">
        <div className="flex items-center justify-between mb-3 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
            <span className="font-light text-slate-300">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
            <span className="truncate max-w-[120px] sm:max-w-none font-light text-slate-300">{match.competition}</span>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-lg sm:text-xl md:text-2xl font-light mb-2 text-white">
            Tottenham <span className="font-semibold">vs</span> {match.opponent}
          </h3>
          <p className="text-3xl sm:text-4xl font-light text-slate-200 tracking-wider">{match.score}</p>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <h4 className="text-base sm:text-lg font-light text-slate-300 mb-5 flex items-center gap-2.5">
          <span className="inline-block w-2 h-2 bg-slate-400 rounded-full animate-pulse"></span>
          Goals
        </h4>

        {match.goals && match.goals.length > 0 ? (
          <div className="space-y-3 sm:space-y-3.5">
            {match.goals.map((goal, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-[#0c1420] to-[#0f1a2e] rounded-xl hover:from-[#1a2942] hover:to-[#1f2a3e] transition-all duration-300 hover:scale-[1.02] border border-[#1a2942]"
              >
                <div className="flex-1 min-w-0 mr-3">
                  <p className="font-light text-white text-sm sm:text-base truncate">{goal.player}</p>
                  <p className="text-xs sm:text-sm text-slate-400 font-light">{goal.minute}'</p>
                </div>
                {goal.video_link && (
                  <a
                    href={goal.video_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1a2942] to-[#0f1a2e] text-white rounded-lg hover:from-[#2a3952] hover:to-[#1f2a3e] transition-all text-xs sm:text-sm font-light touch-manipulation active:scale-95 shrink-0 border border-[#2a3952]"
                  >
                    Watch
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-5 text-sm sm:text-base font-light">No goal highlights available</p>
        )}
      </div>
    </article>
  );
}
