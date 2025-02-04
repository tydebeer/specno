import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TitleProps {
  text: string;
  withPadding?: boolean;
}

export const Title: React.FC<TitleProps> = ({ text, withPadding = false }) => {
  return (
    <View style={[styles.container, withPadding && styles.withPadding]}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  withPadding: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#333',
    letterSpacing: -0.5,
  },
}); 