import { useState, useEffect } from 'react';
import { Shield, Download, Trash2, Calendar, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface AnalyticsData {
  id: string;
  event_type: string;
  event_data: any;
  created_at: string;
}

const UserPrivacyDashboard = () => {
  const { profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState({
    analytics_consent: true,
    marketing_consent: false,
    data_retention_months: 12,
    opt_out_analytics: false
  });

  useEffect(() => {
    if (profile?.privacy_preferences) {
      setPreferences(profile.privacy_preferences);
    }
    fetchAnalyticsData();
  }, [profile]);

  const fetchAnalyticsData = async () => {
    try {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('id, event_type, event_data, created_at')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setAnalyticsData(data || []);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to fetch analytics data:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (newPreferences: typeof preferences) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ privacy_preferences: newPreferences })
        .eq('id', profile?.id);

      if (error) throw error;

      setPreferences(newPreferences);
      await refreshProfile();
      
      // Dispatch event for analytics to respond to changes
      window.dispatchEvent(new CustomEvent('privacyPreferencesChanged', { 
        detail: newPreferences 
      }));

      toast({
        title: "Privacy preferences updated",
        description: "Your privacy settings have been saved successfully."
      });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to update preferences:', error);
      }
      toast({
        title: "Update failed",
        description: "Failed to update privacy preferences. Please try again.",
        variant: "destructive"
      });
    }
  };

  const downloadMyData = async () => {
    try {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const dataBlob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(dataBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `my-data-${format(new Date(), 'yyyy-MM-dd')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Data exported",
        description: "Your data has been downloaded successfully."
      });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to download data:', error);
      }
      toast({
        title: "Export failed",
        description: "Failed to export your data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteMyData = async () => {
    if (!confirm('Are you sure you want to delete all your analytics data? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('analytics_events')
        .delete()
        .eq('user_id', profile?.id);

      if (error) throw error;

      setAnalyticsData([]);
      toast({
        title: "Data deleted",
        description: "All your analytics data has been permanently deleted."
      });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to delete data:', error);
      }
      toast({
        title: "Deletion failed",
        description: "Failed to delete your data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updatePreference = (key: keyof typeof preferences, value: any) => {
    const newPreferences = { ...preferences, [key]: value };
    updatePreferences(newPreferences);
  };

  const getEventTypeColor = (eventType: string) => {
    const colors: Record<string, string> = {
      'page_view': 'bg-blue-100 text-blue-800',
      'tool_view': 'bg-green-100 text-green-800',
      'tool_visit': 'bg-purple-100 text-purple-800',
      'search': 'bg-orange-100 text-orange-800',
      'conversion': 'bg-red-100 text-red-800',
      'feature_usage': 'bg-gray-100 text-gray-800'
    };
    return colors[eventType] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Privacy Dashboard</h1>
          <p className="text-muted-foreground">Manage your data and privacy settings</p>
        </div>
      </div>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy Preferences</CardTitle>
          <CardDescription>
            Control how we collect and use your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Analytics Tracking</p>
              <p className="text-sm text-muted-foreground">
                Allow us to collect usage analytics to improve the service
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
              <p className="font-medium">Marketing Communications</p>
              <p className="text-sm text-muted-foreground">
                Receive emails about new AI tools and features
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
              <p className="font-medium">Opt Out of All Tracking</p>
              <p className="text-sm text-muted-foreground">
                Completely disable all behavioral analytics
              </p>
            </div>
            <Switch
              checked={preferences.opt_out_analytics}
              onCheckedChange={(checked) => 
                updatePreference('opt_out_analytics', checked)
              }
            />
          </div>

          <div className="space-y-2">
            <p className="font-medium">Data Retention Period</p>
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
            <p className="text-sm text-muted-foreground">
              How long we keep your analytics data before automatic deletion
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Download or delete your personal data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={downloadMyData} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download My Data
            </Button>
            <Button 
              onClick={deleteMyData} 
              variant="destructive" 
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete My Data
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Download includes all analytics events, preferences, and profile data. 
            Deletion is permanent and cannot be undone.
          </p>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Analytics Activity
          </CardTitle>
          <CardDescription>
            Your recent interactions tracked by our analytics system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-4 text-muted-foreground">Loading...</p>
          ) : analyticsData.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">
              No analytics data found. This could mean tracking is disabled or you haven't used the platform recently.
            </p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {analyticsData.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className={getEventTypeColor(event.event_type)}>
                      {event.event_type.replace('_', ' ')}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">
                        {event.event_data?.page || event.event_data?.tool_name || 'Unknown'}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(event.created_at), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPrivacyDashboard;