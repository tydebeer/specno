import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Modal, 
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { SecondaryButton } from '../atoms/SecondaryButton';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const MODAL_WIDTH = width * 0.85;

interface GenericModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  onEdit?: () => void;
  isOffice?: boolean;
}

export const GenericModal: React.FC<GenericModalProps> = ({
  visible,
  onClose,
  onDelete,
  onEdit,
  isOffice = false,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(isOffice);
  const entityType = isOffice ? 'Office' : 'Staff Member';

  useEffect(() => {
    if (visible) {
      setShowDeleteConfirm(isOffice);
    }
  }, [visible, isOffice]);

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleClose = () => {
    setShowDeleteConfirm(false);
    onClose();
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
          {showDeleteConfirm ? (
            <>
              <View style={styles.header}>
                {!isOffice && (
                  <TouchableOpacity 
                    onPress={() => setShowDeleteConfirm(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="arrow-back" size={24} color="#000" />
                  </TouchableOpacity>
                )}
                <Text style={styles.title}>
                  Are You Sure You Want To Delete {entityType}?
                </Text>
                <TouchableOpacity 
                  onPress={handleClose}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <PrimaryButton
                title={`DELETE ${entityType.toUpperCase()}`}
                onPress={() => {
                  onDelete();
                  handleClose();
                }}
                variant="delete"
              />
              <SecondaryButton
                title={`KEEP ${entityType.toUpperCase()}`}
                onPress={() => handleClose()}
              />
            </>
          ) : (
            <>
              <View style={styles.header}>
                <View style={styles.closeButton} />
                <Text style={styles.title}>
                  {entityType} Options
                </Text>
                <TouchableOpacity 
                  onPress={handleClose}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              {onEdit && (
                <PrimaryButton
                  title={`EDIT ${entityType.toUpperCase()}`}
                  onPress={() => {
                    onEdit();
                    handleClose();
                  }}
                />
              )}
              <SecondaryButton
                title={`DELETE ${entityType.toUpperCase()}`}
                onPress={handleDelete}
              />
            </>
          )}
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
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginHorizontal: 8,
    paddingHorizontal: 4,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 