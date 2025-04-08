import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screen components +
import LoginPage from './login/login'
import HomePage from './home/home'
import PredictionPage from './predictions/prediction'
import SettingPage from './settings/settings'
import RegisterPage from './register/register'
import Resetpage from './reset/reset'
import NotificationPage from './settings/notification'
import SmsPage from './settings/smspage'
import MonetizationPage from './monetization/monetization'
import LogoutPage from '../app/settings/logout'
import LanguagePage from '../app/language_support/language'
import { LanguageProvider } from './language_support/LanguageContext'

const Stack = createStackNavigator();

const RootLayout = () => {
  return (
    <LanguageProvider>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }} 
      >
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name='Prediction' component={PredictionPage}/>
        <Stack.Screen name='Settings' component={SettingPage}/>
        <Stack.Screen name='Register' component={RegisterPage}/>
        <Stack.Screen name='Reset' component={Resetpage}/>
        <Stack.Screen name='Notification' component={NotificationPage}/>
        <Stack.Screen name='SMS' component={SmsPage}/>
        <Stack.Screen name="Monetization" component={MonetizationPage} />
        <Stack.Screen name="Logout" component={LogoutPage} />
        <Stack.Screen name="Language" component={LanguagePage} />

      </Stack.Navigator>
      </LanguageProvider>
  );
}

export default RootLayout;