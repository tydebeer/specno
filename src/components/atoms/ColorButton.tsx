import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ColorButtonProps {
  color: string;
  isSelected?: boolean;
  onPress: () => void;
}

export const ColorButton: React.FC<ColorButtonProps> = ({
  color,
  isSelected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.colorButton, { backgroundColor: color }]}>
        {isSelected && <View style={styles.selectedRing} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#000',
    position: 'absolute',
  },
}); 