import {StyleSheet} from "react-native";

const prediction_styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#f9f9f9",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#333",
    },
    tableContainer: {
      marginTop: 10,
      width: "100%",
    },
    table: {
      flexDirection: "column",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#e0e0e0",
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    headerCell: {
      padding: 8,
      justifyContent: "center",
      alignItems: "center",
      borderRightWidth: 1,
      borderRightColor: "#ddd",
      width: 150,
    },
    headerText: {
      fontWeight: "bold",
      fontSize: 13,
      color: "#333",
      textAlign: "center",
    },
    row: {
      flexDirection: "row",
      paddingVertical: 8,
      alignItems: "center",
    },
    rowEven: {
      backgroundColor: "#fff",
    },
    rowOdd: {
      backgroundColor: "#f1f1f1",
    },
    cell: {
      justifyContent: "center",
      alignItems: "center",
      width: 150,
      borderRightWidth: 1,
      borderRightColor: "#ddd",
    },
    cellText: {
      fontSize: 12,
      color: "#555",
      textAlign: "center",
    },
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    error: {
      color: "red",
      fontSize: 18,
      textAlign: "center",
      marginTop: 20,
    },
  });
  
  export default prediction_styles;
  
  