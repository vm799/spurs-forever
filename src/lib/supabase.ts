import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  link: string;
  pub_date: string;
  source: string;
  created_at: string;
}

export interface MatchHighlight {
  id: string;
  match_date: string;
  opponent: string;
  score: string;
  competition: string;
  goals: Array<{
    player: string;
    minute: number;
    video_link: string;
  }>;
  created_at: string;
}
