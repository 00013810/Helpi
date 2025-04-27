import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, app } from '../firebase/firebase'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import register_styles from './register_styles'


const RegisterPage = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [userRole, setUserRole] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false); // State for Terms and Conditions 

  const handleRegister = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  
    // Validate inputs
    if (!companyName.trim()) {
      Alert.alert('Invalid Input', 'Please enter your company name');
      return;
    }
  
    if (!userRole) {
      Alert.alert('Invalid Input', 'Please input your user role');
      return;
    }
  
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please re-enter a valid email');
      return;
    }
  
    if (!password) {
      Alert.alert('Password Error', 'Please enter your password');
      return;
    }
  
    if (password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters long');
      return;
    }
  
    if (!confirmPassword) {
      Alert.alert('Confirm Password Error', 'Please enter your password again');
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }
  
    if (!termsAccepted) {
      Alert.alert('Terms and Conditions', 'You must accept the terms and conditions to proceed');
      return;
    }
  
    // New validation for userRole and companyName BEFORE registration
    if ((userRole !== 'Retailer' && userRole !== 'Warehouse Manager')) {
      Alert.alert('Registration Failed!', 'Only Retailers or Warehouse Managers are allowed.');
      return;
    }
    // validation for registering new client
   
    // Start loading
    setIsLoading(true);
  
    // Create user in Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    Alert.alert('Registration Successful!', `Welcome, ${user.email}`);

    if ((userRole == 'Retailer' || userRole == 'Warehouse Manager') && companyName == 'Capsula') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Registration Restricted', 'Only Retailers or Warehouse Managers from Capsula are allowed.');
    }
  })
  .catch((error) => {
    Alert.alert('Registration Failed!', error.message);
  })
  .finally(() => {
    setIsLoading(false);
  });

  };
  

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={register_styles.container}>
      <View>
        <Text style={register_styles.title}>Register</Text>
      </View>
      <View>
        <Text style={register_styles.titleLogin}>Please register to continue.</Text>
      </View>
      <View style={register_styles.inputContainer}>
        {/* user role input*/}
      <View style={register_styles.inputWrapper}>
          <MaterialIcons name="supervised-user-circle" size={20} color="#9d9d9d" style={register_styles.icon} />
          <TextInput
            placeholder="Role: Retailer, Warehouse Manager"
            value={userRole}
            onChangeText={setUserRole}
            style={register_styles.textInput}
          />
        </View>
        {/* Company Name Input */}
        <View style={register_styles.inputWrapper}>
          <MaterialIcons name="business" size={20} color="#9d9d9d" style={register_styles.icon} />
          <TextInput
            placeholder="Company Name"
            value={companyName}
            onChangeText={setCompanyName}
            style={register_styles.textInput}
          />
        </View>

        {/* Email Input */}
        <View style={register_styles.inputWrapper}>
          <MaterialIcons name="mail" size={20} color="#9d9d9d" style={register_styles.icon} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={register_styles.textInput}
          />
        </View>

        {/* Password Input */}
        <View style={register_styles.inputWrapper}>
          <MaterialIcons name="lock" size={20} color="#9d9d9d" style={register_styles.icon} />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            style={register_styles.textInput}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <MaterialIcons
              name={isPasswordVisible ? 'visibility' : 'visibility-off'}
              size={20}
              color="#9d9d9d"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <View style={register_styles.inputWrapper}>
          <MaterialIcons name="lock" size={20} color="#9d9d9d" style={register_styles.icon} />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!isPasswordVisible}
            style={register_styles.textInput}
          />
        </View>

        {/* Terms and Conditions */}
        <View style={register_styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
            <View style={[register_styles.checkbox, termsAccepted ? register_styles.checkboxChecked : null]} />
          </TouchableOpacity>
          <Text style={register_styles.checkboxText} onPress={() => navigation.navigate('Terms')}>
            I agree to the{' '}
            <Text style={register_styles.termsLink}>Terms and Conditions</Text>
          </Text>
        </View>

        {/* Error Message */}
        <View style={register_styles.errorMessageContainer}>
          <Text style={register_styles.errorMessage}>{errorMessage}</Text>
        </View>

        {/* Register Button */}
        <TouchableOpacity onPress={handleRegister} disabled={isLoading}>
          <View style={register_styles.loginButton}>
            <Text style={register_styles.loginButtonText}>
              {isLoading ? 'Registering...' : 'Register'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={register_styles.registerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={register_styles.registerText}>
              Already have an account? <Text style={register_styles.registerLink}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterPage;