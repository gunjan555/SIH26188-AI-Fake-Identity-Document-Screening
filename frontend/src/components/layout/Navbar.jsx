import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, ShieldCheck, User, Cpu, Database, Clock } from 'lucide-react';
import SearchBar from '../common/SearchBar';

const Navbar = ({ onMobileToggle }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const user = JSON.parse(localStorage.getItem('sih_user') || '{}') || {
    name: 'OFFICER R. SHARMA',
    role: 'SECURITY OFFICER'
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) +
        ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/history?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between gap-4">
      {/* Left section: Mobile menu toggle + Page title or Search */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMobileToggle}
          className="lg:hidden p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex max-w-md w-full">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search document ID, passport #, or person name..."
          />
        </form>
      </div>

      {/* Right section: System Badges, Clock, Notifications, Profile */}
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Live Clock */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 bg-slate-950/60 border border-slate-800 rounded-md text-xs font-mono text-slate-300">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span>{currentTime || '19:34:00 IST'}</span>
        </div>

        {/* Status Indicators */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI: ONLINE</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[11px] font-medium text-blue-400">
            <Database className="w-3.5 h-3.5" />
            <span>DB: READY</span>
          </span>
        </div>

        {/* Alert Bell */}
        <button
          onClick={() => navigate('/alerts')}
          className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title="Security Alerts"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-slate-900 animate-pulse" />
        </button>

        {/* Profile Avatar Button */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700"
        >
          <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 flex items-center justify-center font-bold text-xs">
            {user.name ? user.name.charAt(0) : 'U'}
          </div>
          <span className="hidden lg:inline-block text-xs font-medium text-slate-200">
            {user.name || 'Officer'}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
