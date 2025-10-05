import { useEffect, useState } from 'react';
import { Trophy, Plus } from 'lucide-react';
import { supabase, MatchHighlight } from '../lib/supabase';
import MatchCard from './MatchCard';
import AddMatchModal from './AddMatchModal';
import { MatchSkeletonCard } from './SkeletonCard';

export default function MatchHighlights() {
  const [matches, setMatches] = useState<MatchHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchMatches = async () => {
    try {
      const { data, error } = await supabase
        .from('match_highlights')
        .select('*')
        .order('match_date', { ascending: false })
        .limit(10);

      if (error) throw error;
      setMatches(data || []);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-gradient-to-br from-[#1a2942] to-[#0f1a2e] p-2.5 rounded-xl">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-slate-200" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">Match <span className="font-semibold">Highlights</span></h2>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#1a2942] to-[#0f1a2e] text-white rounded-xl hover:from-[#2a3952] hover:to-[#1f2a3e] transition-all touch-manipulation active:scale-95 text-sm sm:text-base font-light shadow-xl border border-[#2a3952] hover:shadow-2xl"
        >
          <Plus className="w-4 h-4 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Add Match</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {[...Array(3)].map((_, i) => (
            <MatchSkeletonCard key={i} />
          ))}
        </div>
      ) : matches.length === 0 ? (
        <div className="bg-gradient-to-br from-[#0f1624] to-[#0c1420] rounded-2xl shadow-2xl p-10 sm:p-14 text-center animate-fade-in border border-[#1a2942]">
          <Trophy className="w-14 h-14 sm:w-18 sm:h-18 text-slate-600 mx-auto mb-5" />
          <p className="text-slate-400 text-base sm:text-lg mb-6 font-light">No match highlights yet</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-7 py-3.5 bg-gradient-to-r from-[#1a2942] to-[#0f1a2e] text-white rounded-xl hover:from-[#2a3952] hover:to-[#1f2a3e] transition-all touch-manipulation active:scale-95 font-light shadow-xl border border-[#2a3952] hover:shadow-2xl"
          >
            Add First Match
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {matches.map((match, index) => (
            <div key={match.id} style={{ animationDelay: `${index * 0.05}s` }}>
              <MatchCard match={match} />
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <AddMatchModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchMatches();
          }}
        />
      )}
    </section>
  );
}
