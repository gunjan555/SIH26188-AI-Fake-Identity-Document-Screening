import React from 'react';

const PageHeader = ({
  title,
  subtitle,
  children,
  badge = null,
}) => {
  return (
    <div className="mb-6 pb-4 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-100">{title}</h1>
          {badge}
        </div>
        {subtitle && <p className="text-xs lg:text-sm text-slate-400 mt-1 max-w-3xl">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2.5 shrink-0">{children}</div>}
    </div>
  );
};

export default PageHeader;
