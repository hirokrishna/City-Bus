// Bus movement simulation system
class BusSimulation {
    constructor(routes, buses) {
        this.routes = routes;
        this.buses = buses;
        this.isRunning = false;
        this.simulationSpeed = 1; // 1x speed
        this.updateInterval = 2000; // 2 seconds
        this.intervalId = null;
        this.routePaths = new Map();
        
        // Initialize route paths
        this.initializeRoutePaths();
    }

    initializeRoutePaths() {
        this.routes.forEach(route => {
            const path = this.generateRoutePath(route.stops);
            this.routePaths.set(route.id, path);
            
            // Initialize bus positions on their routes
            const routeBuses = this.buses.filter(bus => bus.routeId === route.id);
            routeBuses.forEach((bus, index) => {
                const progress = (index / routeBuses.length) * path.length;
                const position = this.getPositionOnPath(path, progress);
                bus.lat = position.lat;
                bus.lng = position.lng;
                bus.routeProgress = progress;
                bus.direction = 1; // 1 for forward, -1 for backward
            });
        });
    }

    generateRoutePath(stops) {
        const path = [];
        
        for (let i = 0; i < stops.length - 1; i++) {
            const start = stops[i];
            const end = stops[i + 1];
            
            // Generate intermediate points between stops
            const segments = this.interpolatePoints(start, end, 20);
            path.push(...segments);
        }
        
        return path;
    }

    interpolatePoints(start, end, numPoints) {
        const points = [];
        
        for (let i = 0; i <= numPoints; i++) {
            const ratio = i / numPoints;
            const lat = start.lat + (end.lat - start.lat) * ratio;
            const lng = start.lng + (end.lng - start.lng) * ratio;
            
            // Add some realistic curve to the path
            const curve = Math.sin(ratio * Math.PI) * 0.0005;
            
            points.push({
                lat: lat + curve,
                lng: lng + curve * 0.5,
                stopId: ratio < 0.5 ? start.id : end.id
            });
        }
        
        return points;
    }

    getPositionOnPath(path, progress) {
        if (path.length === 0) return { lat: 0, lng: 0 };
        
        const index = Math.floor(progress) % path.length;
        const nextIndex = (index + 1) % path.length;
        const fraction = progress - Math.floor(progress);
        
        const current = path[index];
        const next = path[nextIndex];
        
        return {
            lat: current.lat + (next.lat - current.lat) * fraction,
            lng: current.lng + (next.lng - current.lng) * fraction,
            stopId: current.stopId
        };
    }

    updateBusPositions() {
        this.buses.forEach(bus => {
            const route = this.routes.find(r => r.id === bus.routeId);
            if (!route) return;
            
            const path = this.routePaths.get(route.id);
            if (!path) return;
            
            // Move bus along the route
            const moveSpeed = 0.5 * this.simulationSpeed; // Adjust speed
            bus.routeProgress += moveSpeed * bus.direction;
            
            // Handle route boundaries (reverse direction at ends)
            if (bus.routeProgress >= path.length - 1) {
                bus.routeProgress = path.length - 1;
                bus.direction = -1;
            } else if (bus.routeProgress <= 0) {
                bus.routeProgress = 0;
                bus.direction = 1;
            }
            
            // Update position
            const position = this.getPositionOnPath(path, bus.routeProgress);
            bus.lat = position.lat;
            bus.lng = position.lng;
            
            // Update heading based on movement direction
            this.updateBusHeading(bus, path);
            
            // Update next stop
            this.updateNextStop(bus, route, position);
            
            // Simulate occupancy changes
            this.updateOccupancy(bus);
        });
    }

    updateBusHeading(bus, path) {
        const currentIndex = Math.floor(bus.routeProgress);
        const nextIndex = Math.min(currentIndex + 1, path.length - 1);
        
        if (currentIndex !== nextIndex) {
            const current = path[currentIndex];
            const next = path[nextIndex];
            
            const deltaLat = next.lat - current.lat;
            const deltaLng = next.lng - current.lng;
            
            // Calculate heading in degrees
            let heading = Math.atan2(deltaLng, deltaLat) * (180 / Math.PI);
            if (bus.direction === -1) {
                heading = (heading + 180) % 360;
            }
            
            bus.heading = heading;
        }
    }

    updateNextStop(bus, route, position) {
        // Find the nearest upcoming stop
        const currentStopId = position.stopId;
        const currentStopIndex = route.stops.findIndex(stop => stop.id === currentStopId);
        
        if (currentStopIndex !== -1) {
            let nextStopIndex;
            if (bus.direction === 1) {
                nextStopIndex = (currentStopIndex + 1) % route.stops.length;
            } else {
                nextStopIndex = currentStopIndex === 0 ? route.stops.length - 1 : currentStopIndex - 1;
            }
            
            bus.nextStop = route.stops[nextStopIndex].name;
        }
    }

