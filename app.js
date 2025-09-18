// Enhanced Smart City Bus Application JavaScript

class SmartCityBusApp {
    constructor() {
        // Application data (same structure as original)
        this.data = {
            "routes": [
                {
                    "id": "R001",
                    "name": "City Center - Airport",
                    "color": "#FF6B35",
                    "stops": [
                        {"id": "S001", "name": "City Center Bus Station", "lat": 28.6139, "lng": 77.2090, "arrivals": ["5 min", "15 min", "25 min"]},
                        {"id": "S002", "name": "Connaught Place", "lat": 28.6289, "lng": 77.2065, "arrivals": ["8 min", "18 min", "28 min"]},
                        {"id": "S003", "name": "Rajiv Gandhi Terminal", "lat": 28.5665, "lng": 77.1031, "arrivals": ["25 min", "35 min", "45 min"]}
                    ]
                },
                {
                    "id": "R002", 
                    "name": "Mall Circuit",
                    "color": "#4ECDC4",
                    "stops": [
                        {"id": "S004", "name": "Select City Walk", "lat": 28.4985, "lng": 77.0917, "arrivals": ["3 min", "13 min", "23 min"]},
                        {"id": "S005", "name": "DLF Mall of India", "lat": 28.6169, "lng": 77.0704, "arrivals": ["7 min", "17 min", "27 min"]},
                        {"id": "S006", "name": "Ambience Mall", "lat": 28.4668, "lng": 77.0818, "arrivals": ["12 min", "22 min", "32 min"]}
                    ]
                },
                {
                    "id": "R003",
                    "name": "Heritage Route", 
                    "color": "#FFE66D",
                    "stops": [
                        {"id": "S007", "name": "Red Fort", "lat": 28.6562, "lng": 77.2410, "arrivals": ["6 min", "16 min", "26 min"]},
                        {"id": "S008", "name": "India Gate", "lat": 28.6129, "lng": 77.2295, "arrivals": ["10 min", "20 min", "30 min"]},
                        {"id": "S009", "name": "Humayun Tomb", "lat": 28.5933, "lng": 77.2507, "arrivals": ["15 min", "25 min", "35 min"]}
                    ]
                }
            ],
            "buses": [
                {
                    "id": "DL1PC1234",
                    "routeId": "R001", 
                    "lat": 28.6200,
                    "lng": 77.2100,
                    "heading": 45,
                    "occupancy": "Medium",
                    "nextStop": "Connaught Place",
                    "driver": {"name": "Rajesh Kumar", "id": "D001", "phone": "+91-9876543210"}
                },
                {
                    "id": "DL1PC5678",
                    "routeId": "R002",
                    "lat": 28.5100,
                    "lng": 77.0850, 
                    "heading": 180,
                    "occupancy": "High",
                    "nextStop": "DLF Mall of India",
                    "driver": {"name": "Amit Singh", "id": "D002", "phone": "+91-9876543211"}
                },
                {
                    "id": "DL1PC9012", 
                    "routeId": "R003",
                    "lat": 28.6400,
                    "lng": 77.2300,
                    "heading": 270,
                    "occupancy": "Low", 
                    "nextStop": "India Gate",
                    "driver": {"name": "Suresh Yadav", "id": "D003", "phone": "+91-9876543212"}
                }
            ],
            "pois": [
                {
                    "id": "POI001",
                    "name": "Red Fort",
                    "type": "Tourist Attraction", 
                    "lat": 28.6562,
                    "lng": 77.2410,
                    "rating": 4.5,
                    "description": "Historic fort complex and UNESCO World Heritage Site",
                    "routeIds": ["R003"],
                    "distance": "50m from Heritage Route"
                },
                {
                    "id": "POI002", 
                    "name": "Select City Walk",
                    "type": "Shopping Mall",
                    "lat": 28.4985,
                    "lng": 77.0917, 
                    "rating": 4.3,
                    "description": "Premium shopping destination with international brands",
                    "routeIds": ["R002"],
                    "distance": "Direct bus stop access"
                },
                {
                    "id": "POI003",
                    "name": "India Gate", 
                    "type": "Monument",
                    "lat": 28.6129,
                    "lng": 77.2295,
                    "rating": 4.4,
                    "description": "War memorial and iconic landmark of Delhi",
                    "routeIds": ["R003"],
                    "distance": "Adjacent to bus stop"
                },
                {
                    "id": "POI004",
                    "name": "Karim Hotel",
                    "type": "Restaurant",
                    "lat": 28.6503,
                    "lng": 77.2334,
                    "rating": 4.1, 
                    "description": "Famous Mughlai cuisine restaurant since 1913",
                    "routeIds": ["R003"],
                    "distance": "200m from Red Fort stop"
                }
            ],
            "user": {
                "id": null,
                "name": null, 
                "phone": null,
                "isLoggedIn": false,
                "aadhaarVerified": false,
                "faceVerified": false,
                "emergencyContacts": [
                    {"name": "Emergency Services", "phone": "112", "relation": "Police"}
                ],
                "frequentRoutes": [],
                "geofenceRadius": 200,
                "notificationsEnabled": true
            },
            "notifications": [
                {
                    "id": "N001",
                    "type": "Tourist Attraction",
                    "title": "Red Fort Nearby",
                    "message": "You're approaching Red Fort - UNESCO World Heritage Site. Tap to learn more!",
                    "timestamp": "2025-09-14T00:05:00Z",
                    "poi": "POI001"
                },
                {
                    "id": "N002", 
                    "type": "Shopping",
                    "title": "Select City Walk", 
                    "message": "Premium shopping destination ahead - get off at the next stop!",
                    "timestamp": "2025-09-13T23:45:00Z",
                    "poi": "POI002"
                }
            ],
            "emergencyTemplates": [
                "Emergency situation on bus. Need immediate assistance.",
                "Medical emergency - please send ambulance to my location.", 
                "Safety concern - please contact local authorities.",
                "Breakdown/accident - need help and alternate transport."
            ]
        };

        // Application state
        this.state = {
            currentView: 'dashboard',
            selectedRoute: null,
            selectedBus: null,
            selectedPOIType: '',
            maps: {},
            markers: {},
            updateInterval: null,
            lastUpdateTime: 0,
            isOnline: true,
            theme: 'light',
            simulationPaused: false
        };

        // Initialize services
        this.weatherService = null;
        this.busSimulation = null;

        // Initialize the application
        this.init();
        this.checkLoginStatus();
    }

