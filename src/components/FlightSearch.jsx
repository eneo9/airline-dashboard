import { useEffect, useState } from "react";
import { getFlights, getFlightMeta } from "../api";

export default function FlightSearch() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [meta, setMeta] = useState({ origins: [], destinations: [] });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load origins/destinations for dropdowns
  useEffect(() => {
    async function loadMeta() {
      try {
        const data = await getFlightMeta();
        setMeta(data);
      } catch (e) {
        console.error(e);
        setError("Could not load airports.");
      }
    }

    loadMeta();
  }, []);

  async function handleSearch() {
    if (!origin || !destination) {
      setError("Please select both origin and destination.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await getFlights(origin, destination);
      setFlights(data);
    } catch (e) {
      console.error(e);
      setError("Failed to search flights.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>Search Flights</h2>

      <label className="label">
        Origin:
        <select
          className="input"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        >
          <option value="">-- choose origin --</option>
          {meta.origins
            .sort()
            .map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
        </select>
      </label>

      <label className="label">
        Destination:
        <select
          className="input"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          <option value="">-- choose destination --</option>
          {meta.destinations
            .sort()
            .map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
        </select>
      </label>

      <button className="button" onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p className="error">{error}</p>}

      <ul className="list">
        {flights.map((f) => (
          <li key={f._id} className="list-item">
            Flight {f.flightNo || f.flightNumber} — {f.origin} → {f.destination} —{" "}
            {new Date(f.departureTime).toLocaleString()} to{" "}
            {new Date(f.arrivalTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
