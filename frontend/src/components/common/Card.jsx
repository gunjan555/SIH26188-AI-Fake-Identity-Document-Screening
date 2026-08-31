import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  className = '',
  bodyClassName = '',
  accentColor = null,
  ...props
}) => {
  const accentClasses = {
    blue: 'border-t-2 border-t-blue-500',
    green: 'border-t-2 border-t-emerald-500',
    amber: 'border-t-2 border-t-amber-500',
    rose: 'border-t-2 border-t-rose-500',
  };

  return (
    <div
      className={`bg-slate-900/90 border border-slate-800/80 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-200 ${
        accentColor ? accentClasses[accentColor] || '' : ''
      } ${className}`}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between gap-4">
          <div>
            {title && <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={`p-5 ${bodyClassName}`}>{children}</div>
    </div>
  );
};

export default Card;
