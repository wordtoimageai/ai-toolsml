import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Star, ThumbsUp, MessageSquare, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import useAnalytics from '@/hooks/useAnalytics';

interface Review {
  id: string;
  toolId: string;
  userName: string;
  userRole: string;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  helpfulVotes: number;
  createdAt: Date;
  verified: boolean;
}

interface UserReviewsProps {
  toolId: string;
}

const REVIEWS_STORAGE_KEY = 'toolsml-reviews';

const UserReviews = ({ toolId }: UserReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();

  // Load reviews from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (stored) {
      try {
        const allReviews = JSON.parse(stored);
        setReviews(allReviews.filter((review: Review) => review.toolId === toolId));
      } catch (error) {
        console.error('Error loading reviews:', error);
      }
    }
  }, [toolId]);

  const saveReview = (review: Omit<Review, 'id' | 'createdAt' | 'helpfulVotes'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date(),
      helpfulVotes: 0,
    };

    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    const allReviews = stored ? JSON.parse(stored) : [];
    const updatedReviews = [...allReviews, newReview];
    
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updatedReviews));
    setReviews(prev => [...prev, newReview]);
    
    trackEvent({
      action: 'review_submitted',
      category: 'engagement',
      label: `${toolId}:rating_${review.rating}`
    });
  };

  const handleHelpfulVote = (reviewId: string) => {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (stored) {
      const allReviews = JSON.parse(stored);
      const updatedReviews = allReviews.map((review: Review) =>
        review.id === reviewId 
          ? { ...review, helpfulVotes: review.helpfulVotes + 1 }
          : review
      );
      
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updatedReviews));
      setReviews(prev => 
        prev.map(review =>
          review.id === reviewId 
            ? { ...review, helpfulVotes: review.helpfulVotes + 1 }
            : review
        )
      );
      
      trackEvent({
        action: 'review_helpful_vote',
        category: 'engagement',
        label: `${reviewId}:${toolId}`
      });
    }
  };

  const ReviewForm = () => {
    const [formData, setFormData] = useState({
      userName: '',
      userRole: '',
      rating: 5,
      title: '',
      content: '',
      pros: '',
      cons: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const review = {
          toolId,
          userName: formData.userName || 'Anonymous',
          userRole: formData.userRole || 'User',
          rating: formData.rating,
          title: formData.title,
          content: formData.content,
          pros: formData.pros.split(',').map(p => p.trim()).filter(Boolean),
          cons: formData.cons.split(',').map(c => c.trim()).filter(Boolean),
          verified: false,
        };

        saveReview(review);
        setShowReviewForm(false);
        setFormData({
          userName: '',
          userRole: '',
          rating: 5,
          title: '',
          content: '',
          pros: '',
          cons: '',
        });

        toast({
          title: "Review submitted!",
          description: "Thank you for sharing your experience.",
        });
      } catch (error) {
        toast({
          title: "Error submitting review",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="userName">Name</Label>
            <Input
              id="userName"
              value={formData.userName}
              onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
              placeholder="Your name (optional)"
            />
          </div>
          <div>
            <Label htmlFor="userRole">Role</Label>
            <Input
              id="userRole"
              value={formData.userRole}
              onChange={(e) => setFormData(prev => ({ ...prev, userRole: e.target.value }))}
              placeholder="e.g., Developer, Marketer"
            />
          </div>
        </div>

        <div>
          <Label>Rating</Label>
          <div className="flex gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                className="p-1"
              >
                <Star 
                  className={`w-6 h-6 ${
                    star <= formData.rating 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="title">Review Title</Label>
          <Input
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Summarize your experience"
          />
        </div>

        <div>
          <Label htmlFor="content">Your Review</Label>
          <Textarea
            id="content"
            required
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Share your detailed experience with this tool..."
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="pros">Pros (comma separated)</Label>
            <Input
              id="pros"
              value={formData.pros}
              onChange={(e) => setFormData(prev => ({ ...prev, pros: e.target.value }))}
              placeholder="Easy to use, Great support"
            />
          </div>
          <div>
            <Label htmlFor="cons">Cons (comma separated)</Label>
            <Input
              id="cons"
              value={formData.cons}
              onChange={(e) => setFormData(prev => ({ ...prev, cons: e.target.value }))}
              placeholder="Expensive, Limited features"
            />
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    );
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            User Reviews ({reviews.length})
          </CardTitle>
          <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Write Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Write a Review</DialogTitle>
              </DialogHeader>
              <ReviewForm />
            </DialogContent>
          </Dialog>
        </div>
        
        {reviews.length > 0 && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{averageRating.toFixed(1)} average rating</span>
            </div>
            <span>{reviews.length} reviews</span>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((review) => (
                <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback>{review.userName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{review.userName}</h4>
                        <Badge variant="outline" className="text-xs">
                          {review.userRole}
                        </Badge>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h5 className="font-semibold mb-2">{review.title}</h5>
                      <p className="text-muted-foreground mb-4">{review.content}</p>
                      
                      {(review.pros.length > 0 || review.cons.length > 0) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {review.pros.length > 0 && (
                            <div>
                              <h6 className="font-medium text-green-600 mb-2">Pros</h6>
                              <ul className="text-sm space-y-1">
                                {review.pros.map((pro, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    {pro}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {review.cons.length > 0 && (
                            <div>
                              <h6 className="font-medium text-red-600 mb-2">Cons</h6>
                              <ul className="text-sm space-y-1">
                                {review.cons.map((con, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                    {con}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleHelpfulVote(review.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Helpful ({review.helpfulVotes})
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserReviews;