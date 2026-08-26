"use client";

import CountUp from "react-countup";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

export default function AnimatedCounter({
  end,
  suffix = "",
  duration = 2,
  decimals = 0,
}: AnimatedCounterProps) {
  return (
    <h3 className="text-4xl font-bold text-primary">
      <CountUp
        end={end}
        duration={duration}
        decimals={decimals}
        enableScrollSpy
        scrollSpyOnce
      />
      {suffix}
    </h3>
  );
}