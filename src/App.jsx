import FlightSearch from "./components/FlightSearch";
import PassengerBookings from "./components/PassengerBookings";
import BusiestRoutes from "./components/BusiestRoutes";

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24, fontFamily: "Inter, Arial, sans-serif" }}>
      <h1>Airline Operations Dashboard</h1>
      <p style={{ color: "#555" }}>
        Backed by MongoDB Atlas + Express API. Try searching flights, fetching passenger bookings, and viewing busiest routes.
      </p>
      <FlightSearch />
      <PassengerBookings />
      <BusiestRoutes />
      <footer style={{ marginTop: 24, fontSize: 12, color: "#777" }}>
        Built for portfolio demo — update API_BASE in <code>src/api.js</code> when you deploy the API.
      </footer>
    </div>
  );
}
