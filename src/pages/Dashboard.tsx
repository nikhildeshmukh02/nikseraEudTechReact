import {applications} from "../data/mock";
export default function Dashboard(){
 const app=applications[0];
 return <section className="page">
  <div className="hero"><div><span className="eyebrow">WELCOME BACK</span><h1>Your admission journey, in one place.</h1><p>Complete your application, upload documents, make payments and follow every admission milestone.</p></div><button className="primary">Continue application</button></div>
  <div className="stats"><div className="stat"><span>Application</span><strong>{app.id}</strong></div><div className="stat"><span>Status</span><strong>{app.status}</strong></div><div className="stat"><span>Current stage</span><strong>{app.stage}</strong></div><div className="stat"><span>Completion</span><strong>{app.completion}%</strong></div></div>
  <div className="grid two"><div className="card"><h3>Next actions</h3><div className="task">Upload final semester marksheet <span>Required</span></div><div className="task">Pay application fee <span>₹2,000</span></div><div className="task done">Personal information completed <span>Done</span></div></div>
  <div className="card"><h3>Application progress</h3><div className="progress"><i style={{width:app.completion+"%"}}/></div><p className="muted">Document Verification is currently in progress.</p></div></div>
 </section>;
}
