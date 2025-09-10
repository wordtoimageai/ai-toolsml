import { useState, useEffect } from 'react';
import { Tool } from '@/data/tools';

const RECENTLY_VIEWED_KEY = 'ai-tools-recently-viewed';
const MAX_RECENT_ITEMS = 10;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<Tool[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing recently viewed tools:', error);
        localStorage.removeItem(RECENTLY_VIEWED_KEY);
      }
    }
  }, []);

  const addToRecentlyViewed = (tool: Tool) => {
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item.id !== tool.id);
      // Add to beginning
      const updated = [tool, ...filtered].slice(0, MAX_RECENT_ITEMS);
      
      // Store in localStorage
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      
      return updated;
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem(RECENTLY_VIEWED_KEY);
  };

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed
  };
};