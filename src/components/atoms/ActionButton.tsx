import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ActionButtonProps {
  onPress: () => void;
  size?: number;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  onPress, 
  size = 64
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { 
          width: size, 
          height: size,
          borderRadius: size / 2 
        }
      ]} 
      onPress={onPress}
    >
      <Feather name="plus" size={24} color="#FFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0d4574',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 