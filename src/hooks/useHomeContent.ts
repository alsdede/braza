import { useState, useEffect, useCallback } from 'react';
import { homeService } from '../services/homeService';
import type { HomeContent } from '../types/sanity';

/**
 * Hook for managing home content data
 */
export const useHomeContent = () => {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await homeService.getHomeContent();
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const getLocalizedText = useCallback(
    (field: keyof Pick<HomeContent, 'title' | 'subtitle' | 'description'>): string => {
      if (!content) return '';
      return homeService.getLocalizedText(content, field);
    },
    [content]
  );

  return {
    content,
    isLoading,
    error,
    refetch: fetchContent,
    getLocalizedText,
  };
};
