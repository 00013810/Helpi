import { Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const handleResetPassword = (email, setIsLoading, navigation) => {
  if (email.trim() === "") {
    Alert.alert("Missing Email", "Please enter your email address.");
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    Alert.alert("Invalid Email", "Please enter a valid email address.");
    return;
  }

  setIsLoading(true);
  sendPasswordResetEmail(auth, email)
    .then(() => {
      setIsLoading(false);
      Alert.alert(
        "Password Reset Email Sent",
        "Please check your email for a password reset link.",
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    })
    .catch((error) => {
      setIsLoading(false);
      Alert.alert("Error", error.message);
    });
};

export default handleResetPassword;
