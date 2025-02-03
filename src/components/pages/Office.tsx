import React, { useState } from 'react';
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
import { StaffData } from '../../interfaces/StaffData';


type RouteParams = {
  officeData: {
    id?: string;
    officeName: string;
    physicalAddress: string;
    emailAddress: string;
    phoneNumber: string;
    maximumCapacity: number;
    officeColor: string;
  };
};

export const Office = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { officeData } = route.params as RouteParams;
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedStaff, setSelectedStaff] = React.useState<StaffData | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'delete'>('add');

  const staffMembers: StaffData[] = [];

  const filteredStaffMembers = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return staffMembers;
    }
    
    return staffMembers.filter(staff => 
      staff.firstName.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      staff.lastName.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [searchQuery]);

  const handleAddStaff = (staffData: Omit<StaffData, 'id'>) => {
    const newStaff: StaffData = {
      id: Date.now().toString(),
      ...staffData
    };
    
    console.log('Adding staff:', newStaff);
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

  const handleModalAction = (data?: any) => {
    switch (modalMode) {
      case 'add':
        const avatarKeys = Object.keys(AVATARS);
        const newStaff = {
          id: Date.now().toString(),
          ...data,
          avatar: AVATARS[avatarKeys[Math.floor(Math.random() * avatarKeys.length)] as keyof typeof AVATARS],
          isInOffice: false,
        };
        // Add staff logic
        console.log('Adding staff:', newStaff);
        break;
      
      case 'edit':
        // Edit staff logic
        console.log('Editing staff:', data);
        break;
      
      case 'delete':
        // Delete staff logic
        console.log('Deleting staff:', selectedStaff);
        break;
    }
    
    setIsModalVisible(false);
    setSelectedStaff(null);
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
        <Card 
          companyName={officeData.officeName}
          staffCount={staffMembers.length}
          phoneNumber={officeData.phoneNumber}
          email={officeData.emailAddress}
          capacity={officeData.maximumCapacity}
          address={officeData.physicalAddress}
        />
        
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
                <>
                  <UserListItem
                    key={staff.id}
                    name={`${staff.firstName} ${staff.lastName}`}
                    avatarUrl={staff.avatar}
                    isInOffice={staff.isInOffice}
                    onOptionsPress={() => handleStaffOptionsPress(staff)}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setModalMode('edit');
                      setSelectedStaff(staff);
                      setIsModalVisible(true);
                    }}
                  >
                    <Text>Edit</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => {
                      setModalMode('delete');
                      setSelectedStaff(staff);
                      setIsModalVisible(true);
                    }}
                  >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </>
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
        <ActionButton onPress={() => {
          setModalMode('add');
          setIsModalVisible(true);
        }} />
      </View>

      <StaffModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setSelectedStaff(null);
          setModalMode('add');
        }}
        mode={modalMode}
        type="staff"
        initialData={modalMode === 'add' ? null : selectedStaff}
        onSubmit={handleModalAction}
        onDelete={handleModalAction}
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