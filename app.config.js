module.exports = ({ config }) => ({
  ...config,
  plugins: [
    "@react-native-firebase/app",
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
  ],
}); 