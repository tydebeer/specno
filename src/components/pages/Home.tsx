import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Platform, StatusBar, ScrollView } from 'react-native';
import { Title } from '../atoms';
import { Card } from '../atoms/Card';
import { ActionButton } from '../atoms/ActionButton';
import { officeService } from '../../services/officeService';
import { OfficeData } from '../../interfaces/OfficeData';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { staffService } from '../../services/staffService';
import { StaffData } from '../../interfaces/StaffData';
import { OFFICE_COLORS_MAP } from '../../config/uiConfig';
import { Snackbar } from '../atoms/Snackbar';

export const Home = ({ navigation }: { navigation: any }) => {
  const [offices, setOffices] = useState<OfficeData[]>([]);
  const [staffByOffice, setStaffByOffice] = useState<Record<string, StaffData[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const fetchedOffices = await officeService.getAllOffices();
      const staffPromises = fetchedOffices.map(office => 
        staffService.getStaffByOffice(office.id || '')
      );
      
      const staffResults = await Promise.all(staffPromises);
      const staffMap: Record<string, StaffData[]> = {};
      
      fetchedOffices.forEach((office, index) => {
        if (office.id) {
          staffMap[office.id] = staffResults[index];
        }
      });
      
      setOffices(fetchedOffices);
      setStaffByOffice(staffMap);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load offices. Please try again.');
    }
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchData();
      setLoading(false);

      // Subscribe to office updates
      const officeUnsubscribe = officeService.subscribeToOffices((updatedOffices) => {
        setOffices(updatedOffices);
      });

      // Subscribe to staff updates
      const staffUnsubscribe = staffService.subscribeToStaff((allStaff) => {
        const newStaffMap: Record<string, StaffData[]> = {};
        
        // Group staff by office
        allStaff.forEach((staffMember) => {
          if (staffMember.officeId) {
            if (!newStaffMap[staffMember.officeId]) {
              newStaffMap[staffMember.officeId] = [];
            }
            newStaffMap[staffMember.officeId].push(staffMember);
          }
        });
        
        setStaffByOffice(newStaffMap);
      });

      // Cleanup both subscriptions
      return () => {
        officeUnsubscribe();
        staffUnsubscribe();
      };
    };
    
    loadInitialData();
  }, [fetchData]);

  const handleCardPress = (office: OfficeData) => {
    navigation.navigate('Office', { 
      officeData: office,
      staffMembers: staffByOffice[office.id || ''] || []
    });
  };

  const handleEditOffice = (office: OfficeData) => {
    navigation.navigate('AddOffice', { officeData: office });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Title text="All Offices" />
        <View style={styles.emptyStateContainer}>
          <LoadingSpinner />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title text="All Offices" withPadding={true} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.listContainer, 
          offices.length === 0 && styles.emptyContainer
        ]}
        showsVerticalScrollIndicator={false}
      >
        {offices.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Title text="No offices found" />
          </View>
        ) : (
          offices.map(office => (
            <TouchableOpacity 
              key={office.id}
              onPress={() => handleCardPress(office)}
            >
              <Card
                companyName={office.officeName}
                staffCount={(staffByOffice[office.id || ''] || []).length}
                phoneNumber={office.phoneNumber}
                email={office.emailAddress}
                capacity={office.maximumCapacity}
                address={office.physicalAddress}
                onEdit={() => handleEditOffice(office)}
                accentColor={OFFICE_COLORS_MAP[office.officeColor as keyof typeof OFFICE_COLORS_MAP]}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ActionButton 
          onPress={() => navigation.navigate('AddOffice')}
        />
      </View>

      <Snackbar
        message={error || ''}
        isVisible={!!error}
        onDismiss={() => setError(null)}
        type="error"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
    gap: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 1,
  },
  emptyContainer: {
    flex: 1,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
  },
}); 