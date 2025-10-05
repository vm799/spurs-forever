# COYS Daily News Feed 🔥

**Your Top 3 Essential Tottenham Stories Every Day**

A real-time news aggregation service that delivers the most important Tottenham Hotspur stories each day. No mock data, no dummy content - only real, live feeds from trusted sources.

## 🌟 Features

- **Daily Top 3**: Curated selection of the most important Spurs stories
- **Real-Time Data**: Live feeds from NewsAPI, Football-data.org, BBC Sport, Sky Sports
- **Smart Prioritization**: Intelligent ranking based on story importance and urgency
- **Auto-Updates**: Refreshes every 30 minutes during the day
- **Mobile-First**: Responsive design optimized for all devices
- **COYS Branded**: Beautiful Tottenham-themed interface

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- API keys from NewsAPI and Football-data.org

### Installation

```bash
# Clone the repository
git clone https://github.com/vm799/spurs-forever.git
cd spurs-forever

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start the server
npm start
```

Visit `http://localhost:3006` to see your daily COYS feed!

## 🔧 Configuration

### Required API Keys

1. **NewsAPI** (Free tier available)
   - Visit: https://newsapi.org/
   - Get your free API key
   - Add to `.env` as `NEWS_API_KEY`

2. **Football Data API** (Free tier available)
   - Visit: https://www.football-data.org/
   - Register for free tier
   - Add to `.env` as `FOOTBALL_API_KEY`

### Environment Variables

```env
PORT=3006
NEWS_API_KEY=your_news_api_key_here
FOOTBALL_API_KEY=your_football_data_api_key_here
```

## 📡 Data Sources

The feed aggregates from multiple real sources:

- **NewsAPI**: Latest Tottenham news from major outlets
- **Football-data.org**: Live match data and fixtures
- **BBC Sport RSS**: Tottenham-specific feeds
- **Sky Sports**: Transfer and team news
- **ESPN**: Match analysis and reports

## 🏆 Story Categories

Stories are automatically categorized and prioritized:

- **🔥 TRANSFER** (Priority 10): Signings, targets, rumors
- **⚽ MATCH_RESULT** (Priority 9): Live scores, results
- **🏥 INJURY** (Priority 8): Fitness updates, medical news
- **👨‍💼 MANAGER** (Priority 7): Ange quotes, tactical analysis
- **📰 TEAM_NEWS** (Priority 6): Squad updates, training reports
- **🌟 YOUTH** (Priority 4): Academy news
- **📝 GENERAL** (Priority 3): Other club news

## 🎯 API Endpoints

- `GET /api/daily-top-3` - Get today's top 3 stories
- `GET /api/refresh` - Force refresh the feed
- `GET /api/health` - Health check

## 🕒 Auto-Updates

- **Every 30 minutes** (6 AM - 11 PM): Automatic updates
- **6 AM daily**: Fresh start with new stories
- **Live updates**: When tab becomes visible
- **Manual refresh**: Click refresh button

## 📱 Progressive Web App

- Service Worker for offline support
- Responsive design for mobile/tablet
- Auto-refresh when connection restored
- Keyboard shortcuts (Ctrl/Cmd + R to refresh)

## 🛠 Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: Vanilla JavaScript (no frameworks!)
- **Styling**: Modern CSS with glassmorphism
- **APIs**: NewsAPI, Football-data.org
- **Scheduling**: node-cron for auto-updates

## 🚀 Deployment

### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Create app
heroku create your-coys-feed

# Set environment variables
heroku config:set NEWS_API_KEY=your_key
heroku config:set FOOTBALL_API_KEY=your_key

# Deploy
git push heroku main
```

### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Docker
```bash
# Build image
docker build -t coys-feed .

# Run container
docker run -p 3006:3006 -e NEWS_API_KEY=your_key -e FOOTBALL_API_KEY=your_key coys-feed
```

## 📊 Performance

- **Load time**: < 2 seconds
- **Update frequency**: Every 30 minutes
- **API calls**: Optimized with caching
- **Mobile optimized**: Works on all devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add real data sources (no mock data!)
4. Test with actual API keys
5. Submit a pull request

## 📄 License

MIT License - feel free to use this for your own club!

## 🔗 Links

- [Live Demo](https://your-deployed-url.com)
- [API Documentation](https://your-deployed-url.com/api/daily-top-3)
- [Tottenham Official Site](https://www.tottenhamhotspur.com/)

---

**COYS! 🤍💙**

*Built with ❤️ for the Tottenham community*