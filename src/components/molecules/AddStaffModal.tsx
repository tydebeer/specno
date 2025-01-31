import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Modal, 
  Text, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../atoms/Avatar';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { AVATAR_LIST } from '../../config/avatars';

// Get screen dimensions
const { width } = Dimensions.get('window');
const MODAL_WIDTH = width * 0.85; // 85% of screen width

interface AddStaffModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (selectedAvatar: string) => void;
}

export const AddStaffModal: React.FC<AddStaffModalProps> = ({
  visible,
  onClose,
  onAdd,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>New Staff Member</Text>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Avatar</Text>
          
          <View style={styles.avatarGrid}>
            {AVATAR_LIST.map((avatar, index) => (
              <Avatar
                key={index}
                source={avatar}
                isSelected={selectedAvatar === avatar}
                onPress={() => setSelectedAvatar(avatar)}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="ADD STAFF MEMBER"
              onPress={() => selectedAvatar && onAdd(selectedAvatar)}
              disabled={!selectedAvatar}
            />
          </View>
        </View>
      </View>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 24,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
  },
}); 