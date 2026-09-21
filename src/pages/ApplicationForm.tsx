import {useState} from "react";
export default function ApplicationForm(){
 const [saved,setSaved]=useState(false);
 return <section className="page"><div className="page-head"><div><span className="eyebrow">APPLICATION APP-000123</span><h1>MBA Application</h1><p className="muted">Dynamic form fields will eventually come from the Niksera configuration API.</p></div></div>
 <div className="stepper"><b className="on">1 Personal</b><b>2 Education</b><b>3 Documents</b><b>4 Review</b></div>
 <div className="card form-card"><h3>Personal information</h3><div className="form-grid"><label>First name<input defaultValue="Nikhil"/></label><label>Last name<input defaultValue="Deshmukh"/></label><label>Email<input defaultValue="applicant@example.com"/></label><label>Mobile<input placeholder="+91"/></label><label>Date of birth<input type="date"/></label><label>Nationality<select><option>Indian</option><option>Other</option></select></label></div>
 <div className="actions"><button className="secondary">Save draft</button><button className="primary" onClick={()=>setSaved(true)}>Save & Continue</button></div>{saved&&<div className="success">Application section saved for demo.</div>}</div></section>;
}
