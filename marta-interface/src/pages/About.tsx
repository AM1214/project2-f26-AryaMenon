import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="info-page">
      <header className="hero">
        <p className="eyebrow">ABOUT THE NETWORK</p>
        <h1>About MARTA</h1>
        <p>
          Discover Atlanta's rail network and use the train tracker
          to explore arrivals across four rail lines.
        </p>
      </header>

      <section className="info-section">
        <h2>Explore the Rail Map</h2>
        <p>
          The map shows the rail lines and their stations, including
          connections at major transfer stations.
        </p>

        <div className="map-container">
          <iframe
            title="Official MARTA rail map"
            src="https://www.itsmarta.com/uploadedFiles/Plan_a_Trip/marta-rail-map-20101.pdf"
            loading="lazy"
          />
        </div>

        <a
          className="primary-link"
          href="https://www.itsmarta.com/uploadedFiles/Plan_a_Trip/marta-rail-map-20101.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Open Rail Map in a New Tab →
        </a>
      </section>

      <section className="info-section">
        <h2>About This Application</h2>
        <p>
          This application retrieves train arrival and station data
          from the MARTA bootcamp API. You can select a line, choose
          a station, and filter trains by arrival status and direction.
        </p>

        <a
          className="primary-link"
          href="https://www.itsmarta.com/"
          target="_blank"
          rel="noreferrer"
        >
          Visit Official MARTA Website →
        </a>
      </section>

      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
    </main>
  );
}