import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedSEO from '@/components/AdvancedSEO';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Mail, MessageSquare, HelpCircle } from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
}

const Contact = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    reset();
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
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          {...register('name', { required: 'Name is required' })}
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
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^\S+@\S+$/,
                              message: 'Please enter a valid email'
                            }
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
                          {...register('subject', { required: 'Subject is required' })}
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
                        {...register('message', { required: 'Message is required' })}
                        placeholder="Tell us more about your inquiry..."
                        className="mt-1 min-h-[120px]"
                      />
                      {errors.message && (
                        <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <Button type="submit" className="btn-gradient w-full py-3">
                      Send Message
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