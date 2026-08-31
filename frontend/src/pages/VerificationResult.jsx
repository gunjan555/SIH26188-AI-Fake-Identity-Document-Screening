import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  Printer,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  FileText,
  UserCheck,
  Database,
  Cpu,
  Eye,
  Info,
  ChevronDown
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { getVerificationResult } from '../services/api';
import { getRiskScoreColor } from '../utils/helpers';

const VerificationResult = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const docId = searchParams.get('id') || 'DOC-2026-8802';
  const sampleType = searchParams.get('type') || 'suspicious';

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      try {
        const data = await getVerificationResult(docId, sampleType);
        setResult(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load result:', err);
        setLoading(false);
      }
    };
    fetchResult();
  }, [docId, sampleType]);

  if (loading) {
    return (
      <DashboardLayout>
        <Loader text="Retrieving multi-layer screening verdict report..." />
      </DashboardLayout>
    );
  }

  if (!result) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-slate-400">
          <p>Result not found for Document ID #{docId}.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/upload')}>
            Upload New Document
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const scoreMeta = getRiskScoreColor(result.riskScore);

  const getModuleIcon = (id) => {
    switch (id) {
      case 'ocr':
        return Cpu;
      case 'cv_analysis':
        return Eye;
      case 'mrz':
        return FileText;
      case 'face_match':
        return UserCheck;
      case 'database':
        return Database;
      default:
        return Info;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <PageHeader
        title={`Screening Verdict Report: ${result.id}`}
        subtitle={`Multi-layer screening decision generated on ${result.timestamp} by ${result.officer}.`}
      >
        <Button variant="outline" size="sm" icon={Printer} onClick={handlePrint}>
          Print / Export Report
        </Button>
        <Button variant="primary" size="sm" icon={RotateCcw} onClick={() => navigate('/upload')}>
          Screen Another Document
        </Button>
      </PageHeader>

      <div className="space-y-6">
        {/* 1. FINAL DECISION & RISK SCORE HEADER BANNER */}
        <div className={`rounded-2xl p-6 border shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 ${scoreMeta.bg} ${scoreMeta.border}`}>
          <div className="flex items-center gap-5">
            <div className={`p-4 rounded-2xl border ${scoreMeta.badgeBg}`}>
              {result.finalDecision === 'VERIFIED' ? (
                <ShieldCheck className="w-10 h-10 text-emerald-400" />
              ) : result.finalDecision === 'SUSPICIOUS' ? (
                <AlertTriangle className="w-10 h-10 text-amber-400" />
              ) : (
                <ShieldAlert className="w-10 h-10 text-rose-500" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black tracking-tight text-slate-100 uppercase">
                  FINAL DECISION: <span className={scoreMeta.text}>{result.finalDecision}</span>
                </h2>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">{result.decisionSummary}</p>
              <div className="mt-2 flex items-center gap-4 text-[11px] text-slate-400 font-mono">
                <span>Category: {result.docType} ({result.subType})</span>
                <span>•</span>
                <span>Checked by: {result.officer}</span>
              </div>
            </div>
          </div>

          {/* Risk Score Circular / Meter Widget */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-950/80 border border-slate-800 rounded-xl min-w-[170px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              COMPOSITE RISK SCORE
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl font-extrabold font-mono ${scoreMeta.text}`}>
                {result.riskScore}
              </span>
              <span className="text-sm font-mono text-slate-500">/ 100</span>
            </div>
            <span className={`mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded border ${scoreMeta.badgeBg}`}>
              {scoreMeta.label}
            </span>
          </div>
        </div>

        {/* 2. MODULE-WISE SCREENING CHECKS GRID */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Multi-Layer Module Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {result.modules.map((mod) => {
              const IconComponent = getModuleIcon(mod.id);
              const isPassed = mod.status === 'PASSED';
              const isSuspicious = mod.status === 'SUSPICIOUS';

              return (
                <div
                  key={mod.id}
                  className={`p-4 rounded-xl border flex flex-col justify-between ${
                    isPassed
                      ? 'bg-slate-900/90 border-slate-800'
                      : isSuspicious
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : 'bg-rose-500/10 border-rose-500/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className="w-5 h-5 text-blue-400" />
                      {isPassed ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> PASSED
                        </span>
                      ) : isSuspicious ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400">
                          <AlertTriangle className="w-3.5 h-3.5" /> SUSPICIOUS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400">
                          <XCircle className="w-3.5 h-3.5" /> FAILED
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-200">{mod.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{mod.detail}</p>
                  </div>

                  {mod.similarity && (
                    <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-blue-300">
                      Similarity: <strong className="text-white">{mod.similarity}</strong>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. EXPLAINABLE AI DECISION SECTION ("WHY WAS THIS FLAGGED?") */}
        <Card
          title="Explainable AI Screening Decision Rationale"
          subtitle="Human-interpretable risk factors & anomaly findings generated by AI decision intelligence"
          accentColor={result.finalDecision === 'VERIFIED' ? 'green' : result.finalDecision === 'SUSPICIOUS' ? 'amber' : 'rose'}
        >
          <div className="space-y-3">
            {result.explanations.map((exp, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  exp.severity === 'HIGH'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                    : exp.severity === 'MEDIUM'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                }`}
              >
                {exp.severity === 'HIGH' ? (
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                ) : exp.severity === 'MEDIUM' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">{exp.title}</h4>
                  <p className="text-xs mt-0.5 text-slate-300">{exp.message}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 4. EXTRACTED DOCUMENT INFORMATION GRID */}
        <Card title="Structured Extracted Document Information (Zonal OCR & MRZ)">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Full Legal Name</span>
              <p className="font-bold text-slate-100 font-mono text-sm mt-0.5">
                {result.extractedFields.fullName}
              </p>
            </div>

            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Document Number</span>
              <p className="font-bold text-blue-400 font-mono text-sm mt-0.5">
                {result.extractedFields.documentNumber}
              </p>
            </div>

            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Date of Birth</span>
              <p className="font-medium text-slate-200 font-mono mt-0.5">
                {result.extractedFields.dateOfBirth}
              </p>
            </div>

            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Gender</span>
              <p className="font-medium text-slate-200 font-mono mt-0.5">
                {result.extractedFields.gender}
              </p>
            </div>

            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Nationality</span>
              <p className="font-medium text-slate-200 font-mono mt-0.5">
                {result.extractedFields.nationality}
              </p>
            </div>

            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Issuing Country & Authority</span>
              <p className="font-medium text-slate-200 font-mono mt-0.5">
                {result.extractedFields.authority}
              </p>
            </div>

            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Issue Date</span>
              <p className="font-medium text-slate-200 font-mono mt-0.5">
                {result.extractedFields.issueDate}
              </p>
            </div>

            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Expiry Date</span>
              <p
                className={`font-mono mt-0.5 font-bold ${
                  result.extractedFields.expiryDate.includes('EXPIRED') ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {result.extractedFields.expiryDate}
              </p>
            </div>
          </div>

          {/* Raw MRZ String View */}
          <div className="mt-4 p-3.5 bg-slate-950 border border-slate-800 rounded-lg">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
              Raw ICAO 9303 MRZ Text String
            </span>
            <pre className="text-xs font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed select-all">
              {result.extractedFields.mrzCode}
            </pre>
          </div>
        </Card>

        {/* Officer Action Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            Escalate suspicious documents to Supervisor Queue or clear for immigration entry.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="danger" size="sm" onClick={() => navigate('/high-risk-cases')}>
              Escalate to Supervisor Queue
            </Button>
            <Button variant="success" size="sm" onClick={() => navigate('/history')}>
              Confirm Security Clearance
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VerificationResult;
