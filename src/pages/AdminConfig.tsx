import {useState} from "react";
const initial=["Application","Document Verification","Entrance Exam","Interview","Evaluation","Selection","Offer","Payment","Enrollment"];
export default function AdminConfig(){
 const [stages,setStages]=useState(initial);
 return <section className="page"><div className="page-head"><div><span className="eyebrow">ADMIN CONFIGURATION</span><h1>Admission process builder</h1><p className="muted">Configure an admission journey without changing the applicant UI code.</p></div><button className="primary" onClick={()=>setStages([...stages,"New Stage"])}>+ Add stage</button></div>
 <div className="grid config-grid"><div className="card"><h3>Program configuration</h3><label>Institution<select><option>Niksera University</option></select></label><label>Program<select><option>MBA</option></select></label><label>Intake<select><option>2027 Intake</option></select></label><label>Admission process<input defaultValue="MBA Admission 2027"/></label></div>
 <div className="card"><h3>Process stages</h3><div className="stage-list">{stages.map((s,i)=><div className="stage-item" key={i}><span>{i+1}</span><input value={s} onChange={e=>setStages(stages.map((v,j)=>j===i?e.target.value:v))}/><button className="icon-btn" onClick={()=>setStages(stages.filter((_,j)=>j!==i))}>×</button></div>)}</div></div></div></section>;
}
