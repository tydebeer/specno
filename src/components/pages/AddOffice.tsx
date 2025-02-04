import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native';
import { InputField } from '../atoms/InputField';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { Title } from '../atoms/Title';
import { ColorPicker } from '../atoms/ColorPicker';
import { Header } from '../atoms/Header';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OFFICE_COLORS_MAP, OfficeColorKey } from '../../config/uiConfig';
import { OfficeData } from '../../interfaces/OfficeData';
import { officeService } from '../../services/officeService';
import { validateEmail, validateSAPhoneNumber, validateCapacity } from '../../utils/validation';
import { StaffModal } from '../molecules/StaffModal';
import { Snackbar } from '../atoms/Snackbar';
import { SecondaryButton } from '../atoms/SecondaryButton';
import { GenericModal } from '../molecules/GenericModal';

type RootStackParamList = {
  Home: undefined;
  AddOffice: { officeData?: OfficeData };
};

export const AddOffice = ({ route }: { route: any }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const existingOffice = route.params?.officeData;
  const isEditing = !!existingOffice;

  const [officeData, setOfficeData] = useState<OfficeData>({
    id: '',
    officeName: '',
    physicalAddress: '',
    emailAddress: '',
    phoneNumber: '',
    maximumCapacity: 0,
    officeColor: 'YELLOW',
    staffCount: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  useEffect(() => {
    if (existingOffice) {
      setOfficeData({
        id: existingOffice.id || '',
        officeName: existingOffice.officeName || '',
        physicalAddress: existingOffice.physicalAddress || '',
        emailAddress: existingOffice.emailAddress || '',
        phoneNumber: existingOffice.phoneNumber || '',
        maximumCapacity: Number(existingOffice.maximumCapacity) || 0,
        officeColor: existingOffice.officeColor || 'YELLOW',
        staffCount: existingOffice.staffCount || 0
      });
    }
  }, [existingOffice]);

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!officeData.officeName.trim()) newErrors.officeName = 'Office name is required';
    if (!officeData.physicalAddress.trim()) newErrors.physicalAddress = 'Address is required';
    
    const phoneError = validateSAPhoneNumber(officeData.phoneNumber);
    if (phoneError) newErrors.phoneNumber = phoneError;
    
    const emailError = validateEmail(officeData.emailAddress);
    if (emailError) newErrors.emailAddress = emailError;
    
    const capacityError = validateCapacity(officeData.maximumCapacity);
    if (capacityError) newErrors.maximumCapacity = capacityError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setOfficeData(prev => ({
      ...prev,
      [field]: field === 'maximumCapacity' ? parseInt(value) || 0 : value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleColorSelect = (color: OfficeColorKey) => {
    setOfficeData(prev => ({
      ...prev,
      officeColor: color
    }));
  };

  const handleAddOffice = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const officeToSave = {
        id: officeData.id,
        officeName: officeData.officeName,
        physicalAddress: officeData.physicalAddress,
        emailAddress: officeData.emailAddress,
        phoneNumber: officeData.phoneNumber,
        maximumCapacity: officeData.maximumCapacity,
        officeColor: officeData.officeColor,
        staffCount: officeData.staffCount
      };

      if (isEditing && existingOffice?.id) {
        await officeService.updateOffice(existingOffice.id, officeToSave);
        setSnackbar({
          visible: true,
          message: 'Office updated successfully',
          type: 'success'
        });
      } else {
        await officeService.createOffice(officeToSave);
        setSnackbar({ 
          visible: true,
          message: 'Office created successfully',
          type: 'success'
        });
      }
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      setSnackbar({
        visible: true,
        message: 'Error saving office. Please try again.',
        type: 'error'
      });
    }
  };

  const handleDeleteOffice = async () => {
    try {
      if (existingOffice?.id) {
        await officeService.deleteOffice(existingOffice.id);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    } catch (error) {
      setSnackbar({
        visible: true,
        message: 'Error deleting office. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header 
        title={isEditing ? "Edit Office" : "New Office"}
        onBackPress={() => navigation.goBack()}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <InputField
            placeholder="Office Name"
            value={officeData.officeName}
            onChangeText={(text) => handleInputChange('officeName', text)}
            error={errors.officeName}
          />

          <InputField
            placeholder="Physical Address"
            value={officeData.physicalAddress}
            onChangeText={(text) => handleInputChange('physicalAddress', text)}
            error={errors.physicalAddress}
          />

          <InputField
            placeholder="Email Address"
            value={officeData.emailAddress}
            onChangeText={(text) => handleInputChange('emailAddress', text)}
            error={errors.emailAddress}
          />

          <InputField
            placeholder="Phone Number"
            value={officeData.phoneNumber}
            onChangeText={(text) => handleInputChange('phoneNumber', text)}
            error={errors.phoneNumber}
          />

          <InputField
            placeholder="Maximum Capacity"
            value={String(officeData.maximumCapacity || 0)}
            onChangeText={(text) => handleInputChange('maximumCapacity', text)}
            error={errors.maximumCapacity}
            keyboardType="numeric"
            returnKeyType="done"
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
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={isEditing ? "UPDATE OFFICE" : "ADD OFFICE"}
            onPress={handleAddOffice}
          />
          
          {isEditing && (
            <SecondaryButton
              title="DELETE OFFICE"
              onPress={() => setIsDeleteModalVisible(true)}
            />
          )}
        </View>
      </ScrollView>

      <GenericModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onDelete={handleDeleteOffice}
        isOffice={true}
      />

      <Snackbar
        message={snackbar.message}
        isVisible={snackbar.visible}
        type={snackbar.type}
        onDismiss={() => setSnackbar(prev => ({ ...prev, visible: false }))}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    paddingHorizontal: 16,
    width: '100%',
  },
  buttonContainer: {
    padding: 16,
    gap: 4,
    paddingBottom: 20,
  },
}); 