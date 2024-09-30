import { useState, useEffect } from "react";

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  // puttin setInterval directly in a component and
  // updating a state inside it will result in an infinite loop

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("infinity");
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} max={timer} />;
}
