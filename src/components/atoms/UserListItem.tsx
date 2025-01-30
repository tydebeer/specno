import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface UserListItemProps {
  name: string;
  avatarUrl: string;
  onOptionsPress: () => void;
}

export const UserListItem: React.FC<UserListItemProps> = ({
  name,
  avatarUrl,
  onOptionsPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Image 
          source={{ uri: avatarUrl }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
      
      <TouchableOpacity 
        onPress={onOptionsPress}
        style={styles.optionsButton}
      >
        <Feather name="more-vertical" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  optionsButton: {
    padding: 8,
  },
}); 