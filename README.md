# Niksera Education Cloud - React + Node

Headless web experience for the Niksera Education Admissions product.

## What is included

- React + TypeScript applicant portal
- Node.js + TypeScript API
- Salesforce adapter aligned with the `EducationAdmission` Salesforce repository
- Mock mode for public demos
- Applicant dashboard
- Program catalogue
- Application form
- Document management screen
- Dynamic payment gateway -> payment method selection
- **Cash** payment option (replaces Offline)
- Application tracking
- Institution/admin configuration screen
- Responsive layout
- GitHub Actions build validation

## Architecture

```text
React / Experience Cloud
          |
       Node API
          |
  Salesforce Apex REST
          |
Niksera Admissions Objects
```

React does not connect directly to Salesforce and does not contain Salesforce credentials.

## Run locally

Requires Node.js 22+.

```bash
npm install
cp apps/api/.env.example apps/api/.env
npm run dev:api
```

In another terminal:

```bash
npm run dev:web
```

Open `http://localhost:5173`.

The API uses mock mode by default, so the demo works without Salesforce credentials.

## Connect to Salesforce

Update `apps/api/.env`:

```env
USE_MOCK=false
SF_INSTANCE_URL=https://your-domain.my.salesforce.com
SF_ACCESS_TOKEN=server-only-access-token
```

For production, replace static access-token configuration with an approved OAuth server-to-server flow and a secure secrets manager.

The Node adapter expects the Salesforce endpoints created in the Salesforce repo:

```text
GET  /services/apexrest/niksera/v1/programs
POST /services/apexrest/niksera/v1/applications
GET  /services/apexrest/niksera/v1/applications/{id}
POST /services/apexrest/niksera/v1/applications/{id}/submit
```

## Public deployment

Deploy `apps/web` to Vercel/Netlify and deploy `apps/api` to your Node hosting platform. Set:

```env
VITE_API_BASE_URL=https://api.your-domain.com
WEB_ORIGIN=https://demo.your-domain.com
```

Do not put Salesforce access tokens, client secrets, payment secrets, or real student data in a public demo.

See `docs/ARCHITECTURE.md` for the product architecture.
