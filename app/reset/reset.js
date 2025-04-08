import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import reset_styles from './reset_styles'
import {handleResetPassword} from './handleResetPassword'

const ResetPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={reset_styles.container}>
      <View>
        <Text style={reset_styles.title}>Reset Password</Text>
      </View>
      <View>
        <Text style={reset_styles.subtitle}>
          Enter your email address to reset your password.
        </Text>
      </View>
      <View style={reset_styles.inputContainer}>
        <View style={reset_styles.inputWrapper}>
          <MaterialIcons
            name="mail"
            size={20}
            color="#9d9d9d"
            style={reset_styles.icon}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={reset_styles.textInput}
          />
        </View>
        <TouchableOpacity onPress={handleResetPassword}>
          <View style={reset_styles.resetButton}>
            <Text style={reset_styles.resetButtonText}>
              {isLoading ? "Sending Email..." : "Send Reset Email"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={reset_styles.backToLogin}>
            Back to Login <Text style={reset_styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPage;


