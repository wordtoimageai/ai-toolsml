import { useState, useEffect } from 'react';
import { X, Shield, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const PrivacyConsentBanner = () => {
  const { isAuthenticated, profile, refreshProfile } = useAuth();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics_consent: true,
    marketing_consent: false,
    data_retention_months: 12,
    opt_out_analytics: false
  });

  useEffect(() => {
    // Check if user has already made privacy choices
    const hasConsented = localStorage.getItem('privacy_consent');
    const hasSeenBanner = localStorage.getItem('privacy_banner_seen');
    
    if (!hasConsented && !hasSeenBanner) {
      setShowBanner(true);
    }

    // Load existing preferences for authenticated users
    if (isAuthenticated && profile?.privacy_preferences) {
      setPreferences(profile.privacy_preferences);
    }
  }, [isAuthenticated, profile]);

  const handleAcceptAll = async () => {
    const newPreferences = {
      analytics_consent: true,
      marketing_consent: true,
      data_retention_months: 12,
      opt_out_analytics: false
    };

    await savePreferences(newPreferences);
    setShowBanner(false);
  };

  const handleRejectAll = async () => {
    const newPreferences = {
      analytics_consent: false,
      marketing_consent: false,
      data_retention_months: 3,
      opt_out_analytics: true
    };

    await savePreferences(newPreferences);
    setShowBanner(false);
  };

  const handleCustomize = () => {
    setShowSettings(true);
  };

  const handleSaveCustom = async () => {
    await savePreferences(preferences);
    setShowSettings(false);
    setShowBanner(false);
  };

  const savePreferences = async (prefs: typeof preferences) => {
    setPreferences(prefs);
    localStorage.setItem('privacy_consent', 'true');
    localStorage.setItem('privacy_banner_seen', 'true');

    // Save to database if user is authenticated
    if (isAuthenticated) {
      try {
        await supabase
          .from('profiles')
          .update({ privacy_preferences: prefs })
          .eq('id', profile?.id);
        
        await refreshProfile();
      } catch (error) {
        console.error('Failed to save privacy preferences:', error);
      }
    }

    // Dispatch event for analytics to respond to changes
    window.dispatchEvent(new CustomEvent('privacyPreferencesChanged', { 
      detail: prefs 
    }));
  };

  const updatePreference = (key: keyof typeof preferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Main Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t">
        <Card className="max-w-4xl mx-auto p-6">
          <div className="flex items-start gap-4">
            <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold mb-2">Privacy & Cookies</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We use cookies and analytics to improve your experience and understand how you use our AI tools directory. 
                Your privacy is important to us.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleAcceptAll} size="sm">
                  Accept All
                </Button>
                <Button onClick={handleRejectAll} variant="outline" size="sm">
                  Reject All
                </Button>
                <Button 
                  onClick={handleCustomize} 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Customize
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBanner(false)}
              className="flex-shrink-0"
              aria-label="Close privacy banner"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Privacy Settings</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(false)}
                aria-label="Close privacy settings"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Analytics</p>
                  <p className="text-sm text-muted-foreground">
                    Help us improve by allowing usage analytics
                  </p>
                </div>
                <Switch
                  checked={preferences.analytics_consent}
                  onCheckedChange={(checked) => 
                    updatePreference('analytics_consent', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing</p>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about new AI tools
                  </p>
                </div>
                <Switch
                  checked={preferences.marketing_consent}
                  onCheckedChange={(checked) => 
                    updatePreference('marketing_consent', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Opt out of tracking</p>
                  <p className="text-sm text-muted-foreground">
                    Completely disable behavioral analytics
                  </p>
                </div>
                <Switch
                  checked={preferences.opt_out_analytics}
                  onCheckedChange={(checked) => 
                    updatePreference('opt_out_analytics', checked)
                  }
                />
              </div>

              <div>
                <p className="font-medium mb-2">Data Retention</p>
                <select
                  value={preferences.data_retention_months}
                  onChange={(e) => 
                    updatePreference('data_retention_months', parseInt(e.target.value))
                  }
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value={3}>3 months</option>
                  <option value={6}>6 months</option>
                  <option value={12}>12 months</option>
                  <option value={24}>24 months</option>
                </select>
                <p className="text-sm text-muted-foreground mt-1">
                  How long we keep your analytics data
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={handleSaveCustom} className="flex-1">
                Save Preferences
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowSettings(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default PrivacyConsentBanner;