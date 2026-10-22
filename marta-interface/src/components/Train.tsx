
type TrainData = {
  DESTINATION?: string;
  DIRECTION?: string;
  EVENT_TIME?: string;
  LINE?: string;
  NEXT_ARR?: string;
  STATION?: string;
  TRAIN_ID?: string;
  WAITING_TIME?: string;
  DELAY?: string;
};

type TrainProps = {
  data: TrainData;
};

export default function Train({ data }: TrainProps) {
  const isOnTime = data.DELAY === "T0S";

  return (
    <div className="train-card">
      <h3>{data.STATION ?? "Unknown Station"}</h3>

      <p>Train #{data.TRAIN_ID ?? "Unknown"}</p>
      <p>Destination: {data.DESTINATION ?? "Unknown"}</p>
      <p>Arrival: {data.WAITING_TIME ?? "Unknown"}</p>

<p className={isOnTime ? "status-on-time" : "status-delayed"}>
  Status: {isOnTime ? "On Time" : "Delayed"}
</p>
    </div>
  );
}
