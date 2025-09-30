import  { useEffect, useMemo, useState } from "react";
import Grid from "./components/Grid";
import { getRule } from "./utils/levelRules";
import "./styles/app.css";
import correct from "./assets/correct.mp3";
import incorrect from "./assets/incorrect.mp3";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [timeLeft, setTimeLeft] = useState(10); // countdown timer
  const [level, setLevel] = useState(1); // current level
  const [observing, setObserving] = useState(true);
  const [showOn, setShowOn] = useState(true); // whether flashing cells are visible
  const [selectedSet, setSelectedSet] = useState<Set<number>>(new Set()); // user's selections
  const [feedbackMap, setFeedbackMap] = useState<Map<number, "correct" | "incorrect" | "missed"> | null>(null);
  const [score, setScore] = useState(0);
  const ruleFn = useMemo(() => getRule(level), [level]); // Memoized rule function per level
  const correctSound = new Audio(correct);
  const incorrectSound = new Audio(incorrect);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (!observing) return;
    setTimeLeft(10);
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [observing]);
  
  useEffect(() => {
    setObserving(true);
    setShowOn(true);
    setSelectedSet(new Set());
    setFeedbackMap(null);

    const interval = setInterval(() => setShowOn((s) => !s), 600);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setObserving(false); 
      setShowOn(false);
    }, 10000); 
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [level]);

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "light" | "dark") || null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      return next;
    });
  };

  const handleCellClick = (index: number) => {
    if (observing) return; 
    setSelectedSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleSubmit = () => {
    const trueSet = new Set<number>();
    for (let i = 0; i < 25; i++) if (ruleFn(i)) trueSet.add(i); // cells that should have flashed
    const feedback = new Map<number, "correct" | "incorrect" | "missed">();
    selectedSet.forEach((i) => {
      if (trueSet.has(i)) {
        feedback.set(i, "correct");
      } else {
        feedback.set(i, "incorrect");
      }
    });
    trueSet.forEach((i) => {
      if (!selectedSet.has(i)) feedback.set(i, "missed");
    });
    selectedSet.forEach((i) => {
      if (trueSet.has(i)) correctSound.play();
      else incorrectSound.play();
    });
    const correctPicked = Array.from(selectedSet).filter((i) => trueSet.has(i)).length;
    const wrongPicked = Array.from(selectedSet).filter((i) => !trueSet.has(i)).length;
    setScore((s) => s + Math.max(0, correctPicked - wrongPicked));
    setFeedbackMap(feedback);
  };

  const maxLevel = 7;
  const handleNext = () => {
    setLevel((l) => (l < maxLevel ? l + 1 : 1));
  };

  return (
    <div className="app">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <h1>Signal Decoder — The Invisible Pattern Game : Level {level}</h1>
      <div className="progress-bar">
      <div
        className="progress"
        style={{ width: `${(level / 7) * 100}%` }}
      ></div>
     </div>
      <p>{observing ? <div className="timer">Watching pattern — {timeLeft}s left</div> : "Select the squares that were flashing"}</p>
      <Grid
        observing={observing}
        showOn={showOn}
        ruleFn={ruleFn}
        selectedSet={selectedSet}
        feedbackMap={feedbackMap}
        onCellClick={handleCellClick}
      />
      <div className="controls">
      {!observing && !feedbackMap && (
        <button onClick={handleSubmit} className="btn">Submit</button>
      )}

      {feedbackMap && (
        <div className="feedback-container">
          <div className="feedback-message">Score: {score}</div>
          <button onClick={handleNext} className="btn btn-next">Next Level</button>
        </div>
      )}
    </div>
    </div>
  );
}
