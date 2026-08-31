import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, Shield, AlertTriangle, ArrowRight, UserCheck } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';
import Button from '../components/common/Button';
import { login } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('officer.sharma@border-security.gov.in');
  const [password, setPassword] = useState('SecurityPass2026!');
  const [role, setRole] = useState('SECURITY OFFICER');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const roles = [
    { id: 'SECURITY OFFICER', label: 'Security Officer', desc: 'Document Scan & Screening' },
    { id: 'SUPERVISOR', label: 'Supervisor', desc: 'Case Review & Escalations' },
    { id: 'ADMINISTRATOR', label: 'Administrator', desc: 'Dashboard & System Admin' }
  ];

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please provide both official email and security password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      await login({ email, password, role });
      setIsLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Authentication failed. Please check credentials.');
    }
  };

  const handleQuickDemoRole = (roleId) => {
    setRole(roleId);
    if (roleId === 'SECURITY OFFICER') {
      setEmail('officer.sharma@border-security.gov.in');
    } else if (roleId === 'SUPERVISOR') {
      setEmail('supervisor.patel@immigration.gov.in');
    } else {
      setEmail('admin.control@security.gov.in');
    }
  };

  return (
    <AuthLayout>
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        {/* Header Branding */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex p-3 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400 mb-1">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">SIH26188 Screening Platform</h2>
          <p className="text-xs text-slate-400">AI-Based Fake Identity & Document Screening System</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="mb-6">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Select Operational Role
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950/80 border border-slate-800 rounded-xl">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleQuickDemoRole(r.id)}
                className={`py-2 px-2 text-[11px] font-semibold rounded-lg transition-all text-center ${
                  role === r.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-500/15 border border-rose-500/30 rounded-lg text-xs text-rose-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Official Security Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="officer@security.gov.in"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Security Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-500"
              />
              <span>Remember Security Session</span>
            </label>
            <span className="text-blue-400 hover:underline cursor-pointer">Reset Credentials</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full mt-2"
            icon={ArrowRight}
            iconPosition="right"
          >
            AUTHENTICATE & ENTER DASHBOARD
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-500">
            Authorized Personnel Access Only • All Screening Logs Monitored
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
