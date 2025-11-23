import FlightSearch from "./components/FlightSearch";
import PassengerBookings from "./components/PassengerBookings";
import BusiestRoutes from "./components/BusiestRoutes";

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Airline Operations Dashboard</h1>
        <p className="app-subtitle">
          Flights, passenger bookings, and route analytics on top of MongoDB Atlas and an Express API.
        </p>
      </header>

      <div className="card-grid">
        <FlightSearch />
        <PassengerBookings />
        <BusiestRoutes />
      </div>

      <footer className="app-footer">
        API: https://airline-api-0yq5.onrender.com/api &nbsp;·&nbsp; Frontend: Vercel (React + Vite)
      </footer>
    </div>
  );
}
