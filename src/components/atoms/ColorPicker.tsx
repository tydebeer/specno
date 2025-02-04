import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { OFFICE_COLORS_MAP, OfficeColorKey } from '../../config/uiConfig';

interface ColorPickerProps {
  colorKey: OfficeColorKey;
  isSelected: boolean;
  onSelect: () => void;
}

export const ColorPicker = ({ colorKey, isSelected, onSelect }: ColorPickerProps) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[styles.container, isSelected && styles.selectedContainer]}
    >
      <View style={[styles.colorCircle, { backgroundColor: OFFICE_COLORS_MAP[colorKey] }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedContainer: {
    backgroundColor: '#c0c0c0',
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
}); 