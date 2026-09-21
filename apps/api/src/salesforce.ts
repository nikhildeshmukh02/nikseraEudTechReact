type Method = 'GET' | 'POST' | 'PATCH';

export class SalesforceClient {
  constructor(
    private readonly instanceUrl: string,
    private readonly accessToken: string
  ) {}

  private async request<T>(path: string, method: Method = 'GET', body?: unknown): Promise<T> {
    const response = await fetch(`${this.instanceUrl}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const text = await response.text();
    const payload = text ? JSON.parse(text) : null;

    if (!response.ok) {
      throw new Error(payload?.message || payload?.[0]?.message || `Salesforce request failed: ${response.status}`);
    }
    return payload as T;
  }

  getPrograms() {
    return this.request('/services/apexrest/niksera/v1/programs');
  }

  getApplication(id: string) {
    return this.request(`/services/apexrest/niksera/v1/applications/${encodeURIComponent(id)}`);
  }

  createApplication(input: { applicantId: string; programId: string; intakeId: string }) {
    return this.request('/services/apexrest/niksera/v1/applications', 'POST', input);
  }

  submitApplication(id: string) {
    return this.request(`/services/apexrest/niksera/v1/applications/${encodeURIComponent(id)}/submit`, 'POST');
  }
}
