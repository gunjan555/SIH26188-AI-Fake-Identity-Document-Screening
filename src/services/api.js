import axios from 'axios';
import { dashboardStats, recentActivities, riskDistributionData } from '../data/dashboardData';
import { historyRecords } from '../data/historyData';
import { sampleVerificationResults } from '../data/verificationData';

// API Client configuration for future backend services
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for inserting Auth token when real auth is enabled
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sih_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * MOCK API IMPLEMENTATIONS
 * These simulate server response delays while maintaining accurate API interfaces.
 */

// 1. User Authentication
export const login = async (credentials) => {
  // TODO: Replace with real backend POST /api/auth/login endpoint
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (credentials.email && credentials.password) {
    const mockUser = {
      id: 'usr_8921',
      name: credentials.email.split('@')[0].toUpperCase() || 'OFFICER R. SHARMA',
      email: credentials.email,
      role: credentials.role || 'SECURITY OFFICER',
      badgeId: 'SEC-IND-8842',
      station: 'IGIA Terminal 3 - Gate 14B',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
    };

    localStorage.setItem('sih_auth_token', 'demo_jwt_token_sih26188');
    localStorage.setItem('sih_user', JSON.stringify(mockUser));

    return { success: true, user: mockUser, token: 'demo_jwt_token_sih26188' };
  }
  throw new Error('Invalid security credentials');
};

// 2. Fetch Central Dashboard Statistics
export const getDashboardStats = async () => {
  // TODO: Replace with real backend GET /api/dashboard/stats endpoint
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    stats: dashboardStats,
    chartData: riskDistributionData,
    recentActivity: recentActivities
  };
};

// 3. Upload Identity & Travel Documents
export const uploadDocument = async (formData) => {
  // TODO: Replace with real backend POST /api/documents/upload endpoint (multipart/form-data)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const docId = `DOC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  return {
    success: true,
    documentId: docId,
    status: 'UPLOADED',
    message: 'Files uploaded successfully and queued for AI screening.'
  };
};

// 4. Start AI Screening & Verification Pipeline
export const startVerification = async (documentId, selectedSampleType = 'suspicious') => {
  // TODO: Replace with real AI pipeline POST /api/verification/start endpoint
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    success: true,
    documentId,
    selectedSampleType,
    message: 'Screening pipeline initiated.'
  };
};

// 5. Get Verification Result by Document ID
export const getVerificationResult = async (documentId, sampleType = 'suspicious') => {
  // TODO: Replace with real backend GET /api/verification/result/:id endpoint
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (sampleVerificationResults[documentId]) {
    return sampleVerificationResults[documentId];
  }
  
  if (sampleType && sampleVerificationResults[sampleType]) {
    return sampleVerificationResults[sampleType];
  }

  // Default fallback
  return sampleVerificationResults['suspicious'];
};

// 6. Get Verification History
export const getVerificationHistory = async (params = {}) => {
  // TODO: Replace with real backend GET /api/history endpoint
  await new Promise((resolve) => setTimeout(resolve, 400));
  
  let records = [...historyRecords];

  if (params.search) {
    const query = params.search.toLowerCase();
    records = records.filter(
      r => r.id.toLowerCase().includes(query) ||
           r.personName.toLowerCase().includes(query) ||
           r.docNumber.toLowerCase().includes(query)
    );
  }

  if (params.status && params.status !== 'ALL') {
    records = records.filter(r => r.status === params.status);
  }

  if (params.docType && params.docType !== 'ALL') {
    records = records.filter(r => r.docType === params.docType);
  }

  return {
    records,
    totalCount: records.length
  };
};

// 7. Get High Risk Flagged Cases
export const getHighRiskCases = async () => {
  // TODO: Replace with real backend GET /api/high-risk-cases endpoint
  await new Promise((resolve) => setTimeout(resolve, 350));
  const highRisk = historyRecords.filter(r => r.status === 'HIGH RISK' || r.riskScore >= 70);
  return {
    cases: highRisk,
    count: highRisk.length
  };
};

// 8. Get Security System Alerts
export const getAlerts = async () => {
  // TODO: Replace with real backend GET /api/alerts endpoint
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [
    {
      id: 'ALT-109',
      title: 'High Risk Document Detected',
      description: 'Travel Visa #V-90812 failed MRZ checksum and flagged in immigration database.',
      time: '10 mins ago',
      severity: 'HIGH',
      documentId: 'DOC-2026-8803'
    },
    {
      id: 'ALT-108',
      title: 'Biometric Face Mismatch',
      description: 'Document photograph similarity score only 42% against uploaded live photo.',
      time: '25 mins ago',
      severity: 'HIGH',
      documentId: 'DOC-2026-8802'
    },
    {
      id: 'ALT-107',
      title: 'Visual Anomaly Flagged',
      description: 'Microprint font irregularity detected around birth date area.',
      time: '1 hour ago',
      severity: 'MEDIUM',
      documentId: 'DOC-2026-8802'
    },
    {
      id: 'ALT-106',
      title: 'Expired Passport Attempt',
      description: 'Passport #P-78192 expired on 2025-11-12.',
      time: '3 hours ago',
      severity: 'MEDIUM',
      documentId: 'DOC-2026-8801'
    }
  ];
};

export default apiClient;
