import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { InputField } from '../atoms/InputField';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { Title } from '../atoms/Title';
import { ColorPicker } from '../atoms/ColorPicker';
import { Header } from '../atoms/Header';
import { useNavigation } from '@react-navigation/native';
import { OFFICE_COLORS_MAP, OfficeColorKey } from '../../config/uiConfig';
import { OfficeData } from '../../interfaces/OfficeData';
import { officeService } from '../../services/officeService';

export const AddOffice = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const existingOffice = route.params?.officeData;
  const isEditing = !!existingOffice;

  const [officeData, setOfficeData] = useState<OfficeData>({
    officeName: '',
    physicalAddress: '',
    emailAddress: '',
    phoneNumber: '',
    maximumCapacity: '',
    officeColor: 'YELLOW'
  });

  useEffect(() => {
    if (existingOffice) {
      setOfficeData({
        officeName: existingOffice.companyName,
        physicalAddress: existingOffice.address,
        emailAddress: existingOffice.email,
        phoneNumber: existingOffice.phoneNumber,
        maximumCapacity: existingOffice.capacity.toString(),
        officeColor: existingOffice.color
      });
    }
  }, [existingOffice]);

  const handleInputChange = (field: string, value: string) => {
    setOfficeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleColorSelect = (color: OfficeColorKey) => {
    setOfficeData(prev => ({
      ...prev,
      officeColor: color
    }));
  };

  const handleAddOffice = async () => {
    try {
      const officeToSave = {
        name: officeData.officeName,
        address: officeData.physicalAddress,
        email: officeData.emailAddress,
        phoneNumber: officeData.phoneNumber,
        capacity: parseInt(officeData.maximumCapacity),
        color: officeData.officeColor
      };

      if (isEditing && existingOffice?.id) {
        const response = await officeService.updateOffice(existingOffice.id, officeToSave);
        console.log('Update response:', response);
      } else {
        const response = await officeService.createOffice(officeToSave);
        console.log('Create response:', response);
      }
      
      navigation.goBack();
    } catch (error) {
      console.error('Error saving office:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title={isEditing ? "Edit Office" : "New Office"}
        onBackPress={() => navigation.goBack()}
      />
      
      <View style={styles.content}>
        <InputField
          placeholder="Office Name"
          value={officeData.officeName}
          onChangeText={(text) => handleInputChange('officeName', text)}
        />

        <InputField
          placeholder="Physical Address"
          value={officeData.physicalAddress}
          onChangeText={(text) => handleInputChange('physicalAddress', text)}
        />

        <InputField
          placeholder="Email Address"
          value={officeData.emailAddress}
          onChangeText={(text) => handleInputChange('emailAddress', text)}
        />

        <InputField
          placeholder="Phone Number"
          value={officeData.phoneNumber}
          onChangeText={(text) => handleInputChange('phoneNumber', text)}
        />

        <InputField
          placeholder="Maximum Capacity"
          value={officeData.maximumCapacity}
          onChangeText={(text) => handleInputChange('maximumCapacity', text)}
        />

        <Title text="Office Colour" />
        
        <View style={styles.colorGrid}>
          {(Object.keys(OFFICE_COLORS_MAP) as OfficeColorKey[]).map((colorKey) => (
            <ColorPicker
              key={colorKey}
              colorKey={colorKey}
              isSelected={officeData.officeColor === colorKey}
              onSelect={() => handleColorSelect(colorKey)}
            />
          ))}
        </View>

        <PrimaryButton
          title={isEditing ? "SAVE CHANGES" : "ADD OFFICE"}
          onPress={handleAddOffice}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  colorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  addButton: {
    marginTop: 'auto',
    marginBottom: 20,
  },
}); 