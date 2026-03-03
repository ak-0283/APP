import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import Field from '../components/Field';
import ToggleField from '../components/ToggleField';
import PrimaryButton from '../components/PrimaryButton';
import client from '../api/client';
import colors from '../theme/colors';

const initialState = {
  diabetes: false,
  highBloodPressure: false,
  highCholesterol: false,
  allergies: '',
  calorieGoal: '2000',
};

export default function ProfileScreen() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await client.get('/profile/me');
        if (data.profile) {
          setForm({
            diabetes: data.profile.diabetes,
            highBloodPressure: data.profile.highBloodPressure,
            highCholesterol: data.profile.highCholesterol,
            allergies: data.profile.allergies || '',
            calorieGoal: String(data.profile.calorieGoal || 2000),
          });
        }
      } catch (_error) {
        // profile may not exist yet
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      await client.post('/profile', {
        ...form,
        calorieGoal: Number(form.calorieGoal),
      });
      Alert.alert('Success', 'Health profile saved');
    } catch (error) {
      Alert.alert('Error', error?.response?.data?.message || 'Could not save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Health Profile</Text>
      <ToggleField
        label="Diabetes"
        value={form.diabetes}
        onChange={(value) => setForm((prev) => ({ ...prev, diabetes: value }))}
      />
      <ToggleField
        label="High Blood Pressure"
        value={form.highBloodPressure}
        onChange={(value) => setForm((prev) => ({ ...prev, highBloodPressure: value }))}
      />
      <ToggleField
        label="High Cholesterol"
        value={form.highCholesterol}
        onChange={(value) => setForm((prev) => ({ ...prev, highCholesterol: value }))}
      />
      <Field
        label="Allergies (comma separated)"
        value={form.allergies}
        onChangeText={(text) => setForm((prev) => ({ ...prev, allergies: text }))}
        placeholder="e.g. cheese, wheat"
      />
      <Field
        label="Daily Calorie Goal"
        value={form.calorieGoal}
        onChangeText={(text) => setForm((prev) => ({ ...prev, calorieGoal: text }))}
        keyboardType="numeric"
        placeholder="2000"
      />
      <PrimaryButton title="Save Profile" onPress={handleSave} loading={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: colors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16, color: colors.text },
});
