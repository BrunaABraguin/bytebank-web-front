import React from "react";

interface CirclePercentProps {
  percent?: number;
  size?: number;
}

export const CirclePercent: React.FC<CirclePercentProps> = ({
  percent = 74,
  size = 80,
}) => {
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const dash = (percent / 100) * circumference;
  const dashArray = `${dash}, ${circumference - dash}`;

  return (
    <div className="flex justify-center mt-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            className="text-orange-200"
            strokeWidth="4"
            fill="none"
            stroke="currentColor"
            d={`
                            M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831
                        `}
          />
          <path
            className="text-orange-500"
            strokeWidth="4"
            fill="none"
            strokeDasharray={dashArray}
            stroke="currentColor"
            d={`
                            M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831
                        `}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
          {percent}%
        </span>
      </div>
    </div>
  );
};
