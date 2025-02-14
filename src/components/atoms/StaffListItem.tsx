import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Props {
  name: string;
  avatar: any;
  isInOffice: boolean;
  onOptionsPress: () => void;
}

const StaffListItem: React.FC<Props> = ({
  name,
  avatar,
  isInOffice,
  onOptionsPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Image 
          source={typeof avatar === 'string' ? { uri: avatar } : avatar}
          style={styles.avatar}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
      
      <View style={styles.actionsContainer}>    
        <TouchableOpacity 
          onPress={onOptionsPress}
          style={styles.actionButton}
        >
          <Feather name="more-vertical" size={24} color="#666" />
        </TouchableOpacity>
      </View>
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
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
  },
});

export default StaffListItem; 