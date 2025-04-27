import { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import login_styles from "./login_styles";


const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={login_styles.container}>
      <Text style={login_styles.title}>Login</Text>
      <Text style={login_styles.titleLogin}>Please login to continue.</Text>

      <View style={login_styles.inputContainer}>
        <View style={login_styles.inputWrapper}>
          <MaterialIcons name="mail" size={20} color="#9d9d9d" style={login_styles.icon} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={login_styles.textInput}
          />
        </View>

        <View style={login_styles.inputWrapper}>
          <MaterialIcons name="lock" size={20} color="#9d9d9d" style={login_styles.icon} />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            style={login_styles.textInput}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <MaterialIcons name={isPasswordVisible ? "visibility" : "visibility-off"} size={20} color="#9d9d9d" />
          </TouchableOpacity>
        </View>

        <View style={login_styles.registerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={login_styles.registerText}>
              Don’t have an account? <Text style={login_styles.registerLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Reset")}>
            <Text style={login_styles.registerText}>
              Forgot Password? <Text style={login_styles.registerLink}>Reset password</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin}>
          <View style={login_styles.loginButton}>
            <Text style={login_styles.loginButtonText}>
              {isLoading ? "Logging in..." : "Login"}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={login_styles.errorMessageContainer}>
          <Text style={login_styles.errorMessage}>{errorMessage}</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
