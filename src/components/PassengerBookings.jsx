import { useEffect, useState } from "react";
import { getPassengerBookings, getDemoPassengers } from "../api";

export default function PassengerBookings() {
  const [passengerId, setPassengerId] = useState("");
  const [passengers, setPassengers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load demo passengers on first render
  useEffect(() => {
    async function loadPassengers() {
      try {
        const data = await getDemoPassengers();
        setPassengers(data);
      } catch (e) {
        console.error(e);
        setError("Could not load passengers.");
      }
    }

    loadPassengers();
  }, []);

  async function handleFetch() {
    if (!passengerId) {
      setError("Please select a passenger.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await getPassengerBookings(passengerId);
      setBookings(data);
    } catch (e) {
      console.error(e);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>Passenger Bookings</h2>

      <label className="label">
        Select passenger:
        <select
          className="input"
          value={passengerId}
          onChange={(e) => setPassengerId(e.target.value)}
        >
          <option value="">-- choose --</option>
          {passengers.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>

      <button className="button" onClick={handleFetch} disabled={loading}>
        {loading ? "Loading..." : "Fetch bookings"}
      </button>

      {error && <p className="error">{error}</p>}

      <ul className="list">
        {bookings.map((b) => (
          <li key={b._id} className="list-item">
            Flight {b.flightNo || b.flightNumber} — {b.origin} → {b.destination} — Seat {b.seat}
          </li>
        ))}
      </ul>
    </div>
  );
}
