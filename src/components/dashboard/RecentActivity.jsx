import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, FileText, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';

const RecentActivity = ({ activities = [] }) => {
  const navigate = useNavigate();

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'VERIFIED':
        return 'verified';
      case 'SUSPICIOUS':
        return 'suspicious';
      case 'HIGH RISK':
        return 'high_risk';
      default:
        return 'info';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-300">
        <thead className="bg-slate-950/60 uppercase text-[10px] font-semibold text-slate-400 border-b border-slate-800">
          <tr>
            <th className="py-3 px-4">Document ID</th>
            <th className="py-3 px-4">Type & Subject</th>
            <th className="py-3 px-4">Officer</th>
            <th className="py-3 px-4">Risk Score</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {activities.map((item) => (
            <tr key={item.id} className="hover:bg-slate-800/40 transition-colors group">
              <td className="py-3 px-4 font-mono font-medium text-slate-200">{item.id}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-200">{item.personName}</p>
                    <p className="text-[11px] text-slate-400">
                      {item.docType} ({item.docNumber})
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-slate-300">{item.officer}</td>
              <td className="py-3 px-4 font-mono font-bold">
                <span
                  className={
                    item.riskScore <= 30
                      ? 'text-emerald-400'
                      : item.riskScore <= 70
                      ? 'text-amber-400'
                      : 'text-rose-500'
                  }
                >
                  {item.riskScore} / 100
                </span>
              </td>
              <td className="py-3 px-4">
                <Badge variant={getBadgeVariant(item.status)}>{item.status}</Badge>
              </td>
              <td className="py-3 px-4 text-right">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Eye}
                  onClick={() => navigate(`/verification-result?id=${item.id}`)}
                >
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivity;
