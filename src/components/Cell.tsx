import React from "react";

type Props = {
  index: number;
  observing: boolean;
  showOn: boolean;          
  shouldFlash: boolean;    
  selected: boolean;
  feedback?: "correct" | "incorrect" |"missed" | null;
  onClick: (index: number) => void;
};

export default function Cell({ index, observing, showOn, shouldFlash, selected, feedback, onClick }: Props) {
  const isFlashing = observing && shouldFlash && showOn;
  const classNames = [
    "cell",
    isFlashing ? "flash" : "",
    selected ? "selected" : "",
    feedback === "correct" ? "correct" : "",
    feedback === "incorrect" ? "incorrect" : "",
    feedback === "missed" ? "missed" : "",
  ].join(" ");

  return (
    <button className={classNames} onClick={() => onClick(index)} aria-label={`cell-${index}`}>
    </button>
  );
}