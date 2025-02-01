import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { InputField } from '../atoms/InputField';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { Title } from '../atoms/Title';
import { ColorPicker } from '../atoms/ColorPicker';
import { Header } from '../atoms/Header';
import { useNavigation } from '@react-navigation/native';
import { OFFICE_COLORS } from '../../config/uiConfig';

type OfficeData = {
  officeName: string;
  physicalAddress: string;
  emailAddress: string;
  phoneNumber: string;
  maximumCapacity: string;
  officeColor: string;
}

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
    officeColor: ''
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

  const handleColorSelect = (color: string) => {
    setOfficeData(prev => ({
      ...prev,
      officeColor: color
    }));
  };

  const handleAddOffice = () => {
    console.log('Office Data:', officeData);
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
          {OFFICE_COLORS.map((color, index) => (
            <ColorPicker
              key={index}
              color={color}
              isSelected={officeData.officeColor === color}
              onSelect={() => handleColorSelect(color)}
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