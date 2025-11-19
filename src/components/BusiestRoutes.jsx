import { useEffect, useState } from "react";
import { getBusiestRoutes } from "../api";

export default function BusiestRoutes() {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getBusiestRoutes();
        setRoutes(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "Failed to load analytics");
      }
    })();
  }, []);

  return (
    <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
      <h2>Top 5 Busiest Routes</h2>
      {error && <div style={{ color: "crimson" }}>{error}</div>}
      <ol>
        {routes.map(r => (
          <li key={`${r._id?.origin}-${r._id?.destination}`}>
            {r._id?.origin} → {r._id?.destination} — Bookings: {r.totalBookings}
          </li>
        ))}
        {routes.length === 0 && <i>No data yet</i>}
      </ol>
    </div>
  );
}
