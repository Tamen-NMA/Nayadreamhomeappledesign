import { supabase } from './supabase';

// Mutex to prevent concurrent token refreshes
let refreshPromise: Promise<string | null> | null = null;

/**
 * Gets a valid access token, refreshing the session if needed.
 * Uses a mutex to prevent concurrent refresh calls from racing.
 */
export async function getAccessToken(): Promise<string | null> {
  // If a refresh is already in progress, wait for it
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      // First try getSession - if the token is still fresh, use it
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      if (currentSession?.access_token) {
        // Check if the token expires within the next 60 seconds
        const expiresAt = currentSession.expires_at ?? 0;
        const now = Math.floor(Date.now() / 1000);
        
        if (expiresAt - now > 60) {
          // Token is still valid for more than 60 seconds, use it
          return currentSession.access_token;
        }
      }

      // Token is expired or about to expire, refresh it
      const { data: { session }, error } = await supabase.auth.refreshSession();
      
      if (error) {
        console.error('Failed to refresh session:', error.message);
        return null;
      }

      return session?.access_token ?? null;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Checks if a user is currently authenticated.
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getAccessToken();
  return token !== null;
}
