import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

interface ColorPickerProps {
  color: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const ColorPicker = ({ color, isSelected, onSelect }: ColorPickerProps) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[styles.container, isSelected && styles.selectedContainer]}
    >
      <View style={[styles.colorCircle, { backgroundColor: color }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  selectedContainer: {
    backgroundColor: '#f0f0f0',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
}); 