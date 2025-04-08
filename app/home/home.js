import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import  translations  from '../language_support/translations'
import { useLanguage } from '../language_support/LanguageContext'
import home_styles from './home_styles'

const HomePage = ({ navigation }) => {
  const { language } = useLanguage(); 
  
  const t = translations[language] || translations['en']; 

  return (
    <View style={home_styles.container}>
      <View style={home_styles.content}>
        <Text style={home_styles.welcomeText}>{t.main_page}</Text>
      </View>
      <View style={home_styles.bottomBar}>
        <TouchableOpacity
          style={home_styles.navButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <FontAwesome name="cog" size={24} color="#456FE8" />
          <Text style={home_styles.navButtonText}>{t.settings}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={home_styles.navButton}
          onPress={() => navigation.navigate('Prediction')}
        >
          <FontAwesome name="bar-chart-o" size={24} color="#456FE8" />
          <Text style={home_styles.navButtonText}>{t.prediction}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={home_styles.navButton}
          onPress={() => navigation.navigate('Notification')}
        >
          <FontAwesome name="check" size={24} color="#456FE8" />
          <Text style={home_styles.navButtonText}>{t.data}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={home_styles.navButton}
          onPress={() => navigation.navigate('Monetization')}
        >
          <FontAwesome name="money" size={24} color="#456FE8" />
          <Text style={home_styles.navButtonText}>{t.monetization}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomePage;