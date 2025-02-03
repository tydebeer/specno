import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Platform, StatusBar, ScrollView } from 'react-native';
import { Title } from '../atoms';
import { Card } from '../atoms/Card';
import { ActionButton } from '../atoms/ActionButton';
import { officeService } from '../../services/officeService';
import { OfficeData } from '../../interfaces/OfficeData';
import { LoadingSpinner } from '../atoms/LoadingSpinner';

export const Home = ({ navigation }: { navigation: any }) => {
  const [offices, setOffices] = useState<OfficeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const fetchedOffices = await officeService.getAllOffices();
        setOffices(fetchedOffices);
      } catch (error) {
        console.error('Error fetching offices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffices();
  }, []);

  const handleCardPress = (office: OfficeData) => {
    navigation.navigate('Office', { officeData: office });
  };

  const handleEditOffice = (office: OfficeData) => {
    navigation.navigate('AddOffice', { officeData: office });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title text="All Offices" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.listContainer, offices.length === 0 && !loading && styles.emptyContainer]}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.emptyStateContainer}>
            <LoadingSpinner />
          </View>
        ) : offices.length === 0 ? (
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
                staffCount={office.maximumCapacity || 0}
                phoneNumber={office.phoneNumber}
                email={office.emailAddress}
                capacity={office.maximumCapacity}
                address={office.physicalAddress}
                onEdit={() => handleEditOffice(office)}
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