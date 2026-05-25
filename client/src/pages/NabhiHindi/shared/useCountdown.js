import { useState, useEffect } from "react";

const STORAGE_KEY = "nabhi_timer_30m";

function get30mEnd() {
  try { localStorage.removeItem("nabhi_timer_end"); } catch (_) {}
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const end = parseInt(stored, 10);
      if (end > Date.now()) return end;
    }
  } catch (_) {}
  const end = Date.now() + 30 * 60 * 1000;
  try { localStorage.setItem(STORAGE_KEY, String(end)); } catch (_) {}
  return end;
}

export function useCountdown24h() {
  const [endTime] = useState(get30mEnd);
  const [remaining, setRemaining] = useState(Math.max(0, endTime - Date.now()));

  useEffect(() => {
    const tick = () => {
      const diff = endTime - Date.now();
      if (diff <= 0) {
        try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
        window.location.reload();
        return;
      }
      setRemaining(diff);
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  const h = String(Math.floor(remaining / 3600000)).padStart(2, "0");
  const m = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");
  return { h, m, s };
}
