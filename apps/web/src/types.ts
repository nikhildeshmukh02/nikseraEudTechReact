export type Program = {
  id: string;
  name: string;
  code: string;
  level: string;
  campus: string;
  intake: string;
  applicationFee: number;
};

export type Application = {
  id: string;
  applicantName: string;
  programId: string;
  programName: string;
  intake: string;
  status: string;
  currentStage: string;
  progress: number;
};

export type Gateway = {
  name: string;
  methods: string[];
};

export type DashboardData = {
  applicantName: string;
  activeApplications: number;
  pendingDocuments: number;
  pendingPayments: number;
  offers: number;
  timeline: { label: string; state: 'complete' | 'current' | 'pending' }[];
};
