"use client";

import { useEffect, useState } from "react";

export const YearProgress = () => {
  const [progress, setProgress] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      const year = now.getFullYear();
      const start = new Date(year, 0, 1); // January 1st
      const end = new Date(year + 1, 0, 1); // January 1st next year
      const total = end.getTime() - start.getTime();
      const elapsed = now.getTime() - start.getTime();
      const percentage = (elapsed / total) * 100;

      // Calculate days left
      const msInDay = 24 * 60 * 60 * 1000;
      const daysRemaining = Math.ceil(
        (end.getTime() - now.getTime()) / msInDay
      );

      setProgress(percentage);
      setDaysLeft(daysRemaining);
    };

    calculateProgress();
    // Update every hour
    const interval = setInterval(calculateProgress, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md px-4">
        {!progress && !daysLeft ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="mb-2 text-sm">
              <p>{Math.round(progress)}%</p>
            </div>
            <div className="w-full h-8 border border-white">
              <div
                className="h-full bg-white transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <p>{new Date().getFullYear()}</p>
              <p>
                {daysLeft} <span className="opacity-25">days left</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
