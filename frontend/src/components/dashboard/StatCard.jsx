import React from 'react';

const StatCard = ({
  title,
  value,
  subtitle,
  trend,
  trendPositive = true,
  icon: Icon,
  badgeText,
  colorScheme = 'blue',
  onClick
}) => {
  const colors = {
    blue: {
      border: 'border-slate-800 hover:border-blue-500/40',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      glow: 'group-hover:shadow-blue-900/10',
    },
    green: {
      border: 'border-slate-800 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      glow: 'group-hover:shadow-emerald-900/10',
    },
    amber: {
      border: 'border-slate-800 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      glow: 'group-hover:shadow-amber-900/10',
    },
    rose: {
      border: 'border-slate-800 hover:border-rose-500/40',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      glow: 'group-hover:shadow-rose-900/10',
    },
  };

  const scheme = colors[colorScheme] || colors.blue;

  return (
    <div
      onClick={onClick}
      className={`group relative bg-slate-900/90 border rounded-xl p-5 shadow-lg transition-all duration-200 ${
        scheme.border
      } ${onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-100 font-mono">{value}</h3>
            {badgeText && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {badgeText}
              </span>
            )}
          </div>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border ${scheme.iconBg}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          {subtitle && <span className="text-slate-400">{subtitle}</span>}
          {trend && (
            <span
              className={`font-semibold ${
                trendPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
