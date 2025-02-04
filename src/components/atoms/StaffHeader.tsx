import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StaffHeaderProps {
  count: number;
}

export const StaffHeader: React.FC<StaffHeaderProps> = ({ count }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Staff Members In Office</Text>
      </View>
      <View style={styles.countContainer}>
        <Text style={styles.count}>{count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '100%',
  },
  titleContainer: {
    flex: 1, // This will allow the title to take up available space
    alignItems: 'flex-start', // Ensures left alignment
  },
  countContainer: {
    alignItems: 'flex-end', // Ensures right alignment
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
  },
  count: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    marginLeft: 16, // Adds some space between title and count
  },
}); 