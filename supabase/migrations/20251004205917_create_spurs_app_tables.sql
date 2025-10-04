/*
  # Create Tottenham Hotspur App Tables

  1. New Tables
    - `news_articles`
      - `id` (uuid, primary key) - Unique identifier for each article
      - `title` (text) - Article headline
      - `description` (text) - Article summary/description
      - `link` (text) - URL to the full article
      - `pub_date` (timestamptz) - Publication date
      - `source` (text) - RSS feed source name
      - `created_at` (timestamptz) - When the article was added to our database
    
    - `match_highlights`
      - `id` (uuid, primary key) - Unique identifier for each match
      - `match_date` (date) - Date of the match
      - `opponent` (text) - Name of opposing team
      - `score` (text) - Match score (e.g., "2-1")
      - `competition` (text) - Competition name (Premier League, Champions League, etc.)
      - `goals` (jsonb) - Array of goal information with player name, minute, and video link
      - `created_at` (timestamptz) - When the match was added to database
  
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (no auth required for viewing Spurs content)
    - Both tables are read-only for public users
*/

CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  link text NOT NULL UNIQUE,
  pub_date timestamptz NOT NULL,
  source text DEFAULT 'Spurs News',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS match_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_date date NOT NULL,
  opponent text NOT NULL,
  score text DEFAULT '',
  competition text DEFAULT 'Premier League',
  goals jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_highlights ENABLE ROW LEVEL SECURITY;

-- Public read access for news articles
CREATE POLICY "Anyone can view news articles"
  ON news_articles FOR SELECT
  USING (true);

-- Public read access for match highlights
CREATE POLICY "Anyone can view match highlights"
  ON match_highlights FOR SELECT
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_news_articles_pub_date ON news_articles(pub_date DESC);
CREATE INDEX IF NOT EXISTS idx_match_highlights_date ON match_highlights(match_date DESC);