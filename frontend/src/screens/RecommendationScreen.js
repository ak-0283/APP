import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import client from '../api/client';
import colors from '../theme/colors';

const Card = ({ item, isAvoid = false }) => (
  <View style={[styles.card, isAvoid && styles.avoidCard]}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.meta}>Calories: {item.calories}</Text>
    <Text style={styles.meta}>Sugar: {item.sugar}g</Text>
    <Text style={styles.meta}>Sodium: {item.sodium}mg</Text>
    <Text style={styles.meta}>Fat: {item.fat}g</Text>
    {isAvoid && item.reasons?.map((reason) => <Text key={reason} style={styles.reason}>• {reason}</Text>)}
  </View>
);

export default function RecommendationScreen() {
  const [data, setData] = useState({ recommended: [], avoid: [], explanation: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const response = await client.get('/menu/recommendations');
        setData(response.data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Could not load recommendations');
      }
    };

    loadRecommendations();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AI Rule-Based Recommendations</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {data.explanation ? <Text style={styles.explanation}>{data.explanation}</Text> : null}

      <Text style={styles.sectionTitle}>Recommended Items</Text>
      {data.recommended.length > 0 ? (
        data.recommended.map((item) => <Card key={item.id} item={item} />)
      ) : (
        <Text style={styles.empty}>No recommended items based on your profile.</Text>
      )}

      <Text style={styles.sectionTitle}>Avoid Items</Text>
      {data.avoid.length > 0 ? (
        data.avoid.map((item) => <Card key={item.id} item={item} isAvoid />)
      ) : (
        <Text style={styles.empty}>No avoid items.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: colors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10, color: colors.text },
  explanation: { color: colors.subtext, marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 10, color: colors.text },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  avoidCard: { borderColor: '#fecaca', backgroundColor: '#fff1f2' },
  name: { fontSize: 17, fontWeight: '700', color: colors.text, marginBottom: 6 },
  meta: { color: colors.subtext },
  reason: { color: colors.danger, marginTop: 6 },
  empty: { color: colors.subtext, fontStyle: 'italic' },
  error: { color: colors.danger, marginBottom: 10 },
});
