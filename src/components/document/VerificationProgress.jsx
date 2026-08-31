import React from 'react';
import {
  CheckCircle2,
  Clock,
  Loader2,
  AlertCircle,
  FileCheck,
  Scan,
  Cpu,
  Eye,
  Hash,
  UserCheck,
  Database,
  BarChart3
} from 'lucide-react';

const VerificationProgress = ({ currentStep = 0, pipelineStages = [] }) => {
  const defaultStages = [
    { id: 1, title: 'Document Uploaded', icon: FileCheck, desc: 'Image file ingested & validated' },
    { id: 2, title: 'Image Pre-processing', icon: Scan, desc: 'Resolution alignment & glare removal' },
    { id: 3, title: 'OCR Text Extraction', icon: Cpu, desc: 'Zonal optical character recognition' },
    { id: 4, title: 'Document Visual Analysis', icon: Eye, desc: 'Font & hologram pattern check' },
    { id: 5, title: 'MRZ Checksum Validation', icon: Hash, desc: 'ICAO 9303 checksum calculation' },
    { id: 6, title: 'Biometric Face Match', icon: UserCheck, desc: 'Facial similarity cross-verification' },
    { id: 7, title: 'Database Watchlist Check', icon: Database, desc: 'Interpol & immigration cross-check' },
    { id: 8, title: 'Risk Score & Explainability', icon: BarChart3, desc: 'Multi-layer risk score synthesis' }
  ];

  const stagesToUse = pipelineStages.length > 0 ? pipelineStages : defaultStages;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {stagesToUse.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          const isPending = idx > currentStep;

          return (
            <div
              key={stage.id}
              className={`p-4 rounded-xl border transition-all duration-300 flex items-start gap-3.5 ${
                isDone
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-100'
                  : isCurrent
                  ? 'bg-blue-600/15 border-blue-500 text-slate-100 shadow-lg shadow-blue-900/20 ring-1 ring-blue-500/50 animate-pulse'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-400 opacity-60'
              }`}
            >
              <div
                className={`p-2.5 rounded-lg border shrink-0 ${
                  isDone
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : isCurrent
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                    : 'bg-slate-800 text-slate-500 border-slate-700'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`text-xs font-bold ${
                      isDone
                        ? 'text-emerald-300'
                        : isCurrent
                        ? 'text-blue-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {stage.title}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/60 text-slate-400">
                    {isDone ? 'COMPLETED' : isCurrent ? 'IN PROGRESS...' : 'QUEUED'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{stage.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerificationProgress;
