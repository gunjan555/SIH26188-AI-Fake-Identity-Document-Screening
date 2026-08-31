/**
 * Sample Document Verification Results Dataset
 * Used by VerificationResult.jsx and Processing.jsx
 */

export const sampleVerificationResults = {
  // 1. VERIFIED SAMPLE
  verified: {
    id: 'DOC-2026-8801',
    docType: 'Passport',
    subType: 'Standard e-Passport (ICAO 9303)',
    timestamp: '2026-08-31 18:55:02',
    riskScore: 12,
    finalDecision: 'VERIFIED',
    decisionSummary: 'Document passed all multi-layer security verifications. Low probability of tampering or fraud detected.',
    officer: 'Officer R. Sharma',
    
    // Module-wise Results
    modules: [
      {
        id: 'ocr',
        name: 'OCR Extraction',
        status: 'PASSED',
        score: 99,
        detail: 'High-confidence text extraction with zero character ambiguity across all mandatory zones.'
      },
      {
        id: 'cv_analysis',
        name: 'Document Computer Vision',
        status: 'PASSED',
        score: 96,
        detail: 'Holographic UV watermarks, guilloche patterns, and font alignments validated against standard template.'
      },
      {
        id: 'mrz',
        name: 'MRZ Checksum Validation',
        status: 'PASSED',
        score: 100,
        detail: 'Document number, DOB, expiry, and composite check digits calculated and verified against ICAO 9303 specs.'
      },
      {
        id: 'face_match',
        name: 'Face Biometric Match',
        status: 'PASSED',
        score: 94,
        similarity: '94.2%',
        detail: 'Document portrait photo matches uploaded live subject facial landmarks accurately.'
      },
      {
        id: 'database',
        name: 'Database Security Check',
        status: 'PASSED',
        score: 98,
        detail: 'No match in watchlists or reported lost/stolen document databases.'
      }
    ],

    // Extracted Fields
    extractedFields: {
      fullName: 'DAVID HENRY SMITH',
      documentNumber: 'P78192039',
      mrzCode: 'P<USASMITH<<DAVID<HENRY<<<<<<<<<<<<<<<<<<<<<\nP781920394USA8504123M2810158<<<<<<<<<<<<<<04',
      dateOfBirth: '1985-04-12',
      gender: 'MALE',
      nationality: 'UNITED STATES OF AMERICA (USA)',
      issuingCountry: 'USA',
      issueDate: '2018-10-15',
      expiryDate: '2028-10-15',
      authority: 'UNITED STATES DEPARTMENT OF STATE'
    },

    // Explainable AI Decision Section
    explanations: [
      {
        type: 'PASS',
        severity: 'LOW',
        title: 'MRZ Checksum Validity',
        message: 'All check digits (Doc Number, DOB, Expiry, Composite) match the expected Modulo 10 algorithm.'
      },
      {
        type: 'PASS',
        severity: 'LOW',
        title: 'Facial Biometric Alignment',
        message: 'Facial similarity between document portrait and live reference image is 94.2% (Threshold: 75%).'
      },
      {
        type: 'PASS',
        severity: 'LOW',
        title: 'Font & Layout Consistency',
        message: 'Font family, character spacing, and printing resolution match official issuing template.'
      }
    ]
  },

  // 2. SUSPICIOUS SAMPLE
  suspicious: {
    id: 'DOC-2026-8802',
    docType: 'National ID Card',
    subType: 'Citizen Identification Card',
    timestamp: '2026-08-31 19:10:45',
    riskScore: 68,
    finalDecision: 'SUSPICIOUS',
    decisionSummary: 'Potential facial biometric discrepancy and microprint blurring detected. Human officer inspection recommended.',
    officer: 'Officer A. Patel',

    // Module-wise Results
    modules: [
      {
        id: 'ocr',
        name: 'OCR Extraction',
        status: 'PASSED',
        score: 88,
        detail: 'Text extracted successfully, minor blurring on date of birth field.'
      },
      {
        id: 'cv_analysis',
        name: 'Document Computer Vision',
        status: 'SUSPICIOUS',
        score: 62,
        detail: 'Possible digital alteration detected around photograph border and microprint line.'
      },
      {
        id: 'mrz',
        name: 'MRZ Checksum Validation',
        status: 'PASSED',
        score: 95,
        detail: 'MRZ line check digits pass structural verification.'
      },
      {
        id: 'face_match',
        name: 'Face Biometric Match',
        status: 'SUSPICIOUS',
        score: 42,
        similarity: '42.1%',
        detail: 'Biometric distance is high. Subject facial geometry differs from document photo.'
      },
      {
        id: 'database',
        name: 'Database Security Check',
        status: 'PASSED',
        score: 90,
        detail: 'Document ID is registered, no immediate Interpol alert.'
      }
    ],

    // Extracted Fields
    extractedFields: {
      fullName: 'ELENA ROSTOVA',
      documentNumber: 'ID4401928',
      mrzCode: 'I<UKRROSTOVA<<ELENA<<<<<<<<<<<<<<<<<<<<<<<<\nID44019284UKR9211058F2905102<<<<<<<<<<<<<<02',
      dateOfBirth: '1992-11-05',
      gender: 'FEMALE',
      nationality: 'UKRAINE (UKR)',
      issuingCountry: 'UKR',
      issueDate: '2019-05-10',
      expiryDate: '2029-05-10',
      authority: 'STATE MIGRATION SERVICE OF UKRAINE'
    },

    // Explainable AI Decision Section
    explanations: [
      {
        type: 'FLAG',
        severity: 'MEDIUM',
        title: 'Biometric Face Discrepancy',
        message: 'Document photograph matches live camera image with only 42.1% confidence (Required > 75%). Possible impersonation or outdated document photo.'
      },
      {
        type: 'FLAG',
        severity: 'MEDIUM',
        title: 'Visual Photo Edge Anomaly',
        message: 'Computer Vision highlights pixel discontinuity near the portrait border, suggesting possible image replacement or overlay.'
      },
      {
        type: 'PASS',
        severity: 'LOW',
        title: 'Database & MRZ Validity',
        message: 'MRZ checksums are structurally valid and no report of stolen card registered.'
      }
    ]
  },

  // 3. HIGH RISK SAMPLE
  high_risk: {
    id: 'DOC-2026-8803',
    docType: 'Travel Visa',
    subType: 'Entry & Transit Visa Stamp',
    timestamp: '2026-08-31 19:22:10',
    riskScore: 91,
    finalDecision: 'HIGH RISK',
    decisionSummary: 'CRITICAL WARNING: Checksum failure, document forgery indicators, and database security flag detected.',
    officer: 'Officer R. Sharma',

    // Module-wise Results
    modules: [
      {
        id: 'ocr',
        name: 'OCR Extraction',
        status: 'SUSPICIOUS',
        score: 55,
        detail: 'Font mismatch detected on Visa Expiry and Serial Number zones.'
      },
      {
        id: 'cv_analysis',
        name: 'Document Computer Vision',
        status: 'FAILED',
        score: 24,
        detail: 'Security seal UV fluorescence pattern missing; clear digital manipulation signatures detected.'
      },
      {
        id: 'mrz',
        name: 'MRZ Checksum Validation',
        status: 'FAILED',
        score: 10,
        detail: 'Expiry Date check digit mismatch (Calculated: 7, Found: 2).'
      },
      {
        id: 'face_match',
        name: 'Face Biometric Match',
        status: 'FAILED',
        score: 31,
        similarity: '31.5%',
        detail: 'Severe facial structure mismatch between visa document photo and uploaded person image.'
      },
      {
        id: 'database',
        name: 'Database Security Check',
        status: 'FAILED',
        score: 0,
        detail: 'MATCH FOUND: Serial #V-908124 is flagged as fraudulent in Immigration Watch List.'
      }
    ],

    // Extracted Fields
    extractedFields: {
      fullName: 'VIKRAM ANAND MEHTA',
      documentNumber: 'V9081241',
      mrzCode: 'V<INDMEHTA<<VIKRAM<ANAND<<<<<<<<<<<<<<<<<<<<\nV90812414IND7803201M2608302<<<<<<<<<<<<<<08',
      dateOfBirth: '1978-03-20',
      gender: 'MALE',
      nationality: 'INDIA (IND)',
      issuingCountry: 'IND',
      issueDate: '2021-08-30',
      expiryDate: '2026-08-30 (EXPIRED)',
      authority: 'HIGH COMMISSION OF INDIA'
    },

    // Explainable AI Decision Section
    explanations: [
      {
        type: 'FLAG',
        severity: 'HIGH',
        title: 'Database Watch List Flag',
        message: 'Document Serial Number #V9081241 actively matches known fraudulent travel documents in national security watchlist.'
      },
      {
        type: 'FLAG',
        severity: 'HIGH',
        title: 'MRZ Checksum Math Mismatch',
        message: 'Calculated check digit for Expiry Date (260830) is 7, but MRZ contains digit 2. Indicates manual alteration of MRZ text.'
      },
      {
        type: 'FLAG',
        severity: 'HIGH',
        title: 'Expired Document & Seal Tampering',
        message: 'Document expired on August 30, 2026. Microprint and official state seal lack authentic UV light emission.'
      }
    ]
  }
};
