import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import client from '../api/client';
import colors from '../theme/colors';
import { useAuth } from '../context/AuthContext';

export default function AdminScreen() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await client.get('/admin/overview');
        setUsers(data.users || []);
        setProfiles(data.profiles || []);
      } catch (err) {
        setError(err?.response?.data?.message || 'Admin data unavailable');
      }
    };

    if (user?.role === 'admin') {
      loadData();
    }
  }, [user]);

  if (user?.role !== 'admin') {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Admin access only.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.sectionTitle}>All Users</Text>
      {users.map((item) => (
        <View key={item._id} style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.meta}>{item.email}</Text>
          <Text style={styles.meta}>Role: {item.role}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Health Profiles</Text>
      {profiles.map((item) => (
        <View key={item._id} style={styles.card}>
          <Text style={styles.name}>{item.user?.name || 'Unknown User'}</Text>
          <Text style={styles.meta}>Diabetes: {String(item.diabetes)}</Text>
          <Text style={styles.meta}>High BP: {String(item.highBloodPressure)}</Text>
          <Text style={styles.meta}>Cholesterol: {String(item.highCholesterol)}</Text>
          <Text style={styles.meta}>Allergies: {item.allergies || 'None'}</Text>
          <Text style={styles.meta}>Calorie Goal: {item.calorieGoal}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: colors.background, flexGrow: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10, color: colors.text },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 10, color: colors.text },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  name: { fontWeight: '700', color: colors.text },
  meta: { color: colors.subtext },
  error: { color: colors.danger },
});
