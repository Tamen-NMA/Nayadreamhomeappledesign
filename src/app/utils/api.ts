import { projectId, publicAnonKey } from '/utils/supabase/info';
import type { ChoreSchedule, MealPlan, HouseholdMember, User, Country } from './types';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ba08a5a4`;

async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error (${response.status}): ${errorText}`);
  }

  return response.json();
}

export const api = {
  // Auth
  async signIn(email: string, password: string) {
    return apiCall<{ session: any; user: User }>('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async signUp(email: string, password: string, displayName: string) {
    return apiCall<{ user: User }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, displayName }),
    });
  },

  // User
  async getUser(accessToken: string) {
    return apiCall<User>('/user', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  },

  async updateUser(accessToken: string, updates: Partial<User>) {
    return apiCall<User>('/user', {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${accessToken}` },
      body: JSON.stringify(updates),
    });
  },

  async setCountry(accessToken: string, country: Country) {
    return apiCall<{ success: boolean }>('/user/country', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}` },
      body: JSON.stringify({ country }),
    });
  },

  // Household Members
  async getMembers(accessToken: string) {
    return apiCall<HouseholdMember[]>('/members', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  },

  async createMember(accessToken: string, member: Omit<HouseholdMember, 'id'>) {
    return apiCall<HouseholdMember>('/members', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}` },
      body: JSON.stringify(member),
    });
  },

  async updateMember(accessToken: string, id: string, updates: Partial<HouseholdMember>) {
    return apiCall<HouseholdMember>(`/members/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${accessToken}` },
      body: JSON.stringify(updates),
    });
  },

  async deleteMember(accessToken: string, id: string) {
    return apiCall<{ success: boolean }>(`/members/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  },

  // Chore Schedules
  async getChoreSchedules(accessToken: string) {
    return apiCall<ChoreSchedule[]>('/chores', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  },

  async getChoreSchedule(accessToken: string, id: string) {
    return apiCall<ChoreSchedule>(`/chores/${id}`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  },

  async createChoreSchedule(accessToken: string, schedule: Omit<ChoreSchedule, 'id'>) {
    return apiCall<ChoreSchedule>('/chores', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}` },
      body: JSON.stringify(schedule),
    });
  },

  async updateChoreSchedule(accessToken: string, id: string, updates: Partial<ChoreSchedule>) {
    return apiCall<ChoreSchedule>(`/chores/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${accessToken}` },
      body: JSON.stringify(updates),
    });
  },

  async deleteChoreSchedule(accessToken: string, id: string) {
    return apiCall<{ success: boolean }>(`/chores/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  },

  async generateChores(accessToken: string, scheduleId: string) {
    return apiCall<ChoreSchedule>(`/chores/${scheduleId}/generate`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  },

  // Meal Plans
  async getMealPlans(accessToken: string) {
    return apiCall<MealPlan[]>('/meals', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  },

  async getMealPlan(accessToken: string, id: string) {
    return apiCall<MealPlan>(`/meals/${id}`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  },

  async createMealPlan(accessToken: string, plan: Omit<MealPlan, 'id'>) {
    return apiCall<MealPlan>('/meals', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}` },
      body: JSON.stringify(plan),
    });
  },

  async updateMealPlan(accessToken: string, id: string, updates: Partial<MealPlan>) {
    return apiCall<MealPlan>(`/meals/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${accessToken}` },
      body: JSON.stringify(updates),
    });
  },

  async deleteMealPlan(accessToken: string, id: string) {
    return apiCall<{ success: boolean }>(`/meals/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  },

  async generateMeals(accessToken: string, planId: string) {
    return apiCall<MealPlan>(`/meals/${planId}/generate`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  },

  // Shared Tasks
  async getSharedTasks(token: string) {
    return apiCall<{ member: HouseholdMember; tasks: any[] }>(`/shared/${token}`);
  },

  async toggleSharedTask(token: string, taskId: string) {
    return apiCall<{ success: boolean }>(`/shared/${token}/toggle`, {
      method: 'POST',
      body: JSON.stringify({ taskId }),
    });
  },

  async getShareLink(accessToken: string, memberId: string) {
    return apiCall<{ shareLink: string }>(`/members/${memberId}/share-link`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  },
};
