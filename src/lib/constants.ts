// Central constants for categories, pricing, and other app-wide data

export const CATEGORIES = [
  { value: 'writing', label: 'Writing & Content' },
  { value: 'design', label: 'Design & Creative' },
  { value: 'coding', label: 'Development' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'audio', label: 'Audio' },
  { value: 'video', label: 'Video' },
  { value: 'research', label: 'Research' },
  { value: 'data', label: 'Data & Analytics' },
  { value: 'automation', label: 'Automation' },
  { value: 'sales', label: 'Sales & CRM' },
  { value: 'social', label: 'Social Media' },
  { value: 'seo', label: 'SEO & Content Strategy' }
] as const;

export const PRICING_OPTIONS = [
  { value: 'Free', label: 'Free' },
  { value: 'Freemium', label: 'Freemium' },
  { value: 'Paid', label: 'Paid' },
  { value: 'Subscription', label: 'Subscription' }
] as const;

export type CategoryValue = typeof CATEGORIES[number]['value'];
export type PricingValue = typeof PRICING_OPTIONS[number]['value'];