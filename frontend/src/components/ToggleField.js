import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../theme/colors';

export default function ToggleField({ label, value, onChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <Pressable
          onPress={() => onChange(true)}
          style={[styles.option, value === true && styles.selected]}
        >
          <Text style={[styles.optionText, value === true && styles.selectedText]}>Yes</Text>
        </Pressable>
        <Pressable
          onPress={() => onChange(false)}
          style={[styles.option, value === false && styles.selected]}
        >
          <Text style={[styles.optionText, value === false && styles.selectedText]}>No</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  label: { fontSize: 14, color: colors.subtext, marginBottom: 6 },
  row: { flexDirection: 'row', gap: 12 },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
  },
  optionText: { color: colors.text },
  selected: { borderColor: colors.primary, backgroundColor: '#eaf0ff' },
  selectedText: { color: colors.primary, fontWeight: '600' },
});
