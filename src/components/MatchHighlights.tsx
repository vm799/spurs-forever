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
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Trophy className="w-5 h-5 sm:w-7 sm:h-7 text-[#132257]" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Match Highlights</h2>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-[#132257] text-white rounded-lg hover:bg-[#1a2d6b] transition-all touch-manipulation active:scale-95 text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Add Match</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(3)].map((_, i) => (
            <MatchSkeletonCard key={i} />
          ))}
        </div>
      ) : matches.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center animate-fade-in">
          <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-base sm:text-lg mb-4">No match highlights yet</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-[#132257] text-white rounded-lg hover:bg-[#1a2d6b] transition-all touch-manipulation active:scale-95 font-medium shadow-md hover:shadow-lg"
          >
            Add First Match
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
