import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import { riskDistributionData, dailyScanTrends } from '../../data/dashboardData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg shadow-xl text-xs">
        <p className="font-semibold text-slate-100">{data.name || data.dataKey}</p>
        <p className="text-slate-300 mt-1 font-mono">
          Volume: <span className="font-bold text-blue-400">{data.value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const RiskDistributionChart = () => {
  return (
    <div className="w-full h-64 flex flex-col justify-center items-center relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={riskDistributionData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {riskDistributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Statistic */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-extrabold font-mono text-slate-100">1,428</span>
        <span className="text-[10px] uppercase font-semibold text-slate-400">Total Scans</span>
      </div>
    </div>
  );
};

export const DailyScanTrendChart = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dailyScanTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
          <Bar dataKey="lowRisk" name="Verified" fill="#10b981" radius={[4, 4, 0, 0]} stackId="a" />
          <Bar dataKey="suspicious" name="Suspicious" fill="#f59e0b" radius={[4, 4, 0, 0]} stackId="a" />
          <Bar dataKey="highRisk" name="High Risk" fill="#ef4444" radius={[4, 4, 0, 0]} stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default { RiskDistributionChart, DailyScanTrendChart };
