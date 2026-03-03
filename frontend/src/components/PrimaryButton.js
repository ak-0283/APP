import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import colors from '../theme/colors';

export default function PrimaryButton({ title, onPress, loading = false, style }) {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]} disabled={loading}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
