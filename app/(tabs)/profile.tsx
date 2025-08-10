import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../src/stores/authStore";
import { Button, Text } from "../../src/components/ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../src/constants/colors";

const CHECK_LIST = [
  "Compre um prato e ganhe outro",
  "+100 Cupões em dobro disponíveis",
  "Economiza mais de 2000 Euros em Restaurantes"
]
export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogin = () => {
    router.push("/auth");
  };

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text variant="h2" color="primary" align="center" style={{ marginBottom: 24 }}>
            O maior Guia gastronômico de Portugal
          </Text>
          
          <View style={{ marginBottom: 32 }}>
            {CHECK_LIST.map((item, index) => (
              <CheckListItem key={index} text={item} />
            ))}
          </View>
          
          <Button variant="primary" onPress={handleLogin} fullWidth>
            Entrar
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Welcome, {user?.email}</Text>

        <View style={styles.userInfo}>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1D1D1F",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#6E6E73",
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  userInfo: {
    backgroundColor: "#F2F2F7",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  userEmail: {
    fontSize: 16,
    color: "#1D1D1F",
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  checkListItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  checkIcon: {
    borderRadius: 100,
    padding: 4,
    backgroundColor: colors.primary,
    marginRight: 12,
  },
  checkText: {
    flex: 1,
  },
});



export const CheckListItem = ({ text }: { text: string }) => {
  return (
    <View style={styles.checkListItem}>
      <View style={styles.checkIcon}>
        <MaterialCommunityIcons size={20} name="check" color={colors.white} />
      </View>
      <Text weight="medium" variant="body" color="secondary" style={styles.checkText}>
        {text}
      </Text>
    </View>
  );
};