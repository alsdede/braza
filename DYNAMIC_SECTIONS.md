# Sistema de Renderização Dinâmica de Seções

Este sistema permite renderizar componentes de seção dinamicamente baseado no `_type` das seções retornadas pelo Sanity CMS.

## 🏗️ Arquitetura

### 1. **SectionRenderer** (Principal)
- **Localização**: `src/components/sections/SectionRenderer.tsx`
- **Função**: Registry e renderização dinâmica de componentes
- **Otimizações**: Memoização com `useMemo` e `memo`

### 2. **Hook useSections** (Performance)
- **Localização**: `src/hooks/useSections.ts`
- **Função**: Filtra seções ativas e memoiza para performance
- **Benefícios**: Evita re-renders desnecessários

### 3. **Componentes de Seção**
- **Localização**: `src/components/sections/`
- **Padrão**: Cada `_type` tem seu componente correspondente

## 📦 Componentes Disponíveis

| Sanity `_type` | Componente React | Status |
|----------------|------------------|---------|
| `gallerySection` | `GallerySection` | ✅ Implementado |
| `heroSection` | `HeroSection` | ✅ Implementado |
| `contentSection` | `ContentSection` | ⏳ Pendente |
| `ctaSection` | `CtaSection` | ⏳ Pendente |
| `featuredEstablishmentsSection` | `FeaturedEstablishmentsSection` | ⏳ Pendente |
| `latestNewsSection` | `LatestNewsSection` | ⏳ Pendente |
| `contactSection` | `ContactSection` | ⏳ Pendente |

## 🚀 Como Usar

### 1. **Em uma página ou tela:**
```tsx
import { SectionRenderer } from '../components/sections';
import { useSections } from '../hooks/useSections';

function MyPage({ page }: { page: Page }) {
  const optimizedSections = useSections(page.sections);
  
  return (
    <ScrollView>
      {optimizedSections.map((section, index) => (
        <SectionRenderer
          key={section._key}
          section={section}
          index={index}
        />
      ))}
    </ScrollView>
  );
}
```

### 2. **Adicionando novo componente de seção:**

1. **Crie o componente:**
```tsx
// src/components/sections/MyNewSection.tsx
export default function MyNewSection({ section }: { section: MyNewSectionType }) {
  if (!section.isActive) return null;
  
  return (
    <View>
      <Text>{section.title}</Text>
    </View>
  );
}
```

2. **Registre no SectionRenderer:**
```tsx
// src/components/sections/SectionRenderer.tsx
import MyNewSection from './MyNewSection';

const getSectionComponent = (type: string) => {
  switch (type) {
    case 'myNewSection':
      return MyNewSection;
    // ... outros casos
  }
};
```

3. **Exporte no index:**
```tsx
// src/components/sections/index.ts
export { default as MyNewSection } from './MyNewSection';
```

## ⚡ Otimizações Implementadas

### 1. **Memoização de Componentes**
- `memo` para evitar re-renders desnecessários
- `useMemo` para computação de componentes

### 2. **Filtragem Inteligente**
- Hook `useSections` filtra seções ativas
- Memoização da lista de seções

### 3. **Keys Únicas**
- Garante `_key` único para cada seção
- Fallback para `${type}-${index}`

### 4. **Error Boundaries**
- Componente `SectionNotFound` para depuração
- Graceful degradation em produção

## 🔧 Desenvolvimento

### **Modo Debug**
Em `__DEV__`, seções não encontradas mostram aviso visual:
```
⚠️ Componente não encontrado: unknownSection
```

### **Adicionando Tipos**
```tsx
// src/types/sanity.ts
export interface MyNewSection {
  _type: 'myNewSection';
  _key?: string;
  title: string;
  isActive: boolean;
}

// Adicione ao union type Section
export type Section = 
  | GallerySection 
  | HeroSection
  | MyNewSection  // <- adicione aqui
  | ...
```

## 📱 Performance no React Native

### **Por que não React.lazy?**
- React Native não suporta `React.lazy` nativamente
- Usamos imports diretos + switch case
- Ainda sim obtemos tree-shaking

### **Lazy Loading Alternativo**
Para lazy loading real, use:
```tsx
const getSectionComponent = async (type: string) => {
  switch (type) {
    case 'heavySection':
      const { default: HeavySection } = await import('./HeavySection');
      return HeavySection;
  }
};
```

## 🎯 Melhores Práticas

1. **Sempre verifique `isActive`** nos componentes
2. **Use `memo` para componentes** pesados
3. **Implemente fallbacks** para seções não encontradas
4. **Mantenha tipos atualizados** no Sanity schema
5. **Teste com dados reais** do Sanity Studio

## 🔄 Fluxo de Dados

```
Sanity CMS → API Response → Page.sections[] → useSections → SectionRenderer → Componente Específico
```

## 📊 Benefícios

- ✅ **Extensibilidade**: Fácil adicionar novos componentes
- ✅ **Performance**: Otimizações de renderização
- ✅ **Type Safety**: TypeScript em toda pipeline
- ✅ **Debugging**: Avisos claros em desenvolvimento
- ✅ **Manutenibilidade**: Código organizado e documentado
