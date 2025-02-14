import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Modal, 
  Text, 
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { StaffData } from '../../interfaces/StaffData';
import { InputField } from '../atoms/InputField';
import { AvatarPicker } from '../atoms/AvatarPicker';
import { AVATARS } from '../../config/uiConfig';

const { width } = Dimensions.get('window');
const MODAL_WIDTH = width * 0.85;

interface StaffModalProps {
  visible: boolean;
  onClose: () => void;
  initialData?: any;
  onSubmit: (data?: any) => void;
}

export const StaffModal: React.FC<StaffModalProps> = ({
  visible,
  onClose,
  initialData,
  onSubmit,
}) => {
  const defaultAvatar = AVATARS[Object.keys(AVATARS)[0] as keyof typeof AVATARS];
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<StaffData>>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    avatar: initialData?.avatar || defaultAvatar,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        avatar: initialData.avatar || defaultAvatar,
      });
    }
  }, [initialData]);

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof StaffData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    setFormData({
      firstName: '',
      lastName: '',
      avatar: defaultAvatar,
    });
    onClose();
  };

  const steps = [
    {
      content: (
        <View style={styles.stepContent}>
          <InputField
            value={formData.firstName || ''}
            onChangeText={(text) => handleInputChange('firstName', text)}
            placeholder="First Name"
            error={errors.firstName}
          />
          <InputField
            value={formData.lastName || ''}
            onChangeText={(text) => handleInputChange('lastName', text)}
            placeholder="Last Name"
            error={errors.lastName}
          />
        </View>
      )
    },
    {
      content: (
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>Choose an Avatar</Text>
          <View style={styles.avatarGrid}>
            {(Object.keys(AVATARS) as Array<keyof typeof AVATARS>).map((avatarKey, index) => (
              <AvatarPicker
                key={avatarKey}
                avatarKey={avatarKey}
                isSelected={formData.avatar === AVATARS[avatarKey]}
                onSelect={() => setFormData(prev => ({ ...prev, avatar: AVATARS[avatarKey] }))}
                index={index}
              />
            ))}
          </View>
        </View>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep === 0 && !validateInputs()) {
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
      setFormData({
        firstName: '',
        lastName: '',
        avatar: defaultAvatar,
      });
      setCurrentStep(0);
      handleClose();
    }
  };

  const getModalTitle = () => {
    return initialData ? 'Edit Staff Member' : 'New Staff Member';
  };

  const getButtonText = () => {
    if (initialData === null) {
      return currentStep === steps.length - 1 ? 'Add Staff Member' : 'Next';
    }
    return currentStep === steps.length - 1 ? 'Save Changes' : 'Next';
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={handleClose}
      >
        <View style={styles.modalContainer}>
            <View style={styles.header}>
              <TouchableOpacity 
                onPress={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : handleClose()}
                style={styles.closeButton}
              >
                <Ionicons 
                  name={currentStep > 0 ? "arrow-back" : undefined} 
                  size={24} 
                  color="#000" 
                />
              </TouchableOpacity>
              <Text style={styles.title}>{getModalTitle()}</Text>
              <TouchableOpacity 
                onPress={handleClose}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View>
              {steps[currentStep].content}
            </View>

          <View style={styles.footer}>
            <>
              {steps.length > 1 && (
                <View style={styles.stepIndicator}>
                  {steps.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dot,
                        currentStep === index && styles.activeDot
                      ]}
                    />
                  ))}
                </View>
              )}
              
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  title={getButtonText()}
                  onPress={handleNext}
                />
              </View>
            </>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: MODAL_WIDTH,
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  footer: {
    gap: 4,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 16,
  },
  buttonContainer: {
    width: '100%',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginHorizontal: 8, // Add space between title and icons
  },
  deleteContent: {
    padding: 20,
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  deleteSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
  },
  stepContent: {
    flexDirection: 'column', // Ensures inputs stack vertically
    gap: 20, // Adds spacing between inputs
    width: '100%', // Prevents shrinking
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  activeDot: {
    backgroundColor: '#2196F3',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 0,
  },
}); 