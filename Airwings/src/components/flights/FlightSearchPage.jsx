import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAsync } from '../../hooks/useAsync';
import { api } from '../../services/api';
import FlightCard from './FlightCard';
import { Search, MapPin, Calendar, DollarSign, Plane, Filter } from 'lucide-react';

const FlightSearchPage = ({ onLoginClick }) => {
  const [filters, setFilters] = useState({
    from: 'NYC',
    to: 'LHR',
    date: '2025-10-01',
    maxPrice: '',
    airline: ''
  });
  
  const [searchParams, setSearchParams] = useState({
    from: 'NYC',
    to: 'LHR',
    date: 'Wednesday, October 1, 2025'
  });
  
  const [flights, setFlights] = useState([]);
  const { execute, loading } = useAsync(api.searchFlights);
  const { user } = useAuth();

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      const results = await execute(filters);
      setFlights(results);
      
      // Update search params for display
      setSearchParams({
        from: filters.from,
        to: filters.to,
        date: formatDate(filters.date)
      });
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBook = (flight) => {
    if (!user) {
      onLoginClick();
    } else {
      alert(`Booking initiated for flight ${flight.id}\nPrice: $${flight.price}\nStatus: Pending confirmation`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const clearFilters = () => {
    setFilters({
      from: 'NYC',
      to: 'LHR',
      date: '2025-10-01',
      maxPrice: '',
      airline: ''
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Plane className="text-indigo-600" />
          Search Flights
        </h1>
        
        {/* Search Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Filter size={24} className="text-indigo-600" />
            Flight Filters
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* From Airport */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-1 text-indigo-600" />
                From (Source)
              </label>
              <input
                type="text"
                name="from"
                value={filters.from}
                onChange={handleInputChange}
                placeholder="e.g., NYC, LAX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            {/* To Airport */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-1 text-indigo-600" />
                To (Destination)
              </label>
              <input
                type="text"
                name="to"
                value={filters.to}
                onChange={handleInputChange}
                placeholder="e.g., LHR, DXB"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1 text-indigo-600" />
                Travel Date
              </label>
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign size={16} className="inline mr-1 text-indigo-600" />
                Max Price (USD)
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
                placeholder="e.g., 500"
                min="0"
                step="50"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            {/* Airline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Plane size={16} className="inline mr-1 text-indigo-600" />
                Airline / Aircraft
              </label>
              <input
                type="text"
                name="airline"
                value={filters.airline}
                onChange={handleInputChange}
                placeholder="e.g., Boeing, Airbus"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            {/* Buttons */}
            <div className="flex items-end gap-2">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="flex-1 bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <Search size={20} />
                {loading ? 'Searching...' : 'Search'}
              </button>
              
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                title="Clear Filters"
              >
                Clear
              </button>
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(filters.from || filters.to || filters.maxPrice || filters.airline) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                {filters.from && (
                  <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                    From: {filters.from}
                  </span>
                )}
                {filters.to && (
                  <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                    To: {filters.to}
                  </span>
                )}
                {filters.maxPrice && (
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    Max: ${filters.maxPrice}
                  </span>
                )}
                {filters.airline && (
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    Airline: {filters.airline}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Current Search Display */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Current Search</h3>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-xl font-bold text-gray-800">{searchParams.from}</span>
            <span className="text-gray-400 text-2xl">→</span>
            <span className="text-xl font-bold text-gray-800">{searchParams.to}</span>
          </div>
          <div className="text-gray-600">
            <span className="font-semibold">Date:</span> {searchParams.date}
          </div>
        </div>
        
        {/* Results Section */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Searching flights...</p>
          </div>
        ) : flights.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Available Flights ({flights.length})
              </h2>
              <div className="text-sm text-gray-600">
                Showing {flights.length} {flights.length === 1 ? 'flight' : 'flights'}
              </div>
            </div>
            {flights.map(flight => (
              <FlightCard key={flight.id} flight={flight} onBook={handleBook} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Search size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">No flights found matching your criteria.</p>
            <p className="text-gray-500 text-sm mb-4">Try adjusting your search filters.</p>
            <button
              onClick={clearFilters}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearchPage;