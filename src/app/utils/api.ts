import { projectId, publicAnonKey } from '/utils/supabase/info';
import { getAccessToken } from './auth';
import type { ChoreSchedule, MealPlan, HouseholdMember, User, Country } from '../types';

const getAPIBase = () => {
  const id = projectId;
  if (!id) {
    console.error('projectId is not defined');
    throw new Error('API configuration error: projectId is missing');
  }
  return `https://${id}.supabase.co/functions/v1/make-server-ba08a5a4`;
};

/**
 * Core API call function.
 * - For authenticated requests (requiresAuth=true), automatically gets a fresh token.
 * - On 401, refreshes the token once and retries.
 * - Always sends the publicAnonKey as apikey header for Supabase Edge Function infrastructure.
 */
async function apiCall<T>(
  endpoint: string,
  options?: RequestInit & { requiresAuth?: boolean },
  _isRetry = false
): Promise<T> {
  try {
    const API_BASE = getAPIBase();
    const url = `${API_BASE}${endpoint}`;
    const { requiresAuth, ...fetchOptions } = options || {};

    // Build headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'apikey': publicAnonKey,
    };

    if (requiresAuth) {
      const token = await getAccessToken();
      if (!token) {
        throw new Error('No valid session. Please sign in again.');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Merge any additional headers from the caller (but auth is handled above)
    if (fetchOptions.headers) {
      const extraHeaders = fetchOptions.headers as Record<string, string>;
      Object.entries(extraHeaders).forEach(([key, value]) => {
        // Don't override Authorization if we already set it via requiresAuth
        if (key !== 'Authorization' || !requiresAuth) {
          headers[key] = value;
        }
      });
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();

      // On 401, retry once with a fresh token (only for authenticated calls)
      if (response.status === 401 && requiresAuth && !_isRetry) {
        console.warn('Got 401, retrying with fresh token...');
        return apiCall<T>(endpoint, options, true);
      }

      console.error('API Error Response:', errorText);
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error('API Call failed:', error);
    throw error;
  }
}

export const api = {
  // Auth (no auth required - these use publicAnonKey)
  async signUp(email: string, password: string, displayName: string) {
    return apiCall<{ user: User }>('/auth/signup', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${publicAnonKey}` },
      body: JSON.stringify({ email, password, displayName }),
    });
  },

  // User (authenticated)
  async getUser() {
    return apiCall<User>('/user', { requiresAuth: true });
  },

  async updateUser(updates: Partial<User>) {
    return apiCall<User>('/user', {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify(updates),
    });
  },

  async setCountry(country: Country) {
    return apiCall<{ success: boolean }>('/user/country', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify({ country }),
    });
  },

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);

    const API_BASE = getAPIBase();
    const token = await getAccessToken();
    
    if (!token) {
      throw new Error('No valid session. Please sign in again.');
    }

    const response = await fetch(`${API_BASE}/user/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': publicAnonKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to upload avatar: ${errorText}`);
    }

    const data = await response.json();
    return data.avatarUrl;
  },

  // Household Members (authenticated)
  async getMembers() {
    return apiCall<HouseholdMember[]>('/members', { requiresAuth: true });
  },

  async createMember(member: Omit<HouseholdMember, 'id'>) {
    return apiCall<HouseholdMember>('/members', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify(member),
    });
  },

  async updateMember(id: string, updates: Partial<HouseholdMember>) {
    return apiCall<HouseholdMember>(`/members/${id}`, {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify(updates),
    });
  },

  async deleteMember(id: string) {
    return apiCall<{ success: boolean }>(`/members/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },

  // Chore Schedules (authenticated)
  async getChoreSchedules() {
    return apiCall<ChoreSchedule[]>('/chores', { requiresAuth: true });
  },

  async getChoreSchedule(id: string) {
    return apiCall<ChoreSchedule>(`/chores/${id}`, { requiresAuth: true });
  },

  async createChoreSchedule(schedule: Omit<ChoreSchedule, 'id'>) {
    return apiCall<ChoreSchedule>('/chores', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify(schedule),
    });
  },

  async updateChoreSchedule(id: string, updates: Partial<ChoreSchedule>) {
    return apiCall<ChoreSchedule>(`/chores/${id}`, {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify(updates),
    });
  },

  async deleteChoreSchedule(id: string) {
    return apiCall<{ success: boolean }>(`/chores/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },

  async generateChores(scheduleId: string) {
    return apiCall<ChoreSchedule>(`/chores/${scheduleId}/generate`, {
      method: 'POST',
      requiresAuth: true,
    });
  },

  // Meal Plans (authenticated)
  async getMealPlans() {
    return apiCall<MealPlan[]>('/meals', { requiresAuth: true });
  },

  async getMealPlan(id: string) {
    return apiCall<MealPlan>(`/meals/${id}`, { requiresAuth: true });
  },

  async createMealPlan(plan: Omit<MealPlan, 'id'>) {
    return apiCall<MealPlan>('/meals', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify(plan),
    });
  },

  async updateMealPlan(id: string, updates: Partial<MealPlan>) {
    return apiCall<MealPlan>(`/meals/${id}`, {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify(updates),
    });
  },

  async deleteMealPlan(id: string) {
    return apiCall<{ success: boolean }>(`/meals/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },

  async generateMeals(planId: string) {
    return apiCall<MealPlan>(`/meals/${planId}/generate`, {
      method: 'POST',
      requiresAuth: true,
    });
  },

  // Shared Tasks (no auth required)
  async getSharedTasks(token: string) {
    return apiCall<{ member: HouseholdMember; tasks: any[] }>(`/shared/${token}`, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` },
    });
  },

  async toggleSharedTask(token: string, taskId: string) {
    return apiCall<{ success: boolean }>(`/shared/${token}/toggle`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${publicAnonKey}` },
      body: JSON.stringify({ taskId }),
    });
  },

  async getShareLink(memberId: string) {
    return apiCall<{ shareLink: string }>(`/members/${memberId}/share-link`, {
      requiresAuth: true,
    });
  },
};