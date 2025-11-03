# Rhythm 🎵

A minimal, elegant self-tracking app for monitoring your daily Energy, Clarity, and Mood throughout the year.

![Rhythm App](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- **Daily Tracking**: Log your Energy, Clarity, and Mood on a scale of 1-10
- **Year Heatmap**: Visualize your entire year at a glance with a GitHub-style contribution graph
- **Local Storage**: All data stays private in your browser - no backend, no tracking
- **Light/Dark Mode**: Beautiful themes that adapt to your preference
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Apple-like Aesthetic**: Clean, minimal design with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shishir-dey/Rhythm.git
cd Rhythm
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🌐 Deployment

### GitHub Pages (Automatic)

This project is configured for automatic deployment to GitHub Pages:

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Your app will be available at `https://shishir-dey.github.io/Rhythm`

### Manual Deployment

```bash
npm run deploy
```

## 🎨 Design Philosophy

Rhythm embraces minimalism and mindfulness:

- **Calm Interface**: No clutter, just what you need
- **Smooth Interactions**: Gentle animations and transitions
- **Data Privacy**: Everything stays local - your data, your device
- **Visual Clarity**: Color-coded heatmap for quick insights

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS Variables** - Theme system
- **LocalStorage API** - Data persistence
- **GitHub Actions** - CI/CD

## 📊 How It Works

1. **Daily Input**: Each day, rate your Energy, Clarity, and Mood (1-10)
2. **Automatic Saving**: Data is saved locally in your browser
3. **Visual Feedback**: See your year unfold in a beautiful heatmap
4. **Color Coding**: 
   - Light blue = Lower scores
   - Medium blue = Mid-range scores
   - Red = Higher scores

## 🔒 Privacy

Rhythm is completely private:
- No server communication
- No analytics or tracking
- No user accounts
- All data stored locally in your browser

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
