# Componentes UI - Braza App

## Visão Geral

Este conjunto de componentes UI fornece uma base sólida e tipada para o desenvolvimento da aplicação Braza, seguindo as melhores práticas de React Native com TypeScript.

## Componentes Disponíveis

### 📝 Text Component

Componente de texto dinâmico e tipado que aplica automaticamente nossa tipografia e cores.

#### Props

```typescript
interface TextProps {
  variant?: TextVariant;     // Variante tipográfica
  color?: TextColor;         // Cor do texto
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'normal' | 'bold' | 'light' | 'medium' | 'semibold';
  children: React.ReactNode;
  // + todas as props nativas de Text
}
```

#### Variantes Disponíveis

**Headings:**
- `h1`, `h2`, `h3`, `h4`, `h5`, `h6`

**Body Text:**
- `body` (padrão), `bodyLarge`, `bodySmall`

**Elementos Especiais:**
- `caption`, `label`, `cardTitle`, `cardSubtitle`
- `navTitle`, `tabLabel`, `price`, `rating`
- `button`, `buttonLarge`, `buttonSmall`

#### Cores Disponíveis

- `primary`, `secondary`, `tertiary`, `inverse`
- `success`, `warning`, `error`, `info`, `link`
- `white`, `black`

#### Exemplos de Uso

```tsx
import { Text } from '../components/ui';

// Título principal
<Text variant="h1" color="primary">
  Título Principal
</Text>

// Texto de corpo
<Text variant="body" color="secondary">
  Este é um texto de corpo com cor secundária.
</Text>

// Preço destacado
<Text variant="price" color="primary">
  R$ 49,90
</Text>

// Rating
<Text variant="rating">
  ⭐ 4.8
</Text>
```

### 🔘 Button Component

Componente de botão altamente customizável com múltiplas variantes, tamanhos e estados.

#### Props

```typescript
interface ButtonProps {
  variant?: ButtonVariant;   // Estilo do botão
  size?: ButtonSize;         // Tamanho do botão
  loading?: boolean;         // Estado de carregamento
  fullWidth?: boolean;       // Largura total
  icon?: React.ReactNode;    // Ícone opcional
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  // + todas as props nativas de TouchableOpacity
}
```

### ⌨️ TextInput Component

Componente de entrada de texto avançado com validação, estados dinâmicos e integração completa com o design system.

#### Props

```typescript
interface TextInputProps {
  variant?: TextInputVariant; // Estilo do input
  size?: TextInputSize;       // Tamanho do input
  label?: string;             // Label do campo
  placeholder?: string;       // Placeholder
  helperText?: string;        // Texto de ajuda
  errorText?: string;         // Texto de erro
  successText?: string;       // Texto de sucesso
  leftIcon?: React.ReactNode; // Ícone à esquerda
  rightIcon?: React.ReactNode;// Ícone à direita
  required?: boolean;         // Campo obrigatório
  disabled?: boolean;         // Campo desabilitado
  loading?: boolean;          // Estado de carregamento
  characterLimit?: number;    // Limite de caracteres
  showCharacterCount?: boolean; // Mostrar contador
  onValidate?: (value: string) => string | null; // Função de validação
  // + todas as props nativas de TextInput
}
```

#### Variantes Disponíveis

- `default` - Input com background cinza
- `outlined` (padrão) - Input com borda
- `filled` - Input preenchido com borda inferior
- `underlined` - Input apenas com linha inferior

#### Tamanhos Disponíveis

- `small` - 40px altura mínima
- `medium` (padrão) - 48px altura mínima  
- `large` - 56px altura mínima

#### Estados Automáticos

- `default` - Estado normal
- `focus` - Quando focado (borda colorida)
- `error` - Quando há erro (borda vermelha)
- `success` - Quando válido (borda verde)
- `disabled` - Quando desabilitado (opaco)

#### Recursos Avançados

**Validação em Tempo Real:**
```tsx
const validateEmail = (value: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) return 'Email é obrigatório';
  if (!emailRegex.test(value)) return 'Email inválido';
  return null;
};

<TextInput
  label="Email"
  onValidate={validateEmail}
  required
/>
```

**Label Flutuante:**
- Labels animadas que flutuam quando o campo é focado
- Funciona automaticamente com variants `outlined`, `filled`, `default`

**Limite de Caracteres:**
```tsx
<TextInput
  characterLimit={150}
  showCharacterCount
  multiline
/>
```

**Referências para Controle:**
```tsx
const inputRef = useRef<TextInputRef>(null);

// Métodos disponíveis:
inputRef.current?.focus();    // Focar o input
inputRef.current?.blur();     // Remover foco
inputRef.current?.clear();    // Limpar conteúdo
inputRef.current?.getValue(); // Obter valor atual
inputRef.current?.validate(); // Validar manualmente
```

