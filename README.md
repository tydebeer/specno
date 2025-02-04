# Office Management App

A React Native mobile application built with Expo for managing offices and staff members. This app allows users to create and manage multiple offices, assign staff members, and track office capacity.

## Features

- Create and manage multiple offices
- Add/Edit/Delete staff members
- Track office capacity and staff presence
- Real-time updates using Firebase
- Search functionality for staff members
- Custom avatar selection
- Office color themes

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (available on [iOS App Store](https://apps.apple.com/app/apple-store/id982107779) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent))

## Installation

1. Clone the repository:
  bash
  git clone [repository-url]
  cd [project-name]

2. Install dependencies:
  bash
  npm install
  or
  yarn install

3. Start the development server:
  bash
  npx expo start

## Running the App

1. After starting the development server, you'll see a QR code in your terminal
2. Open the Expo Go app on your mobile device
3. Scan the QR code:
   - iOS: Use your device's camera
   - Android: Use the Expo Go app's QR scanner

Alternatively, you can run the app on simulators:
- iOS Simulator (macOS only): Press `i` in the terminal
- Android Emulator: Press `a` in the terminal

## Development

To run the app in development mode:
bash
npx expo start --dev-client

4. To clear the cache:
  bash
  npx expo start -c

## Project Structure
src/
├── components/
│ ├── atoms/ # Basic UI components
│ ├── molecules/ # Composite components
│ └── pages/ # Screen components
├── config/ # Configuration files
├── interfaces/ # TypeScript interfaces
└── services/ # Firebase services


## Technologies Used

- React Native
- Expo
- TypeScript
- Firebase (Realtime Database)
- React Navigation
- Expo Vector Icons

## Troubleshooting

If you encounter any issues:

1. Clear the Metro bundler cache:
    bash
    npx expo start -c
2. Verify your Node.js version:
    bash
    node --version
   
3. Make sure all dependencies are properly installed:
    bash
    rm -rf node_modules
    npm install


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
