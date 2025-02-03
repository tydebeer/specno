import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Modal, 
  Text, 
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../atoms/Avatar';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { SecondaryButton } from '../atoms/SecondaryButton';
import { AVATAR_LIST } from '../../config/uiConfig';

const { width } = Dimensions.get('window');
const MODAL_WIDTH = width * 0.85;

interface StaffModalProps {
  visible: boolean;
  onClose: () => void;
  onPrimaryAction: (selectedAvatar: string) => void;
  onSecondaryAction?: () => void;
  title: string;
  primaryButtonTitle: string;
  secondaryButtonTitle?: string;
  showBackButton?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

export const StaffModal: React.FC<StaffModalProps> = ({
  visible,
  onClose,
  onPrimaryAction,
  onSecondaryAction,
  title,
  primaryButtonTitle,
  secondaryButtonTitle,
  showBackButton = true,
  primaryButtonText,
  secondaryButtonText,
}) => {
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<number | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

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
        <TouchableOpacity 
          style={styles.modalContainer} 
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            {showBackButton ? (
              <TouchableOpacity 
                onPress={onClose}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            ) : (
              <View style={styles.backButton} />
            )}
            <Text style={styles.title}>{title}</Text>
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
                isSelected={selectedAvatarIndex === index}
                onPress={() => {
                  setSelectedAvatarIndex(index);
                  setSelectedAvatar(avatar);
                }}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            {primaryButtonText && (
              <PrimaryButton
                title={primaryButtonTitle}
                onPress={() => selectedAvatar && onPrimaryAction(selectedAvatar)}
                disabled={!selectedAvatar}
              />
            )}
            {secondaryButtonText && secondaryButtonTitle && onSecondaryAction && (
              <SecondaryButton
                title={secondaryButtonTitle}
                onPress={onSecondaryAction}
              />
            )}
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
    flex: 1,
    textAlign: 'center',
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
    gap: 8,
  },
}); 