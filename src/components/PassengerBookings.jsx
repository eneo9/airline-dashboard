import { useState } from "react";
import { getPassengerBookings } from "../api";

export default function PassengerBookings() {
  const [passengerId, setPassengerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getPassengerBookings(passengerId.trim());
      setBookings(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 12, marginBottom: 16 }}>
      <h2>Passenger Bookings</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input placeholder="Passenger _id (ObjectId)" value={passengerId} onChange={e => setPassengerId(e.target.value)} />
        <button onClick={fetchBookings} disabled={loading || !passengerId}>
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>
      {error && <div style={{ color: "crimson" }}>{error}</div>}
      <ul>
        {bookings.map((b, idx) => (
          <li key={idx}>
            <strong>{b.flightNo}</strong> — {b.origin} → {b.destination} — Seat {b.seat} — ${b.ticketInfo?.price}
          </li>
        ))}
        {!loading && bookings.length === 0 && <i>No bookings loaded</i>}
      </ul>
    </div>
  );
}
