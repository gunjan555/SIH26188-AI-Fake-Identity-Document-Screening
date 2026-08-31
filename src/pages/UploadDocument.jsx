import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ShieldCheck, Info } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/common/Card';
import DocumentUpload from '../components/document/DocumentUpload';
import { uploadDocument, startVerification } from '../services/api';

const UploadDocument = () => {
  const navigate = useNavigate();

  const handleStartVerification = async (uploadData) => {
    try {
      // Call mock upload API service
      const uploadRes = await uploadDocument(uploadData);
      
      // Start pipeline & route to processing page
      await startVerification(uploadRes.documentId, uploadData.sampleScenario);
      
      navigate(`/processing?id=${uploadRes.documentId}&scenario=${uploadData.sampleScenario}`);
    } catch (err) {
      console.error('Failed to initiate verification:', err);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Document Upload & Screening Portal"
        subtitle="Ingest identity or travel documents along with reference photo to initiate multi-layer AI verification."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Upload Box */}
        <Card className="lg:col-span-2">
          <DocumentUpload onStartVerification={handleStartVerification} />
        </Card>

        {/* Screening Information & Guidelines Sidebar */}
        <div className="space-y-4">
          <Card title="Screening Guidelines" accentColor="blue">
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                  1
                </span>
                <span>Ensure document image is clear, un-cropped, and well-lit with zero glare over MRZ zone.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                  2
                </span>
                <span>Both e-Passport MRZ lines (2-line or 3-line ID card formats) must be fully visible.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                  3
                </span>
                <span>Reference photo should be a frontal portrait with neutral expression for biometric matching.</span>
              </li>
            </ul>
          </Card>

          <Card title="Automated Screening Layers" accentColor="green">
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="font-medium text-slate-200">Zonal OCR Extraction</span>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">LAYER 1</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="font-medium text-slate-200">CV Hologram & Font Check</span>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">LAYER 2</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="font-medium text-slate-200">ICAO 9303 Checksum Math</span>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">LAYER 3</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="font-medium text-slate-200">Biometric Face Distance</span>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">LAYER 4</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="font-medium text-slate-200">Watchlist DB Check</span>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">LAYER 5</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadDocument;
