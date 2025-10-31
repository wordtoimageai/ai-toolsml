import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, Twitter, Linkedin, Facebook, Link, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePrivacyAnalytics } from '@/hooks/usePrivacyAnalytics';
import { Tool } from '@/data/tools';

interface SocialShareProps {
  tool: Tool;
  className?: string;
}

const SocialShare = ({ tool, className = "" }: SocialShareProps) => {
  const { toast } = useToast();
  const { trackEvent } = usePrivacyAnalytics();
  
  const currentUrl = window.location.href;
  const shareText = `Check out ${tool.title} - ${tool.description}`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
  };

  const handleShare = async (platform: string) => {
    trackEvent({
      event_type: 'tool_share',
      event_data: {
        platform,
        tool_name: tool.title
      },
      tool_id: tool.id
    });

    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(currentUrl);
        toast({
          title: "Link copied!",
          description: "The tool link has been copied to your clipboard.",
        });
      } catch (error) {
        toast({
          title: "Failed to copy link",
          description: "Please copy the URL manually from your browser.",
          variant: "destructive",
        });
      }
    } else if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: tool.title,
          text: shareText,
          url: currentUrl,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400');
    }
  };

  const canUseNativeShare = typeof navigator !== 'undefined' && navigator.share;

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Share this tool</span>
          </div>
          
          <div className="flex items-center gap-2">
            {canUseNativeShare && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('native')}
                className="p-2"
                aria-label="Share using device's native share"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('twitter')}
              className="p-2 hover:bg-blue-50 hover:text-blue-600"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('linkedin')}
              className="p-2 hover:bg-blue-50 hover:text-blue-700"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('facebook')}
              className="p-2 hover:bg-blue-50 hover:text-blue-800"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('copy')}
              className="p-2 hover:bg-gray-50"
              aria-label="Copy link"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialShare;