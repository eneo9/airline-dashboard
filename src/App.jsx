import FlightSearch from "./components/FlightSearch";
import PassengerBookings from "./components/PassengerBookings";
import BusiestRoutes from "./components/BusiestRoutes";

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Airline Operations Dashboard</h1>
        <p className="app-subtitle">
          Shows flights, passenger bookings, and route insights using data stored in MongoDB Atlas.
        </p>
      </header>

      <div className="card-grid">
        <FlightSearch />
        <PassengerBookings />
        <BusiestRoutes />
      </div>

      <footer className="app-footer">
        Built with Node.js, MongoDB and React
      </footer>
    </div>
  );
}
