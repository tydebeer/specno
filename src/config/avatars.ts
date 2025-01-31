export const AVATARS = {
  ASTRONAUT_BALLOON: require('../../assets/avatars/avatar-1.png'),
  ASTRONAUT_SWIMMING: require('../../assets/avatars/avatar-2.png'),
  ASTRONAUT_WAVING: require('../../assets/avatars/avatar-3.png'),
  ASTRONAUT_PEACE: require('../../assets/avatars/avatar-4.png'),
  ASTRONAUT_ROCKET: require('../../assets/avatars/avatar-5.png'),
  ASTRONAUT_FLYING: require('../../assets/avatars/avatar-6.png'),
  ASTRONAUT_LOVE: require('../../assets/avatars/avatar-7.png'),
} as const;

// Helper array for easy mapping
export const AVATAR_LIST = Object.values(AVATARS);

// Type for avatar keys
export type AvatarKey = keyof typeof AVATARS; 