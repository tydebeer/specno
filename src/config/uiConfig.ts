export const AVATARS = {
  ASTRONAUT_BALLOON: require('../../assets/avatars/avatar-1.png'),
  ASTRONAUT_SWIMMING: require('../../assets/avatars/avatar-2.png'),
  ASTRONAUT_WAVING: require('../../assets/avatars/avatar-3.png'),
  ASTRONAUT_PEACE: require('../../assets/avatars/avatar-4.png'),
  ASTRONAUT_ROCKET: require('../../assets/avatars/avatar-5.png'),
  ASTRONAUT_FLYING: require('../../assets/avatars/avatar-6.png'),
  ASTRONAUT_LOVE: require('../../assets/avatars/avatar-7.png'),
} as const;

export const AVATAR_LIST = Object.values(AVATARS);
export type AvatarKey = keyof typeof AVATARS;

export const OFFICE_COLORS_MAP = {
  YELLOW: '#FFB800',
  CORAL: '#FFA07A',
  ORANGE_RED: '#FF4500',
  BROWN: '#8B4513',
  LAVENDER: '#E6E6FA',
  PINK: '#FF1493',
  MINT: '#98FF98',
  GREEN: '#008000',
  SKY_BLUE: '#87CEEB',
  BLUE: '#0000FF',
  PURPLE: '#800080',
} as const;

export type OfficeColorKey = keyof typeof OFFICE_COLORS_MAP;

// For backwards compatibility or where we need the array of colors
export const OFFICE_COLORS = Object.values(OFFICE_COLORS_MAP); 