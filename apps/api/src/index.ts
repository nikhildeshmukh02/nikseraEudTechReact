import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { applications, dashboard, payments, programs, timeline } from './mock.js';
import { SalesforceClient } from './salesforce.js';

const app = express();
const port = Number(process.env.PORT || 4000);
const useMock = (process.env.USE_MOCK ?? 'true').toLowerCase() === 'true';

app.use(cors({ origin: process.env.WEB_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

const sf = !useMock && process.env.SF_INSTANCE_URL && process.env.SF_ACCESS_TOKEN
  ? new SalesforceClient(process.env.SF_INSTANCE_URL, process.env.SF_ACCESS_TOKEN)
  : null;

function requireSalesforce() {
  if (!sf) throw new Error('Salesforce is not configured. Set USE_MOCK=false, SF_INSTANCE_URL and SF_ACCESS_TOKEN.');
  return sf;
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mode: useMock ? 'mock' : 'salesforce' });
});

app.get('/api/dashboard', (_req, res) => {
  res.json({ ...dashboard, timeline });
});

app.get('/api/programs', async (_req, res, next) => {
  try {
    if (useMock) return res.json(programs);
    const result = await requireSalesforce().getPrograms();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.get('/api/applications/:id', async (req, res, next) => {
  try {
    if (useMock) {
      const found = applications.find(item => item.id === req.params.id);
      return found ? res.json(found) : res.status(404).json({ message: 'Application not found' });
    }
    const result = await requireSalesforce().getApplication(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.post('/api/applications', async (req, res, next) => {
  try {
    if (useMock) {
      const program = programs.find(item => item.id === req.body.programId) ?? programs[0];
      const created = {
        id: `APP-${String(125 + applications.length).padStart(6, '0')}`,
        applicantName: req.body.applicantName || 'Demo Applicant',
        programId: program.id,
        programName: program.name,
        intake: program.intake,
        status: 'Draft',
        currentStage: 'Application',
        progress: 10
      };
      applications.push(created);
      return res.status(201).json(created);
    }
    const result = await requireSalesforce().createApplication(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

app.post('/api/applications/:id/submit', async (req, res, next) => {
  try {
    if (useMock) {
      const found = applications.find(item => item.id === req.params.id);
      if (!found) return res.status(404).json({ message: 'Application not found' });
      found.status = 'Submitted';
      found.currentStage = 'Document Verification';
      found.progress = 25;
      return res.json(found);
    }
    const result = await requireSalesforce().submitApplication(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.get('/api/payments', (_req, res) => {
  res.json(payments);
});

app.post('/api/payments', (req, res) => {
  const { applicationId, amount, gateway, method } = req.body;
  if (!applicationId || !amount || !gateway || !method) {
    return res.status(400).json({ message: 'applicationId, amount, gateway and method are required' });
  }

  const payment = {
    id: `PAY-${String(payments.length + 1).padStart(6, '0')}`,
    applicationId,
    amount: Number(amount),
    gateway,
    method,
    status: method === 'Cash' ? 'Pending' : 'Initiated'
  };
  payments.push(payment);
  res.status(201).json(payment);
});

app.get('/api/config/payment-gateways', (_req, res) => {
  res.json([
    { name: 'Razorpay', methods: ['UPI', 'Credit/Debit Card', 'Net Banking', 'Wallet'] },
    { name: 'PayU', methods: ['UPI', 'Credit/Debit Card', 'Net Banking', 'EMI'] },
    { name: 'Cashfree', methods: ['UPI', 'Credit/Debit Card', 'Net Banking'] },
    { name: 'BillDesk', methods: ['Credit/Debit Card', 'Net Banking', 'UPI'] },
    { name: 'Institutional Gateway', methods: ['Credit/Debit Card', 'Net Banking', 'Cash'] }
  ]);
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = error instanceof Error ? error.message : 'Unexpected error';
  res.status(500).json({ message });
});

app.listen(port, () => {
  console.log(`Niksera API listening on http://localhost:${port} (${useMock ? 'mock' : 'salesforce'} mode)`);
});
