
import Train from "./Train";

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

type TrainListProps = {
  color: string;
  data: TrainData[];
};

export default function TrainList({ color, data }: TrainListProps) {
  const filteredTrains = data.filter(
    (train) =>
      typeof train.LINE === "string" &&
      train.LINE.toLowerCase() === color.toLowerCase()
  );

  if (filteredTrains.length === 0) {
    return <p>No trains found for this line.</p>;
  }

  return (
    <div className="train-list">
      {filteredTrains.map((train, index) => (
        <Train
          key={`${train.TRAIN_ID ?? "train"}-${index}`}
          data={train}
        />
      ))}
    </div>
  );
}
