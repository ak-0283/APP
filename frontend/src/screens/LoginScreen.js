import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Field from '../components/Field';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../theme/colors';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      await login({ email, password });
    } catch (error) {
      Alert.alert('Login failed', error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Field label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" />
      <Field
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />
      <PrimaryButton title="Login" onPress={onLogin} loading={loading} />
      <Text style={styles.footer} onPress={() => navigation.navigate('Signup')}>
        New user? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: colors.text, marginBottom: 20 },
  footer: { marginTop: 20, color: colors.primary, textAlign: 'center' },
});
