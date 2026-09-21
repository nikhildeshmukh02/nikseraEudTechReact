# Niksera Education Web Architecture

## Channels
- React applicant portal
- React administration/configuration portal
- Salesforce Experience Cloud can be used as an alternate portal for customers that want a Salesforce-native experience.

## Integration
React -> Node API -> Salesforce Apex REST -> Salesforce domain/data model.

The browser never stores Salesforce credentials. The Node service is the security and integration boundary.

## Data/storage
Structured admissions data is maintained in Salesforce for the Salesforce edition of the product. Documents can be stored in Salesforce Files, AWS S3, Azure Blob, Google Cloud, or institution-owned storage. Only document metadata/keys need to be retained in Salesforce.

## Configurable product
Institution -> Campus -> Program -> Intake -> Admission Process -> Stages.

Future form configuration should add Form -> Section -> Field -> Validation Rule so React can render application forms from metadata rather than hard-coded JSX.

## Payment abstraction
The UI first selects a gateway and then displays only methods configured for that provider. Current demo providers:
- Razorpay
- PayU
- Cashfree
- BillDesk
- Institutional Gateway

Cash replaces the earlier Offline payment option and creates a pending payment for finance verification.

## Runtime modes
The Node API defaults to mock mode so the product can be demonstrated without credentials. Set USE_MOCK=false and server-only Salesforce settings to connect the UI to the Salesforce repository implementation.
