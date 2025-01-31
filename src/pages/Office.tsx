import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/atoms/Card';
import { SearchBar } from '../components/atoms/SearchBar';
import { StaffHeader } from '../components/atoms/StaffHeader';
import { UserListItem } from '../components/atoms/UserListItem';

type RouteParams = {
  officeData: {
    companyName: string;
    staffCount: number;
    phoneNumber: string;
    email: string;
    capacity: number;
    address: string;
    color: string;
  };
};

// Dummy office data
const officeData = {
  companyName: 'Specno',
  staffCount: 5,
  phoneNumber: '082 364 9864',
  email: 'info@specno.com',
  capacity: 25,
  address: '10 Willie Van Schoor Dr, Bo Oakdale, Cape Town, 7530',
  color: '#2F80ED'
};

// Dummy staff data
const staffMembers = [
  {
    id: '1',
    name: 'Jacques Jordaan',
    avatarUrl: 'https://example.com/avatar1.jpg',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    avatarUrl: 'https://example.com/avatar2.jpg',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatarUrl: 'https://example.com/avatar3.jpg',
  },
];

export const Office = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { officeData } = route.params as RouteParams;
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Office</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Card {...officeData} />
        
        <View style={styles.staffSection}>
          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search staff members"
          />
          
          <StaffHeader count={staffMembers.length} />
          
          <View style={styles.staffList}>
            {staffMembers.map(staff => (
              <UserListItem
                key={staff.id}
                name={staff.name}
                avatarUrl={staff.avatarUrl}
                onOptionsPress={() => console.log('Options pressed for:', staff.name)}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F9',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  staffSection: {
    marginTop: 24,
    gap: 16,
  },
  staffList: {
    gap: 12,
  },
}); 