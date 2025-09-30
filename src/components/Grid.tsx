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
  const cells = Array.from({ length: 25 }, (_, i) => i); // Generate array of cell indices (0 to 24 for a 5x5 grid)

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
