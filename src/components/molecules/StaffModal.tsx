import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Modal, 
  Text, 
  TouchableOpacity,
  Dimensions,
  ScrollView,
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
  mode: 'add' | 'edit' | 'delete';
  type: 'staff' | 'office';
  initialData?: any;
  onSubmit: (data?: any) => void;
  onDelete?: () => void;
}

export const StaffModal: React.FC<StaffModalProps> = ({
  visible,
  onClose,
  mode,
  type,
  initialData,
  onSubmit,
  onDelete,
}) => {
  const defaultAvatar = AVATARS[Object.keys(AVATARS)[0] as keyof typeof AVATARS];
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<StaffData>>(initialData || {
    firstName: '',
    lastName: '',
    avatar: defaultAvatar, // Set default avatar here
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isDeleteMode = mode === 'delete';

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

  const steps = isDeleteMode ? [
    {
      content: (
        <View style={styles.deleteContent}>
          <Text style={styles.deleteText}>
            Are you sure you want to delete this {type}?
          </Text>
          <Text style={styles.deleteSubtext}>
            This action cannot be undone.
          </Text>
        </View>
      )
    }
  ] : [
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
    if (isDeleteMode) {
      onDelete?.();
      handleClose();
      return;
    }

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
        avatar: defaultAvatar, // Reset to default avatar when submitting
      });
      setCurrentStep(0);
      handleClose();
    }
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'add':
        return `New ${type === 'staff' ? 'Staff Member' : 'Office'}`;
      case 'edit':
        return `Edit ${type === 'staff' ? 'Staff Member' : 'Office'}`;
      case 'delete':
        return `Delete ${type === 'staff' ? 'Staff Member' : 'Office'}`;
      default:
        return '';
    }
  };

  const getButtonText = () => {
    if (isDeleteMode) return 'Delete';
    if (mode === 'add') {
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

          <View style={styles.mainContent}>
            {steps[currentStep].content}
          </View>

          <View style={styles.footer}>
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
                variant={mode === 'delete' ? 'delete' : 'primary'}
              />
            </View>
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
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  footer: {
    gap: 16,
  },
  scrollContainer: {
    flexGrow: 1, // Allows scrolling if content overflows
    justifyContent: 'center', // Centers content vertically if there's space
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
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
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
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
  activeDot: {
    backgroundColor: '#2196F3',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
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