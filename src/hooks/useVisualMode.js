import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //Transit state to a new mode
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    // console.log(">>>>newMode: ", newMode);

    if (!replace) {
      const newHistory = [...history, newMode];
      // console.log("=== original newHistory === :", newHistory);
      // newHistory.push(newMode);
      setHistory(newHistory);
      console.log("=== newHistory === :", newHistory);
    }
  };

  // Revert back to previous mode but not go over initial mode
  const back = () => {
    if (history.length > 1) {
      // console.log("history length :", history.length);
      const newHistory2 = history.slice(0, -1);
      // console.log("history: ", history);

      setHistory(newHistory2);
      // console.log("******setHistory -> newHistory2 <-: ", newHistory2);

      setMode(newHistory2[newHistory2.length - 1]);
      // console.log("----> newHistory2.length -1 : ", newHistory2[newHistory2.length - 1]);
    }
  };
  return { mode, transition, back };
}
