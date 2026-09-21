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

export type Payment = {
  id: string;
  applicationId: string;
  amount: number;
  gateway: string;
  method: string;
  status: string;
  reference?: string;
};
