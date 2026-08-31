import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Bell, Lock, Key, LogOut, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('sih_user') || '{}') || {
    name: 'OFFICER R. SHARMA',
    email: 'officer.sharma@border-security.gov.in',
    role: 'SECURITY OFFICER',
    badgeId: 'SEC-IND-8842',
    station: 'IGIA Terminal 3 - Gate 14B'
  };

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [notifications, setNotifications] = useState({
    highRisk: true,
    faceMismatch: true,
    mrzFailures: true,
    dailyReport: false
  });

  const handleSaveSettings = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('sih_auth_token');
    localStorage.removeItem('sih_user');
    navigate('/login');
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Security Officer Profile & Settings"
        subtitle="Manage official credentials, station assignment, notification alerts, and security preferences."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Card Info */}
        <Card className="lg:col-span-1 text-center">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-blue-600/30 border-2 border-blue-500/50 flex items-center justify-center font-extrabold text-2xl text-blue-300 mb-3 shadow-lg shadow-blue-900/30">
              {user.name ? user.name.charAt(0) : 'S'}
            </div>
            <h3 className="text-base font-bold text-slate-100">{user.name}</h3>
            <p className="text-xs text-blue-400 font-mono font-medium mt-0.5">{user.role}</p>

            <div className="mt-4 w-full pt-4 border-t border-slate-800 space-y-2.5 text-left text-xs">
              <div className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-lg flex justify-between">
                <span className="text-slate-400">Badge ID</span>
                <span className="font-mono font-bold text-slate-200">{user.badgeId}</span>
              </div>
              <div className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-lg flex justify-between">
                <span className="text-slate-400">Station / Gate</span>
                <span className="font-semibold text-slate-200">{user.station}</span>
              </div>
              <div className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-lg flex justify-between">
                <span className="text-slate-400">Security Clearance</span>
                <Badge variant="verified">LEVEL 4 CLEARANCE</Badge>
              </div>
            </div>

            <Button
              variant="danger"
              size="sm"
              icon={LogOut}
              className="w-full mt-6"
              onClick={handleLogout}
            >
              Terminate Session
            </Button>
          </div>
        </Card>

        {/* Profile Settings & Preferences Form */}
        <div className="lg:col-span-2 space-y-6">
          {savedSuccess && (
            <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Officer profile preferences updated successfully.</span>
            </div>
          )}

          <Card title="Officer Information" icon={User}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  readOnly
                  value={user.name}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Official Email Address</label>
                <input
                  type="email"
                  readOnly
                  value={user.email}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Security Role</label>
                <input
                  type="text"
                  readOnly
                  value={user.role}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Assigned Terminal / Checkpoint</label>
                <input
                  type="text"
                  readOnly
                  value={user.station}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-medium"
                />
              </div>
            </div>
          </Card>

          <Card title="Alert Notification Preferences" icon={Bell}>
            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-lg cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-200">High Risk Document Audio & Visual Alerts</p>
                  <p className="text-[11px] text-slate-400">Trigger instant alert tone when a score exceeds 70/100.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.highRisk}
                  onChange={(e) => setNotifications({ ...notifications, highRisk: e.target.checked })}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-lg cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-200">Facial Biometric Discrepancy Warnings</p>
                  <p className="text-[11px] text-slate-400">Notify when live camera photo similarity falls below 75%.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.faceMismatch}
                  onChange={(e) => setNotifications({ ...notifications, faceMismatch: e.target.checked })}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-lg cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-200">MRZ Checksum Failure Flagging</p>
                  <p className="text-[11px] text-slate-400">Alert on Modulo 10 calculation error in passport MRZ lines.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.mrzFailures}
                  onChange={(e) => setNotifications({ ...notifications, mrzFailures: e.target.checked })}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-blue-500"
                />
              </label>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
              <Button variant="primary" size="sm" onClick={handleSaveSettings}>
                Save Profile Settings
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
