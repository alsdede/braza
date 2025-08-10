import { useState, useEffect, useCallback } from 'react';
import { couponService } from '../services/couponService';
import type { Coupon, CouponCategory } from '../types/sanity';

/**
 * Hook for managing coupons data with pagination
 */
export const useCoupons = (limit = 20) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchCoupons = useCallback(async (offset = 0, reset = true) => {
    try {
      if (offset === 0) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);

      const data = await couponService.getCoupons(offset, limit);
      
      if (reset) {
        setCoupons(data.items);
      } else {
        setCoupons(prev => [...prev, ...data.items]);
      }
      
      setHasMore(data.hasMore);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load coupons');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [limit]);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      fetchCoupons(coupons.length, false);
    }
  }, [coupons.length, hasMore, isLoadingMore, fetchCoupons]);

  const refresh = useCallback(() => {
    fetchCoupons(0, true);
  }, [fetchCoupons]);

  useEffect(() => {
    fetchCoupons(0, true);
  }, [fetchCoupons]);

  const getLocalizedText = useCallback(
    (coupon: Coupon, field: keyof Pick<Coupon, 'title' | 'description' | 'terms'>): string => {
      return couponService.getLocalizedText(coupon, field);
    },
    []
  );

  const isCouponValid = useCallback((coupon: Coupon): boolean => {
    return couponService.isCouponValid(coupon);
  }, []);

  return {
    coupons,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    total,
    loadMore,
    refresh,
    getLocalizedText,
    isCouponValid,
  };
};

/**
 * Hook for managing coupon categories
 */
export const useCouponCategories = () => {
  const [categories, setCategories] = useState<CouponCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await couponService.getCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoading,
    error,
    refetch: fetchCategories,
  };
};

/**
 * Hook for getting a single coupon by ID
 */
export const useCoupon = (id: string | null) => {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCoupon = useCallback(async (couponId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await couponService.getCouponById(couponId);
      setCoupon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load coupon');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchCoupon(id);
    } else {
      setCoupon(null);
    }
  }, [id, fetchCoupon]);

  const getLocalizedText = useCallback(
    (field: keyof Pick<Coupon, 'title' | 'description' | 'terms'>): string => {
      if (!coupon) return '';
      return couponService.getLocalizedText(coupon, field);
    },
    [coupon]
  );

  const isCouponValid = useCallback((): boolean => {
    if (!coupon) return false;
    return couponService.isCouponValid(coupon);
  }, [coupon]);

  return {
    coupon,
    isLoading,
    error,
    refetch: id ? () => fetchCoupon(id) : undefined,
    getLocalizedText,
    isCouponValid,
  };
};
