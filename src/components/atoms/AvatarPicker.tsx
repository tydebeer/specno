import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Dimensions } from 'react-native';
import { AVATARS } from '../../config/uiConfig';

const { width } = Dimensions.get('window');
const MODAL_WIDTH = width * 0.85;
const ITEMS_PER_ROW = 4;
const TOTAL_GAP = 24; // Total gap between items (8px × 3 gaps)
const ITEM_WIDTH = (MODAL_WIDTH - 40 - TOTAL_GAP) / ITEMS_PER_ROW; // 40 for modal padding

interface AvatarPickerProps {
  avatarKey: keyof typeof AVATARS;
  isSelected: boolean;
  onSelect: () => void;
  index: number; // Add index prop
}

export const AvatarPicker = ({ avatarKey, isSelected, onSelect, index }: AvatarPickerProps) => {
  const isLastInRow = (index + 1) % ITEMS_PER_ROW === 0;

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        !isLastInRow && styles.marginRight
      ]}
    >
      <Image 
        source={AVATARS[avatarKey]} 
        style={styles.avatar}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: ITEM_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  marginRight: {
    marginRight: 8,
  },
  selectedContainer: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  avatar: {
    width: ITEM_WIDTH * 0.8,
    height: ITEM_WIDTH * 0.8,
    borderRadius: (ITEM_WIDTH * 0.8) / 2,
  },
}); 