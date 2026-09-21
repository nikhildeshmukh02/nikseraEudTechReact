import {useMemo,useState} from "react";
import type {PaymentGateway,PaymentMethod} from "../types";

const methods:Record<PaymentGateway,PaymentMethod[]>={
 "Razorpay":["UPI","Credit/Debit Card","Net Banking","Wallet"],
 "PayU":["UPI","Credit/Debit Card","Net Banking","Wallet","EMI"],
 "Cashfree":["UPI","Credit/Debit Card","Net Banking"],
 "BillDesk":["Credit/Debit Card","Net Banking","UPI"],
 "Institutional Gateway":["UPI","Credit/Debit Card","Net Banking","Cash"]
};
const gateways=Object.keys(methods) as PaymentGateway[];

export default function Payments(){
 const [gateway,setGateway]=useState<PaymentGateway>("Razorpay");
 const options=useMemo(()=>methods[gateway],[gateway]);
 const [method,setMethod]=useState<PaymentMethod>("UPI");
 const [paid,setPaid]=useState(false);
 function selectGateway(g:PaymentGateway){setGateway(g);setMethod(methods[g][0]);setPaid(false);}
 return <section className="page">
  <div className="page-head"><div><span className="eyebrow">PAYMENTS</span><h1>Application fee</h1><p className="muted">Select a payment gateway first, then choose one of the payment methods supported by that gateway.</p></div><div className="amount"><span>Amount due</span><strong>₹2,000</strong></div></div>
  <div className="grid two payment-grid">
   <div className="card">
    <h3>1. Select payment gateway</h3>
    <div className="gateway-grid">{gateways.map(g=><button key={g} className={"gateway "+(gateway===g?"selected":"")} onClick={()=>selectGateway(g)}><strong>{g}</strong><small>{g==="Institutional Gateway"?"University configured":"Online gateway"}</small></button>)}</div>
    <h3 className="section-title">2. Select payment method</h3>
    <div className="method-list">{options.map(m=><label key={m} className={"method "+(method===m?"selected":"")}><input type="radio" name="method" checked={method===m} onChange={()=>setMethod(m)}/><span><strong>{m}</strong><small>{m==="Cash"?"Pay at institution counter":"Secure online payment"}</small></span></label>)}</div>
   </div>
   <div className="card summary-card">
    <h3>Payment summary</h3>
    <div className="summary-row"><span>Application</span><strong>APP-000123</strong></div>
    <div className="summary-row"><span>Gateway</span><strong>{gateway}</strong></div>
    <div className="summary-row"><span>Method</span><strong>{method}</strong></div>
    <div className="summary-row total"><span>Total</span><strong>₹2,000</strong></div>
    <button className="primary full" onClick={()=>setPaid(true)}>{method==="Cash"?"Generate cash payment instruction":"Pay ₹2,000"}</button>
    {paid&&<div className="success">{method==="Cash"?"Cash payment instruction generated for demo.":"Payment initiated successfully for demo."}</div>}
    <p className="tiny">Production gateway credentials and webhook verification will live in the Node.js/Salesforce integration layer, never in the React browser app.</p>
   </div>
  </div>
 </section>;
}
