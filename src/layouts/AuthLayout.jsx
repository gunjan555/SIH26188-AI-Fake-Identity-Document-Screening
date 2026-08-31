import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 bg-security-grid text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
