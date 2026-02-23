import { useRef } from "react";

export const useRateLimit = (limit: number, interval: number) => {
  const calls = useRef<number[]>([]);

  return () => {
    const now = Date.now();
    calls.current = calls.current.filter(t => now - t < interval);

    if (calls.current.length >= limit) {
      return false;
    }

    calls.current.push(now);
    return true;
  };
};