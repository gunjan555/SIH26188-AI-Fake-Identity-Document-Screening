import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, ShieldAlert } from 'lucide-react';

const Badge = ({
  children,
  variant = 'info',
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  const variants = {
    verified: {
      style: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      icon: CheckCircle2
    },
    success: {
      style: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      icon: CheckCircle2
    },
    suspicious: {
      style: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      icon: AlertTriangle
    },
    warning: {
      style: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      icon: AlertTriangle
    },
    high_risk: {
      style: 'bg-rose-500/15 text-rose-400 border-rose-500/30 font-semibold',
      icon: ShieldAlert
    },
    danger: {
      style: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      icon: XCircle
    },
    info: {
      style: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      icon: Info
    },
    neutral: {
      style: 'bg-slate-800 text-slate-300 border-slate-700',
      icon: null
    }
  };

  const selected = variants[variant] || variants.neutral;
  const IconComponent = selected.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border backdrop-blur-xs ${selected.style} ${sizeClasses[size]} ${className}`}
    >
      {showIcon && IconComponent && <IconComponent className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
