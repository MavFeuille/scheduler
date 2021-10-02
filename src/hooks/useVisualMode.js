import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [current, setCurrent] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace === true) {
      setMode(newMode);
    } else {
      setMode(newMode);
      setCurrent([...current, mode]);
    }

  }

  return { mode, transition };
}