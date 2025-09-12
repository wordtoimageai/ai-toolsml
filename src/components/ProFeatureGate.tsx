import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Lock, Zap } from 'lucide-react';

interface ProFeatureGateProps {
  children: ReactNode;
  requiredTier?: 'pro' | 'enterprise';
  fallback?: ReactNode;
  featureName?: string;
  description?: string;
}

export const ProFeatureGate = ({ 
  children, 
  requiredTier = 'pro',
  fallback,
  featureName = 'Premium Feature',
  description = 'This feature is available to Pro subscribers only.'
}: ProFeatureGateProps) => {
  const { isAuthenticated, isPro, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-muted rounded-lg"></div>
      </div>
    );
  }

  // Check if user has required subscription
  const hasAccess = isAuthenticated && (
    (requiredTier === 'pro' && (profile?.subscription_tier === 'pro' || profile?.subscription_tier === 'enterprise')) ||
    (requiredTier === 'enterprise' && profile?.subscription_tier === 'enterprise')
  );

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  // Default paywall UI
  return (
    <Card className="border-dashed border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="relative">
            <Crown className="h-8 w-8 text-primary" />
            <Lock className="h-4 w-4 text-muted-foreground absolute -top-1 -right-1" />
          </div>
          <Badge variant="secondary" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
            <Zap className="h-3 w-3 mr-1" />
            {requiredTier === 'enterprise' ? 'Enterprise' : 'Pro'} Feature
          </Badge>
        </div>
        <CardTitle className="text-xl">{featureName}</CardTitle>
        <CardDescription className="text-center max-w-md mx-auto">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Unlock premium features:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Detailed tool analytics and usage statistics</li>
            <li>• Advanced comparison matrices</li>
            <li>• API access to tool database</li>
            <li>• Premium content and exclusive reviews</li>
            <li>• Early access to new tool listings</li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          {!isAuthenticated ? (
            <>
              <Button asChild>
                <Link to="/auth">Sign Up for Pro</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link to="/pricing">Upgrade to Pro</Link>
            </Button>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground">
          Start your 14-day free trial • Cancel anytime
        </p>
      </CardContent>
    </Card>
  );
};