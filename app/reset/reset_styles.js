import { StyleSheet } from 'react-native';

const reset_styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      color: "#5F5F5F",
      fontSize: 25,
      fontWeight: "600",
    },
    subtitle: {
      color: "#5F5F5F",
      fontSize: 15,
      marginTop: 10,
      textAlign: 'center',
      paddingHorizontal: 20,
    },
    inputContainer: {
      width: "80%",
      marginTop: 20,
      gap: 20,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      paddingHorizontal: 10,
      borderWidth: 0.2,
      borderRadius: 5,
    },
    textInput: {
      flex: 1,
      paddingVertical: 15,
      paddingHorizontal: 10,
    },
    icon: {
      marginRight: 10,
    },
    resetButton: {
      backgroundColor: "#456FE8",
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 5,
      alignItems: "center",
    },
    resetButtonText: {
      color: "#fff",
      fontSize: 15,
    },
    backToLogin: {
      marginTop: 20,
      color: "#5F5F5F",
    },
    loginLink: {
      color: "#456FE8",
      fontWeight: "600",
    },
  });

  export default reset_styles;