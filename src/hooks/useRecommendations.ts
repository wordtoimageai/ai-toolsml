import { useMemo } from 'react';
import { Tool, getAllTools } from '@/data/tools';
import { useRecentlyViewed } from './useRecentlyViewed';
import { useFavorites } from './useFavorites';

export const useRecommendations = (currentTool?: Tool) => {
  const { recentlyViewed } = useRecentlyViewed();
  const { favorites } = useFavorites();
  const allTools = getAllTools();

  // Find similar tools based on category and tags
  const getSimilarTools = (tool: Tool, limit = 4) => {
    return allTools
      .filter(t => t.id !== tool.id)
      .map(t => ({
        tool: t,
        score: calculateSimilarityScore(tool, t)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.tool);
  };

  // Calculate similarity score between two tools
  const calculateSimilarityScore = (tool1: Tool, tool2: Tool): number => {
    let score = 0;
    
    // Same category gets high score
    if (tool1.category === tool2.category) {
      score += 50;
    }
    
    // Shared tags
    const sharedTags = tool1.tags.filter(tag => tool2.tags.includes(tag));
    score += sharedTags.length * 10;
    
    // Similar pricing model
    if (tool1.pricing === tool2.pricing) {
      score += 20;
    }
    
    // Similar rating range
    const ratingDiff = Math.abs(tool1.rating - tool2.rating);
    if (ratingDiff <= 0.5) {
      score += 15;
    }
    
    return score;
  };

  // Get trending tools (highest rated with recent activity)
  const getTrendingTools = (limit = 6) => {
    return allTools
      .map(tool => ({
        tool,
        trendScore: tool.rating * 10 + tool.reviewCount * 0.1
      }))
      .sort((a, b) => b.trendScore - a.trendScore)
      .slice(0, limit)
      .map(item => item.tool);
  };

  // Get personalized recommendations based on user behavior
  const getPersonalizedRecommendations = (limit = 8) => {
    const userCategories = new Set([
      ...recentlyViewed.map(t => t.category),
      ...favorites.map(id => allTools.find(t => t.id === id)?.category).filter(Boolean)
    ]);

    const userTags = new Set([
      ...recentlyViewed.flatMap(t => t.tags),
      ...favorites.flatMap(id => allTools.find(t => t.id === id)?.tags || [])
    ]);

    return allTools
      .filter(tool => !favorites.includes(tool.id) && !recentlyViewed.some(r => r.id === tool.id))
      .map(tool => ({
        tool,
        personalScore: calculatePersonalizationScore(tool, userCategories, userTags)
      }))
      .sort((a, b) => b.personalScore - a.personalScore)
      .slice(0, limit)
      .map(item => item.tool);
  };

  const calculatePersonalizationScore = (tool: Tool, userCategories: Set<string>, userTags: Set<string>): number => {
    let score = 0;
    
    // Bonus for matching user's preferred categories
    if (userCategories.has(tool.category)) {
      score += 30;
    }
    
    // Bonus for matching user's preferred tags
    const matchingTags = tool.tags.filter(tag => userTags.has(tag));
    score += matchingTags.length * 15;
    
    // Base quality score
    score += tool.rating * 5;
    
    // Popularity bonus
    score += Math.log(tool.reviewCount + 1) * 2;
    
    return score;
  };

  // Get tools by category popularity
  const getPopularByCategory = (category: string, limit = 4) => {
    return allTools
      .filter(tool => tool.category === category)
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, limit);
  };

  const recommendations = useMemo(() => ({
    similar: currentTool ? getSimilarTools(currentTool) : [],
    trending: getTrendingTools(),
    personalized: getPersonalizedRecommendations(),
    byCategory: (category: string) => getPopularByCategory(category),
  }), [currentTool, recentlyViewed, favorites]);

  return recommendations;
};