import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'delete';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        variant === 'delete' && styles.deleteButton,
        disabled && styles.disabled
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#2F80ED',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  disabled: {
    opacity: 0.5,
  },
}); 