// Weather API integration
class WeatherService {
    constructor() {
        this.apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with actual API key
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this.defaultCity = 'Delhi,IN';
        this.defaultCoords = { lat: 28.6139, lon: 77.2090 };
        this.lastWeatherData = null;
        this.lastFetchTime = 0;
        this.cacheDuration = 10 * 60 * 1000; // 10 minutes
    }

    async getCurrentWeather() {
        // Check cache first
        const now = Date.now();
        if (this.lastWeatherData && (now - this.lastFetchTime) < this.cacheDuration) {
            return this.lastWeatherData;
        }

        // If no API key configured, use fallback immediately
        if (this.apiKey === 'YOUR_OPENWEATHER_API_KEY') {
            return this.getFallbackWeather();
        }

        try {
            // Try to get user location first
            const coords = await this.getUserLocation();
            const weatherData = await this.fetchWeatherByCoords(coords.lat, coords.lon);
            
            this.lastWeatherData = weatherData;
            this.lastFetchTime = now;
            
            return weatherData;
        } catch (error) {
            console.warn('Failed to fetch live weather, using fallback:', error);
            return this.getFallbackWeather();
        }
    }

    async getUserLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    console.warn('Geolocation error:', error);
                    // Fallback to default coordinates
                    resolve(this.defaultCoords);
                },
                { timeout: 5000, enableHighAccuracy: false }
            );
        });
    }

    async fetchWeatherByCoords(lat, lon) {
        const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        return this.processWeatherData(data);
    }

    processWeatherData(data) {
        const weather = data.weather[0];
        const main = data.main;
        
        return {
            temperature: Math.round(main.temp),
            description: weather.description,
            icon: this.getWeatherIcon(weather.icon, weather.main),
            humidity: main.humidity,
            windSpeed: data.wind?.speed || 0,
            city: data.name,
            country: data.sys.country,
            timestamp: Date.now()
        };
    }

    getWeatherIcon(iconCode, weatherMain) {
        // Map OpenWeather icons to Font Awesome icons
        const iconMap = {
            '01d': 'fas fa-sun',           // clear sky day
            '01n': 'fas fa-moon',          // clear sky night
            '02d': 'fas fa-cloud-sun',     // few clouds day
            '02n': 'fas fa-cloud-moon',    // few clouds night
            '03d': 'fas fa-cloud',         // scattered clouds
            '03n': 'fas fa-cloud',
            '04d': 'fas fa-clouds',        // broken clouds
            '04n': 'fas fa-clouds',
            '09d': 'fas fa-cloud-rain',    // shower rain
            '09n': 'fas fa-cloud-rain',
            '10d': 'fas fa-cloud-sun-rain', // rain day
            '10n': 'fas fa-cloud-moon-rain', // rain night
            '11d': 'fas fa-bolt',          // thunderstorm
            '11n': 'fas fa-bolt',
            '13d': 'fas fa-snowflake',     // snow
            '13n': 'fas fa-snowflake',
            '50d': 'fas fa-smog',          // mist
            '50n': 'fas fa-smog'
        };

        return iconMap[iconCode] || 'fas fa-cloud';
    }

    getFallbackWeather() {
        // Provide realistic fallback weather for Delhi
        const fallbackOptions = [
            {
                temperature: 28,
                description: 'Clear sky',
                icon: 'fas fa-sun',
                humidity: 65,
                windSpeed: 3.2,
                city: 'Delhi',
                country: 'IN'
            },
            {
                temperature: 32,
                description: 'Partly cloudy',
                icon: 'fas fa-cloud-sun',
                humidity: 70,
                windSpeed: 2.8,
                city: 'Delhi',
                country: 'IN'
            },
            {
                temperature: 25,
                description: 'Light rain',
                icon: 'fas fa-cloud-rain',
                humidity: 85,
                windSpeed: 4.1,
                city: 'Delhi',
                country: 'IN'
            }
        ];

        // Select based on current hour for some variation
        const hour = new Date().getHours();
        const index = hour % fallbackOptions.length;
        
        return {
            ...fallbackOptions[index],
            timestamp: Date.now(),
            isFallback: true
        };
    }

    updateWeatherDisplay(weatherData) {
        const temperatureEl = document.getElementById('temperature');
        const weatherDescEl = document.getElementById('weatherDesc');
        const weatherIconEl = document.getElementById('weatherIcon');

        if (temperatureEl) {
            temperatureEl.textContent = `${weatherData.temperature}°C`;
        }

        if (weatherDescEl) {
            const description = weatherData.description.charAt(0).toUpperCase() + 
                              weatherData.description.slice(1);
            weatherDescEl.textContent = weatherData.isFallback ? 
                `${description} (Offline)` : description;
        }

        if (weatherIconEl) {
            weatherIconEl.innerHTML = `<i class="${weatherData.icon}"></i>`;
        }
    }

    async initializeWeather() {
        try {
            // Show loading state
            this.updateWeatherDisplay({
                temperature: '...',
                description: 'Loading weather...',
                icon: 'fas fa-spinner fa-spin'
            });

            const weatherData = await this.getCurrentWeather();
            this.updateWeatherDisplay(weatherData);

            // Set up periodic updates every 10 minutes
            setInterval(async () => {
                try {
                    const updatedWeather = await this.getCurrentWeather();
                    this.updateWeatherDisplay(updatedWeather);
                } catch (error) {
                    console.warn('Failed to update weather:', error);
                }
            }, this.cacheDuration);

        } catch (error) {
            console.error('Failed to initialize weather:', error);
            const fallbackWeather = this.getFallbackWeather();
            this.updateWeatherDisplay(fallbackWeather);
        }
    }
}

// Export for use in main app
window.WeatherService = WeatherService;