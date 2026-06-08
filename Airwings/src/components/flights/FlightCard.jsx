import React from 'react';
import { Clock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const FlightCard = ({ flight, onBook }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div className="flex-1 min-w-[250px]">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-indigo-600 font-bold text-lg">{flight.id}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold">Aircraft:</span> {flight.aircraft}
            </div>
            <div>
              <span className="font-semibold">Distance:</span> {flight.distance} miles
            </div>
            <div>
              <span className="font-semibold">{flight.class}</span>
            </div>
            <div>
              <span className="font-semibold">Crew:</span> {flight.crew}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-4 mb-2">
            <div className="text-2xl font-bold text-gray-800">{flight.departure}</div>
            <div className="text-gray-400">→</div>
            <div className="text-2xl font-bold text-gray-800">{flight.arrival}</div>
          </div>
          
          <div className="flex items-center gap-2 text-sm mb-2 justify-end">
            <Clock size={16} className="text-gray-500" />
            <span className="text-gray-600">{flight.duration}</span>
            <span className="text-green-600 font-semibold ml-2">• {flight.status}</span>
          </div>
          
          <div className="text-indigo-600 font-bold text-2xl mb-3">
            ${flight.price}
          </div>
          
          <button
            onClick={() => onBook(flight)}
            disabled={!user}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              user
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {user ? 'Login to Book' : 'Login to Book'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;