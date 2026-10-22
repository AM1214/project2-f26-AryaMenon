import { Link } from "react-router-dom";

const lines = [
  { name: "Blue", color: "blue" },
  { name: "Gold", color: "gold" },
  { name: "Red", color: "red" },
  { name: "Green", color: "green" },
];

export default function Home() {
  return (
    <main className="info-page">
      <header className="hero">
        <p className="eyebrow">ATLANTA TRANSIT</p>
        <h1>MARTA Train Tracker</h1>
        <p>
          Find your line, explore stations, and check upcoming train
          arrivals in one place.
        </p>
      </header>

      <section className="info-section">
        <h2>Choose Your Line</h2>
        <p>Select a line to view arrivals and filter trains.</p>

        <div className="line-grid">
          {lines.map((line) => (
            <Link
              key={line.color}
              to={`/lines/${line.color}`}
              className={`line-card line-${line.color}`}
            >
              <span>{line.name} Line</span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="info-section about-preview">
        <h2>Learn About MARTA</h2>
        <p>
          Explore the rail network and learn more about Atlanta's
          public transportation system.
        </p>
        <Link to="/about" className="primary-link">
          About MARTA →
        </Link>
      </section>
    </main>
  );
}