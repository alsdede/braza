import React, { ComponentType, memo, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import type { Section } from "../../types/sanity";

// Import direto dos componentes (React Native não suporta lazy loading igual web)
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import TravelServiceSection from "./TravelServiceSection";

// Tipo para definir os componentes de seção
type SectionComponent<T = any> = ComponentType<{ section: T }>;

// Wrapper para componentes que usam 'data' prop ao invés de 'section'
const TravelServiceSectionWrapper: SectionComponent = ({ section }) => (
  <TravelServiceSection data={section} />
);

// Registry de componentes - use imports dinâmicos quando necessário
const getSectionComponent = (type: string): SectionComponent | null => {
  switch (type) {
    case "gallerySection":
      return GallerySection;
    case "heroSection":
      return HeroSection;
    case "travelServiceSection":
      return TravelServiceSectionWrapper;
    // Adicione outros componentes aqui conforme forem criados:
    // case 'contentSection':
    //   return ContentSection;
    // case 'ctaSection':
    //   return CtaSection;
    // case 'featuredEstablishmentsSection':
    //   return FeaturedEstablishmentsSection;
    // case 'latestNewsSection':
    //   return LatestNewsSection;
    // case 'contactSection':
    //   return ContactSection;
    default:
      return null;
  }
};

// Componente de fallback para componentes não encontrados
const SectionNotFound = memo(({ sectionType }: { sectionType: string }) => {
  if (__DEV__) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>
          ⚠️ Componente não encontrado: {sectionType}
        </Text>
      </View>
    );
  }
  return null;
});

SectionNotFound.displayName = "SectionNotFound";

// Props do renderizador de seção
interface SectionRendererProps {
  section: Section;
  index?: number;
}

// Componente principal para renderizar seções dinamicamente
const SectionRenderer = memo<SectionRendererProps>(({ section, index }) => {
  // Memoizar o componente para evitar re-renders desnecessários
  const SectionComponent = useMemo(
    () => getSectionComponent(section._type),
    [section._type]
  );

  // Se o componente não existir, renderiza componente de erro ou nada
  if (!SectionComponent) {
    return <SectionNotFound sectionType={section._type} />;
  }

  // Renderiza o componente da seção
  return <SectionComponent section={section} />;
});

SectionRenderer.displayName = "SectionRenderer";

const styles = StyleSheet.create({
  notFound: {
    padding: 12,
    backgroundColor: "#ffe6e6",
    borderRadius: 8,
    marginVertical: 4,
    borderLeftWidth: 3,
    borderLeftColor: "#ff6b6b",
  },
  notFoundText: {
    color: "#cc0000",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default SectionRenderer;
