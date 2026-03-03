import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Field from '../components/Field';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../theme/colors';
import { useAuth } from '../context/AuthContext';

export default function SignupScreen({ navigation }) {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      await signup({ name, email, password });
    } catch (error) {
      Alert.alert('Signup failed', error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Field label="Full Name" value={name} onChangeText={setName} placeholder="Your name" />
      <Field label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" />
      <Field
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="At least 6 characters"
        secureTextEntry
      />
      <PrimaryButton title="Sign Up" onPress={onSignup} loading={loading} />
      <Text style={styles.footer} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: colors.text, marginBottom: 20 },
  footer: { marginTop: 20, color: colors.primary, textAlign: 'center' },
});
