import { useEffect, useMemo, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { api } from './api';
import type { Application, DashboardData, Gateway, Program } from './types';

const nav = [
  ['/', 'Dashboard'],
  ['/programs', 'Programs'],
  ['/application', 'Application'],
  ['/documents', 'Documents'],
  ['/payments', 'Payments'],
  ['/tracking', 'Tracking'],
  ['/admin', 'Admin Config']
] as const;

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">N</div>
          <div>
            <strong>Niksera</strong>
            <span>Education Cloud</span>
          </div>
        </div>
        <nav>
          {nav.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">Applicant Demo<br /><small>2027 Admissions</small></div>
      </aside>
      <main className="main">
        <header className="topbar">
          <div>
            <span className="eyebrow">Niksera Innovation Private Limited</span>
            <h1>Education Admissions</h1>
          </div>
          <div className="avatar">DA</div>
        </header>
        {children}
      </main>
    </div>
  );
}

function Page({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="page">
      <div className="page-heading">
        <div><h2>{title}</h2><p>{subtitle}</p></div>
      </div>
      {children}
    </section>
  );
}

function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  useEffect(() => { api.dashboard().then(setData).catch(console.error); }, []);
  if (!data) return <Page title="Dashboard" subtitle="Loading your admission journey..."><div className="panel">Loading...</div></Page>;

  const stats = [
    ['Active Applications', data.activeApplications],
    ['Pending Documents', data.pendingDocuments],
    ['Pending Payments', data.pendingPayments],
    ['Offers', data.offers]
  ];

  return (
    <Page title={`Welcome, ${data.applicantName}`} subtitle="Track your application, documents, payments and next steps from one place.">
      <div className="stats">
        {stats.map(([label, value]) => <div className="stat-card" key={label}><span>{label}</span><strong>{value}</strong></div>)}
      </div>
      <div className="grid two">
        <div className="panel">
          <div className="panel-title"><h3>Application progress</h3><span className="badge blue">In progress</span></div>
          <div className="timeline">
            {data.timeline.map((step, index) => (
              <div className={`timeline-step ${step.state}`} key={step.label}>
                <div className="dot">{step.state === 'complete' ? '✓' : index + 1}</div>
                <div><strong>{step.label}</strong><small>{step.state === 'current' ? 'Current stage' : step.state === 'complete' ? 'Completed' : 'Pending'}</small></div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="panel-title"><h3>Next actions</h3></div>
          <div className="action-item"><div><strong>Upload semester marksheet</strong><p>Required for document verification</p></div><button>Upload</button></div>
          <div className="action-item"><div><strong>Pay application fee</strong><p>Select your institution gateway and payment method</p></div><NavLink className="button-link" to="/payments">Pay now</NavLink></div>
          <div className="info-box">Your application data can be stored in Salesforce while documents can use Salesforce Files or institution-owned cloud storage.</div>
        </div>
      </div>
    </Page>
  );
}

function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);
  useEffect(() => { api.programs().then(setPrograms).catch(console.error); }, []);
  return (
    <Page title="Programs" subtitle="Browse programs and available admission intakes.">
      <div className="program-grid">
        {programs.map(program => (
          <article className="program-card" key={program.id}>
            <span className="badge">{program.level}</span>
            <h3>{program.name}</h3>
            <p>{program.campus} · Intake {program.intake}</p>
            <div className="program-meta"><span>{program.code}</span><strong>₹{program.applicationFee.toLocaleString('en-IN')}</strong></div>
            <button>Start application</button>
          </article>
        ))}
      </div>
    </Page>
  );
}

function ApplicationPage() {
  const [application, setApplication] = useState<Application | null>(null);
  const [message, setMessage] = useState('');
  useEffect(() => { api.application('APP-000124').then(setApplication).catch(() => setApplication(null)); }, []);

  const submit = async () => {
    if (!application) return;
    const updated = await api.submitApplication(application.id);
    setApplication(updated);
    setMessage('Application submitted successfully.');
  };

  return (
    <Page title="Application" subtitle="A metadata-driven form can render different fields for each institution and program.">
      <div className="panel form-panel">
        <div className="stepper"><span className="active">1 Personal</span><span>2 Education</span><span>3 Documents</span><span>4 Review</span></div>
        <div className="form-grid">
          <label>First name<input defaultValue="Demo" /></label>
          <label>Last name<input defaultValue="Applicant" /></label>
          <label>Email<input defaultValue="demo.applicant@example.com" /></label>
          <label>Mobile<input defaultValue="+91 98765 43210" /></label>
          <label className="span-2">Address<textarea defaultValue="Bengaluru, Karnataka, India" /></label>
        </div>
        <div className="form-actions"><button className="secondary">Save draft</button><button onClick={submit}>Submit application</button></div>
        {message && <div className="success">{message}</div>}
      </div>
      {application && <div className="status-strip"><span>{application.id}</span><strong>{application.status}</strong><span>{application.currentStage}</span></div>}
    </Page>
  );
}

