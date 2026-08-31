/**
 * Helper Utility Functions for SIH26188 Screening System
 */

/**
 * Returns Tailwind color classes based on document risk score
 * Risk Scores:
 * 0 - 30 : Low Risk / Verified (Green)
 * 31 - 70 : Suspicious (Orange / Amber)
 * 71 - 100 : High Risk / Fraud (Red)
 */
export const getRiskScoreColor = (score) => {
  if (score <= 30) {
    return {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      stroke: '#10b981',
      label: 'Low Risk',
      status: 'VERIFIED'
    };
  } else if (score <= 70) {
    return {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      stroke: '#f59e0b',
      label: 'Suspicious',
      status: 'SUSPICIOUS'
    };
  } else {
    return {
      text: 'text-rose-500',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      stroke: '#ef4444',
      label: 'High Risk',
      status: 'HIGH RISK'
    };
  }
};

/**
 * Formats ISO date strings or Date objects into standardized UI dates
 */
export const formatDate = (dateString, includeTime = true) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    ...(includeTime && { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

/**
 * Converts bytes to human readable format (KB, MB)
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Returns formatted status metadata for badges
 */
export const getStatusConfig = (status) => {
  switch (status?.toUpperCase()) {
    case 'VERIFIED':
    case 'PASSED':
    case 'LOW RISK':
      return {
        label: 'Verified',
        badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 icon-check',
        dotClass: 'bg-emerald-500'
      };
    case 'SUSPICIOUS':
    case 'FLAGGED':
    case 'WARNING':
      return {
        label: 'Suspicious',
        badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30 icon-alert',
        dotClass: 'bg-amber-500'
      };
    case 'HIGH RISK':
    case 'FAILED':
    case 'FRAUD':
    case 'CRITICAL':
      return {
        label: 'High Risk',
        badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30 icon-x',
        dotClass: 'bg-rose-500'
      };
    default:
      return {
        label: status || 'Pending',
        badgeClass: 'bg-slate-700/40 text-slate-300 border-slate-600/40',
        dotClass: 'bg-slate-400'
      };
  }
};
