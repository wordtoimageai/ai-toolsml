import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const COMPARE_KEY = 'toolsml-compare';
const MAX_COMPARE = 3;

export const useCompare = () => {
  const [compareList, setCompareList] = useState<string[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const stored = localStorage.getItem(COMPARE_KEY);
    if (stored) {
      try {
        setCompareList(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing compare list:', error);
        setCompareList([]);
      }
    }
  }, []);

  const addToCompare = (toolId: string) => {
    if (compareList.length >= MAX_COMPARE) {
      return false; // Cannot add more
    }
    
    setCompareList(prev => {
      if (prev.includes(toolId)) return prev;
      const newList = [...prev, toolId];
      localStorage.setItem(COMPARE_KEY, JSON.stringify(newList));
      return newList;
    });
    return true;
  };

  const removeFromCompare = (toolId: string) => {
    setCompareList(prev => {
      const newList = prev.filter(id => id !== toolId);
      localStorage.setItem(COMPARE_KEY, JSON.stringify(newList));
      return newList;
    });
  };

  const clearCompare = () => {
    setCompareList([]);
    localStorage.removeItem(COMPARE_KEY);
  };

  const goToCompare = () => {
    if (compareList.length === 0) return;
    navigate(`/compare?ids=${compareList.join(',')}`);
  };

  const isInCompare = (toolId: string) => compareList.includes(toolId);

  return {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    goToCompare,
    isInCompare,
    compareCount: compareList.length,
    canAddMore: compareList.length < MAX_COMPARE
  };
};