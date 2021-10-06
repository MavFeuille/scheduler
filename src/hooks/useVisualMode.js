import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //Transit state to a new mode
  const transition = (newMode, replace = false) => {
    setMode(newMode);

    if (!replace) {
      const newHistory = [...history, newMode];
      setHistory(newHistory);
      console.log("=== newHistory === :", newHistory);
    }
  };

  //Revert back to previous mode but not go over initial mode
  const back = () => {
    if (history.length > 1) {
      const newHistory2 = history.slice(0, -1);
      setHistory(newHistory2);
      setMode(newHistory2[newHistory2.length - 1]);
    }
  };
  return { mode, transition, back };
}
