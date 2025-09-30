import Cell from "./Cell";

type GridProps = {
  observing: boolean;
  showOn: boolean;
  ruleFn: (index: number) => boolean;
  selectedSet: Set<number>;
  feedbackMap: Map<number, "correct" | "incorrect" | "missed"> | null;
  onCellClick: (index: number) => void;
};

export default function Grid({ observing, showOn, ruleFn, selectedSet, feedbackMap, onCellClick }: GridProps) {
  const cells = Array.from({ length: 25 }, (_, i) => i);

  return (
    <div className="grid">
      {cells.map((i) => (
        <Cell
          key={i}
          index={i}
          observing={observing}
          showOn={showOn}
          shouldFlash={ruleFn(i)}
          selected={selectedSet.has(i)}
          feedback={feedbackMap?.get(i) ?? null}
          onClick={onCellClick}
        />
      ))}
    </div>
  );
}
