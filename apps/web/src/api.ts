import type { Application, DashboardData, Gateway, Program } from './types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }
  return response.json() as Promise<T>;
}

export const api = {
  dashboard: () => request<DashboardData>('/api/dashboard'),
  programs: () => request<Program[]>('/api/programs'),
  application: (id: string) => request<Application>(`/api/applications/${id}`),
  createApplication: (payload: { applicantName: string; programId: string }) =>
    request<Application>('/api/applications', { method: 'POST', body: JSON.stringify(payload) }),
  submitApplication: (id: string) =>
    request<Application>(`/api/applications/${id}/submit`, { method: 'POST' }),
  gateways: () => request<Gateway[]>('/api/config/payment-gateways'),
  createPayment: (payload: {
    applicationId: string;
    amount: number;
    gateway: string;
    method: string;
  }) => request('/api/payments', { method: 'POST', body: JSON.stringify(payload) })
};
