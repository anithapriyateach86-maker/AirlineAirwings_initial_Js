export const mockFlights = [
  {
    id: 'AA101',
    from: 'NYC',
    to: 'LHR',
    departure: '06:30 AM',
    arrival: '01:15 PM',
    duration: '6h 45m',
    aircraft: 'Airbus A320',
    distance: 3461,
    crew: 'John Smith',
    price: 499.99,
    class: 'Economy',
    status: 'Nonstop'
  },
  {
    id: 'AA205',
    from: 'NYC',
    to: 'LHR',
    departure: '10:15 AM',
    arrival: '05:00 PM',
    duration: '6h 45m',
    aircraft: 'Boeing 737',
    distance: 3461,
    crew: 'Mike Davis',
    price: 549.99,
    class: 'Economy',
    status: 'Nonstop'
  },
  {
    id: 'AA309',
    from: 'NYC',
    to: 'LHR',
    departure: '02:00 PM',
    arrival: '08:45 PM',
    duration: '6h 45m',
    aircraft: 'Airbus A321',
    distance: 3461,
    crew: 'Robert Wilson',
    price: 479.99,
    class: 'Economy',
    status: 'Nonstop'
  },
  {
    id: 'AA412',
    from: 'NYC',
    to: 'LHR',
    departure: '06:45 PM',
    arrival: '01:30 AM',
    duration: '6h 45m',
    aircraft: 'Boeing 737-800',
    distance: 3461,
    crew: 'David Miller',
    price: 529.99,
    class: 'Economy',
    status: 'Nonstop'
  }
];

export const airports = [
  { code: 'NYC', name: 'New York City', city: 'New York' },
  { code: 'LHR', name: 'London Heathrow', city: 'London' },
  { code: 'LAX', name: 'Los Angeles', city: 'Los Angeles' },
  { code: 'DXB', name: 'Dubai International', city: 'Dubai' },
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapore' }
];