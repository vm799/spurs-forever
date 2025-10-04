import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // RSS feeds for Tottenham news
    const rssFeeds = [
      'https://www.tottenhamhotspur.com/feeds/news/',
    ];

    const allArticles: any[] = [];

    for (const feedUrl of rssFeeds) {
      try {
        const response = await fetch(feedUrl);
        const xmlText = await response.text();
        
        // Parse RSS XML
        const items = parseRSS(xmlText);
        
        // Insert articles into database
        for (const item of items) {
          const { error } = await supabase
            .from('news_articles')
            .upsert({
              title: item.title,
              description: item.description,
              link: item.link,
              pub_date: new Date(item.pubDate).toISOString(),
              source: 'Tottenham Hotspur Official',
            }, {
              onConflict: 'link',
              ignoreDuplicates: true,
            });

          if (!error) {
            allArticles.push(item);
          }
        }
      } catch (feedError) {
        console.error(`Error fetching feed ${feedUrl}:`, feedError);
      }
    }

    return new Response(
      JSON.stringify({ success: true, articlesProcessed: allArticles.length }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});

function parseRSS(xmlText: string): RSSItem[] {
  const items: RSSItem[] = [];
  
  // Simple regex-based XML parsing for RSS items
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/g;
  const titleRegex = /<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title>([^<]*)<\/title>/;
  const descRegex = /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>([^<]*)<\/description>/;
  const linkRegex = /<link>([^<]*)<\/link>/;
  const pubDateRegex = /<pubDate>([^<]*)<\/pubDate>/;
  
  let match;
  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemContent = match[1];
    
    const titleMatch = titleRegex.exec(itemContent);
    const descMatch = descRegex.exec(itemContent);
    const linkMatch = linkRegex.exec(itemContent);
    const pubDateMatch = pubDateRegex.exec(itemContent);
    
    if (titleMatch && linkMatch && pubDateMatch) {
      items.push({
        title: (titleMatch[1] || titleMatch[2] || '').trim(),
        description: (descMatch?.[1] || descMatch?.[2] || '').trim().replace(/<[^>]*>/g, ''),
        link: linkMatch[1].trim(),
        pubDate: pubDateMatch[1].trim(),
      });
    }
  }
  
  return items.slice(0, 20); // Limit to 20 most recent articles
}