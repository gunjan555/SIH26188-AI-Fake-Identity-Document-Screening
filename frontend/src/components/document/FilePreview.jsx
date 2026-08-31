import React, { useState } from 'react';
import { X, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { formatFileSize } from '../../utils/helpers';

const FilePreview = ({
  title = 'Uploaded File',
  fileName = 'document_scan.jpg',
  fileSize = 1024000,
  previewUrl = null,
  onRemove
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between min-h-[220px]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-200">{title}</span>
          </div>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-md transition-colors"
              title="Remove File"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Preview Thumbnail Container */}
        <div className="my-3 relative group rounded-lg overflow-hidden bg-slate-950 border border-slate-800 h-28 flex items-center justify-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={fileName}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <FileText className="w-10 h-10 text-slate-600" />
          )}

          {/* Hover Zoom Overlay */}
          {previewUrl && (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-xs font-semibold text-white transition-opacity"
            >
              <Eye className="w-4 h-4" />
              <span>Full View</span>
            </button>
          )}
        </div>

        {/* File Metadata */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
          <span className="font-mono truncate max-w-[180px]" title={fileName}>
            {fileName}
          </span>
          <span className="font-mono text-slate-500">{formatFileSize(fileSize)}</span>
        </div>
      </div>

      {/* Full Modal Viewer */}
      {showModal && previewUrl && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xs font-mono text-slate-200">{fileName}</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center max-h-[70vh] overflow-auto bg-slate-950">
              <img src={previewUrl} alt={fileName} className="max-w-full max-h-[65vh] object-contain" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilePreview;