    updateOccupancy(bus) {
        // Simulate realistic occupancy changes
        const random = Math.random();
        
        if (random < 0.05) { // 5% chance to change occupancy
            const occupancyLevels = ['Low', 'Medium', 'High'];
            const currentIndex = occupancyLevels.indexOf(bus.occupancy);
            
            // Bias towards medium occupancy
            if (random < 0.02) {
                bus.occupancy = occupancyLevels[(currentIndex + 1) % occupancyLevels.length];
            } else if (random < 0.04) {
                bus.occupancy = occupancyLevels[currentIndex === 0 ? occupancyLevels.length - 1 : currentIndex - 1];
            }
        }
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.updateBusPositions();
            
            // Dispatch custom event for map updates
            window.dispatchEvent(new CustomEvent('busPositionsUpdated', {
                detail: { buses: this.buses }
            }));
        }, this.updateInterval);
        
        console.log('Bus simulation started');
    }

    pause() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        
        console.log('Bus simulation paused');
    }

    resume() {
        if (this.isRunning) return;
        this.start();
    }

    setSpeed(speed) {
        this.simulationSpeed = Math.max(0.1, Math.min(5, speed)); // Clamp between 0.1x and 5x
        console.log(`Simulation speed set to ${this.simulationSpeed}x`);
    }

    getBusById(busId) {
        return this.buses.find(bus => bus.id === busId);
    }

    getBusesByRoute(routeId) {
        return this.buses.filter(bus => bus.routeId === routeId);
    }

    // Get estimated arrival times for a stop
    getArrivalTimes(stopId) {
        const arrivals = [];
        
        this.buses.forEach(bus => {
            const route = this.routes.find(r => r.id === bus.routeId);
            if (!route) return;
            
            const stop = route.stops.find(s => s.id === stopId);
            if (!stop) return;
            
            // Calculate estimated arrival time based on current position and speed
            const estimatedMinutes = this.calculateArrivalTime(bus, route, stop);
            if (estimatedMinutes > 0 && estimatedMinutes < 60) {
                arrivals.push({
                    busId: bus.id,
                    routeId: bus.routeId,
                    estimatedMinutes: Math.round(estimatedMinutes),
                    occupancy: bus.occupancy
                });
            }
        });
        
        // Sort by arrival time
        arrivals.sort((a, b) => a.estimatedMinutes - b.estimatedMinutes);
        
        return arrivals.slice(0, 3); // Return next 3 arrivals
    }

    calculateArrivalTime(bus, route, targetStop) {
        const path = this.routePaths.get(route.id);
        if (!path) return -1;
        
        const targetStopIndex = route.stops.findIndex(s => s.id === targetStop.id);
        if (targetStopIndex === -1) return -1;
        
        // Find the path index for the target stop
        let targetPathIndex = -1;
        for (let i = 0; i < path.length; i++) {
            if (path[i].stopId === targetStop.id) {
                targetPathIndex = i;
                break;
            }
        }
        
        if (targetPathIndex === -1) return -1;
        
        // Calculate distance to target stop
        let distance;
        if (bus.direction === 1) {
            distance = targetPathIndex - bus.routeProgress;
            if (distance < 0) {
                distance += path.length; // Bus needs to complete the loop
            }
        } else {
            distance = bus.routeProgress - targetPathIndex;
            if (distance < 0) {
                distance += path.length; // Bus needs to complete the loop
            }
        }
        
        // Convert distance to time (assuming average speed)
        const averageSpeed = 0.5; // path units per update
        const updatesPerMinute = 60000 / this.updateInterval;
        const estimatedMinutes = distance / (averageSpeed * updatesPerMinute);
        
        return estimatedMinutes;
    }

    // Generate realistic fake telemetry data
    generateTelemetryData(bus) {
        return {
            busId: bus.id,
            timestamp: Date.now(),
            position: {
                lat: bus.lat,
                lng: bus.lng,
                heading: bus.heading
            },
            speed: 25 + Math.random() * 15, // 25-40 km/h
            occupancy: bus.occupancy,
            nextStop: bus.nextStop,
            fuel: 65 + Math.random() * 30, // 65-95%
            engineTemp: 85 + Math.random() * 10, // 85-95°C
            doorStatus: Math.random() < 0.1 ? 'open' : 'closed',
            route: bus.routeId
        };
    }
}

// Export for use in main app
window.BusSimulation = BusSimulation;