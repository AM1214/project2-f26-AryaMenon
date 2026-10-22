type NavBarProps = {
  stations: string[];
  selectedStation: string;
  onStationSelect: (station: string) => void;
};

export default function NavBar({
  stations,
  selectedStation,
  onStationSelect,
}: NavBarProps) {
  return (
    <nav aria-label="Stations">
      <button
        type="button"
        onClick={() => onStationSelect("")}
        aria-pressed={selectedStation === ""}
      >
        All Stations
      </button>

      {stations.map((station) => (
        <button
          key={station}
          type="button"
          onClick={() => onStationSelect(station)}
          aria-pressed={selectedStation === station}
        >
          {station}
        </button>
      ))}
    </nav>
  );
}
