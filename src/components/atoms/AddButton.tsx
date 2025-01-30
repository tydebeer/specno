import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface AddButtonProps {
  onPress: () => void;
  size?: number;
}

export const AddButton: React.FC<AddButtonProps> = ({ 
  onPress, 
  size = 56 // default size
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
    backgroundColor: '#2F80ED', // Blue color - adjust to match your design
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