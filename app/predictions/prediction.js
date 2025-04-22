import { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

const PredictionPage = ({ navigation }) => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://192.168.68.107:5000/get-predictions")
      .then((response) => response.json())
      .then((data) => {
        setPredictions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load predictions");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory Predictions</Text>
      <ScrollView horizontal style={styles.tableContainer}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Product</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Number</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Accuracy</Text>
            </View>
          </View>

          <FlatList
            data={predictions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.row,
                  index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                ]}
              >
                <View style={styles.cell}>
                  <Text style={styles.cellText}>{item.name}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.cellText}>{item.predictedQty}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.cellText}>{item.accuracy}%</Text>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default PredictionPage;

