import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star, TrendingUp } from 'lucide-react';
import { Tool } from '@/data/tools';

interface PricingProps {
  tool: Tool;
}

// Generate realistic pricing tiers based on tool category and pricing model
const generatePricingTiers = (tool: Tool) => {
  if (tool.pricing === 'Free') {
    return [
      {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for individuals and hobbyists',
        features: tool.features.slice(0, 4),
        highlighted: true,
        icon: <Star className="w-5 h-5" />
      }
    ];
  }

  if (tool.pricing === 'Freemium') {
    return [
      {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Great for getting started',
        features: [
          'Limited usage per month',
          'Basic features',
          'Community support',
          'Standard processing speed'
        ],
        highlighted: false,
        icon: <Star className="w-5 h-5" />
      },
      {
        name: 'Pro',
        price: '$20',
        period: '/month',
        description: 'Most popular for professionals',
        features: [
          'Unlimited usage',
          'All premium features',
          'Priority support',
          'Advanced integrations',
          'Faster processing',
          'API access'
        ],
        highlighted: true,
        icon: <Zap className="w-5 h-5" />
      },
      {
        name: 'Team',
        price: '$50',
        period: '/month',
        description: 'For teams and businesses',
        features: [
          'Everything in Pro',
          'Team collaboration',
          'Admin dashboard',
          'SSO & security',
          'Dedicated support',
          'Custom integrations'
        ],
        highlighted: false,
        icon: <TrendingUp className="w-5 h-5" />
      }
    ];
  }

  if (tool.pricing === 'Subscription') {
    return [
      {
        name: 'Basic',
        price: '$10',
        period: '/month',
        description: 'Essential features for individuals',
        features: [
          'Basic usage limits',
          'Core features',
          'Email support',
          'Standard processing'
        ],
        highlighted: false,
        icon: <Star className="w-5 h-5" />
      },
      {
        name: 'Standard',
        price: '$29',
        period: '/month',
        description: 'Best value for most users',
        features: [
          'Higher usage limits',
          'All standard features',
          'Priority support',
          'Faster processing',
          'Advanced analytics'
        ],
        highlighted: true,
        icon: <Zap className="w-5 h-5" />
      },
      {
        name: 'Premium',
        price: '$99',
        period: '/month',
        description: 'Maximum power and flexibility',
        features: [
          'Unlimited usage',
          'All premium features',
          'White-glove support',
          'Fastest processing',
          'Custom solutions',
          'Enterprise security'
        ],
        highlighted: false,
        icon: <TrendingUp className="w-5 h-5" />
      }
    ];
  }

  // Paid (one-time purchase)
  return [
    {
      name: 'One-Time Purchase',
      price: '$99',
      period: 'one-time',
      description: 'Lifetime access',
      features: [
        'Lifetime license',
        'All features included',
        'Free updates for 1 year',
        'Email support'
      ],
      highlighted: true,
      icon: <Star className="w-5 h-5" />
    }
  ];
};

export const ToolPricing = ({ tool }: PricingProps) => {
  const pricingTiers = generatePricingTiers(tool);

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          {tool.title} Pricing Plans
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose the plan that fits your needs and budget. All plans include core features, 
          with premium tiers offering enhanced capabilities and support.
        </p>
      </div>

      <div className={`grid gap-6 mb-8 ${pricingTiers.length === 3 ? 'md:grid-cols-3' : pricingTiers.length === 2 ? 'md:grid-cols-2' : ''}`}>
        {pricingTiers.map((tier, index) => (
          <Card 
            key={index}
            className={`relative ${
              tier.highlighted 
                ? 'border-primary border-2 shadow-lg scale-105' 
                : 'border-border/50'
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-3 text-primary">
                {tier.icon}
              </div>
              <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
              <div className="mb-3">
                <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                <span className="text-muted-foreground ml-1">{tier.period}</span>
              </div>
              <CardDescription className="text-base">
                {tier.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                asChild
                className={tier.highlighted ? 'w-full btn-gradient' : 'w-full'}
                variant={tier.highlighted ? 'default' : 'outline'}
              >
                <a href={tool.website} target="_blank" rel="noopener noreferrer">
                  {tier.price === '$0' ? 'Get Started Free' : 'Choose Plan'}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Value Proposition */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-primary text-2xl mb-2">💰</div>
            <h3 className="font-semibold text-foreground mb-2">Money-Back Guarantee</h3>
            <p className="text-sm text-muted-foreground">
              Not satisfied? Most plans offer 30-day refunds, no questions asked.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-primary text-2xl mb-2">🔄</div>
            <h3 className="font-semibold text-foreground mb-2">Flexible Billing</h3>
            <p className="text-sm text-muted-foreground">
              Cancel or upgrade anytime. No long-term commitments required.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-primary text-2xl mb-2">🎓</div>
            <h3 className="font-semibold text-foreground mb-2">Free Trial</h3>
            <p className="text-sm text-muted-foreground">
              Test all features risk-free before committing to a paid plan.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ROI Calculator Teaser */}
      <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Calculate Your ROI
          </h3>
          <p className="text-muted-foreground mb-6">
            {tool.category === 'coding' && (
              "Developers using AI coding tools report saving 10+ hours per week. At an average hourly rate of $75, that's $750/week or $39,000/year in time savings."
            )}
            {tool.category === 'writing' && (
              "Content creators using AI writing tools produce 3x more content in the same time. If you bill $100/hour, increasing output by 200% means an extra $8,000/month."
            )}
            {tool.category === 'design' && (
              "Designers using AI tools reduce revision cycles by 50% and deliver projects 2x faster. More projects completed means more revenue without working extra hours."
            )}
            {!['coding', 'writing', 'design'].includes(tool.category) && (
              "Users of AI tools report saving an average of 10 hours per week on routine tasks. Time saved can be reinvested into high-value activities that drive growth."
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Bottom line:</strong> Most {tool.category} professionals 
            see ROI within the first month of using {tool.title}. The cost of the tool is often recouped 
            in time savings within the first few weeks.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ToolPricing;
