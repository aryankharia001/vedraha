import { useState, useEffect } from "react";

export function useCountdown24h() {
  const getRemaining = () => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    const diff = end - now;
    return {
      h: String(Math.floor(diff / 3600000)).padStart(2, "0"),
      m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
      s: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
    };
  };
  const [time, setTime] = useState(getRemaining());
  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}