export type Program={id:string;name:string;level:string;campus:string;intake:string;fee:number};
export type Application={id:string;programName:string;status:string;stage:string;completion:number};
export type PaymentGateway="Razorpay"|"PayU"|"Cashfree"|"BillDesk"|"Institutional Gateway";
export type PaymentMethod="UPI"|"Credit/Debit Card"|"Net Banking"|"Wallet"|"EMI"|"Cash";
