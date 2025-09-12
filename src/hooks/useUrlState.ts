import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export type SortOption = 'name' | 'rating' | 'category' | 'pricing' | 'popularity';
export type PriceRange = 'free' | 'freemium' | 'paid' | 'enterprise';

export const useUrlState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const sort = (searchParams.get('sort') as SortOption) || 'name';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const priceRange = searchParams.get('price') as PriceRange | '';
  const features = searchParams.get('features')?.split(',').filter(Boolean) || [];
  const userRole = searchParams.get('role') || '';

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

  const updatePriceRange = useCallback((value: PriceRange | '') => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('price', value);
    } else {
      params.delete('price');
    }
    params.delete('page');
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const updateFeatures = useCallback((features: string[]) => {
    const params = new URLSearchParams(searchParams);
    if (features.length > 0) {
      params.set('features', features.join(','));
    } else {
      params.delete('features');
    }
    params.delete('page');
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const updateUserRole = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('role', value);
    } else {
      params.delete('role');
    }
    params.delete('page');
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
    priceRange,
    features,
    userRole,
    updateSearch,
    updateCategory,
    updateSort,
    updatePage,
    updatePriceRange,
    updateFeatures,
    updateUserRole,
    clearFilters
  };
};