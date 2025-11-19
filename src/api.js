const API_BASE = "https://airline-api-0yq5.onrender.com/api";
// change to your deployed URL later

export async function getFlights(origin, destination) {
  const res = await fetch(`${API_BASE}/flights?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
  return res.json();
}

export async function getPassengerBookings(passengerId) {
  const res = await fetch(`${API_BASE}/passengers/${passengerId}/bookings`);
  return res.json();
}

export async function getBusiestRoutes() {
  const res = await fetch(`${API_BASE}/analytics/busiest-routes`);
  return res.json();
}
