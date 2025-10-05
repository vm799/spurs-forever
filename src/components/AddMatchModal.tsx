import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { validateUrl, sanitizeText, sanitizeScore, validateMatchDate, validateGoalMinute } from '../utils/validation';

interface AddMatchModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface Goal {
  player: string;
  minute: number;
  video_link: string;
}

export default function AddMatchModal({ onClose, onSuccess }: AddMatchModalProps) {
  const [formData, setFormData] = useState({
    match_date: '',
    opponent: '',
    score: '',
    competition: 'Premier League',
  });
  const [goals, setGoals] = useState<Goal[]>([{ player: '', minute: 0, video_link: '' }]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateMatchDate(formData.match_date)) {
      alert('Please enter a valid match date within the past year or next month.');
      return;
    }

    const validGoals = goals.filter(g => {
      if (!g.player || !g.minute) return false;
      if (!validateGoalMinute(g.minute)) {
        alert(`Invalid goal minute: ${g.minute}. Must be between 1 and 120.`);
        return false;
      }
      if (g.video_link && !validateUrl(g.video_link)) {
        alert(`Invalid video URL for ${g.player}'s goal.`);
        return false;
      }
      return true;
    });

    setSubmitting(true);

    try {
      const { error } = await supabase.from('match_highlights').insert({
        match_date: formData.match_date,
        opponent: sanitizeText(formData.opponent),
        score: sanitizeScore(formData.score),
        competition: formData.competition,
        goals: validGoals.map(g => ({
          player: sanitizeText(g.player),
          minute: g.minute,
          video_link: g.video_link.trim(),
        })),
      });

      if (error) throw error;
      onSuccess();
    } catch (error) {
      console.error('Error adding match:', error);
      alert('Failed to add match. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const addGoal = () => {
    setGoals([...goals, { player: '', minute: 0, video_link: '' }]);
  };

  const removeGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const updateGoal = (index: number, field: keyof Goal, value: string | number) => {
    const updated = [...goals];
    updated[index] = { ...updated[index], [field]: value };
    setGoals(updated);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-gradient-to-br from-[#0f1624] to-[#0c1420] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin animate-scale-in border border-[#1a2942] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-[#0c1420] via-[#0f1a2e] to-[#0c1420] text-white p-5 sm:p-6 flex items-center justify-between z-10 border-b border-[#1a2942]">
          <h3 className="text-xl sm:text-2xl font-light">Add Match <span className="font-semibold">Highlight</span></h3>
          <button
            onClick={onClose}
            type="button"
            className="p-2 hover:bg-white/10 rounded-xl transition-colors touch-manipulation"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-light text-slate-300 mb-2">
                Match Date
              </label>
              <input
                type="date"
                required
                value={formData.match_date}
                onChange={(e) => setFormData({ ...formData, match_date: e.target.value })}
                className="w-full px-4 py-3 bg-[#0c1420] border border-[#1a2942] text-white rounded-xl focus:ring-2 focus:ring-[#2a3952] focus:border-[#2a3952] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-light text-slate-300 mb-2">
                Opponent
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Arsenal"
                value={formData.opponent}
                onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
                className="w-full px-4 py-3 bg-[#0c1420] border border-[#1a2942] text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-[#2a3952] focus:border-[#2a3952] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-light text-slate-300 mb-2">
                Score
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 2-1"
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                className="w-full px-4 py-3 bg-[#0c1420] border border-[#1a2942] text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-[#2a3952] focus:border-[#2a3952] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-light text-slate-300 mb-2">
                Competition
              </label>
              <select
                value={formData.competition}
                onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                className="w-full px-4 py-3 bg-[#0c1420] border border-[#1a2942] text-white rounded-xl focus:ring-2 focus:ring-[#2a3952] focus:border-[#2a3952] transition-all"
              >
                <option>Premier League</option>
                <option>Champions League</option>
                <option>Europa League</option>
                <option>FA Cup</option>
                <option>Carabao Cup</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-lg font-light text-white">Goals</h4>
              <button
                type="button"
                onClick={addGoal}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1a2942] to-[#0f1a2e] text-white rounded-lg hover:from-[#2a3952] hover:to-[#1f2a3e] transition-all text-sm touch-manipulation active:scale-95 border border-[#2a3952]"
              >
                <Plus className="w-4 h-4" />
                Add Goal
              </button>
            </div>

            <div className="space-y-4">
              {goals.map((goal, index) => (
                <div key={index} className="p-4 bg-[#0c1420] rounded-xl space-y-3 border border-[#1a2942]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-slate-300">
                      Goal {index + 1}
                    </span>
                    {goals.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeGoal(index)}
                        className="p-1.5 text-red-400 hover:bg-red-950/30 rounded-lg transition-colors touch-manipulation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Player name"
                      value={goal.player}
                      onChange={(e) => updateGoal(index, 'player', e.target.value)}
                      className="px-3 py-2.5 bg-[#0a0e1a] border border-[#1a2942] text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-[#2a3952] focus:border-[#2a3952] text-sm transition-all"
                    />
                    <input
                      type="number"
                      placeholder="Minute"
                      value={goal.minute || ''}
                      onChange={(e) => updateGoal(index, 'minute', parseInt(e.target.value) || 0)}
                      className="px-3 py-2.5 bg-[#0a0e1a] border border-[#1a2942] text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-[#2a3952] focus:border-[#2a3952] text-sm transition-all"
                    />
                    <input
                      type="url"
                      placeholder="Video link (optional)"
                      value={goal.video_link}
                      onChange={(e) => updateGoal(index, 'video_link', e.target.value)}
                      className="px-3 py-2.5 bg-[#0a0e1a] border border-[#1a2942] text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-[#2a3952] focus:border-[#2a3952] text-sm transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 sm:px-6 py-3 border-2 border-[#1a2942] text-slate-300 rounded-xl hover:bg-[#1a2942] transition-all font-light touch-manipulation active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-[#1a2942] to-[#0f1a2e] text-white rounded-xl hover:from-[#2a3952] hover:to-[#1f2a3e] transition-all font-light disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-95 shadow-xl border border-[#2a3952]"
            >
              {submitting ? 'Adding...' : 'Add Match'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
