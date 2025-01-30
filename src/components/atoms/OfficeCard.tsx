import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';

interface OfficeCardProps {
  companyName: string;
  staffCount: number;
  phoneNumber: string;
  email: string;
  capacity: number;
  address: string;
  onEdit?: () => void;
}

export const OfficeCard: React.FC<OfficeCardProps> = ({
  companyName,
  staffCount,
  phoneNumber,
  email,
  capacity,
  address,
  onEdit,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotateAnimation = new Animated.Value(0);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.spring(rotateAnimation, {
      toValue: isExpanded ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.cardContainer}>
      <View style={styles.accentBar} />
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{companyName}</Text>
            <TouchableOpacity onPress={onEdit}>
              <Feather name="edit-2" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={24} color="#666" />
            <Text style={styles.infoText}>{staffCount} Staff Members in Office</Text>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity 
            style={styles.moreInfoButton} 
            onPress={toggleExpand}
          >
            <Text style={styles.moreInfo}>More info</Text>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
              <MaterialIcons 
                name="keyboard-arrow-up" 
                size={24} 
                color="#666" 
              />
            </Animated.View>
          </TouchableOpacity>

          {isExpanded && (
            <>
              <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                  <Feather name="phone" size={24} color="#666" />
                </View>
                <Text style={styles.infoText} numberOfLines={0}>{phoneNumber}</Text>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="email" size={24} color="#666" />
                </View>
                <Text style={styles.infoText} numberOfLines={0}>{email}</Text>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                  <Ionicons name="people-outline" size={24} color="#666" />
                </View>
                <Text style={styles.infoText} numberOfLines={0}>Office Capacity: {capacity}</Text>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                  <Ionicons name="location-outline" size={24} color="#666" />
                </View>
                <Text style={styles.infoText} numberOfLines={0}>{address}</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
  },
  accentBar: {
    width: 12,
    backgroundColor: '#2F80ED',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  cardWrapper: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  iconContainer: {
    width: 40,
    marginRight: 10,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingRight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  moreInfoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 10,
  },
  moreInfo: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
}); 