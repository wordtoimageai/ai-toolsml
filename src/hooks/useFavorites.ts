import { useState, useEffect } from 'react';
import { trackCloseConvertLead } from '@/lib/ga-events';

const FAVORITES_KEY = 'toolsml-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing favorites:', error);
        setFavorites([]);
      }
    }
  }, []);

  const toggleFavorite = (toolId: string) => {
    setFavorites(prev => {
      const isAdding = !prev.includes(toolId);
      const newFavorites = isAdding
        ? [...prev, toolId]
        : prev.filter(id => id !== toolId);
      
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));

      // Fire only when adding (meaningful engagement signal for GA4)
      if (isAdding) {
        trackCloseConvertLead({ tool_id: toolId, action: 'favorite' });
      }
      return newFavorites;
    });
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    favoriteCount: favorites.length
  };
};