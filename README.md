# Smart City Bus - Enhanced Version

A professional, deployable static web application for city bus tracking with real-time simulation, live weather, and emergency SOS functionality.

## Features

### Core Functionality
- **Real-time Bus Tracking**: Simulated bus movement along route polylines with smooth animations
- **Live Weather Integration**: Real weather data from OpenWeatherMap API with graceful fallback
- **Emergency SOS**: Mobile-optimized emergency dialer with tel:100 integration
- **Interactive Maps**: Leaflet-based mapping with route visualization and geofencing
- **Responsive Design**: Mobile-first design that works on all devices
- **Progressive Web App**: Installable on mobile devices with offline functionality

### Enhanced Features
- **Bus Movement Simulation**: Realistic bus movement along predefined routes
- **Demo Mode Toggle**: Pause/resume simulation for development and testing
- **Weather API Integration**: Live weather data with offline fallback
- **Emergency Dialer**: Platform-aware emergency calling (mobile vs desktop)
- **Smooth Animations**: CSS transitions and animations for better UX
- **Real-time Updates**: Live position updates with visual indicators

## Technology Stack

- **Frontend**: HTML5, CSS3 (CSS Custom Properties), Vanilla JavaScript (ES6+)
- **Mapping**: Leaflet.js for interactive maps
- **Weather API**: OpenWeatherMap (configurable)
- **Icons**: Font Awesome 6
- **Deployment**: Static site (GitHub Pages / Netlify compatible)

## Setup Instructions

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-city-bus-enhanced
   ```

2. **Configure Weather API (Optional)**
   - Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
   - Edit `js/weather.js` and replace `YOUR_OPENWEATHER_API_KEY` with your actual API key
   - If no API key is provided, the app will use realistic fallback weather data

3. **Serve the application**
   - **Option 1**: Use a local web server
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```
   - **Option 2**: Open `index.html` directly in a modern browser
     - Note: Some features may be limited due to CORS restrictions

4. **Access the application**
   - Open your browser and navigate to `http://localhost:8000`
   - The app will automatically start with simulated bus movement

### PWA Installation

**On Mobile Devices:**
1. Open the app in Chrome/Safari on your mobile device
2. Tap the browser menu (⋮ or share button)
3. Select "Add to Home Screen" or "Install App"
4. The app will be installed and accessible from your home screen

**On Desktop:**
1. Open the app in Chrome/Edge
2. Look for the install icon (⊕) in the address bar
3. Click "Install" to add the app to your desktop

**Generate Icons:**
- Open `create-base64-icons.html` in your browser to generate PWA icons
- Icons will be automatically downloaded to your downloads folder
- Move the generated PNG files to the `icons/` directory

### Environment Variables

Create a `.env` file in the root directory (optional):

```env
# Weather API Configuration
WEATHER_API_KEY=your_openweathermap_api_key_here
WEATHER_CITY=Delhi,IN
WEATHER_UPDATE_INTERVAL=600000

# Simulation Configuration
SIMULATION_SPEED=1
SIMULATION_UPDATE_INTERVAL=2000

# Emergency Configuration
EMERGENCY_NUMBER=100
```

## Deployment

### GitHub Pages

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Save and wait for deployment

3. **Access your deployed app**
   - Your app will be available at `https://yourusername.github.io/repository-name`

### Netlify

1. **Connect Repository**
   - Log in to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Build command: (leave empty for static site)
   - Publish directory: `/` (root)
   - Click "Deploy site"

3. **Environment Variables (Optional)**
   - Go to Site settings → Environment variables
   - Add your weather API key and other configuration

4. **Custom Domain (Optional)**
   - Go to Site settings → Domain management
   - Add your custom domain

## Project Structure

```
smart-city-bus-enhanced/
├── index.html              # Main HTML file
├── style.css              # Enhanced CSS with animations
├── app.js                 # Main application logic
├── js/
│   ├── weather.js         # Weather API integration
│   └── busSimulation.js   # Bus movement simulation
├── README.md              # This file
└── .gitignore            # Git ignore file
```

## Key Features Explained

### Bus Movement Simulation

The app includes a sophisticated bus simulation system that:
- Generates realistic route paths between bus stops
- Moves buses smoothly along polylines
- Updates bus headings based on movement direction
- Simulates occupancy changes and next stop updates
- Provides demo controls for pausing/resuming simulation

### Weather Integration

Live weather functionality includes:
- Automatic location detection with fallback to Delhi
- Real-time weather data from OpenWeatherMap
- Graceful degradation with realistic fallback data
- Caching to minimize API calls
- Visual weather icons that match conditions

### Emergency SOS System

Platform-aware emergency calling:
- **Mobile devices**: Direct `tel:100` links to open native dialer
- **Desktop**: Modal with copy-to-clipboard functionality
- **Security**: No auto-dialing, requires explicit user action
- **Documentation**: Clear instructions for emergency use

### Responsive Design

Mobile-first approach with:
- Flexible grid layouts that adapt to screen size
- Touch-friendly interface elements
- Optimized map interactions for mobile
- Accessible navigation and controls

## Browser Compatibility

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile**: iOS Safari 13+, Chrome Mobile 80+
- **Features**: ES6+ support required for full functionality
- **Fallbacks**: Graceful degradation for older browsers

## API Dependencies

### Required
- **Leaflet.js**: Map functionality (CDN)
- **Font Awesome**: Icons (CDN)

### Optional
- **OpenWeatherMap API**: Live weather data
  - Free tier: 1000 calls/day
  - Fallback: Realistic fake weather data

## Security Considerations

### Data Privacy
- **No user data storage**: All data is simulated and local
- **No tracking**: No analytics or user tracking implemented
- **API keys**: Weather API key should be kept secure (consider server-side proxy for production)

### Emergency Features
- **No auto-dialing**: Emergency SOS requires explicit user action
- **Clear documentation**: Emergency procedures are clearly explained
- **Platform detection**: Appropriate UI shown based on device capabilities

## Development Notes

### Code Organization
- **Modular structure**: Separate files for weather, simulation, and main app
- **ES6+ features**: Modern JavaScript with classes and async/await
- **CSS custom properties**: Consistent theming and easy customization
- **Event-driven**: Custom events for component communication

### Performance Optimizations
- **Efficient map updates**: Minimal DOM manipulation during animation
- **Caching**: Weather data cached to reduce API calls
- **Smooth animations**: CSS transitions for better performance
- **Lazy loading**: Maps initialized only when needed

### Customization
- **Theme system**: Light/dark mode with CSS custom properties
- **Configurable simulation**: Adjustable speed and update intervals
- **Extensible data**: Easy to add new routes, stops, and POIs
- **Modular components**: Easy to add new features or modify existing ones

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
1. Check the GitHub Issues page
2. Review the documentation above
3. Create a new issue with detailed information

## Acknowledgments

- **OpenStreetMap**: Map tiles and data
- **OpenWeatherMap**: Weather data API
- **Font Awesome**: Icon library
- **Leaflet**: Interactive mapping library