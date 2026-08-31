/**
 * Central Dashboard Mock Dataset
 * SIH26188 – AI-Based Fake Identity & Document Screening System
 */

export const dashboardStats = {
  totalVerified: 1428,
  totalVerifiedTrend: '+12.4%',
  lowRiskCount: 1180,
  lowRiskPercentage: '82.6%',
  suspiciousCount: 184,
  suspiciousPercentage: '12.9%',
  highRiskCount: 64,
  highRiskPercentage: '4.5%',
  todayScans: 142,
  activeAlerts: 6
};

export const riskDistributionData = [
  { name: 'Low Risk (Verified)', value: 1180, color: '#10b981' },
  { name: 'Suspicious', value: 184, color: '#f59e0b' },
  { name: 'High Risk (Flagged)', value: 64, color: '#ef4444' },
];

export const dailyScanTrends = [
  { day: 'Mon', lowRisk: 140, suspicious: 18, highRisk: 6 },
  { day: 'Tue', lowRisk: 165, suspicious: 22, highRisk: 8 },
  { day: 'Wed', lowRisk: 190, suspicious: 15, highRisk: 5 },
  { day: 'Thu', lowRisk: 175, suspicious: 30, highRisk: 12 },
  { day: 'Fri', lowRisk: 210, suspicious: 28, highRisk: 9 },
  { day: 'Sat', lowRisk: 150, suspicious: 40, highRisk: 14 },
  { day: 'Sun', lowRisk: 150, suspicious: 31, highRisk: 10 },
];

export const recentActivities = [
  {
    id: 'DOC-2026-8803',
    docType: 'Travel Visa',
    personName: 'Vikram A. Mehta',
    docNumber: 'V-908124',
    officer: 'Officer R. Sharma',
    timestamp: '2026-08-31 19:22:10',
    riskScore: 91,
    status: 'HIGH RISK',
    primaryFlag: 'MRZ Checksum Failed & Flagged in DB'
  },
  {
    id: 'DOC-2026-8802',
    docType: 'National ID',
    personName: 'Elena Rostova',
    docNumber: 'ID-440192',
    officer: 'Officer A. Patel',
    timestamp: '2026-08-31 19:10:45',
    riskScore: 68,
    status: 'SUSPICIOUS',
    primaryFlag: 'Face Biometric Mismatch (42% similarity)'
  },
  {
    id: 'DOC-2026-8801',
    docType: 'Passport',
    personName: 'David H. Smith',
    docNumber: 'P-781920',
    officer: 'Officer R. Sharma',
    timestamp: '2026-08-31 18:55:02',
    riskScore: 12,
    status: 'VERIFIED',
    primaryFlag: 'All AI checks passed cleanly'
  },
  {
    id: 'DOC-2026-8800',
    docType: 'Passport',
    personName: 'Priya N. Sundaram',
    docNumber: 'P-992104',
    officer: 'Officer M. Khan',
    timestamp: '2026-08-31 18:30:15',
    riskScore: 18,
    status: 'VERIFIED',
    primaryFlag: 'All AI checks passed cleanly'
  },
  {
    id: 'DOC-2026-8799',
    docType: 'Driver License',
    personName: 'Carlos M. Gomez',
    docNumber: 'DL-88120',
    officer: 'Officer A. Patel',
    timestamp: '2026-08-31 17:42:00',
    riskScore: 84,
    status: 'HIGH RISK',
    primaryFlag: 'Font Inconsistency & Hologram Anomaly'
  }
];
