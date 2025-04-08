import { StyleSheet } from "react-native";

const monetization_styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f3f4f6",
      padding: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 24,
    },
    card: {
      padding: 24,
      width: 300,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
      alignItems: "center",
    },
    basicPlan: {
      backgroundColor: "#e0f2fe",
    },
    planName: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 16,
    },
    price: {
      color: "#4b5563",
      fontSize: 18,
      fontWeight: "500",
      marginBottom: 16,
    },
    featureList: {
      marginBottom: 24,
    },
    feature: {
      color: "#4b5563",
      marginBottom: 8,
    },
    button: {
      width: "100%",
      backgroundColor: "#2563eb",
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
  });

  export default monetization_styles;