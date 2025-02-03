import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../atoms/Card';
import { SearchBar } from '../atoms/SearchBar';
import { StaffHeader } from '../atoms/StaffHeader';
import UserListItem from '../atoms/StaffListItem';
import { ActionButton } from '../atoms/ActionButton';
import { StaffModal } from '../molecules/StaffModal';
import { AVATARS } from '../../config/uiConfig';


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

// Dummy staff data
const staffMembers = [
  {
    id: '1',
    name: 'Jacques Jordaan',
    avatar: AVATARS.ASTRONAUT_WAVING,
  },  
  {
    id: '2',
    name: 'Sarah Smith',
    avatar: AVATARS.ASTRONAUT_WAVING,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: require('../../../assets/avatars/avatar-1.png'),
  },
];


export const Office = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { officeData } = route.params as RouteParams;
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedStaff, setSelectedStaff] = React.useState<typeof staffMembers[0] | null>(null);

  const filteredStaffMembers = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return staffMembers;
    }
    
    return staffMembers.filter(staff => 
      staff.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [searchQuery]);

  const handleAddStaff = (selectedAvatar: string) => {
    // Handle adding new staff member
    console.log('Adding staff with avatar:', selectedAvatar);
    setIsModalVisible(false);
  };

  const handleStaffOptionsPress = (staff: typeof staffMembers[0]) => {
    setSelectedStaff(staff);
    setIsModalVisible(true);
  };

  const handleEditStaff = (staff: typeof staffMembers[0]) => {
    // Handle edit logic here
    console.log('Editing staff:', staff);
    setIsModalVisible(false);
  };

  const handleDeleteStaff = (staff: typeof staffMembers[0]) => {
    // Handle delete logic here
    console.log('Deleting staff:', staff);
    setIsModalVisible(false);
  };

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
          
          <StaffHeader count={filteredStaffMembers.length} />
          
          <View style={styles.staffList}>
            {filteredStaffMembers.length > 0 ? (
              filteredStaffMembers.map(staff => (
                <UserListItem
                  key={staff.id}
                  name={staff.name}
                  avatarUrl={staff.avatar}
                  onOptionsPress={() => handleStaffOptionsPress(staff)}
                />
              ))
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>
                  No staff members found matching "{searchQuery}"
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <ActionButton onPress={() => setIsModalVisible(true)} />
      </View>

      <StaffModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setSelectedStaff(null);
        }}
        title={selectedStaff ? `Edit ${selectedStaff.name}` : "New Staff Member"}
        onPrimaryAction={() => selectedStaff && handleEditStaff(selectedStaff)}
        onSecondaryAction={() => selectedStaff && handleDeleteStaff(selectedStaff)}
        primaryButtonTitle={selectedStaff ? "UPDATE STAFF MEMBER" : "ADD STAFF MEMBER"}
        secondaryButtonTitle="DELETE STAFF MEMBER"
        showBackButton={false}
      />
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
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 1,
  },
}); 