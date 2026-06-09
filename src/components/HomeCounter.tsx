"use client";

import { useState, useEffect, useRef } from "react";

export default function HomeCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1500;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercent = Math.min(progress / duration, 1);
      const ease = progressPercent * (2 - progressPercent);
      setCount(Math.floor(ease * target));
      if (progress < duration) requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={elementRef}
      className="text-4xl md:text-5xl font-black text-brand-600 dark:text-brand-400"
    >
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}
