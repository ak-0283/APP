import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import client from '../api/client';
import colors from '../theme/colors';

const ItemCard = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.meta}>Calories: {item.calories}</Text>
    <Text style={styles.meta}>Sugar: {item.sugar}g</Text>
    <Text style={styles.meta}>Sodium: {item.sodium}mg</Text>
    <Text style={styles.meta}>Fat: {item.fat}g</Text>
  </View>
);

export default function MenuScreen() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const loadMenu = async () => {
      const { data } = await client.get('/menu');
      setMenu(data.menu || []);
    };

    loadMenu();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Restaurant Menu</Text>
      {menu.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: colors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16, color: colors.text },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 6 },
  meta: { color: colors.subtext },
});
