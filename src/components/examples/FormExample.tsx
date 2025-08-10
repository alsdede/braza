import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button, TextInput, type TextInputRef } from '../ui';
import { colors } from '../../constants/colors';

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  bio: string;
}

export const FormExample: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);

  // Refs para validação
  const nameRef = useRef<TextInputRef>(null);
  const emailRef = useRef<TextInputRef>(null);
  const phoneRef = useRef<TextInputRef>(null);
  const passwordRef = useRef<TextInputRef>(null);
  const confirmPasswordRef = useRef<TextInputRef>(null);

  // Validations
  const validateName = (value: string): string | null => {
    if (!value.trim()) return 'Nome é obrigatório';
    if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
    return null;
  };

  const validateEmail = (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email é obrigatório';
    if (!emailRegex.test(value)) return 'Email inválido';
    return null;
  };

  const validatePhone = (value: string): string | null => {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!value) return 'Telefone é obrigatório';
    if (!phoneRegex.test(value)) return 'Formato: (11) 99999-9999';
    return null;
  };

  const validatePassword = (value: string): string | null => {
    if (!value) return 'Senha é obrigatória';
    if (value.length < 8) return 'Senha deve ter pelo menos 8 caracteres';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return 'Senha deve conter: maiúscula, minúscula e número';
    }
    return null;
  };

  const validateConfirmPassword = (value: string): string | null => {
    if (!value) return 'Confirmação de senha é obrigatória';
    if (value !== formData.password) return 'Senhas não coincidem';
    return null;
  };

  // Phone mask
  const formatPhone = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return text;
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhone(text);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const updateFormData = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validate all fields
    const validations = [
      nameRef.current?.validate(),
      emailRef.current?.validate(),
      phoneRef.current?.validate(),
      passwordRef.current?.validate(),
      confirmPasswordRef.current?.validate(),
    ];

    const isFormValid = validations.every(Boolean);

    if (!isFormValid) {
      Alert.alert('Erro', 'Por favor, corrija os erros no formulário');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Sucesso!', 
        'Cadastro realizado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setFormData({
                name: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
                bio: '',
              });
            }
          }
        ]
      );
    }, 2000);
  };

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      bio: '',
    });
    
    // Clear all input refs
    [nameRef, emailRef, phoneRef, passwordRef, confirmPasswordRef].forEach(ref => {
      ref.current?.clear();
    });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text variant="h1" color="primary" align="center">
            Cadastro
          </Text>
          <Text variant="body" color="secondary" align="center" style={styles.subtitle}>
            Preencha os dados abaixo para criar sua conta
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            ref={nameRef}
            variant="outlined"
            label="Nome Completo"
            placeholder="Digite seu nome completo"
            value={formData.name}
            onChangeText={updateFormData('name')}
            onValidate={validateName}
            required
            autoCapitalize="words"
            textContentType="name"
          />

          <TextInput
            ref={emailRef}
            variant="outlined"
            label="Email"
            placeholder="seuemail@exemplo.com"
            value={formData.email}
            onChangeText={updateFormData('email')}
            onValidate={validateEmail}
            required
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
          />

          <TextInput
            ref={phoneRef}
            variant="outlined"
            label="Telefone"
            placeholder="(11) 99999-9999"
            value={formData.phone}
            onChangeText={handlePhoneChange}
            onValidate={validatePhone}
            required
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            helperText="Formato: (11) 99999-9999"
          />

          <TextInput
            ref={passwordRef}
            variant="outlined"
            label="Senha"
            placeholder="Digite uma senha segura"
            value={formData.password}
            onChangeText={updateFormData('password')}
            onValidate={validatePassword}
            required
            secureTextEntry
            textContentType="newPassword"
            helperText="Mín. 8 caracteres, maiúscula, minúscula e número"
          />

          <TextInput
            ref={confirmPasswordRef}
            variant="outlined"
            label="Confirmar Senha"
            placeholder="Digite a senha novamente"
            value={formData.confirmPassword}
            onChangeText={updateFormData('confirmPassword')}
            onValidate={validateConfirmPassword}
            required
            secureTextEntry
            textContentType="newPassword"
          />

          <TextInput
            variant="filled"
            label="Bio (Opcional)"
            placeholder="Conte um pouco sobre você..."
            value={formData.bio}
            onChangeText={updateFormData('bio')}
            multiline
            numberOfLines={4}
            characterLimit={200}
            showCharacterCount
            helperText="Descrição que aparecerá no seu perfil"
          />
        </View>

        <View style={styles.actions}>
          <Button
            variant="primary"
            size="large"
            onPress={handleSubmit}
            loading={loading}
            fullWidth
            style={styles.submitButton}
          >
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </Button>

          <Button
            variant="ghost"
            size="medium"
            onPress={clearForm}
            disabled={loading}
            fullWidth
          >
            Limpar Formulário
          </Button>
        </View>

        <View style={styles.footer}>
          <Text variant="caption" color="tertiary" align="center">
            Ao criar uma conta, você concorda com nossos{' '}
            <Text variant="caption" color="link">
              Termos de Uso
            </Text>
            {' '}e{' '}
            <Text variant="caption" color="link">
              Política de Privacidade
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    marginTop: 20,
  },
  subtitle: {
    marginTop: 8,
  },
  form: {
    marginBottom: 32,
  },
  actions: {
    marginBottom: 24,
  },
  submitButton: {
    marginBottom: 12,
  },
  footer: {
    paddingHorizontal: 20,
  },
});

export default FormExample;
