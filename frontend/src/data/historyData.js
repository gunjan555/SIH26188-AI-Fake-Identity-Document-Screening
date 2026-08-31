/**
 * Verification History Mock Dataset
 */

export const historyRecords = [
  {
    id: 'DOC-2026-8803',
    docType: 'Travel Visa',
    personName: 'Vikram A. Mehta',
    docNumber: 'V-908124',
    country: 'IND',
    officer: 'Officer R. Sharma',
    timestamp: '2026-08-31 19:22:10',
    riskScore: 91,
    status: 'HIGH RISK',
    flagCount: 3,
    reasons: ['MRZ expiration date checksum error', 'Interpol watch database watch flag', 'Visual layout tampering near visa seal']
  },
  {
    id: 'DOC-2026-8802',
    docType: 'National ID',
    personName: 'Elena Rostova',
    docNumber: 'ID-440192',
    country: 'UKR',
    officer: 'Officer A. Patel',
    timestamp: '2026-08-31 19:10:45',
    riskScore: 68,
    status: 'SUSPICIOUS',
    flagCount: 2,
    reasons: ['Face match similarity score 42% (below 75% threshold)', 'Microprint text blurring near DOB']
  },
  {
    id: 'DOC-2026-8801',
    docType: 'Passport',
    personName: 'David H. Smith',
    docNumber: 'P-781920',
    country: 'USA',
    officer: 'Officer R. Sharma',
    timestamp: '2026-08-31 18:55:02',
    riskScore: 12,
    status: 'VERIFIED',
    flagCount: 0,
    reasons: ['All multi-layer biometric and MRZ checks passed']
  },
  {
    id: 'DOC-2026-8800',
    docType: 'Passport',
    personName: 'Priya N. Sundaram',
    docNumber: 'P-992104',
    country: 'IND',
    officer: 'Officer M. Khan',
    timestamp: '2026-08-31 18:30:15',
    riskScore: 18,
    status: 'VERIFIED',
    flagCount: 0,
    reasons: ['All multi-layer biometric and MRZ checks passed']
  },
  {
    id: 'DOC-2026-8799',
    docType: 'Driver License',
    personName: 'Carlos M. Gomez',
    docNumber: 'DL-88120',
    country: 'MEX',
    officer: 'Officer A. Patel',
    timestamp: '2026-08-31 17:42:00',
    riskScore: 84,
    status: 'HIGH RISK',
    flagCount: 2,
    reasons: ['Sub-surface hologram missing under UV lighting analysis', 'Font kerning anomaly detected']
  },
  {
    id: 'DOC-2026-8798',
    docType: 'Passport',
    personName: 'Sarah L. Jenkins',
    docNumber: 'P-449102',
    country: 'GBR',
    officer: 'Officer R. Sharma',
    timestamp: '2026-08-31 16:15:30',
    riskScore: 22,
    status: 'VERIFIED',
    flagCount: 0,
    reasons: ['All checks passed']
  },
  {
    id: 'DOC-2026-8797',
    docType: 'National ID',
    personName: 'Mohammed Al-Mansoor',
    docNumber: 'ID-990182',
    country: 'ARE',
    officer: 'Officer M. Khan',
    timestamp: '2026-08-31 15:50:12',
    riskScore: 62,
    status: 'SUSPICIOUS',
    flagCount: 1,
    reasons: ['Expiry date mismatch against central immigration registry']
  },
  {
    id: 'DOC-2026-8796',
    docType: 'Travel Visa',
    personName: 'Chen Wei',
    docNumber: 'V-109283',
    country: 'CHN',
    officer: 'Officer A. Patel',
    timestamp: '2026-08-31 14:20:00',
    riskScore: 15,
    status: 'VERIFIED',
    flagCount: 0,
    reasons: ['All checks passed']
  }
];
