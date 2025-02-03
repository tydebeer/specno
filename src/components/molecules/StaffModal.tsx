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
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<StaffData>>(initialData || {
    firstName: '',
    lastName: '',
    avatar: '',
  });

  const isDeleteMode = mode === 'delete';

  const handleClose = () => {
    setCurrentStep(0);
    setFormData({
      firstName: '',
      lastName: '',
      avatar: '',
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
            onChangeText={(text) => setFormData((prev) => ({ ...prev, firstName: text }))}
            placeholder="First Name"
          />
          <InputField
            value={formData.lastName || ''}
            onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
            placeholder="Last Name"
          />
        </View>
      )
    },
    {
      content: (
        <View style={styles.stepContent}>
          <InputField
            value={formData.avatar || ''}
            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
            placeholder="Email"
            keyboardType="email-address"
          />
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

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
      setFormData({
        firstName: '',
        lastName: '',
        avatar: '',
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
    return currentStep === steps.length - 1 ? 'Save' : 'Next';
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
        <TouchableOpacity 
          style={styles.modalContainer} 
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
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

          <View style={styles.content}>
            {steps[currentStep].content}
          </View>

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

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={getButtonText()}
              onPress={handleNext}
              variant={mode === 'delete' ? 'delete' : 'primary'}
            />
          </View>
        </TouchableOpacity>
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
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    marginBottom: 24,
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
  content: {
    flex: 1,
    width: '100%',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 8,
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
  buttonContainer: {
    width: '100%',
    marginTop: 16,
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
    padding: 16,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    width: '100%',
  },
}); 