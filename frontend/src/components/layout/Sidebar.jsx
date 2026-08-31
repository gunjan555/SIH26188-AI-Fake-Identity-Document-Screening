import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  History,
  ShieldAlert,
  Bell,
  User,
  LogOut,
  ShieldCheck,
  ChevronRight,
  X
} from 'lucide-react';

const Sidebar = ({ mobileOpen = false, setMobileOpen = () => {} }) => {
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('sih_user') || '{}') || {
    name: 'OFFICER R. SHARMA',
    role: 'SECURITY OFFICER',
    station: 'IGIA Terminal 3'
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Upload Document', path: '/upload', icon: Upload },
    { name: 'Verification History', path: '/history', icon: History },
    { name: 'High-Risk Cases', path: '/high-risk-cases', icon: ShieldAlert, badge: '3' },
    { name: 'Alerts', path: '/alerts', icon: Bell, badge: '4' },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    localStorage.removeItem('sih_auth_token');
    localStorage.removeItem('sih_user');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-slate-900 border-r border-slate-800/80 z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-100 tracking-wide">SIH26188</h1>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Document Screening</p>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Badge Info */}
        <div className="px-4 py-3 mx-3 mt-3 bg-slate-950/60 border border-slate-800/60 rounded-lg flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center font-bold text-xs text-blue-300">
            {user.name ? user.name.charAt(0) : 'S'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">{user.name || 'SECURITY OFFICER'}</p>
            <p className="text-[10px] text-blue-400 font-medium tracking-wide">{user.role || 'SECURITY OFFICER'}</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-100'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* System Footer Status */}
        <div className="p-3 border-t border-slate-800/80 space-y-3">
          <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-between text-[11px]">
            <span className="text-slate-400">System Status</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/20 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Security Session</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
