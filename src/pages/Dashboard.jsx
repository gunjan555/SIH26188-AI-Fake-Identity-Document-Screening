import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCheck,
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  Upload,
  History,
  ArrowRight,
  TrendingUp,
  Activity,
  Bell
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/dashboard/StatCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import RecentActivity from '../components/dashboard/RecentActivity';
import { RiskDistributionChart, DailyScanTrendChart } from '../components/dashboard/RiskChart';
import { getDashboardStats } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardStats();
        setStatsData(res);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = statsData?.stats || {
    totalVerified: 1428,
    totalVerifiedTrend: '+12.4%',
    lowRiskCount: 1180,
    lowRiskPercentage: '82.6%',
    suspiciousCount: 184,
    suspiciousPercentage: '12.9%',
    highRiskCount: 64,
    highRiskPercentage: '4.5%',
    todayScans: 142,
    activeAlerts: 6
  };

  const activities = statsData?.recentActivity || [];

  return (
    <DashboardLayout>
      <PageHeader
        title="Central Security Command Dashboard"
        subtitle="Real-time multi-layer AI screening overview, document risk metrics, and officer activity logs."
      >
        <Button
          variant="primary"
          size="md"
          icon={Upload}
          onClick={() => navigate('/upload')}
        >
          UPLOAD NEW DOCUMENT
        </Button>
      </PageHeader>

      {/* Summary Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Documents Scanned"
          value={stats.totalVerified.toLocaleString()}
          subtitle="Lifetime verification volume"
          trend={stats.totalVerifiedTrend}
          trendPositive={true}
          icon={FileCheck}
          badgeText="ALL SCANS"
          colorScheme="blue"
        />

        <StatCard
          title="Verified / Low Risk"
          value={stats.lowRiskCount.toLocaleString()}
          subtitle={`${stats.lowRiskPercentage} of total documents`}
          icon={ShieldCheck}
          badgeText="CLEAR"
          colorScheme="green"
          onClick={() => navigate('/history?status=VERIFIED')}
        />

        <StatCard
          title="Suspicious Flagged"
          value={stats.suspiciousCount.toLocaleString()}
          subtitle={`${stats.suspiciousPercentage} requiring review`}
          icon={AlertTriangle}
          badgeText="REVIEW"
          colorScheme="amber"
          onClick={() => navigate('/history?status=SUSPICIOUS')}
        />

        <StatCard
          title="High Risk Documents"
          value={stats.highRiskCount.toLocaleString()}
          subtitle={`${stats.highRiskPercentage} high threat cases`}
          icon={ShieldAlert}
          badgeText="CRITICAL"
          colorScheme="rose"
          onClick={() => navigate('/high-risk-cases')}
        />
      </div>

      {/* Quick Action Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-blue-400" />
          <div>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Quick Operational Actions</h4>
            <p className="text-xs text-slate-400">Direct shortcuts for security officers and supervisors.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={Upload}
            onClick={() => navigate('/upload')}
          >
            Upload Document
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={History}
            onClick={() => navigate('/history')}
          >
            Verification History
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={ShieldAlert}
            onClick={() => navigate('/high-risk-cases')}
          >
            High Risk Queue ({stats.highRiskCount})
          </Button>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card
          title="Risk Distribution Breakdown"
          subtitle="Proportion of clear vs suspicious vs high-risk documents"
          className="lg:col-span-1"
        >
          <RiskDistributionChart />
          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-around text-center text-xs">
            <div>
              <p className="text-emerald-400 font-bold font-mono">1,180</p>
              <p className="text-[11px] text-slate-400">Verified</p>
            </div>
            <div className="border-x border-slate-800 px-4">
              <p className="text-amber-400 font-bold font-mono">184</p>
              <p className="text-[11px] text-slate-400">Suspicious</p>
            </div>
            <div>
              <p className="text-rose-400 font-bold font-mono">64</p>
              <p className="text-[11px] text-slate-400">High Risk</p>
            </div>
          </div>
        </Card>

        <Card
          title="Daily Scan Activity & Threats"
          subtitle="7-day document screening volume trends"
          className="lg:col-span-2"
        >
          <DailyScanTrendChart />
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card
        title="Recent Document Verification Activity"
        subtitle="Latest live document scans across all security checkpoints"
        headerAction={
          <Button
            variant="ghost"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/history')}
          >
            View All History
          </Button>
        }
      >
        <RecentActivity activities={activities} />
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
