import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, TrendingUp, MousePointer, Users, Clock, Shield } from 'lucide-react';
import { format, subDays, subHours } from 'date-fns';

interface ClickStats {
  total_clicks: number;
  unique_sessions: number;
  authenticated_clicks: number;
  anonymous_clicks: number;
}

interface TopLink {
  affiliate_link_id: string;
  tool_name: string;
  click_count: number;
}

interface SuspiciousPattern {
  type: 'high_frequency' | 'burst_activity' | 'single_session_abuse';
  description: string;
  severity: 'low' | 'medium' | 'high';
  details: string;
}

interface HourlyDistribution {
  hour: number;
  count: number;
}

export const AffiliateAnalyticsDashboard = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<ClickStats | null>(null);
  const [topLinks, setTopLinks] = useState<TopLink[]>([]);
  const [recentClicks, setRecentClicks] = useState<any[]>([]);
  const [suspiciousPatterns, setSuspiciousPatterns] = useState<SuspiciousPattern[]>([]);
  const [hourlyDistribution, setHourlyDistribution] = useState<HourlyDistribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin || authLoading) return;
    
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchOverallStats(),
          fetchTopLinks(),
          fetchRecentClicks(),
          detectSuspiciousPatterns(),
          fetchHourlyDistribution()
        ]);
      } catch (error) {
        console.error('Error fetching affiliate analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [isAdmin, authLoading]);

  const fetchOverallStats = async () => {
    const sevenDaysAgo = subDays(new Date(), 7).toISOString();
    
    const { data: clicks, error } = await supabase
      .from('affiliate_clicks')
      .select('id, user_id, session_id')
      .gte('created_at', sevenDaysAgo);

    if (error) {
      console.error('Error fetching stats:', error);
      return;
    }

    const uniqueSessions = new Set(clicks?.map(c => c.session_id).filter(Boolean)).size;
    const authenticatedClicks = clicks?.filter(c => c.user_id).length || 0;
    const anonymousClicks = clicks?.filter(c => !c.user_id).length || 0;

    setStats({
      total_clicks: clicks?.length || 0,
      unique_sessions: uniqueSessions,
      authenticated_clicks: authenticatedClicks,
      anonymous_clicks: anonymousClicks
    });
  };

  const fetchTopLinks = async () => {
    const sevenDaysAgo = subDays(new Date(), 7).toISOString();
    
    // Get clicks with affiliate link details
    const { data: clicks, error } = await supabase
      .from('affiliate_clicks')
      .select('affiliate_link_id')
      .gte('created_at', sevenDaysAgo);

    if (error || !clicks) {
      console.error('Error fetching top links:', error);
      return;
    }

    // Count clicks per link
    const clickCounts: Record<string, number> = {};
    clicks.forEach(click => {
      if (click.affiliate_link_id) {
        clickCounts[click.affiliate_link_id] = (clickCounts[click.affiliate_link_id] || 0) + 1;
      }
    });

    // Get link details
    const linkIds = Object.keys(clickCounts);
    if (linkIds.length === 0) {
      setTopLinks([]);
      return;
    }

    const { data: links } = await supabase
      .from('affiliate_links')
      .select('id, tool_name')
      .in('id', linkIds);

    const topLinksData = linkIds
      .map(id => ({
        affiliate_link_id: id,
        tool_name: links?.find(l => l.id === id)?.tool_name || 'Unknown',
        click_count: clickCounts[id]
      }))
      .sort((a, b) => b.click_count - a.click_count)
      .slice(0, 10);

    setTopLinks(topLinksData);
  };

  const fetchRecentClicks = async () => {
    const { data, error } = await supabase
      .from('affiliate_clicks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching recent clicks:', error);
      return;
    }

    setRecentClicks(data || []);
  };

  const detectSuspiciousPatterns = async () => {
    const patterns: SuspiciousPattern[] = [];
    const oneHourAgo = subHours(new Date(), 1).toISOString();
    const oneDayAgo = subDays(new Date(), 1).toISOString();

    // Check for high frequency clicks from same session in last hour
    const { data: hourlyClicks } = await supabase
      .from('affiliate_clicks')
      .select('session_id, affiliate_link_id')
      .gte('created_at', oneHourAgo);

    if (hourlyClicks) {
      const sessionCounts: Record<string, number> = {};
      hourlyClicks.forEach(click => {
        if (click.session_id) {
          sessionCounts[click.session_id] = (sessionCounts[click.session_id] || 0) + 1;
        }
      });

      const highFrequencySessions = Object.entries(sessionCounts)
        .filter(([_, count]) => count > 5);

      if (highFrequencySessions.length > 0) {
        patterns.push({
          type: 'high_frequency',
          description: 'High frequency clicking detected',
          severity: highFrequencySessions.some(([_, c]) => c > 10) ? 'high' : 'medium',
          details: `${highFrequencySessions.length} session(s) with 5+ clicks in the last hour`
        });
      }
    }

    // Check for burst activity (many clicks in short time)
    const { data: dailyClicks } = await supabase
      .from('affiliate_clicks')
      .select('created_at')
      .gte('created_at', oneDayAgo)
      .order('created_at', { ascending: true });

    if (dailyClicks && dailyClicks.length > 0) {
      // Group clicks by 5-minute intervals
      const intervals: Record<string, number> = {};
      dailyClicks.forEach(click => {
        const date = new Date(click.created_at);
        const intervalKey = `${date.getHours()}:${Math.floor(date.getMinutes() / 5) * 5}`;
        intervals[intervalKey] = (intervals[intervalKey] || 0) + 1;
      });

      const burstIntervals = Object.entries(intervals).filter(([_, count]) => count > 20);
      if (burstIntervals.length > 0) {
        patterns.push({
          type: 'burst_activity',
          description: 'Burst activity detected',
          severity: 'medium',
          details: `${burstIntervals.length} time period(s) with 20+ clicks in 5 minutes`
        });
      }
    }

    // Check for single session hitting many different links
    const { data: sessionLinkClicks } = await supabase
      .from('affiliate_clicks')
      .select('session_id, affiliate_link_id')
      .gte('created_at', oneDayAgo);

    if (sessionLinkClicks) {
      const sessionLinks: Record<string, Set<string>> = {};
      sessionLinkClicks.forEach(click => {
        if (click.session_id && click.affiliate_link_id) {
          if (!sessionLinks[click.session_id]) {
            sessionLinks[click.session_id] = new Set();
          }
          sessionLinks[click.session_id].add(click.affiliate_link_id);
        }
      });

      const suspiciousSessions = Object.entries(sessionLinks)
        .filter(([_, links]) => links.size > 10);

      if (suspiciousSessions.length > 0) {
        patterns.push({
          type: 'single_session_abuse',
          description: 'Single session clicking many links',
          severity: 'high',
          details: `${suspiciousSessions.length} session(s) clicked 10+ different affiliate links`
        });
      }
    }

    setSuspiciousPatterns(patterns);
  };

  const fetchHourlyDistribution = async () => {
    const oneDayAgo = subDays(new Date(), 1).toISOString();
    
    const { data, error } = await supabase
      .from('affiliate_clicks')
      .select('created_at')
      .gte('created_at', oneDayAgo);

    if (error || !data) {
      console.error('Error fetching hourly distribution:', error);
      return;
    }

    const hourCounts: Record<number, number> = {};
    for (let i = 0; i < 24; i++) {
      hourCounts[i] = 0;
    }

    data.forEach(click => {
      const hour = new Date(click.created_at).getHours();
      hourCounts[hour]++;
    });

    setHourlyDistribution(
      Object.entries(hourCounts).map(([hour, count]) => ({
        hour: parseInt(hour),
        count
      }))
    );
  };

  if (authLoading) {
    return <div className="p-6"><Skeleton className="h-96 w-full" /></div>;
  }

  if (!isAdmin) {
    return (
      <div className="p-6">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Shield className="h-5 w-5" />
              Access Denied
            </CardTitle>
            <CardDescription>
              You don't have permission to view this dashboard.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Affiliate Analytics Dashboard</h1>
        <p className="text-muted-foreground">Monitor affiliate click patterns and detect potential abuse</p>
      </div>

      {/* Suspicious Patterns Alert */}
      {suspiciousPatterns.length > 0 && (
        <Card className="border-destructive bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Suspicious Activity Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suspiciousPatterns.map((pattern, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                  <Badge variant={pattern.severity === 'high' ? 'destructive' : pattern.severity === 'medium' ? 'secondary' : 'outline'}>
                    {pattern.severity}
                  </Badge>
                  <div>
                    <p className="font-medium">{pattern.description}</p>
                    <p className="text-sm text-muted-foreground">{pattern.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              Total Clicks (7 days)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.total_clicks || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Unique Sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.unique_sessions || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Authenticated Clicks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.authenticated_clicks || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Anonymous Clicks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.anonymous_clicks || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Click Distribution (24h)</CardTitle>
          <CardDescription>Click activity by hour of day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1 h-32">
            {hourlyDistribution.map(({ hour, count }) => {
              const maxCount = Math.max(...hourlyDistribution.map(h => h.count), 1);
              const height = (count / maxCount) * 100;
              return (
                <div
                  key={hour}
                  className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t relative group"
                  style={{ height: `${Math.max(height, 2)}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-popover px-1 rounded">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>0:00</span>
            <span>6:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:00</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Links */}
        <Card>
          <CardHeader>
            <CardTitle>Top Affiliate Links (7 days)</CardTitle>
            <CardDescription>Most clicked affiliate links</CardDescription>
          </CardHeader>
          <CardContent>
            {topLinks.length === 0 ? (
              <p className="text-muted-foreground text-sm">No click data available</p>
            ) : (
              <div className="space-y-3">
                {topLinks.map((link, idx) => (
                  <div key={link.affiliate_link_id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground text-sm w-6">{idx + 1}.</span>
                      <span className="font-medium truncate max-w-[200px]">{link.tool_name}</span>
                    </div>
                    <Badge variant="secondary">{link.click_count} clicks</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Clicks */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Clicks</CardTitle>
            <CardDescription>Latest affiliate click activity</CardDescription>
          </CardHeader>
          <CardContent>
            {recentClicks.length === 0 ? (
              <p className="text-muted-foreground text-sm">No recent clicks</p>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {recentClicks.map(click => (
                  <div key={click.id} className="flex items-center justify-between text-sm py-2 border-b last:border-0">
                    <div className="flex items-center gap-2">
                      {click.user_id ? (
                        <Badge variant="outline" className="text-xs">Auth</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">Anon</Badge>
                      )}
                      <span className="text-muted-foreground truncate max-w-[150px]">
                        {click.session_id?.slice(0, 12)}...
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {format(new Date(click.created_at), 'MMM d, HH:mm')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
