import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { InputField } from '../atoms/InputField';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { Title } from '../atoms/Title';
import { ColorPicker } from '../atoms/ColorPicker';
import { Header } from '../atoms/Header';
import { useNavigation } from '@react-navigation/native';
import { OFFICE_COLORS } from '../../config/uiConfig';

export const AddOffice = () => {
  const navigation = useNavigation();
  const [officeData, setOfficeData] = useState({
    officeName: '',
    physicalAddress: '',
    emailAddress: '',
    phoneNumber: '',
    maximumCapacity: '',
    officeColor: ''
  });

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
    <View style={styles.container}>
      <Header 
        title="New Office"
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
          title="ADD OFFICE"
          onPress={handleAddOffice}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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