import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import UserListItem from '../atoms/StaffListItem';

interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

interface UserListProps {
  users: User[];
  onOptionsPress: (userId: string) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, onOptionsPress }) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <UserListItem
          name={item.name}
          avatarUrl={item.avatarUrl}
          onOptionsPress={() => onOptionsPress(item.id)}
        />
      )}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 8,
  },
}); 