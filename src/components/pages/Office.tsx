import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../atoms/Card';
import { SearchBar } from '../atoms/SearchBar';
import { StaffHeader } from '../atoms/StaffHeader';
import UserListItem from '../atoms/StaffListItem';
import { ActionButton } from '../atoms/ActionButton';
import { StaffModal } from '../molecules/StaffModal';
import { StaffData } from '../../interfaces/StaffData';
import { staffService } from '../../services/staffService';
import { OFFICE_COLORS_MAP } from '../../config/uiConfig';
import { OfficeData } from '../../interfaces/OfficeData';
import { GenericModal } from '../molecules/GenericModal';

type RouteParams = {
  officeData: OfficeData;
  staffMembers: StaffData[];
};

export const Office = ({ navigation }: { navigation: any }) => {
  const route = useRoute();
  const { officeData, staffMembers: initialStaffMembers } = route.params as RouteParams;
  const [staffMembers, setStaffMembers] = useState<StaffData[]>(initialStaffMembers);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
  const [selectedStaff, setSelectedStaff] = React.useState<StaffData | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'delete'>('add');


  useEffect(() => {
    // Subscribe to staff updates
    const unsubscribe = staffService.subscribeToStaff((updatedStaff) => {
      const officeStaff = updatedStaff.filter(staff => staff.officeId === officeData.id);
      setStaffMembers(officeStaff);
    });

    return () => unsubscribe();
  }, [officeData.id]);

  const filteredStaffMembers = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return staffMembers;
    }
    
    return staffMembers.filter(staff => 
      staff.firstName.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      staff.lastName.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [searchQuery, staffMembers]);

  const handleEditOffice = (office: OfficeData) => {
    navigation.navigate('AddOffice', { officeData: office });
  };

  const handleStaffOptionsPress = (staff: StaffData) => {
    setSelectedStaff(staff);
    setModalMode('delete');
    setIsDeleteModalVisible(true);
  };

  const handleEditStaff = () => {
    if (selectedStaff) {
      setIsDeleteModalVisible(false);
      setModalMode('edit');
      setIsModalVisible(true);
    }
  };

  const handleCloseStaffModal = () => {
    setIsModalVisible(false);
    setSelectedStaff(null);
    setModalMode('add');
  };

  const handleModalAction = async (data?: any) => {
    try {
      switch (modalMode) {
        case 'add':
          const newStaff: Omit<StaffData, 'id'> = {
            firstName: data.firstName,
            lastName: data.lastName,
            avatar: data.avatar,
            isInOffice: true,
            officeId: officeData.id || '',
          };
          await staffService.createStaff(newStaff);
          break;
        
        case 'edit':
          if (selectedStaff?.id) {
            const updatedStaff: Partial<StaffData> = {
              firstName: data.firstName,
              lastName: data.lastName,
              avatar: data.avatar,
              isInOffice: selectedStaff.isInOffice,
              officeId: officeData.id || '',
            };
            await staffService.updateStaff(selectedStaff.id, updatedStaff);
          }
          break;
        
        case 'delete':
          if (selectedStaff?.id) {
            await staffService.deleteStaff(selectedStaff.id);
          }
          break;
      }
      
      setIsModalVisible(false);
      setSelectedStaff(null);
      
    } catch (error) {
      console.error('Error handling staff action:', error);
    }
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
          accentColor={OFFICE_COLORS_MAP[officeData.officeColor as keyof typeof OFFICE_COLORS_MAP]}
          onEdit={() => handleEditOffice(officeData)}
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
                <View key={staff.id}>
                  <UserListItem
                    key={`list-${staff.id}`}
                    name={`${staff.firstName} ${staff.lastName}`}
                    avatar={staff.avatar || ''}
                    isInOffice={staff.isInOffice}
                    onOptionsPress={() => handleStaffOptionsPress(staff)}
                  />
                </View>
              ))
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>
                  {staffMembers.length > 0 
                    ? `No staff members found matching "${searchQuery}"`
                    : "No staff members"
                  }
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

      <GenericModal
        visible={isDeleteModalVisible}
        onClose={() => {
          setIsDeleteModalVisible(false);
        }}
        onDelete={handleModalAction}
        onEdit={handleEditStaff}
        isOffice={false}
      />

      <StaffModal
        visible={isModalVisible}
        onClose={handleCloseStaffModal}
        initialData={selectedStaff}
        onSubmit={handleModalAction}
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