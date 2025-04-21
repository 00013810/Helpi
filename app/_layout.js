// necessary imports for logic
import React, {lazy, Suspense} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LanguageProvider } from './language_support/LanguageContext';


// dynamic logic for pages
const LoginPage = lazy(() => import('./login/login'));
const HomePage = lazy(() => import('./home/home'));
const PredictionPage = lazy(() => import('./predictions/prediction'));
const SettingPage = lazy(() => import('./settings/settings'));
const RegisterPage = lazy(() => import('./register/register'));
const Resetpage = lazy(() => import('./reset/reset'));
const NotificationPage = lazy(() => import('./settings/notification'));
const SmsPage = lazy(() => import('./settings/smspage'));
const MonetizationPage = lazy(() => import('./monetization/monetization'));
const LogoutPage = lazy(() => import('../app/settings/logout'));
const LanguagePage = lazy(() => import('../app/language_support/language'));


// Stack initiation
const Stack = createStackNavigator();

const RootLayout = () => {
  return (
    <LanguageProvider>
      <Suspense fallback={<></>}>
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
      </Suspense>
      </LanguageProvider>
  );
}

export default RootLayout;