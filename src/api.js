const API_BASE = "https://airline-api-0yq5.onrender.com/api";

// Flights search
export async function getFlights(origin, destination) {
  const res = await fetch(
    `${API_BASE}/flights?origin=${encodeURIComponent(
      origin
    )}&destination=${encodeURIComponent(destination)}`
  );
  return res.json();
}

// Passenger bookings
export async function getPassengerBookings(passengerId) {
  const res = await fetch(`${API_BASE}/passengers/${passengerId}/bookings`);
  return res.json();
}

// Busiest routes
export async function getBusiestRoutes() {
  const res = await fetch(`${API_BASE}/analytics/busiest-routes`);
  return res.json();
}

// Demo passengers for dropdown
export async function getDemoPassengers() {
  const res = await fetch(`${API_BASE}/passengers/demo`);
  return res.json();
}

// Flight metadata (origins/destinations) for dropdowns
export async function getFlightMeta() {
  const res = await fetch(`${API_BASE}/flights/meta`);
  if (!res.ok) {
    throw new Error("Failed to load flight metadata");
  }
  return res.json();
}
