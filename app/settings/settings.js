import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { signOut } from "firebase/auth"; // Import signOut
import { auth } from "../firebase/firebase"
import  translations  from '../language_support/translations'
import { useLanguage } from '../language_support/LanguageContext'

const SettingPage = () => {
  const navigation = useNavigation();
  const { language } = useLanguage(); 

  const t = translations[language] || translations['en']; 

  const settingsOptions = [
    { icon: 'notifications-outline', label: t.notification, navigateTo: 'SMS', type: 'Ionicons' },
    { icon: 'info-circle', label: t.about, type: 'FontAwesome' },
    { icon: 'language', label: t.language, navigateTo: 'Language', type: 'FontAwesome' },
    { icon: 'sign-out', label: t.logout, navigateTo: 'Logout', type: 'FontAwesome', isLogout: true },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{t.settings}</Text>
        {settingsOptions.map((item, index) => (
          <Pressable
            key={index}
            style={styles.optionContainer}
            onPress={() => 
                item.navigateTo && navigation.navigate(item.navigateTo) 
            }
            activeOpacity={0.8}
          >
            <View style={styles.optionContent}>
              {item.type === 'FontAwesome' ? (
                <FontAwesome name={item.icon} size={24} color="#A0A0A0" />
              ) : (
                <Icon name={item.icon} size={24} color="#A0A0A0" />
              )}
              <Text style={styles.optionText}>{item.label}</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#A0A0A0" />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

// Stylesheet for spacing and layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bfff',
    padding: 16,
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0ffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#a9a9a9',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // Space between icon and text
  },
  optionText: {
    color: '#a9a9a9',
    fontSize: 18,
  },
});

export default SettingPage;
