import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';

const Loader = ({
  text = 'Processing document screening...',
  subtext = 'Analyzing multi-layer biometrics & database records',
  size = 'md'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[220px]">
      <div className="relative flex items-center justify-center">
        {/* Glowing Outer Rings */}
        <div className="absolute w-20 h-20 rounded-full border-2 border-blue-500/20 animate-ping" />
        <div className="w-16 h-16 rounded-full border-2 border-t-blue-500 border-r-blue-400/40 border-b-blue-600/20 border-l-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ShieldCheck className="w-7 h-7 text-blue-400 animate-pulse" />
        </div>
      </div>

      <div className="mt-5 space-y-1">
        <h4 className="text-sm font-semibold text-slate-200 flex items-center justify-center gap-2">
          <Cpu className="w-4 h-4 text-blue-400 animate-spin" />
          {text}
        </h4>
        {subtext && <p className="text-xs text-slate-400 max-w-sm">{subtext}</p>}
      </div>
    </div>
  );
};

export default Loader;
