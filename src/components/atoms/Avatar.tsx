import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

interface AvatarProps {
  source: string;
  size?: number;
  isSelected?: boolean;
  onPress?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 64,
  isSelected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.container,
        { width: size, height: size },
        isSelected && styles.selected
      ]}
    >
      <Image
        source={{ uri: source }}
        style={[styles.image, { width: size, height: size }]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    overflow: 'hidden',
    margin: 8,
  },
  image: {
    borderRadius: 100,
  },
  selected: {
    borderWidth: 2,
    borderColor: '#2F80ED',
  },
}); 