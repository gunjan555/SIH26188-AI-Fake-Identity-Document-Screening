import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon = null,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm';

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white focus:ring-blue-500 border border-blue-500/30 shadow-blue-900/20',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 focus:ring-slate-500',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white focus:ring-emerald-500 border border-emerald-500/30',
    warning: 'bg-amber-600 hover:bg-amber-500 text-white focus:ring-amber-500 border border-amber-500/30',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500 border border-rose-500/30 shadow-rose-900/20',
    outline: 'border border-slate-700 hover:border-slate-600 bg-slate-900/60 hover:bg-slate-800 text-slate-200 focus:ring-slate-500',
    ghost: 'bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white focus:ring-slate-500 border border-transparent',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-5 py-3 gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
      {!isLoading && Icon && iconPosition === 'left' && (
        <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
      )}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
      )}
    </button>
  );
};

export default Button;
