import type { Application, Payment, Program } from './types.js';

export const programs: Program[] = [
  { id: 'a01DEMO001', name: 'Master of Business Administration', code: 'MBA', level: 'Postgraduate', campus: 'Main Campus', intake: '2027', applicationFee: 2000 },
  { id: 'a01DEMO002', name: 'Bachelor of Computer Applications', code: 'BCA', level: 'Undergraduate', campus: 'Technology Campus', intake: '2027', applicationFee: 1200 },
  { id: 'a01DEMO003', name: 'M.Tech Artificial Intelligence', code: 'MTAI', level: 'Postgraduate', campus: 'Technology Campus', intake: '2027', applicationFee: 1800 }
];

export const applications: Application[] = [
  {
    id: 'APP-000124',
    applicantName: 'Demo Applicant',
    programId: 'a01DEMO001',
    programName: 'Master of Business Administration',
    intake: '2027',
    status: 'Under Review',
    currentStage: 'Document Verification',
    progress: 42
  }
];

export const payments: Payment[] = [];

export const dashboard = {
  applicantName: 'Demo Applicant',
  activeApplications: 1,
  pendingDocuments: 2,
  pendingPayments: 1,
  offers: 0
};

export const timeline = [
  { label: 'Application', state: 'complete' },
  { label: 'Document Verification', state: 'current' },
  { label: 'Evaluation', state: 'pending' },
  { label: 'Selection', state: 'pending' },
  { label: 'Offer', state: 'pending' },
  { label: 'Payment', state: 'pending' },
  { label: 'Enrollment', state: 'pending' }
];
