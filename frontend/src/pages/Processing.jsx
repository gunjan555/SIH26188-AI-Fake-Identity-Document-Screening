import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Cpu, Terminal, FastForward, ShieldCheck } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import VerificationProgress from '../components/document/VerificationProgress';

const Processing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const docId = searchParams.get('id') || 'DOC-2026-8802';
  const scenario = searchParams.get('scenario') || 'suspicious';

  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState([]);

  const logMessages = [
    'Ingesting uploaded document image and normalizing resolution to 300 DPI...',
    'Applying glare reduction and adaptive thresholding filter...',
    'Initializing Zonal OCR engine. Extracting document fields and MRZ text lines...',
    'Performing Computer Vision layout inspection against template standard...',
    'Computing ICAO 9303 Modulo-10 checksums for document number, DOB, and expiry date...',
    'Running Facial Landmark Biometric model. Calculating embedding distance...',
    'Cross-checking document details with Central Immigration & Watchlist DB...',
    'Synthesizing multi-layer risk score and compiling explainable decision summary...'
  ];

  useEffect(() => {
    if (currentStep < 8) {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${logMessages[currentStep]}`]);
        setCurrentStep((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      // Completed - redirect to results page after 1s
      const redirectTimer = setTimeout(() => {
        navigate(`/verification-result?id=${docId}&type=${scenario}`);
      }, 1000);
      return () => clearTimeout(redirectTimer);
    }
  }, [currentStep, docId, scenario, navigate]);

  const handleSkipFast = () => {
    setCurrentStep(8);
    setLogs(logMessages.map((msg) => `[${new Date().toLocaleTimeString()}] ${msg}`));
    navigate(`/verification-result?id=${docId}&type=${scenario}`);
  };

  const progressPercent = Math.min(100, Math.round((currentStep / 8) * 100));

  return (
    <DashboardLayout>
      <PageHeader
        title="Multi-Layer Screening Engine in Progress"
        subtitle={`Analyzing Document ID #${docId} through automated AI, Computer Vision, and Security checks.`}
      >
        <Button
          variant="outline"
          size="sm"
          icon={FastForward}
          onClick={handleSkipFast}
        >
          Fast-forward Demo
        </Button>
      </PageHeader>

      <div className="space-y-6">
        {/* Progress Bar & Status Header */}
        <Card className="bg-slate-900 border-blue-500/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600/20 border border-blue-500/40 rounded-xl text-blue-400">
                <Cpu className="w-6 h-6 animate-spin" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  Screening Pipeline Active: {progressPercent}% Completed
                </h3>
                <p className="text-xs text-slate-400">
                  {currentStep < 8 ? logMessages[currentStep] : 'Pipeline completed! Generating final verdict report...'}
                </p>
              </div>
            </div>
            <span className="text-xl font-extrabold font-mono text-blue-400 shrink-0">
              {currentStep} / 8 Steps
            </span>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 h-full rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>
        </Card>

        {/* Visual Pipeline Stage Grid */}
        <Card title="Automated Multi-Layer Pipeline Stages">
          <VerificationProgress currentStep={currentStep} />
        </Card>

        {/* Terminal Execution Log Simulator */}
        <Card
          title="Live AI Execution & Verification Console"
          subtitle="Real-time logs from OCR, CV, MRZ, Face, and DB micro-services"
        >
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-400 h-48 overflow-y-auto space-y-1">
            <div className="text-slate-500 text-[11px] mb-2">
              --- SIH26188 AI SCREENING DAEMON STARTED (DOC_ID: {docId}) ---
            </div>
            {logs.map((log, index) => (
              <p key={index} className="leading-relaxed">
                {log}
              </p>
            ))}
            {currentStep < 8 && (
              <div className="flex items-center gap-2 text-blue-400 pt-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span>Executing layer {currentStep + 1}...</span>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Processing;
