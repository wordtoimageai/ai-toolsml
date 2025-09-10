import { useState, useEffect } from 'react';
import { Tool } from '@/data/tools';

const USER_SUBMISSIONS_KEY = 'toolsml-user-submissions';

export interface UserSubmission extends Omit<Tool, 'id' | 'longDescription' | 'pros' | 'cons' | 'rating' | 'reviewCount' | 'founded'> {
  id: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  longDescription: string;
  pros: string[];
  cons: string[];
  rating: number;
  reviewCount: number;
  founded: string;
}

export const useUserSubmissions = () => {
  const [userSubmissions, setUserSubmissions] = useState<UserSubmission[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(USER_SUBMISSIONS_KEY);
    if (stored) {
      try {
        setUserSubmissions(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing user submissions:', error);
        setUserSubmissions([]);
      }
    }
  }, []);

  const addSubmission = (submissionData: Omit<UserSubmission, 'id' | 'submittedAt' | 'status' | 'rating' | 'reviewCount' | 'founded' | 'longDescription' | 'pros' | 'cons'>) => {
    const newSubmission: UserSubmission = {
      ...submissionData,
      id: `user-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      longDescription: submissionData.description,
      pros: ['User-submitted tool'],
      cons: ['Pending review'],
      rating: 0,
      reviewCount: 0,
      founded: new Date().getFullYear().toString()
    };

    setUserSubmissions(prev => {
      const updated = [newSubmission, ...prev];
      localStorage.setItem(USER_SUBMISSIONS_KEY, JSON.stringify(updated));
      return updated;
    });

    return newSubmission;
  };

  const getApprovedSubmissions = (): Tool[] => {
    return userSubmissions
      .filter(sub => sub.status === 'approved')
      .map(sub => ({
        ...sub,
        // Convert to full Tool interface
      }));
  };

  return {
    userSubmissions,
    addSubmission,
    getApprovedSubmissions,
    submissionCount: userSubmissions.length
  };
};