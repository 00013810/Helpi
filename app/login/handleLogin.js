import { Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/firebase"

const auth = getAuth(app);

const handleLogin = (email, password, setIsLoading, navigation) => {
  if (!email.trim() || !password.trim()) {
    Alert.alert("Error", "Email and password cannot be empty.");
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    Alert.alert("Invalid email", "Please re-enter email");
    return;
  }

  setIsLoading(true);
  
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigation.navigate("Home");
    })
    .catch((error) => {
      Alert.alert("Login failed!", error.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export default handleLogin;
