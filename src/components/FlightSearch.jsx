import { useState } from "react";
import { getFlights } from "../api";

export default function FlightSearch() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");

  const searchFlights = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getFlights(origin.trim().toUpperCase(), destination.trim().toUpperCase());
      setFlights(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load flights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 12, marginBottom: 16 }}>
      <h2>Search Flights</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input placeholder="Origin (e.g. JFK)" value={origin} onChange={e => setOrigin(e.target.value)} />
        <input placeholder="Destination (e.g. LAX)" value={destination} onChange={e => setDestination(e.target.value)} />
        <button onClick={searchFlights} disabled={loading || !origin || !destination}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && <div style={{ color: "crimson" }}>{error}</div>}
      <ul>
        {flights.map(f => (
          <li key={f._id}>
            <strong>{f.flightNo}</strong> — {f.origin} → {f.destination} — ${f.price} —{" "}
            {f.departureTime ? new Date(f.departureTime).toLocaleString() : ""}
          </li>
        ))}
        {!loading && flights.length === 0 && <i>No results yet</i>}
      </ul>
    </div>
  );
}
