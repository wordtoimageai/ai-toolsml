import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedSEO from '@/components/AdvancedSEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useUserSubmissions } from '@/hooks/useUserSubmissions';
import { CATEGORIES, PRICING_OPTIONS } from '@/lib/constants';

const submitFormSchema = z.object({
  title: z.string().min(1, 'Tool name is required').min(2, 'Tool name must be at least 2 characters'),
  description: z.string().min(1, 'Description is required').min(10, 'Description must be at least 10 characters'),
  website: z.string().url('Please enter a valid URL'),
  category: z.string().min(1, 'Category is required'),
  pricing: z.string().min(1, 'Pricing model is required'),
  company: z.string().min(1, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  features: z.string().optional(),
});

type SubmitForm = z.infer<typeof submitFormSchema>;

const Submit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { addSubmission } = useUserSubmissions();
  const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm<SubmitForm>({
    resolver: zodResolver(submitFormSchema),
  });

  const onSubmit = async (data: SubmitForm) => {
    setIsSubmitting(true);
    
    try {
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create submission with proper data structure
      const submission = addSubmission({
        title: data.title,
        description: data.description,
        website: data.website,
        category: data.category,
        pricing: data.pricing as any,
        company: data.company,
        features: data.features ? data.features.split('\n').filter(f => f.trim()) : [],
        tags: [data.category, data.pricing], // Simple tags based on category and pricing
        icon: '🤖' // Default icon for user submissions
      });
      
      toast({
        title: "Tool Submitted Successfully!",
        description: "Thank you for your submission. We'll review it within 48 hours.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your tool. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <AdvancedSEO 
        title="Submit AI Tool - ToolsML | Get Featured"
        description="Submit your AI tool to be featured in our directory. Share innovative AI solutions with our community of 50K+ users."
        url="/submit"
        pageType="homepage"
      />
      <Header />
      
      <main className="pt-20">
        <section className="hero-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h1 className="hero-title">
              Submit Your AI Tool
            </h1>
            <p className="hero-subtitle">
              Share your innovative AI solution with our community
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="search-container">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title">Tool Name *</Label>
                    <Input
                      id="title"
                      {...register('title', { required: 'Tool name is required' })}
                      placeholder="e.g., ChatGPT"
                      className="mt-1"
                    />
                    {errors.title && (
                      <p className="text-destructive text-sm mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      {...register('company', { required: 'Company name is required' })}
                      placeholder="e.g., OpenAI"
                      className="mt-1"
                    />
                    {errors.company && (
                      <p className="text-destructive text-sm mt-1">{errors.company.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...register('description', { required: 'Description is required' })}
                    placeholder="Brief description of what your AI tool does..."
                    className="mt-1 min-h-[100px]"
                  />
                  {errors.description && (
                    <p className="text-destructive text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="website">Website URL *</Label>
                  <Input
                    id="website"
                    type="url"
                    {...register('website', { 
                      required: 'Website URL is required',
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: 'Please enter a valid URL'
                      }
                    })}
                    placeholder="https://example.com"
                    className="mt-1"
                  />
                  {errors.website && (
                    <p className="text-destructive text-sm mt-1">{errors.website.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.category && (
                      <p className="text-destructive text-sm mt-1">{errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="pricing">Pricing Model *</Label>
                    <Controller
                      name="pricing"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select pricing" />
                          </SelectTrigger>
                          <SelectContent>
                            {PRICING_OPTIONS.map((pricing) => (
                              <SelectItem key={pricing.value} value={pricing.value}>
                                {pricing.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.pricing && (
                      <p className="text-destructive text-sm mt-1">{errors.pricing.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="features">Key Features</Label>
                  <Textarea
                    id="features"
                    {...register('features')}
                    placeholder="List key features (one per line)"
                    className="mt-1 min-h-[120px]"
                  />
                  <p className="text-muted-foreground text-sm mt-1">
                    List the main features, one per line
                  </p>
                </div>

                <div>
                  <Label htmlFor="email">Contact Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/,
                        message: 'Please enter a valid email'
                      }
                    })}
                    placeholder="your@email.com"
                    className="mt-1"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                  <p className="text-muted-foreground text-sm mt-1">
                    We'll use this to contact you about your submission
                  </p>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-gradient w-full py-4 text-lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Tool for Review'}
                  </Button>
                </div>
              </form>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                What happens next?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
                <div>
                  <div className="text-2xl mb-2">🔍</div>
                  <p><strong>Review Process</strong><br />We review all submissions within 48 hours</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">✅</div>
                  <p><strong>Quality Check</strong><br />We verify the tool meets our standards</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">🚀</div>
                  <p><strong>Go Live</strong><br />Approved tools are featured in our directory</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Submit;