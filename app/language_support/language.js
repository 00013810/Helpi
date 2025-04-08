import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from './LanguageContext'
import language_styles from './language_styles'

const LanguagePage = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <View style={language_styles.container}>
      <Text style={language_styles.title}>Select Language</Text>
      
      <TouchableOpacity style={language_styles.button} onPress={() => setLanguage('ru')}>
        <Text style={language_styles.buttonText}>Русский (Russian)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={language_styles.button} onPress={() => setLanguage('en')}>
        <Text style={language_styles.buttonText}>English</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguagePage;
