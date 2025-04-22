import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList
} from "react-native";

const NotificationPage = () => {
  const [officeData, setOfficeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleFetchProducts();
  }, []);

  const handleFetchProducts = async () => {
    try {
      const response = await fetch("http://192.168.68.107:3000/fetch-products");
      const data = await response.json();
      if (response.ok) {
        const { data: productData } = data;
        if (Array.isArray(productData)) {
          const extractedData = productData.flatMap((product) =>
            product.offices.map((office) => ({
              officeName: office.officeName,
              productName: product.name,
              qty: office.qty,
            }))
          );
          setOfficeData(extractedData);
        }
      }
      setLoading(false);
    } catch (error) {
      setError("Failed to load office data");
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="blue" style={styles.loader} />;
  }
  
  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>

      <ScrollView horizontal style={styles.tableContainer}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.headerCell}><Text style={styles.headerText}>Product</Text></View>
            {[...new Set(officeData.map((item) => item.officeName))].map((office, index) => (
              <View key={index} style={styles.headerCell}><Text style={styles.headerText}>{office}</Text></View>
            ))}
          </View>

          <FlatList
            data={[...new Set(officeData.map((item) => item.productName))]}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item: product, index }) => (
              <View style={[styles.row, index % 2 === 0 ? styles.rowEven : styles.rowOdd]}>
                <View style={styles.cell}><Text style={styles.cellText}>{product}</Text></View>
                {[...new Set(officeData.map((item) => item.officeName))].map((office, idx) => {
                  const item = officeData.find((data) => data.productName === product && data.officeName === office);
                  return (
                    <View key={idx} style={styles.cell}>
                      <Text style={styles.cellText}>{item ? `${item.qty}` : "-"}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#333" },
  button: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 5, marginBottom: 10 },
  buttonText: { color: "#fff", fontSize: 16, textAlign: "center" },
  tableContainer: { marginTop: 10, width: "100%" },
  table: { flexDirection: "column", borderWidth: 1, borderColor: "#ddd", borderRadius: 10 },
  tableHeader: { flexDirection: "row", backgroundColor: "#e0e0e0", borderBottomWidth: 1, borderBottomColor: "#ddd" },
  headerCell: { padding: 8, justifyContent: "center", alignItems: "center", borderRightWidth: 1, borderRightColor: "#ddd", width: 150 },
  headerText: { fontWeight: "bold", fontSize: 13, color: "#333", textAlign: "center" },
  row: { flexDirection: "row", paddingVertical: 8, alignItems: "center" },
  rowEven: { backgroundColor: "#fff" },
  rowOdd: { backgroundColor: "#f1f1f1" },
  cell: { justifyContent: "center", alignItems: "center", width: 150, borderRightWidth: 1, borderRightColor: "#ddd" },
  cellText: { fontSize: 12, color: "#555", textAlign: "center" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red", fontSize: 18, textAlign: "center", marginTop: 20 },
});

export default NotificationPage;





