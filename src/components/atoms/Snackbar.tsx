import React, { useEffect } from 'react';
import { StyleSheet, Text, Animated, View } from 'react-native';

interface SnackbarProps {
  message: string;
  isVisible: boolean;
  onDismiss: () => void;
  type?: 'error' | 'success';
  duration?: number;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  isVisible,
  onDismiss,
  type = 'error',
  duration = 3000,
}) => {
  const translateY = new Animated.Value(100);

  useEffect(() => {
    if (isVisible) {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(translateY, {
          toValue: 100,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onDismiss();
      });
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Animated.View 
      style={[
        styles.container, 
        { transform: [{ translateY }] },
        type === 'error' ? styles.errorContainer : styles.successContainer,
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#323232',
    padding: 16,
    borderRadius: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  errorContainer: {
    backgroundColor: '#d32f2f',
  },
  successContainer: {
    backgroundColor: '#2e7d32',
  },
  message: {
    color: '#fff',
    fontSize: 14,
  },
}); 