import React from 'react';

interface GaugeProps {
  score: number;
  context: string;
}

export const Gauge: React.FC<GaugeProps> = ({ score, context }) => {
  // SVG Path logic for a semi-circle gauge
  // Path for arc: M 5 50 A 45 45 0 0 1 95 50
  // Length of that path is roughly 141.37 (Pi * 45)
  const radius = 45;
  const circumference = Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-between h-full border border-slate-100">
      <div className="w-full max-w-[220px] relative aspect-[2/1] mt-4">
        <svg viewBox="0 0 100 55" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B72267" />
              <stop offset="100%" stopColor="#167CB5" />
            </linearGradient>
          </defs>
          {/* Background Track */}
          <path 
            d="M 5 50 A 45 45 0 0 1 95 50" 
            fill="none" 
            stroke="#e2e8f0" 
            strokeWidth="10" 
            strokeLinecap="round" 
          />
          {/* Value Track */}
          <path 
            d="M 5 50 A 45 45 0 0 1 95 50" 
            fill="none" 
            stroke="url(#gaugeGradient)" 
            strokeWidth="10" 
            strokeLinecap="round" 
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 text-center">
             <span className="text-4xl font-bold text-slate-800">{score}</span>
        </div>
      </div>
      <div className="text-center mt-6">
          <h4 className="text-slate-500 font-semibold uppercase text-xs tracking-wider mb-1">Global Index</h4>
          <p className="text-sm text-slate-600 font-medium">{context}</p>
      </div>
    </div>
  );
};