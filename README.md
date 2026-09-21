# Niksera EduTech React

Applicant-facing React frontend for the configurable Niksera Education Admissions platform.

## Current demo modules
- Applicant dashboard
- Program catalog
- Application form
- Document center
- Payment gateway selection + payment methods
- Application tracking
- Admin admission-process configuration

## Architecture
React never connects directly to Salesforce.

```
React -> Node.js API -> Salesforce Apex REST / Salesforce APIs
```

The Salesforce core is maintained separately in `nikhildeshmukh02/EducationAdmission`.

## Run locally
```bash
npm install
cp .env.example .env
npm run dev
```

If the Node API is not running, the current UI still works with demo/mock data.

## Payment behavior
The UI supports Razorpay, PayU, Cashfree, BillDesk and an Institutional Gateway. Payment methods are displayed dynamically after gateway selection. The prior "Offline" option is represented as **Cash** under Institutional Gateway.

## Next implementation milestones
1. Connect program/application screens to the Node API.
2. Authentication and applicant session.
3. Dynamic forms from configuration metadata.
4. Real document upload using storage-provider adapters.
5. Payment order creation and verified webhooks.
6. Evaluator and finance portals.
7. Experience Cloud parity mode.
