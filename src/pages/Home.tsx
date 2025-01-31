import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Title } from '../components/atoms';
import { Card } from '../components/atoms/Card';
import { ActionButton } from '../components/atoms/ActionButton';
import { AddStaffModal } from '../components/molecules/AddStaffModal';

// Type for our navigation
type NavigationProps = {
  navigate: (screen: string, params?: any) => void;
};

// Dummy data for offices
const dummyOffices = [
  {
    id: '1',
    companyName: 'Specno',
    staffCount: 5,
    phoneNumber: '082 364 9864',
    email: 'info@specno.com',
    capacity: 25,
    address: '10 Willie Van Schoor Dr, Bo Oakdale, Cape Town, 7530',
    color: '#2F80ED'
  },
  {
    id: '2',
    companyName: 'Tech Hub',
    staffCount: 12,
    phoneNumber: '083 555 1234',
    email: 'contact@techhub.com',
    capacity: 30,
    address: '42 Innovation Street, Sandton, Johannesburg, 2196',
    color: '#FF6B6B'
  },
  {
    id: '3',
    companyName: 'Digital Space',
    staffCount: 8,
    phoneNumber: '084 777 8899',
    email: 'hello@digitalspace.com',
    capacity: 20,
    address: '15 Beach Road, Sea Point, Cape Town, 8005',
    color: '#4CAF50'
  },
];

export const Home = () => {
  const navigation = useNavigation<NavigationProps>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCardPress = (office: typeof dummyOffices[0]) => {
    navigation.navigate('Office', { officeData: office });
  };

  const handleAddStaff = (selectedAvatar: string) => {
    console.log('Selected avatar:', selectedAvatar);
    // Handle adding new staff member logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title text="All Offices" />
      
      <View style={styles.listContainer}>
        {dummyOffices.map(office => (
          <TouchableOpacity 
            key={office.id}
            onPress={() => handleCardPress(office)}
          >
            <Card
              companyName={office.companyName}
              staffCount={office.staffCount}
              phoneNumber={office.phoneNumber}
              email={office.email}
              capacity={office.capacity}
              address={office.address}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <ActionButton 
          onPress={() => setIsModalVisible(true)}
        />
      </View>

      <AddStaffModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={handleAddStaff}
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
  listContainer: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 1,
  },
}); 