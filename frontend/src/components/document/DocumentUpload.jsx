import React, { useState, useRef } from 'react';
import {
  Upload,
  FileCheck,
  UserCheck,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
  CheckCircle2,
  FileText
} from 'lucide-react';
import Button from '../common/Button';
import FilePreview from './FilePreview';

const DocumentUpload = ({ onStartVerification }) => {
  const [documentType, setDocumentType] = useState('Passport');
  const [docFile, setDocFile] = useState(null);
  const [personFile, setPersonFile] = useState(null);
  const [docPreviewUrl, setDocPreviewUrl] = useState(null);
  const [personPreviewUrl, setPersonPreviewUrl] = useState(null);
  const [sampleScenario, setSampleScenario] = useState('suspicious');
  const [errorMsg, setErrorMsg] = useState('');

  const docInputRef = useRef(null);
  const personInputRef = useRef(null);

  const docTypes = [
    { id: 'Passport', name: 'Passport (ICAO 9303)', icon: FileText, desc: 'e-Passport or Standard Machine Readable Passport' },
    { id: 'National ID', name: 'National ID Card', icon: FileCheck, desc: 'Government Issued Identity Card' },
    { id: 'Travel Visa', name: 'Travel Visa / Permit', icon: FileText, desc: 'Entry or Transit Visa Document Stamp' },
    { id: 'Driver License', name: 'Driver License', icon: UserCheck, desc: 'Official State Driver License Card' }
  ];

  const handleDocFileSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      setErrorMsg('Please upload a valid image file (JPG, PNG, WEBP) or PDF.');
      return;
    }
    setErrorMsg('');
    setDocFile(file);
    setDocPreviewUrl(URL.createObjectURL(file));
  };

  const handlePersonFileSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Person photo must be an image file (JPG, PNG).');
      return;
    }
    setErrorMsg('');
    setPersonFile(file);
    setPersonPreviewUrl(URL.createObjectURL(file));
  };

  // Hackathon Quick Demo Sample Pre-loader
  const loadDemoSample = (scenarioType) => {
    setSampleScenario(scenarioType);
    setErrorMsg('');

    // Pre-populate with high quality demo visuals
    if (scenarioType === 'verified') {
      setDocumentType('Passport');
      setDocPreviewUrl('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800');
      setDocFile({ name: 'passport_david_smith_sample.jpg', size: 1840000, type: 'image/jpeg' });
      setPersonPreviewUrl('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400');
      setPersonFile({ name: 'live_photo_david_smith.jpg', size: 920000, type: 'image/jpeg' });
    } else if (scenarioType === 'suspicious') {
      setDocumentType('National ID');
      setDocPreviewUrl('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800');
      setDocFile({ name: 'national_id_elena_rostova.jpg', size: 2100000, type: 'image/jpeg' });
      setPersonPreviewUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400');
      setPersonFile({ name: 'live_camera_elena.jpg', size: 850000, type: 'image/jpeg' });
    } else if (scenarioType === 'high_risk') {
      setDocumentType('Travel Visa');
      setDocPreviewUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800');
      setDocFile({ name: 'travel_visa_flagged_sample.jpg', size: 3400000, type: 'image/jpeg' });
      setPersonPreviewUrl('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400');
      setPersonFile({ name: 'live_photo_subject_v.jpg', size: 1100000, type: 'image/jpeg' });
    }
  };

  const handleStartSubmit = () => {
    if (!docFile && !docPreviewUrl) {
      setErrorMsg('Please select or upload an identity/travel document first.');
      return;
    }
    if (onStartVerification) {
      onStartVerification({
        documentType,
        docFile,
        personFile,
        sampleScenario
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Demo Pre-loader Box (Smart India Hackathon Feature) */}
      <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-500/30 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 border border-blue-400/40 rounded-lg text-blue-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">SIH Demonstration Quick Load</h4>
            <p className="text-xs text-slate-400">Load sample document & person photos for instant jury evaluation.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={() => loadDemoSample('verified')}
            className={`flex-1 md:flex-none px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              sampleScenario === 'verified' && docPreviewUrl
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 ring-1 ring-emerald-500/50'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            Pass Sample (Low Risk)
          </button>
          <button
            type="button"
            onClick={() => loadDemoSample('suspicious')}
            className={`flex-1 md:flex-none px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              sampleScenario === 'suspicious' && docPreviewUrl
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 ring-1 ring-amber-500/50'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            Suspicious Sample
          </button>
          <button
            type="button"
            onClick={() => loadDemoSample('high_risk')}
            className={`flex-1 md:flex-none px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              sampleScenario === 'high_risk' && docPreviewUrl
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 ring-1 ring-rose-500/50'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            High Risk Sample
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-rose-500/15 border border-rose-500/30 rounded-lg text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Document Type Selector Grid */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          1. Select Document Category
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {docTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = documentType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setDocumentType(type.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-600/15 border-blue-500 text-slate-100 ring-1 ring-blue-500/40'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                </div>
                <h5 className="mt-2 text-xs font-bold text-slate-100">{type.name}</h5>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{type.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dual Upload Dropzone Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Box 1: Document Image */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            2. Upload Document Scan / Photo <span className="text-rose-400">*</span>
          </label>

          <input
            type="file"
            ref={docInputRef}
            onChange={(e) => handleDocFileSelect(e.target.files[0])}
            accept="image/*,.pdf"
            className="hidden"
          />

          {!docPreviewUrl ? (
            <div
              onClick={() => docInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-blue-500/70 bg-slate-900/60 hover:bg-slate-900 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[220px] group"
            >
              <div className="p-3 bg-slate-800 group-hover:bg-blue-600/20 text-slate-400 group-hover:text-blue-400 rounded-full transition-colors mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-slate-200">
                Drag & Drop Document Image here or <span className="text-blue-400 underline">Browse</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Supports JPG, PNG, WEBP, or high-res PDF (Max 15MB)</p>
            </div>
          ) : (
            <FilePreview
              title="Document Image Loaded"
              fileName={docFile?.name || `${documentType}_scan.jpg`}
              fileSize={docFile?.size || 1840000}
              previewUrl={docPreviewUrl}
              onRemove={() => {
                setDocFile(null);
                setDocPreviewUrl(null);
              }}
            />
          )}
        </div>

        {/* Upload Box 2: Person Photo */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            3. Upload Live Person / Reference Photo <span className="text-slate-500">(Optional for Face Match)</span>
          </label>

          <input
            type="file"
            ref={personInputRef}
            onChange={(e) => handlePersonFileSelect(e.target.files[0])}
            accept="image/*"
            className="hidden"
          />

          {!personPreviewUrl ? (
            <div
              onClick={() => personInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-blue-500/70 bg-slate-900/60 hover:bg-slate-900 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[220px] group"
            >
              <div className="p-3 bg-slate-800 group-hover:bg-blue-600/20 text-slate-400 group-hover:text-blue-400 rounded-full transition-colors mb-3">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-slate-200">
                Upload Live Subject Photograph or <span className="text-blue-400 underline">Browse</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Used for facial biometric cross-matching against document portrait</p>
            </div>
          ) : (
            <FilePreview
              title="Person Photo Loaded"
              fileName={personFile?.name || 'live_person_camera.jpg'}
              fileSize={personFile?.size || 920000}
              previewUrl={personPreviewUrl}
              onRemove={() => {
                setPersonFile(null);
                setPersonPreviewUrl(null);
              }}
            />
          )}
        </div>
      </div>

      {/* Bottom Action Trigger */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <p className="text-xs text-slate-400">
          Document will undergo multi-stage OCR, CV, MRZ, Face, and DB screening.
        </p>

        <Button
          variant="primary"
          size="lg"
          icon={Sparkles}
          onClick={handleStartSubmit}
          disabled={!docPreviewUrl}
        >
          START MULTI-LAYER VERIFICATION
        </Button>
      </div>
    </div>
  );
};

export default DocumentUpload;
