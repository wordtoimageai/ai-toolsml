import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedSEO from '@/components/AdvancedSEO';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, type FieldErrors } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Mail, MessageSquare, HelpCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ContactForm>();

  const openMailFallback = (data: ContactForm) => {
    const body = `Name: ${data.name.trim()}\nEmail: ${data.email.trim()}\nType: ${data.type || 'general'}\n\n${data.message.trim()}`;
    window.location.href = `mailto:hello@toolsml.com?subject=${encodeURIComponent(data.subject.trim())}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (data: ContactForm) => {
    const inquiryType = data.type || 'general';
    setSubmitting(true);
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: data.name.trim(),
        email: data.email.trim(),
        inquiry_type: inquiryType,
        subject: data.subject.trim(),
        message: data.message.trim(),
      });

      if (error) {
        console.error('Contact form submission failed:', error.message);
        if (error.code === '42501' || error.code === '23514') {
          window.__lovableEvents?.track?.('project.contact_form_validation_error', {
            source: 'server',
            error_count: 1,
            error_code: error.code,
          });
          toast({
            title: "Please check your message",
            description: "Make sure all required fields are valid and your message is at least 10 characters.",
            variant: "destructive",
          });
          return;
        }
        window.__lovableEvents?.track?.('project.contact_form_fallback_used', {
          inquiry_type: inquiryType,
          reason: 'api_error',
        });
        openMailFallback(data);
        toast({
          title: "Opening your email app",
          description: "We couldn't submit the form directly, so we've drafted your message to hello@toolsml.com.",
        });
        return;
      }

      window.__lovableEvents?.track?.('project.contact_form_submitted', {
        inquiry_type: inquiryType,
      });
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      reset();
    } catch (e) {
      console.error('Contact form submission failed:', e);
      window.__lovableEvents?.track?.('project.contact_form_fallback_used', {
        inquiry_type: inquiryType,
        reason: 'exception',
      });
      openMailFallback(data);
      toast({
        title: "Opening your email app",
        description: "We couldn't submit the form directly, so we've drafted your message to hello@toolsml.com.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onInvalid = (fieldErrors: FieldErrors<ContactForm>) => {
    const fields = Object.keys(fieldErrors) as Array<keyof ContactForm>;
    const primaryField = fields[0];
    if (!primaryField) return;
    window.__lovableEvents?.track?.('project.contact_form_validation_error', {
      source: 'client',
      error_count: fields.length,
      primary_field: primaryField,
      fields,
    });
  };


  return (
    <div className="min-h-screen">
      <AdvancedSEO 
        title="Contact Us - Get in Touch with ToolsML"
        description="Have questions or suggestions? Contact ToolsML team for support, partnerships, or tool submissions. We're here to help you discover the best AI tools."
        url="/contact"
        pageType="homepage"
      />
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'Contact Us' }]} />
        </div>
        <section className="hero-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">💬</div>
            <h1 className="hero-title">
              Contact Us
            </h1>
            <p className="hero-subtitle">
              Have questions? We'd love to hear from you
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1 space-y-8">
                <div className="search-container">
                  <Mail className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Email Us</h3>
                  <p className="text-muted-foreground mb-3">
                    Send us an email and we'll respond within 24 hours.
                  </p>
                  <a href="mailto:hello@toolsml.com" className="text-primary hover:underline">
                    hello@toolsml.com
                  </a>
                </div>

                <div className="search-container">
                  <MessageSquare className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">General Inquiries</h3>
                  <p className="text-muted-foreground">
                    Questions about ToolsML, partnerships, or general feedback.
                  </p>
                </div>

                <div className="search-container">
                  <HelpCircle className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Tool Submissions</h3>
                  <p className="text-muted-foreground">
                    Have an AI tool to submit? Use our submission form or contact us directly.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="search-container">
                  <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          maxLength={200}
                          {...register('name', {
                            validate: (value) => {
                              const len = value.trim().length;
                              if (len < 1) return 'Name is required';
                              if (len > 200) return 'Name must be 200 characters or fewer';
                              return true;
                            },
                          })}
                          className="mt-1"
                        />
                        {errors.name && (
                          <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          maxLength={320}
                          {...register('email', {
                            validate: (value) => {
                              const trimmed = value.trim();
                              if (!trimmed) return 'Email is required';
                              if (trimmed.length > 320) return 'Email must be 320 characters or fewer';
                              if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) return 'Please enter a valid email address';
                              return true;
                            },
                          })}
                          className="mt-1"
                        />
                        {errors.email && (
                          <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="type">Inquiry Type *</Label>
                        <Select onValueChange={(value) => setValue('type', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Question</SelectItem>
                            <SelectItem value="tool-submission">Tool Submission</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="bug-report">Bug Report</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          maxLength={300}
                          {...register('subject', {
                            validate: (value) => {
                              const len = value.trim().length;
                              if (len < 1) return 'Subject is required';
                              if (len > 300) return 'Subject must be 300 characters or fewer';
                              return true;
                            },
                          })}
                          className="mt-1"
                        />
                        {errors.subject && (
                          <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        maxLength={5000}
                        {...register('message', {
                          validate: (value) => {
                            const len = value.trim().length;
                            if (len < 1) return 'Message is required';
                            if (len < 10) return 'Message must be at least 10 characters';
                            if (len > 5000) return 'Message must be 5000 characters or fewer';
                            return true;
                          },
                        })}
                        placeholder="Tell us more about your inquiry (at least 10 characters)..."
                        className="mt-1 min-h-[120px]"
                      />
                      {errors.message && (
                        <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <Button type="submit" disabled={submitting} className="btn-gradient w-full py-3">
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </form>
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

export default Contact;