    async init() {
        this.setupEventListeners();
        this.initializeRouteSelectors();
        this.showView('dashboard');
        
        // Initialize weather service
        if (window.WeatherService) {
            this.weatherService = new WeatherService();
            await this.weatherService.initializeWeather();
        }
        
        // Initialize bus simulation
        if (window.BusSimulation) {
            this.busSimulation = new BusSimulation(this.data.routes, this.data.buses);
            this.busSimulation.start();
            
            // Listen for bus position updates
            window.addEventListener('busPositionsUpdated', (event) => {
                this.updateMaps();
                this.updateRefreshIndicator();
            });
        }
        
        this.updateClock();
        this.renderNotifications();
        this.renderProfile();
        this.renderRoutes();
        this.renderPOIs();
        
        // Initialize dashboard map after a short delay
        setTimeout(() => this.initializeDashboardMap(), 100);
    }

    setupEventListeners() {
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.showView(view);
            });
        });

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Demo controls
        const pauseSimulation = document.getElementById('pauseSimulation');
        if (pauseSimulation) {
            pauseSimulation.addEventListener('click', () => {
                this.toggleSimulation();
            });
        }

        // Route selectors
        const routeSelector = document.getElementById('routeSelector');
        if (routeSelector) {
            routeSelector.addEventListener('change', (e) => {
                this.state.selectedRoute = e.target.value;
                this.filterDashboardContent();
            });
        }

        const trackingRouteFilter = document.getElementById('trackingRouteFilter');
        if (trackingRouteFilter) {
            trackingRouteFilter.addEventListener('change', (e) => {
                this.state.selectedRoute = e.target.value;
                this.filterTrackingMap();
            });
        }

        // Emergency button
        const emergencyBtn = document.getElementById('emergencyBtn');
        if (emergencyBtn) {
            emergencyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showEmergencyModal();
            });
        }

        // Emergency modal events
        this.setupEmergencyModalEvents();

        // POI filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterPOIs(e.target.dataset.type || '');
            });
        });

        // Geofencing controls
        const geofenceRadius = document.getElementById('geofenceRadius');
        if (geofenceRadius) {
            geofenceRadius.addEventListener('input', (e) => {
                this.updateGeofenceRadius(e.target.value);
            });
        }

        const notificationsEnabled = document.getElementById('notificationsEnabled');
        if (notificationsEnabled) {
            notificationsEnabled.addEventListener('change', (e) => {
                this.data.user.notificationsEnabled = e.target.checked;
            });
        }

        // Route search
        const routeSearch = document.getElementById('routeSearch');
        if (routeSearch) {
            routeSearch.addEventListener('input', (e) => {
                this.searchRoutes(e.target.value);
            });
        }

        // Bus info panel close
        const closeBusInfo = document.getElementById('closeBusInfo');
        if (closeBusInfo) {
            closeBusInfo.addEventListener('click', () => {
                this.hideBusInfo();
            });
        }

        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }

        // Add emergency contact
        const addEmergencyContact = document.getElementById('addEmergencyContact');
        if (addEmergencyContact) {
            addEmergencyContact.addEventListener('click', () => {
                this.showAddContactModal();
            });
        }

        // Add contact form
        const addContactForm = document.getElementById('addContactForm');
        if (addContactForm) {
            addContactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddContact();
            });
        }

        // Close add contact modal
        const closeAddContactModal = document.getElementById('closeAddContactModal');
        if (closeAddContactModal) {
            closeAddContactModal.addEventListener('click', () => {
                this.hideModal('addContactModal');
            });
        }
    }

    setupEmergencyModalEvents() {
        // Mobile emergency modal
        const closeEmergencyModal = document.getElementById('closeEmergencyModal');
        if (closeEmergencyModal) {
            closeEmergencyModal.addEventListener('click', () => {
                this.hideModal('emergencyModal');
            });
        }

        const copyEmergencyNumber = document.getElementById('copyEmergencyNumber');
        if (copyEmergencyNumber) {
            copyEmergencyNumber.addEventListener('click', () => {
                this.copyToClipboard('100');
            });
        }

        // Desktop emergency modal
        const closeDesktopEmergencyModal = document.getElementById('closeDesktopEmergencyModal');
        if (closeDesktopEmergencyModal) {
            closeDesktopEmergencyModal.addEventListener('click', () => {
                this.hideModal('desktopEmergencyModal');
            });
        }

        const copyDesktopEmergencyNumber = document.getElementById('copyDesktopEmergencyNumber');
        if (copyDesktopEmergencyNumber) {
            copyDesktopEmergencyNumber.addEventListener('click', () => {
                this.copyToClipboard('100');
            });
        }
    }

    toggleSimulation() {
        if (!this.busSimulation) return;

        const pauseBtn = document.getElementById('pauseSimulation');
        if (!pauseBtn) return;

        if (this.state.simulationPaused) {
            this.busSimulation.resume();
            this.state.simulationPaused = false;
            pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            pauseBtn.title = 'Pause Simulation';
        } else {
            this.busSimulation.pause();
            this.state.simulationPaused = true;
            pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            pauseBtn.title = 'Resume Simulation';
        }
    }

    showEmergencyModal() {
        // Detect if mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                         window.innerWidth <= 768;
        
        if (isMobile) {
            const modal = document.getElementById('emergencyModal');
            if (modal) {
                modal.classList.remove('hidden');
            }
        } else {
            const modal = document.getElementById('desktopEmergencyModal');
            if (modal) {
                modal.classList.remove('hidden');
            }
        }
    }

    copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Emergency number copied to clipboard', 'success');
            }).catch(() => {
                this.fallbackCopyToClipboard(text);
            });
        } else {
            this.fallbackCopyToClipboard(text);
        }
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification('Emergency number copied to clipboard', 'success');
        } catch (err) {
            this.showNotification('Failed to copy number', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    showNotification(message, type = 'info') {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.className = `notification-toast notification-toast--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 16px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-base);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            font-size: var(--font-size-sm);
            max-width: 300px;
        `;
        
        if (type === 'success') {
            notification.style.borderLeftColor = 'var(--color-success)';
            notification.style.borderLeftWidth = '4px';
        } else if (type === 'error') {
            notification.style.borderLeftColor = 'var(--color-error)';
            notification.style.borderLeftWidth = '4px';
        }
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    showView(viewName) {
        // Update navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        const activeTab = document.querySelector(`[data-view="${viewName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        const activeView = document.getElementById(viewName);
        if (activeView) {
            activeView.classList.add('active');
        }

        this.state.currentView = viewName;

        // Initialize view-specific functionality
        if (viewName === 'tracking') {
            setTimeout(() => this.initializeTrackingMap(), 100);
        }
    }

    toggleTheme() {
        this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-color-scheme', this.state.theme);
        
        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.className = this.state.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    initializeRouteSelectors() {
        const selectors = ['routeSelector', 'trackingRouteFilter'];
        
        selectors.forEach(selectorId => {
            const selector = document.getElementById(selectorId);
            if (selector) {
                selector.innerHTML = '<option value="">All Routes</option>';
                
                this.data.routes.forEach(route => {
                    const option = document.createElement('option');
                    option.value = route.id;
                    option.textContent = `${route.id} - ${route.name}`;
                    selector.appendChild(option);
                });
            }
        });
    }

    initializeDashboardMap() {
        const mapElement = document.getElementById('dashboardMap');
        if (!mapElement) return;

        if (this.state.maps.dashboard) {
            this.state.maps.dashboard.remove();
        }

        const map = L.map('dashboardMap').setView([28.6139, 77.2090], 11);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        this.state.maps.dashboard = map;
        this.state.markers.dashboard = { buses: [], stops: [] };

        this.updateDashboardMap();
    }

    initializeTrackingMap() {
        const mapElement = document.getElementById('trackingMap');
        if (!mapElement) return;

        if (this.state.maps.tracking) {
            this.state.maps.tracking.remove();
        }

        const map = L.map('trackingMap').setView([28.6139, 77.2090], 11);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        this.state.maps.tracking = map;
        this.state.markers.tracking = { buses: [], stops: [], routes: [] };

        this.updateTrackingMap();
    }

    updateDashboardMap() {
        const map = this.state.maps.dashboard;
        if (!map) return;

        // Clear existing markers
        if (this.state.markers.dashboard) {
            this.state.markers.dashboard.buses.forEach(marker => map.removeLayer(marker));
            this.state.markers.dashboard.stops.forEach(marker => map.removeLayer(marker));
            this.state.markers.dashboard.buses = [];
            this.state.markers.dashboard.stops = [];
        } else {
            this.state.markers.dashboard = { buses: [], stops: [] };
        }

        // Add bus markers with smooth animation
        this.data.buses.forEach(bus => {
            if (this.state.selectedRoute && bus.routeId !== this.state.selectedRoute) return;

            const route = this.data.routes.find(r => r.id === bus.routeId);
            const busIcon = L.divIcon({
                className: 'bus-marker',
                html: `<div style="background: ${route.color}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; transition: transform 0.3s ease;">🚌</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            const marker = L.marker([bus.lat, bus.lng], { icon: busIcon })
                .bindPopup(`
                    <div>
                        <strong>Bus ${bus.id}</strong><br>
                        Route: ${route.name}<br>
                        Next Stop: ${bus.nextStop}<br>
                        Occupancy: ${bus.occupancy}<br>
                        Driver: ${bus.driver.name}
                    </div>
                `)
                .addTo(map);

            this.state.markers.dashboard.buses.push(marker);
        });

        // Add nearby stops
        this.updateNearbyStops();
    }

    updateTrackingMap() {
        const map = this.state.maps.tracking;
        if (!map) return;

        // Clear existing markers and routes
        if (this.state.markers.tracking) {
            this.state.markers.tracking.buses.forEach(marker => map.removeLayer(marker));
            this.state.markers.tracking.stops.forEach(marker => map.removeLayer(marker));
            this.state.markers.tracking.routes.forEach(route => map.removeLayer(route));
            this.state.markers.tracking.buses = [];
            this.state.markers.tracking.stops = [];
            this.state.markers.tracking.routes = [];
        } else {
            this.state.markers.tracking = { buses: [], stops: [], routes: [] };
        }

        // Add route polylines and stops
        this.data.routes.forEach(route => {
            if (this.state.selectedRoute && route.id !== this.state.selectedRoute) return;

            // Create route polyline
            const routeCoords = route.stops.map(stop => [stop.lat, stop.lng]);
            const polyline = L.polyline(routeCoords, { 
                color: route.color, 
                weight: 4, 
                opacity: 0.7 
            }).addTo(map);
            this.state.markers.tracking.routes.push(polyline);

            // Add stop markers
            route.stops.forEach(stop => {
                const stopIcon = L.divIcon({
                    className: 'stop-marker',
                    html: `<div style="background: white; border: 2px solid ${route.color}; border-radius: 50%; width: 12px; height: 12px;"></div>`,
                    iconSize: [12, 12],
                    iconAnchor: [6, 6]
                });

                const marker = L.marker([stop.lat, stop.lng], { icon: stopIcon })
                    .bindPopup(`
                        <div>
                            <strong>${stop.name}</strong><br>
                            Route: ${route.name}<br>
                            Next Arrivals: ${stop.arrivals.join(', ')}
                        </div>
                    `)
                    .addTo(map);

                this.state.markers.tracking.stops.push(marker);
            });
        });

        // Add bus markers with click handlers
        this.data.buses.forEach(bus => {
            if (this.state.selectedRoute && bus.routeId !== this.state.selectedRoute) return;

            const route = this.data.routes.find(r => r.id === bus.routeId);
            const busIcon = L.divIcon({
                className: 'bus-marker moving',
                html: `<div style="background: ${route.color}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; transform: rotate(${bus.heading}deg);">🚌</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            const marker = L.marker([bus.lat, bus.lng], { icon: busIcon })
                .bindPopup(`
                    <div>
                        <strong>Bus ${bus.id}</strong><br>
                        Route: ${route.name}<br>
                        Next Stop: ${bus.nextStop}<br>
                        Occupancy: ${bus.occupancy}<br>
                        Driver: ${bus.driver.name}<br>
                        <button onclick="app.showBusInfo('${bus.id}')" style="margin-top: 8px; padding: 4px 8px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">View Details</button>
                    </div>
                `)
                .addTo(map);

            this.state.markers.tracking.buses.push(marker);
        });

        // Add user location marker
        const userIcon = L.divIcon({
            className: 'user-marker',
            html: '<div style="background: #007bff; color: white; border-radius: 50%; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center;">📍</div>',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        const userMarker = L.marker([28.6139, 77.2090], { icon: userIcon })
            .bindPopup('Your Location')
            .addTo(map);
        this.state.markers.tracking.stops.push(userMarker);

        // Add geofence circle
        const geofenceCircle = L.circle([28.6139, 77.2090], {
            color: '#007bff',
            fillColor: '#007bff',
            fillOpacity: 0.1,
            radius: this.data.user.geofenceRadius
        }).addTo(map);
        this.state.markers.tracking.routes.push(geofenceCircle);
    }

    updateMaps() {
        if (this.state.maps.dashboard) {
            this.updateDashboardMap();
        }
        if (this.state.maps.tracking) {
            this.updateTrackingMap();
        }
    }

    updateRefreshIndicator() {
        const indicator = document.getElementById('refreshIndicator');
        if (!indicator) return;
        
        this.state.lastUpdateTime = Date.now();
        
        indicator.classList.add('refreshing');
        const span = indicator.querySelector('span');
        if (span) {
            span.textContent = 'Updating...';
        }
        
        setTimeout(() => {
            indicator.classList.remove('refreshing');
            if (span) {
                span.textContent = 'Updated 0s ago';
            }
        }, 1000);
    }

    updateClock() {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: true, 
                hour: 'numeric', 
                minute: '2-digit' 
            });
            const timeEl = document.getElementById('currentTime');
            if (timeEl) {
                timeEl.textContent = timeString;
            }
        };

        updateTime();
        setInterval(updateTime, 60000); // Update every minute
    }

    // Include all other methods from the original app.js
    showBusInfo(busId) {
        const bus = this.data.buses.find(b => b.id === busId);
        if (!bus) return;

        const route = this.data.routes.find(r => r.id === bus.routeId);
        const content = `
            <div class="bus-details">
                <h4>Bus ${bus.id}</h4>
                <p><strong>Route:</strong> ${route.name}</p>
                <p><strong>Next Stop:</strong> ${bus.nextStop}</p>
                <p><strong>Occupancy:</strong> <span class="status status--${bus.occupancy.toLowerCase() === 'high' ? 'error' : bus.occupancy.toLowerCase() === 'medium' ? 'warning' : 'success'}">${bus.occupancy}</span></p>
                <p><strong>Driver:</strong> ${bus.driver.name}</p>
                <p><strong>Contact:</strong> ${bus.driver.phone}</p>
                <button class="btn btn--sm btn--primary" onclick="app.trackBus('${bus.id}')">Track This Bus</button>
            </div>
        `;
        
        document.getElementById('busInfoContent').innerHTML = content;
        document.getElementById('busInfoPanel').classList.remove('hidden');
    }

    hideBusInfo() {
        const busInfoPanel = document.getElementById('busInfoPanel');
        if (busInfoPanel) {
            busInfoPanel.classList.add('hidden');
        }
    }

    trackBus(busId) {
        this.showNotification(`Now tracking Bus ${busId}. You'll receive notifications about its location and estimated arrival times.`, 'success');
        this.hideBusInfo();
    }

    updateNearbyStops() {
        const container = document.getElementById('nearbyStops');
        if (!container) return;
        
        container.innerHTML = '';

        // Get all stops from selected route or all routes
        let stops = [];
        if (this.state.selectedRoute) {
            const route = this.data.routes.find(r => r.id === this.state.selectedRoute);
            if (route) stops = route.stops;
        } else {
            stops = this.data.routes.flatMap(route => route.stops);
        }

        // Sort by proximity (simulated)
        stops.sort(() => Math.random() - 0.5);

        stops.slice(0, 3).forEach(stop => {
            const stopElement = document.createElement('div');
            stopElement.className = 'stop-item';
            stopElement.innerHTML = `
                <div class="stop-info">
                    <div class="stop-name">${stop.name}</div>
                    <div class="stop-arrivals">
                        ${stop.arrivals.map(time => `<span class="arrival-time">${time}</span>`).join('')}
                    </div>
                </div>
            `;
            container.appendChild(stopElement);
        });
    }

    renderNotifications() {
        const container = document.getElementById('notificationsList');
        if (!container) return;
        
        container.innerHTML = '';

        this.data.notifications.forEach(notification => {
            const notificationElement = document.createElement('div');
            notificationElement.className = 'notification-item';
            
            const timeAgo = this.getTimeAgo(new Date(notification.timestamp));
            
            notificationElement.innerHTML = `
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${timeAgo}</div>
            `;
            container.appendChild(notificationElement);
        });
    }

    renderProfile() {
        const userNameEl = document.getElementById('userName');
        const userPhoneEl = document.getElementById('userPhone');
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (userNameEl) {
            userNameEl.textContent = this.data.user.isLoggedIn ? this.data.user.name : 'Guest User';
        }
        if (userPhoneEl) {
            userPhoneEl.textContent = this.data.user.isLoggedIn ? this.data.user.phone : 'Not logged in';
        }
        if (logoutBtn) {
            logoutBtn.style.display = this.data.user.isLoggedIn ? 'inline-flex' : 'none';
        }

        // Update verification status
        const aadhaarStatus = document.getElementById('aadhaarStatus');
        const faceStatus = document.getElementById('faceStatus');

        if (aadhaarStatus) {
            aadhaarStatus.innerHTML = this.data.user.aadhaarVerified 
                ? '<span class="status status--success">Verified</span>' 
                : '<span class="status status--error">Not Verified</span>';
        }

        if (faceStatus) {
            faceStatus.innerHTML = this.data.user.faceVerified 
                ? '<span class="status status--success">Verified</span>' 
                : '<span class="status status--error">Not Verified</span>';
        }

        // Render emergency contacts
        this.renderEmergencyContacts();

        // Render frequent routes
        this.renderFrequentRoutes();
    }

    renderEmergencyContacts() {
        const container = document.getElementById('emergencyContactsList');
        if (!container) return;
        
        container.innerHTML = '';

        this.data.user.emergencyContacts.forEach(contact => {
            const contactElement = document.createElement('div');
            contactElement.className = 'contact-item';
            contactElement.innerHTML = `
                <div class="contact-info">
                    <div class="contact-name">${contact.name}</div>
                    <div class="contact-phone">${contact.phone}</div>
                </div>
                <button class="btn btn--sm btn--outline" onclick="app.removeContact('${contact.phone}')" ${contact.phone === '112' ? 'disabled title="Cannot remove emergency services"' : ''}>
                    <i class="fas fa-trash"></i>
                </button>
            `;
            container.appendChild(contactElement);
        });
    }

    renderFrequentRoutes() {
        const container = document.getElementById('frequentRoutes');
        if (!container) return;
        
        container.innerHTML = '';

        this.data.user.frequentRoutes.forEach(routeId => {
            const route = this.data.routes.find(r => r.id === routeId);
            if (route) {
                const routeElement = document.createElement('div');
                routeElement.className = 'frequent-route';
                routeElement.innerHTML = `
                    <div class="frequent-route-name">${route.name}</div>
                    <div class="frequent-route-usage">Used 15 times this month</div>
                `;
                container.appendChild(routeElement);
            }
        });
    }

    renderRoutes() {
        const container = document.getElementById('routesList');
        if (!container) return;
        
        container.innerHTML = '';

        this.data.routes.forEach(route => {
            const routeElement = document.createElement('div');
            routeElement.className = 'card route-card';
            routeElement.style.borderLeftColor = route.color;
            
            routeElement.innerHTML = `
                <div class="card__body">
                    <div class="route-header" onclick="app.toggleRouteDetails('${route.id}')">
                        <div class="route-info">
                            <div class="route-name">${route.name}</div>
                            <div class="route-id">${route.id}</div>
                        </div>
                        <button class="route-toggle">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                    <div class="route-details hidden" id="route-details-${route.id}">
                        <div class="route-stops-list">
                            ${route.stops.map(stop => `
                                <div class="route-stop">
                                    <div class="stop-marker" style="background: ${route.color};"></div>
                                    <div class="stop-info">
                                        <div class="stop-name">${stop.name}</div>
                                        <div class="stop-arrivals">
                                            ${stop.arrivals.map(time => `<span class="arrival-time">${time}</span>`).join('')}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <button class="btn btn--primary btn--sm mt-8" onclick="app.selectRoute('${route.id}')">
                            View on Map
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(routeElement);
        });
    }

    toggleRouteDetails(routeId) {
        const details = document.getElementById(`route-details-${routeId}`);
        if (!details) return;
        
        const toggle = details.previousElementSibling.querySelector('.route-toggle i');
        
        details.classList.toggle('hidden');
        if (toggle) {
            toggle.classList.toggle('fa-chevron-down');
            toggle.classList.toggle('fa-chevron-up');
        }
    }

    selectRoute(routeId) {
        this.state.selectedRoute = routeId;
        const trackingFilter = document.getElementById('trackingRouteFilter');
        if (trackingFilter) {
            trackingFilter.value = routeId;
        }
        this.showView('tracking');
        setTimeout(() => this.updateTrackingMap(), 100);
    }

    renderPOIs() {
        this.filterPOIs('');
    }

    filterPOIs(type) {
        this.state.selectedPOIType = type;
        
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-type="${type}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Filter and render POIs
        const container = document.getElementById('poisList');
        if (!container) return;
        
        container.innerHTML = '';

        let filteredPOIs = this.data.pois;
        if (type) {
            filteredPOIs = this.data.pois.filter(poi => poi.type === type);
        }

        filteredPOIs.forEach(poi => {
            const poiElement = document.createElement('div');
            poiElement.className = 'card poi-card';
            
            const iconMap = {
                'Tourist Attraction': 'camera',
                'Shopping Mall': 'shopping-bag',
                'Monument': 'landmark',
                'Restaurant': 'utensils'
            };

            poiElement.innerHTML = `
                <div class="poi-icon">
                    <i class="fas fa-${iconMap[poi.type] || 'map-marker'}"></i>
                </div>
                <div class="poi-content">
                    <div class="poi-header">
                        <div>
                            <div class="poi-name">${poi.name}</div>
                            <div class="poi-type">${poi.type}</div>
                        </div>
                        <div class="poi-rating">
                            <span class="rating-stars">★</span>
                            <span>${poi.rating}</span>
                        </div>
                    </div>
                    <div class="poi-description">${poi.description}</div>
                    <div class="poi-footer">
                        <div class="poi-distance">${poi.distance}</div>
                        <button class="btn btn--sm btn--primary" onclick="app.getDirections('${poi.id}')">
                            Get Directions
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(poiElement);
        });
    }

    getDirections(poiId) {
        const poi = this.data.pois.find(p => p.id === poiId);
        if (poi) {
            const routes = poi.routeIds.map(id => this.data.routes.find(r => r.id === id));
            this.showNotification(`To reach ${poi.name}, take route: ${routes.map(r => r.name).join(' or ')}`, 'info');
        }
    }

    updateGeofenceRadius(value) {
        const radiusValue = document.getElementById('radiusValue');
        if (radiusValue) {
            radiusValue.textContent = `${value}m`;
        }
        this.data.user.geofenceRadius = parseInt(value);
        
        // Update geofence visualization if tracking map is active
        if (this.state.currentView === 'tracking') {
            this.updateTrackingMap();
        }
    }

    searchRoutes(query) {
        const routes = document.querySelectorAll('.route-card');
        query = query.toLowerCase();

        routes.forEach(routeCard => {
            const routeName = routeCard.querySelector('.route-name')?.textContent?.toLowerCase() || '';
            const routeId = routeCard.querySelector('.route-id')?.textContent?.toLowerCase() || '';
            const stops = Array.from(routeCard.querySelectorAll('.stop-name')).map(el => el.textContent.toLowerCase());

            const matches = routeName.includes(query) || 
                          routeId.includes(query) || 
                          stops.some(stop => stop.includes(query));

            routeCard.style.display = matches ? 'block' : 'none';
        });
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    filterDashboardContent() {
        this.updateDashboardMap();
    }

    filterTrackingMap() {
        this.updateTrackingMap();
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays}d ago`;
    }

    editContact(phone) {
        this.showNotification(`Edit contact functionality would open here for ${phone}`, 'info');
    }

    checkLoginStatus() {
        const userData = localStorage.getItem('smartCityBusUser');
        if (userData) {
            const user = JSON.parse(userData);
            this.data.user = { 
                ...this.data.user, 
                ...user, 
                isLoggedIn: true,
                emergencyContacts: user.emergencyContacts || [
                    {"name": "Emergency Services", "phone": "112", "relation": "Police"}
                ]
            };
            this.renderProfile();
        } else {
            this.showLoginModal();
        }
    }

    showLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    handleLogin() {
        const name = document.getElementById('loginName').value.trim();
        const phone = document.getElementById('loginPhone').value.trim();
        
        if (name && phone) {
            const userData = {
                id: 'user_' + Date.now(),
                name: name,
                phone: phone,
                isLoggedIn: true,
                emergencyContacts: [
                    {"name": "Emergency Services", "phone": "112", "relation": "Police"}
                ],
                frequentRoutes: [],
                geofenceRadius: 200,
                notificationsEnabled: true
            };
            
            localStorage.setItem('smartCityBusUser', JSON.stringify(userData));
            this.data.user = { ...this.data.user, ...userData };
            
            this.hideModal('loginModal');
            this.renderProfile();
            this.showNotification(`Welcome ${name}!`, 'success');
        }
    }

    handleLogout() {
        localStorage.removeItem('smartCityBusUser');
        this.data.user = {
            id: null,
            name: null,
            phone: null,
            isLoggedIn: false,
            aadhaarVerified: false,
            faceVerified: false,
            emergencyContacts: [
                {"name": "Emergency Services", "phone": "112", "relation": "Police"}
            ],
            frequentRoutes: [],
            geofenceRadius: 200,
            notificationsEnabled: true
        };
        this.renderProfile();
        this.showLoginModal();
        this.showNotification('Logged out successfully', 'info');
    }

    showAddContactModal() {
        if (!this.data.user.isLoggedIn) {
            this.showNotification('Please login to add emergency contacts', 'error');
            return;
        }
        const modal = document.getElementById('addContactModal');
        if (modal) {
            modal.classList.remove('hidden');
            // Clear form
            document.getElementById('addContactForm').reset();
        }
    }

    handleAddContact() {
        const name = document.getElementById('contactName').value.trim();
        const phone = document.getElementById('contactPhone').value.trim();
        const relation = document.getElementById('contactRelation').value;
        
        if (name && phone && relation) {
            const newContact = {
                name: name,
                phone: phone,
                relation: relation
            };
            
            this.data.user.emergencyContacts.push(newContact);
            this.saveUserData();
            this.renderEmergencyContacts();
            this.hideModal('addContactModal');
            this.showNotification('Emergency contact added successfully', 'success');
        }
    }

    removeContact(phone) {
        if (phone === '112') {
            this.showNotification('Cannot remove emergency services contact', 'error');
            return;
        }
        
        this.data.user.emergencyContacts = this.data.user.emergencyContacts.filter(
            contact => contact.phone !== phone
        );
        this.saveUserData();
        this.renderEmergencyContacts();
        this.showNotification('Emergency contact removed', 'info');
    }

    saveUserData() {
        if (this.data.user.isLoggedIn) {
            localStorage.setItem('smartCityBusUser', JSON.stringify({
                id: this.data.user.id,
                name: this.data.user.name,
                phone: this.data.user.phone,
                emergencyContacts: this.data.user.emergencyContacts,
                frequentRoutes: this.data.user.frequentRoutes,
                geofenceRadius: this.data.user.geofenceRadius,
                notificationsEnabled: this.data.user.notificationsEnabled
            }));
        }
    }
}

// Initialize the application when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new SmartCityBusApp();
    
    // Make app globally available for onclick handlers
    window.app = app;
});