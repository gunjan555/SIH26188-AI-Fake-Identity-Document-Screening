import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { Shield, AlertTriangle } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex-1 flex flex-col min-w-0">
        <Navbar onMobileToggle={() => setMobileSidebarOpen(true)} />

        {/* Operational Disclaimer Banner */}
        <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-1.5 text-[11px] text-slate-400 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span><strong className="text-slate-300">SIH26188 Decision-Support Platform:</strong> Preliminary AI screening tool for authorized personnel.</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400/90 shrink-0 font-medium text-[10px]">
            <AlertTriangle className="w-3 h-3" />
            <span>Final verification requires human security officer confirmation.</span>
          </div>
        </div>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-3 px-6 border-t border-slate-900 bg-slate-950/80 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 SIH26188 – AI Fake Identity & Document Screening System (Smart India Hackathon)</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Security Protocol v2.4</span>
            <span className="hover:text-slate-400 cursor-pointer">Help & Guidance</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
