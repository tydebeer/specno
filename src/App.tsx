import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { OfficeCard } from './components/atoms/OfficeCard';
import { SearchBar } from './components/atoms/SearchBar';
import { AddButton } from './components/atoms/AddButton';
import { UserListItem } from './components/atoms/UserListItem';
import { StaffHeader } from './components/atoms/StaffHeader';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search"
      />
      <OfficeCard
        companyName="Specno"
        staffCount={5}
        phoneNumber="082 364 9864"
        email="info@specno.com"
        capacity={25}
        address="10 Willie Van Schoor Dr, Bo Oakdale, Cape Town, 7530"
        onEdit={() => console.log('Edit pressed')}
      />
      <AddButton onPress={() => console.log('Add button pressed')} />
      <UserListItem
        name="Jacques Jordaan"
        avatarUrl="https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png"
        onOptionsPress={() => console.log('Options pressed')}
      />
      <StaffHeader count={11} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
});
