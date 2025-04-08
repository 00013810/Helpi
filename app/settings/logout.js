import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase'

const LogoutPage = ({ navigation }) => {

  const logout = async () => {

    try {
      await signOut(auth); // Firebase signOut
      navigation.navigate('Login'); // Redirect to Login screen after logout
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View
    style = {[styles.container]}>
      <Button
        title={'Logout'}
        onPress={logout}
        color="red" // Optionally style logout button differently
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
});

export default LogoutPage;