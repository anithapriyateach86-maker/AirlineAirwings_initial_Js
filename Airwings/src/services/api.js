import { mockFlights } from '../utils/mockData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Authentication
  login: async (email, password) => {
    await delay(1000);
    
    if (email === 'admin@airways.com' && password === 'admin123') {
      return {
        email,
        name: 'Admin User',
        role: 'admin',
        id: 'admin_001'
      };
    } else if (email && password.length >= 6) {
      return {
        email,
        name: 'Passenger User',
        role: 'passenger',
        id: `user_${Date.now()}`
      };
    }
    
    throw new Error('Invalid email or password');
  },
  
  register: async (userData) => {
    await delay(1000);
    
    // Basic validation
    if (!userData.email || !userData.name) {
      throw new Error('Missing required fields');
    }
    
    return {
      ...userData,
      role: 'passenger',
      id: `user_${Date.now()}`
    };
  },
  
  // Flight operations
  searchFlights: async (filters = {}) => {
    await delay(800);
    
    let results = [...mockFlights];
    
    // Apply filters
    if (filters.from) {
      results = results.filter(f => 
        f.from.toLowerCase().includes(filters.from.toLowerCase())
      );
    }
    
    if (filters.to) {
      results = results.filter(f => 
        f.to.toLowerCase().includes(filters.to.toLowerCase())
      );
    }
    
    if (filters.maxPrice) {
      results = results.filter(f => f.price <= parseFloat(filters.maxPrice));
    }
    
    if (filters.date) {
      // In real app, filter by date
    }
    
    return results;
  },
  
  getFlightById: async (flightId) => {
    await delay(500);
    const flight = mockFlights.find(f => f.id === flightId);
    
    if (!flight) {
      throw new Error('Flight not found');
    }
    
    return flight;
  },
  
  bookFlight: async (flightId, userId) => {
    await delay(1000);
    
    return {
      bookingId: `BK${Date.now()}`,
      flightId,
      userId,
      status: 'confirmed',
      bookingDate: new Date().toISOString()
    };
  }
};