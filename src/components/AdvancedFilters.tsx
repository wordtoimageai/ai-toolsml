import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Filter, X } from 'lucide-react';
import { useUrlState, PriceRange } from '@/hooks/useUrlState';
import { useState } from 'react';

const priceRanges: { label: string; value: PriceRange }[] = [
  { label: 'Free', value: 'free' },
  { label: 'Freemium', value: 'freemium' },
  { label: 'Paid', value: 'paid' },
  { label: 'Enterprise', value: 'enterprise' },
];

const availableFeatures = [
  'API Access',
  'Team Collaboration',
  'Custom Integrations',
  'Advanced Analytics',
  'White Labeling',
  'Mobile App',
  'Real-time Sync',
  'Multi-language Support',
  'SOC 2 Compliant',
  'GDPR Compliant',
];

const userRoles = [
  { label: 'Developer', value: 'developer' },
  { label: 'Marketer', value: 'marketer' },
  { label: 'Designer', value: 'designer' },
  { label: 'Content Creator', value: 'content-creator' },
  { label: 'Product Manager', value: 'product-manager' },
  { label: 'Business Owner', value: 'business-owner' },
];

const AdvancedFilters = () => {
  const { 
    priceRange, 
    features, 
    userRole, 
    updatePriceRange, 
    updateFeatures, 
    updateUserRole 
  } = useUrlState();
  
  const [isOpen, setIsOpen] = useState(false);

  const handleFeatureToggle = (feature: string) => {
    const updatedFeatures = features.includes(feature)
      ? features.filter(f => f !== feature)
      : [...features, feature];
    updateFeatures(updatedFeatures);
  };

  const activeFiltersCount = [priceRange, userRole, ...features].filter(Boolean).length;

  return (
    <Card className="mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Advanced Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Price Range</label>
                <Select value={priceRange || 'all'} onValueChange={(value) => updatePriceRange(value === 'all' ? '' : value as PriceRange)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Price Ranges" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Price Ranges</SelectItem>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* User Role Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Your Role</label>
                <Select value={userRole || 'all'} onValueChange={(value) => updateUserRole(value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {userRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Features Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Required Features</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {availableFeatures.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={`feature-${feature}`}
                        checked={features.includes(feature)}
                        onCheckedChange={() => handleFeatureToggle(feature)}
                      />
                      <label
                        htmlFor={`feature-${feature}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Active filters:</span>
                  
                  {priceRange && (
                    <Badge variant="secondary" className="gap-1">
                      Price: {priceRanges.find(r => r.value === priceRange)?.label}
                      <button
                        onClick={() => updatePriceRange('')}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  
                  {userRole && (
                    <Badge variant="secondary" className="gap-1">
                      Role: {userRoles.find(r => r.value === userRole)?.label}
                      <button
                        onClick={() => updateUserRole('')}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  
                  {features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="gap-1">
                      {feature}
                      <button
                        onClick={() => handleFeatureToggle(feature)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default AdvancedFilters;