function Documents() {
  const documents = [
    ['10th Marksheet', 'Verified'],
    ['12th Marksheet', 'Verified'],
    ['Degree Certificate', 'Uploaded'],
    ['Final Semester Marksheet', 'Pending'],
    ['Identity Proof', 'Pending']
  ];
  return (
    <Page title="Documents" subtitle="Upload once, verify centrally, and choose where the physical files are stored.">
      <div className="panel">
        <table><thead><tr><th>Document</th><th>Storage</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>{documents.map(([name,status]) => <tr key={name}><td><strong>{name}</strong></td><td>Institution Storage</td><td><span className={`badge ${status === 'Verified' ? 'green' : status === 'Pending' ? 'amber' : 'blue'}`}>{status}</span></td><td><button className="small">{status === 'Pending' ? 'Upload' : 'View'}</button></td></tr>)}</tbody>
        </table>
      </div>
    </Page>
  );
}

function Payments() {
  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [gateway, setGateway] = useState('');
  const [method, setMethod] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => { api.gateways().then(data => { setGateways(data); setGateway(data[0]?.name || ''); }).catch(console.error); }, []);
  const selected = useMemo(() => gateways.find(item => item.name === gateway), [gateways, gateway]);
  useEffect(() => { setMethod(selected?.methods[0] || ''); }, [selected]);

  const pay = async () => {
    if (!gateway || !method) return;
    const result = await api.createPayment({ applicationId: 'APP-000124', amount: 2000, gateway, method }) as { id: string; status: string };
    setMessage(`${result.id} created. Status: ${result.status}`);
  };

  return (
    <Page title="Payments" subtitle="Select the payment gateway first. Available payment methods are then loaded for that gateway.">
      <div className="grid payment-layout">
        <div className="panel">
          <h3>Application fee</h3>
          <div className="amount">₹2,000</div>
          <p>Master of Business Administration · Intake 2027</p>
          <hr />
          <label>1. Select payment gateway
            <select value={gateway} onChange={e => setGateway(e.target.value)}>
              {gateways.map(item => <option key={item.name}>{item.name}</option>)}
            </select>
          </label>
          <div className="gateway-buttons">
            {gateways.map(item => <button key={item.name} className={gateway === item.name ? 'gateway active' : 'gateway'} onClick={() => setGateway(item.name)}>{item.name}</button>)}
          </div>
          <label>2. Payment method
            <select value={method} onChange={e => setMethod(e.target.value)}>
              {selected?.methods.map(item => <option key={item}>{item}</option>)}
            </select>
          </label>
          {method === 'Cash' && <div className="info-box">Cash payment will create a pending payment record. Finance staff can verify receipt and mark it successful.</div>}
          {method !== 'Cash' && method && <div className="payment-option"><strong>{method}</strong><span>Secure payment will continue through {gateway}.</span></div>}
          <button className="full" onClick={pay}>{method === 'Cash' ? 'Create cash payment' : `Pay securely with ${gateway}`}</button>
          {message && <div className="success">{message}</div>}
        </div>
        <div className="panel summary">
          <h3>Payment summary</h3>
          <div><span>Application</span><strong>APP-000124</strong></div>
          <div><span>Fee</span><strong>₹2,000</strong></div>
          <div><span>Gateway</span><strong>{gateway || '—'}</strong></div>
          <div><span>Method</span><strong>{method || '—'}</strong></div>
          <div className="total"><span>Total</span><strong>₹2,000</strong></div>
        </div>
      </div>
    </Page>
  );
}

function Tracking() {
  return (
    <Page title="Application Tracking" subtitle="A single timeline across application, evaluation, offer, payment and enrollment.">
      <div className="panel">
        <div className="tracking-row done"><div className="track-icon">✓</div><div><strong>Application submitted</strong><p>Application details received</p></div><time>Completed</time></div>
        <div className="tracking-row current"><div className="track-icon">2</div><div><strong>Document verification</strong><p>2 documents still required</p></div><time>In progress</time></div>
        <div className="tracking-row"><div className="track-icon">3</div><div><strong>Evaluation</strong><p>Starts after document verification</p></div><time>Pending</time></div>
        <div className="tracking-row"><div className="track-icon">4</div><div><strong>Selection & offer</strong><p>Decision and offer letter</p></div><time>Pending</time></div>
        <div className="tracking-row"><div className="track-icon">5</div><div><strong>Enrollment</strong><p>Activated after admission payment</p></div><time>Pending</time></div>
      </div>
    </Page>
  );
}

function Admin() {
  return (
    <Page title="Admin Configuration" subtitle="The same product is configured per institution rather than rebuilt for every client.">
      <div className="grid two">
        <div className="panel"><h3>Admission journey</h3><div className="config-list">{['Application','Document Verification','Entrance Exam','Interview','Evaluation','Selection','Offer','Payment','Enrollment'].map((x,i)=><div key={x}><span>{i+1}</span>{x}<button className="link">Edit</button></div>)}</div><button>+ Add stage</button></div>
        <div className="panel"><h3>Product configuration</h3>
          <label>Storage provider<select><option>Salesforce Files</option><option>AWS S3</option><option>Azure Blob</option><option>Google Cloud</option><option>Institution Storage</option></select></label>
          <label>Default payment gateway<select><option>Razorpay</option><option>PayU</option><option>Cashfree</option><option>BillDesk</option><option>Institutional Gateway</option></select></label>
          <label>Portal mode<select><option>React Headless Portal</option><option>Salesforce Experience Cloud</option></select></label>
          <button>Save configuration</button>
        </div>
      </div>
    </Page>
  );
}

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Shell>
  );
}
