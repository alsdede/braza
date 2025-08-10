import { useState, useEffect } from 'react';
import { getPagesByLanguage, getPageBySlug, getNews, getEstablishments, getHomeContent, searchContent } from '../services/sanity';
import type { Page, News, Establishment, HomeContent } from '../types/sanity';

export function usePages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPages() {
      try {
        setLoading(true);
        const data = await getPagesByLanguage();
        setPages(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchPages();
  }, []);

  return { pages, loading, error };
}

export function usePage(slug: string) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPage() {
      if (!slug) return;

      try {
        setLoading(true);
        const data = await getPageBySlug(slug);
        setPage(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchPage();
  }, [slug]);

  return { page, loading, error };
}

export function useNews(category?: string, limit?: number) {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const data = await getNews(undefined, category, limit);
        setNews(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [category, limit]);

  return { news, loading, error };
}

export function useEstablishments(limit?: number) {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchEstablishments() {
      try {
        setLoading(true);
        const data = await getEstablishments(undefined, limit);
        setEstablishments(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchEstablishments();
  }, [limit]);

  return { establishments, loading, error };
}

export function useHomeContent() {
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchHomeContent() {
      try {
        setLoading(true);
        const data = await getHomeContent();
        setHomeContent(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchHomeContent();
  }, []);

  return { homeContent, loading, error };
}

export function useSearch(searchTerm: string) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function search() {
      if (!searchTerm || searchTerm.length < 2) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const data = await searchContent(searchTerm);
        setResults(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    search();
  }, [searchTerm]);

  return { results, loading, error };
}
