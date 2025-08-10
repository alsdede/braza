import { useMemo } from 'react';
import type { Section } from '../types/sanity';

/**
 * Hook para otimizar a renderização de seções
 * - Filtra seções ativas
 * - Memoiza a lista para evitar re-renders
 * - Adiciona keys únicos
 */
export function useSections(sections?: Section[]) {
  return useMemo(() => {
    if (!sections?.length) return [];
    
    return sections
      .filter((section) => {
        // Filtra seções ativas (se tiver essa propriedade)
        if ('isActive' in section) {
          return section.isActive;
        }
        return true;
      })
      .map((section, index) => ({
        ...section,
        // Garante que cada seção tenha uma key única
        _key: section._key || `${section._type}-${index}`,
      }));
  }, [sections]);
}

/**
 * Hook para detectar mudanças em seções específicas
 * Útil para re-renderizar apenas seções que mudaram
 */
export function useSectionsDiff(sections?: Section[]) {
  return useMemo(() => {
    if (!sections?.length) return {};
    
    return sections.reduce((acc, section, index) => {
      const key = section._key || `${section._type}-${index}`;
      acc[key] = section;
      return acc;
    }, {} as Record<string, Section>);
  }, [sections]);
}