#### Exemplos de Uso

```tsx
import { TextInput, type TextInputRef } from '../components/ui';

// Input básico
<TextInput
  variant="outlined"
  label="Nome"
  placeholder="Digite seu nome"
  required
/>

// Input com validação
<TextInput
  variant="outlined"
  label="Email"
  placeholder="seuemail@exemplo.com"
  onValidate={validateEmail}
  keyboardType="email-address"
  autoCapitalize="none"
/>

// Input com máscara (exemplo telefone)
<TextInput
  variant="filled"
  label="Telefone"
  placeholder="(11) 99999-9999"
  onChangeText={formatPhoneNumber}
  helperText="Formato: (11) 99999-9999"
/>

// Textarea
<TextInput
  variant="outlined"
  label="Descrição"
  placeholder="Conte mais detalhes..."
  multiline
  numberOfLines={4}
  characterLimit={200}
  showCharacterCount
/>

// Input com ícones
<TextInput
  variant="outlined"
  label="Buscar"
  placeholder="Digite para buscar..."
  leftIcon={<SearchIcon />}
  rightIcon={<ClearIcon />}
/>
```

#### Variantes Disponíveis

- `primary` (padrão) - Botão principal laranja
- `secondary` - Botão preto
- `outline` - Botão com borda laranja e fundo transparente
- `ghost` - Botão transparente
- `link` - Botão estilo link
- `success` - Botão verde
- `warning` - Botão amarelo
- `error` - Botão vermelho

#### Tamanhos Disponíveis

- `small` - 32px altura mínima
- `medium` (padrão) - 44px altura mínima
- `large` - 52px altura mínima

#### Exemplos de Uso

```tsx
import { Button } from '../components/ui';

// Botão primário padrão
<Button variant="primary" onPress={() => console.log('Clicado!')}>
  Confirmar
</Button>

// Botão com carregamento
<Button variant="primary" loading>
  Salvando...
</Button>

// Botão outline pequeno
<Button variant="outline" size="small">
  Cancelar
</Button>

// Botão largura total
<Button variant="success" fullWidth>
  Finalizar Compra
</Button>

// Botão desabilitado
<Button variant="primary" disabled>
  Indisponível
</Button>
```

## 🎨 Sistema de Design

### Cores Principais

- **Primária:** `#F26419` (Laranja)
- **Secundária:** `#000000` (Preto)
- **Backgrounds:** Branco, cinza claro
- **Status:** Verde, amarelo, vermelho, azul

### Tipografia

- **Fonte:** Inter (Google Fonts)
- **Pesos:** Thin (100), ExtraLight (200), Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700), ExtraBold (800), Black (900)
- **Tamanhos:** 12px a 48px com line-heights otimizados

## 🚀 Como Usar

### 1. Importação

```tsx
import { Text, Button } from '../components/ui';
```

### 2. Uso Básico

```tsx
export const MeuComponente = () => {
  return (
    <View>
      <Text variant="h2" color="primary">
        Bem-vindo ao Braza!
      </Text>
      
      <Text variant="body" style={{ marginVertical: 16 }}>
        Encontre os melhores estabelecimentos da sua região.
      </Text>
      
      <Button 
        variant="primary" 
        onPress={() => navigation.navigate('Establishments')}
      >
        Ver Estabelecimentos
      </Button>
    </View>
  );
};
```

### 3. Customização Avançada

```tsx
// Combinando props nativas com nossas variantes
<Text 
  variant="body" 
  color="secondary"
  numberOfLines={2}
  ellipsizeMode="tail"
>
  Texto com limitação de linhas
</Text>

// Botão com estilo customizado
<Button
  variant="outline"
  size="large"
  style={{ borderRadius: 20 }}
  textStyle={{ textTransform: 'uppercase' }}
>
  Botão Customizado
</Button>
```

## 📱 Responsividade

Os componentes foram projetados para funcionar em diferentes tamanhos de tela:

- Tamanhos de fonte escalam apropriadamente
- Espaçamentos proporcionais
- Touch targets seguem as diretrizes de acessibilidade (44px mínimo)

## ✨ Benefícios

1. **Consistência:** Design system unificado
2. **Type Safety:** TypeScript completo com autocompletar
3. **Performance:** Componentes otimizados
4. **Acessibilidade:** Seguindo as melhores práticas
5. **Manutenibilidade:** Código limpo e organizados
6. **Flexibilidade:** Extensível e customizável

## 🔧 Desenvolvimento

Para adicionar novos componentes:

1. Crie o componente em `/src/components/ui/`
2. Exporte no `/src/components/ui/index.ts`
3. Siga a mesma estrutura de tipos e props
4. Documente o uso e exemplos

---

*Desenvolvido com ❤️ para o ecossistema Braza*
