# 📡 StreamOrbit

**StreamOrbit** is a modern, browser-based IPTV client that lets you discover and stream live TV channels from around the world. Built as a Progressive Web App (PWA), it works on any device and can be installed for an app-like experience — even offline.

![React](https://img.shields.io/badge/React-19-blue)
![PWA](https://img.shields.io/badge/PWA-enabled-brightgreen)

---

## 🌐 Live Demo

🚀 **Try StreamOrbit Live:**  
👉 https://streamorbittv.netlify.app/

---

## ✨ Features

- 📺 **Live TV Streaming** — Play HLS/M3U8 streams directly in your browser
- 🌍 **Multi-Source Playlists** — Browse channels by country, category, language, or region using the [iptv-org](https://github.com/iptv-org/iptv) community playlists
- 🔗 **Custom Playlist Support** — Load any M3U playlist from a URL or upload a local file
- 🔍 **Search & Filter** — Real-time fuzzy search and category filtering
- ⭐ **Favorites** — Save your favorite channels with one click (persisted in localStorage)
- 🧪 **Channel Tester** — Test individual or all channels to detect dead streams
- ⌨️ **Keyboard Navigation** — Full keyboard control for a TV-remote-like experience
- 📱 **Progressive Web App** — Installable on desktop and mobile; works offline

---

## 🛠️ Tech Stack

| Layer          | Technology                                                                                                     |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| Framework      | [React](https://react.dev/) 19                                                                                 |
| Build Tool     | [Vite](https://vitejs.dev/) 7                                                                                  |
| Video Playback | [Video.js](https://videojs.com/) + [HLS.js](https://github.com/video-dev/hls.js/)                              |
| Offline / PWA  | [Workbox](https://developer.chrome.com/docs/workbox/) via [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) |
| Client Storage | [idb](https://github.com/jakearchibald/idb) (IndexedDB)                                                        |
| Fuzzy Search   | [Fuse.js](https://www.fusejs.io/)                                                                              |
| Deployment     | [Netlify](https://netlify.com/)                                                                                |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/VibeStackLabs/StreamOrbit.git
cd StreamOrbit

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Script            | Description                                        |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Start the Vite development server with HMR         |
| `npm run build`   | Build the optimised production bundle into `dist/` |
| `npm run preview` | Preview the production build locally               |
| `npm run lint`    | Run ESLint across the source files                 |

---

## 🎮 Keyboard Shortcuts

| Key                    | Action                                  |
| ---------------------- | --------------------------------------- |
| `↑` / `↓` or `←` / `→` | Switch to next / previous channel       |
| `F`                    | Toggle favorite for the current channel |
| `G`                    | Open the channel guide / navigator      |
| `Space`                | Play / Pause                            |
| `+` or `=`             | Volume up                               |
| `-` or `_`             | Volume down                             |
| `Esc`                  | Close player or exit fullscreen         |

---

## 📂 Project Structure

```
StreamOrbit/
├── public/              # Static assets (favicons, PWA icons, manifest)
├── src/
│   ├── components/      # React UI components
│   │   ├── AddStream.jsx        # Add a custom stream URL
│   │   ├── CategoryFilter.jsx   # Category filter bar
│   │   ├── ChannelCard.jsx      # Individual channel card
│   │   ├── ChannelGrid.jsx      # Channel grid layout
│   │   ├── ChannelNavigator.jsx # Channel guide/navigator modal
│   │   ├── ChannelSkipper.jsx   # Channel tester / validator
│   │   ├── Favorites.jsx        # Favorites sidebar
│   │   ├── Player.jsx           # Video.js player wrapper
│   │   ├── Playlist.jsx         # Playlist management view
│   │   ├── PlaylistSource.jsx   # Playlist source selector
│   │   ├── PWAUpdate.jsx        # PWA update banner
│   │   └── SearchBar.jsx        # Search input
│   ├── hooks/
│   │   └── useKeyboardNav.js    # Keyboard navigation hook
│   ├── utils/
│   │   ├── channelTester.js     # HTTP-based stream health checks
│   │   └── parseM3U.js          # M3U playlist parser
│   ├── App.jsx          # Root application component
│   ├── App.css          # Application styles
│   ├── index.css        # Global base styles
│   └── main.jsx         # Entry point & service worker registration
├── index.html           # HTML shell
├── vite.config.js       # Vite + PWA configuration
├── netlify.toml         # Netlify SPA redirect rules
└── package.json         # Project metadata & scripts
```

---

## 🌐 Playlist Sources

StreamOrbit integrates with the [iptv-org/iptv](https://github.com/iptv-org/iptv) open-source project, which aggregates publicly available IPTV playlists. Channels can be browsed by:

- **Country** — e.g. India, USA, UK, Brazil, Japan
- **Category** — e.g. News, Sports, Entertainment, Music, Kids
- **Language** — 30+ languages including English, Hindi, Spanish, French
- **Region** — Europe, Asia, Americas, Africa, and more

You can also load any M3U playlist by entering a direct URL or uploading a local `.m3u` / `.m3u8` file.

---

## 📦 Deployment

The project is configured for one-click deployment on **Netlify**. The `netlify.toml` file redirects all routes to `index.html` so that React Router (client-side navigation) works correctly.

```toml
[[redirects]]
  from = "/*"
  to   = "/index.html"
  status = 200
```

To deploy manually:

```bash
npm run build
# Upload the contents of dist/ to any static hosting provider
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change, then submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source.
