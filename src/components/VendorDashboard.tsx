import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, ExternalLink, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { z } from 'zod';

// Zod schema for tool submission validation
const toolSubmissionSchema = z.object({
  tool_name: z.string()
    .min(2, 'Tool name must be at least 2 characters')
    .max(100, 'Tool name must be less than 100 characters')
    .trim(),
  tool_description: z.string()
    .max(1000, 'Description must be less than 1000 characters')
    .trim()
    .optional()
    .or(z.literal('')),
  tool_url: z.string()
    .url('Please enter a valid URL')
    .max(500, 'URL must be less than 500 characters'),
  tool_logo_url: z.string()
    .url('Please enter a valid logo URL')
    .max(500, 'Logo URL must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  category: z.string()
    .min(1, 'Please select a category'),
  pricing_model: z.string()
    .min(1, 'Please select a pricing model'),
  features: z.array(
    z.string().max(200, 'Each feature must be less than 200 characters').trim()
  ).max(20, 'Maximum 20 features allowed')
});

type ToolSubmissionFormData = z.infer<typeof toolSubmissionSchema>;

interface ToolSubmission {
  id: string;
  tool_name: string;
  tool_description: string | null;
  tool_url: string;
  tool_logo_url: string | null;
  category: string;
  pricing_model: string | null;
  submission_data: any;
  status: string;
  created_at: string;
  updated_at: string;
  vendor_id: string;
}

const VendorDashboard = () => {
  const { user, isVendor } = useAuth();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<ToolSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState({
    tool_name: '',
    tool_description: '',
    tool_url: '',
    tool_logo_url: '',
    category: '',
    pricing_model: 'freemium',
    features: [] as string[]
  });

  useEffect(() => {
    if (user && isVendor) {
      fetchSubmissions();
    }
  }, [user, isVendor]);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('tool_submissions')
        .select('*')
        .eq('vendor_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching submissions:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your submissions.',
          variant: 'destructive',
        });
      } else {
        setSubmissions(data || []);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    try {
      // Filter out empty features before validation
      const dataToValidate = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== '')
      };
      
      toolSubmissionSchema.parse(dataToValidate);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          errors[path] = err.message;
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const cleanedData = {
        vendor_id: user?.id,
        tool_name: formData.tool_name.trim(),
        tool_description: formData.tool_description.trim() || null,
        tool_url: formData.tool_url.trim(),
        tool_logo_url: formData.tool_logo_url.trim() || null,
        category: formData.category,
        pricing_model: formData.pricing_model,
        submission_data: {
          features: formData.features.filter(f => f.trim() !== '').map(f => f.trim())
        }
      };

      const { error } = await supabase
        .from('tool_submissions')
        .insert(cleanedData);

      if (error) {
        toast({
          title: 'Submission failed',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Tool submitted!',
          description: 'Your tool has been submitted for review. We\'ll notify you once it\'s processed.',
        });
        setFormData({
          tool_name: '',
          tool_description: '',
          tool_url: '',
          tool_logo_url: '',
          category: '',
          pricing_model: 'freemium',
          features: []
        });
        setValidationErrors({});
        setShowSubmissionForm(false);
        fetchSubmissions();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isVendor) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vendor Access Required</CardTitle>
          <CardDescription>
            You need vendor access to view this dashboard. Please contact support if you believe this is an error.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-muted rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
          <p className="text-muted-foreground">Manage your tool submissions and track their status</p>
        </div>
        <Dialog open={showSubmissionForm} onOpenChange={setShowSubmissionForm}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Submit New Tool
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Submit New Tool</DialogTitle>
              <DialogDescription>
                Fill out the form below to submit your tool for review and inclusion in our directory.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tool_name">Tool Name *</Label>
                  <Input
                    id="tool_name"
                    value={formData.tool_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, tool_name: e.target.value }))}
                    maxLength={100}
                    className={validationErrors.tool_name ? 'border-destructive' : ''}
                  />
                  {validationErrors.tool_name && (
                    <p className="text-sm text-destructive">{validationErrors.tool_name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className={validationErrors.category ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="writing">Writing</SelectItem>
                      <SelectItem value="coding">Coding</SelectItem>
                      <SelectItem value="image-generation">Image Generation</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.category && (
                    <p className="text-sm text-destructive">{validationErrors.category}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tool_description">Description</Label>
                <Textarea
                  id="tool_description"
                  value={formData.tool_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, tool_description: e.target.value }))}
                  placeholder="Describe what your tool does and its key benefits..."
                  rows={3}
                  maxLength={1000}
                  className={validationErrors.tool_description ? 'border-destructive' : ''}
                />
                <div className="flex justify-between">
                  {validationErrors.tool_description && (
                    <p className="text-sm text-destructive">{validationErrors.tool_description}</p>
                  )}
                  <p className="text-sm text-muted-foreground ml-auto">
                    {formData.tool_description.length}/1000
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tool_url">Tool URL *</Label>
                  <Input
                    id="tool_url"
                    type="url"
                    value={formData.tool_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, tool_url: e.target.value }))}
                    maxLength={500}
                    className={validationErrors.tool_url ? 'border-destructive' : ''}
                  />
                  {validationErrors.tool_url && (
                    <p className="text-sm text-destructive">{validationErrors.tool_url}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tool_logo_url">Logo URL</Label>
                  <Input
                    id="tool_logo_url"
                    type="url"
                    value={formData.tool_logo_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, tool_logo_url: e.target.value }))}
                    maxLength={500}
                    className={validationErrors.tool_logo_url ? 'border-destructive' : ''}
                  />
                  {validationErrors.tool_logo_url && (
                    <p className="text-sm text-destructive">{validationErrors.tool_logo_url}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pricing_model">Pricing Model *</Label>
                <Select
                  value={formData.pricing_model}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, pricing_model: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="freemium">Freemium</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="subscription">Subscription</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="features">Key Features (one per line, max 20)</Label>
                <Textarea
                  id="features"
                  value={formData.features.join('\n')}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    features: e.target.value.split('\n').slice(0, 20)
                  }))}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  rows={4}
                  className={validationErrors.features ? 'border-destructive' : ''}
                />
                <div className="flex justify-between">
                  {validationErrors.features && (
                    <p className="text-sm text-destructive">{validationErrors.features}</p>
                  )}
                  <p className="text-sm text-muted-foreground ml-auto">
                    {formData.features.filter(f => f.trim() !== '').length}/20 features
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowSubmissionForm(false);
                    setValidationErrors({});
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Tool'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-4">
        {submissions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No submissions yet. Submit your first tool to get started!</p>
            </CardContent>
          </Card>
        ) : (
          submissions.map((submission) => (
            <Card key={submission.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {submission.tool_logo_url && (
                      <img
                        src={submission.tool_logo_url}
                        alt={submission.tool_name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{submission.tool_name}</span>
                        {submission.tool_url && (
                          <a
                            href={submission.tool_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </CardTitle>
                      <CardDescription>
                        Submitted {new Date(submission.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(submission.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(submission.status)}
                        <span className="capitalize">{submission.status}</span>
                      </div>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {submission.tool_description && (
                    <p className="text-sm text-muted-foreground">
                      {submission.tool_description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {submission.category && (
                      <Badge variant="outline">{submission.category}</Badge>
                    )}
                    {submission.pricing_model && (
                      <Badge variant="outline">{submission.pricing_model}</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;