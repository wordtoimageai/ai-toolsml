import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export type SortOption = 'name' | 'rating' | 'category' | 'pricing';

export const useUrlState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const sort = (searchParams.get('sort') as SortOption) || 'name';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const updateSearch = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    params.delete('page'); // Reset to page 1 on search
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const updateCategory = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    params.delete('page'); // Reset to page 1 on filter
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const updateSort = useCallback((value: SortOption) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    params.delete('page'); // Reset to page 1 on sort
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const updatePage = useCallback((value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', value.toString());
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return {
    search,
    category,
    sort,
    page,
    updateSearch,
    updateCategory,
    updateSort,
    updatePage,
    clearFilters
  };
};