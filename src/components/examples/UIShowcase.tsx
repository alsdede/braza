import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, TextInput, type TextInputRef } from '../ui';
import { colors } from '../../constants/colors';

export const UIShowcase: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const emailRef = useRef<TextInputRef>(null);
  const passwordRef = useRef<TextInputRef>(null);

  const validateEmail = (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email é obrigatório';
    if (!emailRegex.test(value)) return 'Email inválido';
    return null;
  };

  const validatePassword = (value: string): string | null => {
    if (!value) return 'Senha é obrigatória';
    if (value.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
    return null;
  };

  const handleSubmit = () => {
    const emailValid = emailRef.current?.validate();
    const passwordValid = passwordRef.current?.validate();
    
    if (emailValid && passwordValid) {
      Alert.alert('Sucesso', 'Formulário válido!');
    } else {
      Alert.alert('Erro', 'Por favor, corrija os erros no formulário');
    }
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Typography Examples */}
      <View style={styles.section}>
        <Text variant="h2" color="primary" style={styles.sectionTitle}>
          Tipografia
        </Text>
        
        <Text variant="h1" style={styles.example}>Heading 1</Text>
        <Text variant="h2" style={styles.example}>Heading 2</Text>
        <Text variant="h3" style={styles.example}>Heading 3</Text>
        <Text variant="h4" style={styles.example}>Heading 4</Text>
        <Text variant="h5" style={styles.example}>Heading 5</Text>
        <Text variant="h6" style={styles.example}>Heading 6</Text>
        
        <Text variant="body" style={styles.example}>
          Este é um texto de corpo regular que demonstra como nossa tipografia
          fica em parágrafos mais longos.
        </Text>
        
        <Text variant="bodyLarge" style={styles.example}>Texto de corpo grande</Text>
        <Text variant="bodySmall" style={styles.example}>Texto de corpo pequeno</Text>
        <Text variant="caption" style={styles.example}>Legenda pequena</Text>
        <Text variant="label" style={styles.example}>Label de formulário</Text>
        
        <Text variant="cardTitle" style={styles.example}>Título do Card</Text>
        <Text variant="cardSubtitle" style={styles.example}>Subtítulo do Card</Text>
        
        <Text variant="price" color="primary" style={styles.example}>R$ 49,90</Text>
        <Text variant="rating" style={styles.example}>⭐ 4.8</Text>
      </View>

      {/* Color Examples */}
      <View style={styles.section}>
        <Text variant="h2" color="primary" style={styles.sectionTitle}>
          Cores de Texto
        </Text>
        
        <Text variant="body" color="primary" style={styles.example}>Texto primário</Text>
        <Text variant="body" color="secondary" style={styles.example}>Texto secundário</Text>
        <Text variant="body" color="tertiary" style={styles.example}>Texto terciário</Text>
        <Text variant="body" color="success" style={styles.example}>Texto de sucesso</Text>
        <Text variant="body" color="warning" style={styles.example}>Texto de aviso</Text>
        <Text variant="body" color="error" style={styles.example}>Texto de erro</Text>
        <Text variant="body" color="info" style={styles.example}>Texto informativo</Text>
        <Text variant="body" color="link" style={styles.example}>Texto de link</Text>
      </View>

      {/* Button Variants */}
      <View style={styles.section}>
        <Text variant="h2" color="primary" style={styles.sectionTitle}>
          Variações de Botão
        </Text>
        
        <Button variant="primary" style={styles.buttonExample}>
          Botão Primário
        </Button>
        
        <Button variant="secondary" style={styles.buttonExample}>
          Botão Secundário
        </Button>
        
        <Button variant="outline" style={styles.buttonExample}>
          Botão Outline
        </Button>
        
        <Button variant="ghost" style={styles.buttonExample}>
          Botão Ghost
        </Button>
        
        <Button variant="link" style={styles.buttonExample}>
          Botão Link
        </Button>
        
        <Button variant="success" style={styles.buttonExample}>
          Botão Sucesso
        </Button>
        
        <Button variant="warning" style={styles.buttonExample}>
          Botão Aviso
        </Button>
        
        <Button variant="error" style={styles.buttonExample}>
          Botão Erro
        </Button>
      </View>

      {/* Button Sizes */}
      <View style={styles.section}>
        <Text variant="h2" color="primary" style={styles.sectionTitle}>
          Tamanhos de Botão
        </Text>
        
        <Button variant="primary" size="small" style={styles.buttonExample}>
          Botão Pequeno
        </Button>
        
        <Button variant="primary" size="medium" style={styles.buttonExample}>
          Botão Médio
        </Button>
        
        <Button variant="primary" size="large" style={styles.buttonExample}>
          Botão Grande
        </Button>
      </View>

      {/* Button States */}
      <View style={styles.section}>
        <Text variant="h2" color="primary" style={styles.sectionTitle}>
          Estados do Botão
        </Text>
        
        <Button variant="primary" style={styles.buttonExample}>
          Botão Normal
        </Button>
        
        <Button variant="primary" loading style={styles.buttonExample}>
          Carregando...
        </Button>
        
        <Button variant="primary" disabled style={styles.buttonExample}>
          Botão Desabilitado
        </Button>
        
        <Button variant="primary" fullWidth style={styles.buttonExample}>
          Botão Largura Total
        </Button>
      </View>

      {/* TextInput Variants */}
      <View style={styles.section}>
        <Text variant="h2" color="primary" style={styles.sectionTitle}>
          Variações de TextInput
        </Text>
        
        <TextInput
          variant="outlined"
          label="Email"
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          required
          ref={emailRef}
          onValidate={validateEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          variant="filled"
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          required
          ref={passwordRef}
          onValidate={validatePassword}
          secureTextEntry
        />
        
        <TextInput
          variant="underlined"
          label="Nome Completo"
          placeholder="Digite seu nome"
          value={name}
          onChangeText={setName}
          helperText="Como você gostaria de ser chamado"
        />
        
        <TextInput
          variant="default"
          label="Bio"
          placeholder="Conte um pouco sobre você..."
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={3}
          characterLimit={150}
          showCharacterCount
        />
      </View>

      {/* TextInput Sizes */}
      <View style={styles.section}>
        <Text variant="h2" color="primary" style={styles.sectionTitle}>
          Tamanhos de TextInput
        </Text>
        
        <TextInput
          variant="outlined"
          size="small"
          placeholder="Input pequeno"
        />
        
        <TextInput
          variant="outlined"
          size="medium"
          placeholder="Input médio"
        />
        
        <TextInput
          variant="outlined"
          size="large"
          placeholder="Input grande"
        />
      </View>

      {/* TextInput States */}
      <View style={styles.section}>
        <Text variant="h2" color="primary" style={styles.sectionTitle}>
          Estados de TextInput
        </Text>
        
        <TextInput
          variant="outlined"
          label="Input Normal"
          placeholder="Estado normal"
        />
        
        <TextInput
          variant="outlined"
          label="Input com Erro"
          placeholder="Digite algo..."
          errorText="Este campo é obrigatório"
        />
        
        <TextInput
          variant="outlined"
          label="Input com Sucesso"
          placeholder="Email válido"
          successText="Email verificado com sucesso!"
          value="usuario@email.com"
        />
        
        <TextInput
          variant="outlined"
          label="Input Desabilitado"
          placeholder="Campo desabilitado"
          disabled
        />

        <Button 
          variant="primary" 
          onPress={handleSubmit}
          style={styles.buttonExample}
        >
          Validar Formulário
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  example: {
    marginBottom: 8,
  },
  buttonExample: {
    marginBottom: 12,
  },
});

export default UIShowcase;
