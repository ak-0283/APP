import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../theme/colors';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi, {user?.name || 'User'} 👋</Text>
      <Text style={styles.subtitle}>Health-Aware Food Recommendation System</Text>

      <PrimaryButton title="Update Health Profile" onPress={() => navigation.navigate('Profile')} style={styles.btn} />
      <PrimaryButton title="View Menu" onPress={() => navigation.navigate('Menu')} style={styles.btn} />
      <PrimaryButton
        title="Get Recommendations"
        onPress={() => navigation.navigate('Recommendations')}
        style={styles.btn}
      />
      <PrimaryButton title="Admin Panel" onPress={() => navigation.navigate('Admin')} style={styles.btn} />
      <PrimaryButton title="Logout" onPress={logout} style={[styles.btn, styles.logout]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: colors.text, marginBottom: 8 },
  subtitle: { color: colors.subtext, marginBottom: 24 },
  btn: { marginBottom: 12 },
  logout: { backgroundColor: '#ef4444' },
});
