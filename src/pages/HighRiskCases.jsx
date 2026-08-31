import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, AlertTriangle, Eye, Lock, CheckCircle2, UserX, FileWarning } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { getHighRiskCases } from '../services/api';

const HighRiskCases = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      try {
        const res = await getHighRiskCases();
        setCases(res.cases);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch high risk cases:', err);
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  return (
    <DashboardLayout>
      <PageHeader
        title="High-Risk Flagged Cases Queue"
        subtitle="Priority queue for documents exceeding critical risk thresholds (> 70) requiring supervisor inspection and security decision."
        badge={<Badge variant="high_risk">CRITICAL QUEUE</Badge>}
      />

      {loading ? (
        <Loader text="Loading high-risk security queue..." />
      ) : cases.length === 0 ? (
        <Card className="text-center p-8">
          <ShieldAlert className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-100">No Critical High-Risk Cases Active</h3>
          <p className="text-xs text-slate-400 mt-1">All flagged cases have been resolved by security supervisors.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((item) => (
            <Card
              key={item.id}
              className="bg-slate-900 border-rose-500/30 hover:border-rose-500/60"
              headerAction={<Badge variant="high_risk">SCORE: {item.riskScore}/100</Badge>}
              title={item.personName}
              subtitle={`${item.docType} (#${item.docNumber}) • ${item.timestamp}`}
            >
              <div className="space-y-4">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                    <span>Document ID: <strong className="text-slate-200">{item.id}</strong></span>
                    <span>Country: <strong className="text-slate-200">{item.country}</strong></span>
                  </div>
                  <div className="text-slate-400 font-mono text-[11px]">
                    Logging Officer: <strong className="text-slate-200">{item.officer}</strong>
                  </div>
                </div>

                {/* Primary Flag Reasons */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-2">
                    Primary Anomaly & Failure Flags ({item.reasons.length})
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {item.reasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-rose-500/10 p-2 rounded border border-rose-500/20">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Eye}
                    onClick={() => navigate(`/verification-result?id=${item.id}&type=high_risk`)}
                  >
                    View Full Analysis
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="danger"
                      size="sm"
                      icon={UserX}
                      onClick={() => alert(`Document #${item.id} flagged as Confirmed Fraud in Security DB.`)}
                    >
                      Confirm Fraud
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default HighRiskCases;
