
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrainList from "../components/TrainList";
import NavBar from "../components/NavBar";

type TrainData = {
  DESTINATION?: string;
  DIRECTION?: string;
  EVENT_TIME?: string;
  LINE?: string;
  NEXT_ARR?: string;
  STATION?: string;
  TRAIN_ID?: string;
  WAITING_TIME?: string;
  WAITING_SECONDS?: number;
  IS_REALTIME?: boolean | string | number;
  DELAY?: string;
};

type LinesPageProps = {
  initialColor: string;
};

const lineColors = ["blue", "gold", "red", "green"];

export default function LinesPage({ initialColor }: LinesPageProps) {
  const navigate = useNavigate();

  const [currColor, setCurrColor] = useState(initialColor);
  const [trainData, setTrainData] = useState<TrainData[]>([]);
  const [stationData, setStationData] = useState<string[]>([]);
  const [selectedStation, setSelectedStation] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setCurrColor(initialColor);
    setSelectedStation("");
    setActiveFilters([]);
  }, [initialColor]);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError("");
      setTrainData([]);
      setStationData([]);

      try {
        const [trainResponse, stationResponse] = await Promise.all([
          fetch(
            `https://marta-bootcamp-api.vercel.app/arrivals/${currColor}`
          ),
          fetch(
            `https://marta-bootcamp-api.vercel.app/stations/${currColor}`
          ),
        ]);

        if (!trainResponse.ok || !stationResponse.ok) {
          throw new Error("Unable to load MARTA data.");
        }

        const trains: TrainData[] = await trainResponse.json();
        const stations: string[] = await stationResponse.json();

        if (!cancelled) {
          setTrainData(trains);
          setStationData(stations);
        }
      } catch {
        if (!cancelled) {
          setError("Could not load MARTA data. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [currColor]);

  function handleLineSelect(color: string) {
    if (color !== currColor) {
      navigate(`/lines/${color}`);
    }
  }

  function toggleFilter(filter: string) {
    setActiveFilters((currentFilters) => {
      if (currentFilters.includes(filter)) {
        return currentFilters.filter(
          (currentFilter) => currentFilter !== filter
        );
      }

      return [...currentFilters, filter];
    });
  }

  const directionOptions =
    currColor === "gold" || currColor === "red"
      ? [
          { label: "Northbound", value: "N" },
          { label: "Southbound", value: "S" },
        ]
      : [
          { label: "Eastbound", value: "E" },
          { label: "Westbound", value: "W" },
        ];

  const filteredTrains = trainData.filter((train) => {
    const matchesStation =
      selectedStation === "" ||
      (typeof train.STATION === "string" &&
        train.STATION.toLowerCase() === selectedStation.toLowerCase());

    const arrivalFilters = activeFilters.filter(
      (filter) => filter === "Arriving" || filter === "Scheduled"
    );

    const matchesArrival =
      arrivalFilters.length === 0 ||
      arrivalFilters.some((filter) => {
        const waitingTime = train.WAITING_TIME?.toLowerCase();

        if (filter === "Arriving") {
          return waitingTime === "arriving" || waitingTime === "now";
        }

        return (
          waitingTime === "scheduled" ||
          train.IS_REALTIME === false ||
          train.IS_REALTIME === "false" ||
          train.IS_REALTIME === 0 ||
          train.IS_REALTIME === "0"
        );
      });

    const selectedDirections = directionOptions.filter((option) =>
      activeFilters.includes(option.label)
    );

    const matchesDirection =
      selectedDirections.length === 0 ||
      selectedDirections.some(
        (option) => train.DIRECTION === option.value
      );

    return matchesStation && matchesArrival && matchesDirection;
  });

  return (
    <main>
      <h1>MARTA Train Arrivals</h1>

      <nav aria-label="Train lines">
        {lineColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => handleLineSelect(color)}
            aria-pressed={currColor === color}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </button>
        ))}
      </nav>

      <h2>
        {currColor.charAt(0).toUpperCase() + currColor.slice(1)} Line
      </h2>

      <NavBar
        stations={stationData}
        selectedStation={selectedStation}
        onStationSelect={setSelectedStation}
      />

      <section aria-label="Train filters">
        <h3>Arrival Filters</h3>

        {["Arriving", "Scheduled"].map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => toggleFilter(filter)}
            aria-pressed={activeFilters.includes(filter)}
          >
            {filter}
          </button>
        ))}

        <h3>Direction Filters</h3>

        {directionOptions.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => toggleFilter(option.label)}
            aria-pressed={activeFilters.includes(option.label)}
          >
            {option.label}
          </button>
        ))}

        <p>
          Active filters:{" "}
          {activeFilters.length === 0
            ? "None"
            : activeFilters.join(", ")}
        </p>

        <button
          type="button"
          onClick={() => setActiveFilters([])}
          disabled={activeFilters.length === 0}
        >
          Clear Filters
        </button>
      </section>

      {loading ? (
        <p>Loading trains...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : filteredTrains.length === 0 ? (
        <p>No trains match your selected filters.</p>
      ) : (
        <TrainList color={currColor} data={filteredTrains} />
      )}
    </main>
  );
}
