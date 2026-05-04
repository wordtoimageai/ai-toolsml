import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// GA4 User-ID tracking helpers.
// Mirrors the hostname gate in index.html so preview/lovable.app domains
// never call gtag and pollute analytics.
const GA_ID = 'G-BWC5XNH86E';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const isProductionHost = () =>
  typeof window !== 'undefined' &&
  (window.location.hostname === 'toolsml.com' ||
    window.location.hostname === 'www.toolsml.com');

const setGtagUserId = (userId: string | null, attempt = 0): void => {
  if (!isProductionHost()) return;

  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_ID, { user_id: userId ?? undefined });
  } else if (attempt < 3) {
    // gtag loads lazily via requestIdleCallback in index.html — retry briefly.
    window.setTimeout(() => setGtagUserId(userId, attempt + 1), 500);
  }
};

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  subscription_tier: string;
  subscription_expires_at: string | null;
  is_vendor: boolean;
  vendor_company: string | null;
  privacy_preferences?: {
    analytics_consent: boolean;
    marketing_consent: boolean;
    data_retention_months: number;
    opt_out_analytics: boolean;
  };
  created_at: string;
  updated_at: string;
}

type UserRole = 'admin' | 'vendor' | 'user';

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isPro: boolean;
  isVendor: boolean;
  isAdmin: boolean;
  roles: UserRole[];
}

export const useAuth = (): AuthState & {
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
} => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Use setTimeout to prevent potential deadlocks in auth callback
        setTimeout(() => {
          if (session?.user) {
            fetchProfile(session.user.id).catch(console.error);
          } else {
            setProfile(null);
          }
          setLoading(false);
        }, 0);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Send the Supabase user UUID to GA4 as user_id so sessions can be stitched
  // across devices. UUID only — no email or other PII.
  useEffect(() => {
    if (user?.id) {
      setGtagUserId(user.id);
    } else {
      setGtagUserId(null);
    }
  }, [user?.id]);

  const fetchProfile = async (userId: string) => {
    try {
      // Fetch profile and roles in parallel for better performance
      const [profileResult, rolesResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single(),
        supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId)
      ]);

      if (profileResult.error) {
        if (import.meta.env.DEV) {
          console.error('Error fetching profile:', profileResult.error);
        }
        return;
      }

      setProfile({
        ...profileResult.data,
        privacy_preferences: profileResult.data.privacy_preferences as Profile['privacy_preferences']
      });

      // Set roles from user_roles table (server-side source of truth)
      if (!rolesResult.error && rolesResult.data) {
        setRoles(rolesResult.data.map(r => r.role as UserRole));
      } else {
        setRoles([]);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching profile:', error);
      }
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error && import.meta.env.DEV) {
      console.error('Error signing out:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const isAuthenticated = !!user;
  
  // Check subscription tier AND expiration to match server-side RLS validation
  const isSubscriptionActive = !profile?.subscription_expires_at || 
    new Date(profile.subscription_expires_at) > new Date();
  const isPro = profile?.subscription_tier && 
    ['pro', 'enterprise'].includes(profile.subscription_tier) && 
    isSubscriptionActive;
  // Use roles array as source of truth, with is_vendor as fallback for backward compatibility
  const isVendor = roles.includes('vendor') || profile?.is_vendor || false;
  const isAdmin = roles.includes('admin');

  return {
    user,
    session,
    profile,
    loading,
    isAuthenticated,
    isPro,
    isVendor,
    isAdmin,
    roles,
    signOut,
    refreshProfile,
  };
};