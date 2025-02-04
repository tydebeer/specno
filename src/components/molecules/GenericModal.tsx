import React from 'react';
import { 
  StyleSheet, 
  View, 
  Modal, 
  Text, 
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { SecondaryButton } from '../atoms/SecondaryButton';

const { width } = Dimensions.get('window');
const MODAL_WIDTH = width * 0.85;

interface GenericModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data?: any) => void;
  onDelete?: () => void;
}

export const GenericModal: React.FC<GenericModalProps> = ({
  visible,
  onClose,
  onSubmit,
  onDelete,
}) => {

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.modalContainer}>

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
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
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
    gap: 4,
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
    marginHorizontal: 40, // Add space for the empty left space
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