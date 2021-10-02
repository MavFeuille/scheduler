import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //Transit state to a new mode
  const transition = (newMode, replace = false) => {
    
    setMode(newMode);
    // console.log(">>>>newMode: ", newMode);

    if (!replace) {
      const newHistory = [...history];
      // console.log("=== original newHistory === :", newHistory);
      newHistory.push(newMode);
      setHistory(newHistory);
      console.log("=== newHistory === :", newHistory);
    }
  }

  // Revert back to previous mode but not go over initial mode
  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
      // console.log("----> history: ", history)
    }
  }
  return { mode, transition, back };
}