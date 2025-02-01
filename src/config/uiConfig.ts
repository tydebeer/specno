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

export const OFFICE_COLORS = [
  '#FFB800', // yellow
  '#FFA07A', // coral
  '#FF4500', // orange red
  '#8B4513', // brown
  '#E6E6FA', // lavender
  '#FF1493', // deep pink
  '#98FF98', // mint
  '#008000', // green
  '#87CEEB', // sky blue
  '#0000FF', // blue
  '#800080', // purple
]; 