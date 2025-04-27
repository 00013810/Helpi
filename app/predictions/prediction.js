import { useState, useEffect } from "react";
import {View,Text,ActivityIndicator,FlatList,ScrollView} from "react-native";
import prediction_styles from './prediction_styles'

const PredictionPage = ({ navigation }) => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://192.168.73.122:5001/get-predictions")
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
    return <ActivityIndicator size="large" color="blue" style={prediction_styles.loader} />;
  }

  if (error) {
    return <Text style={prediction_styles.error}>{error}</Text>;
  }

  return (
    <View style={prediction_styles.container}>
      <Text style={prediction_styles.title}>Inventory Predictions</Text>
      <ScrollView horizontal style={prediction_styles.tableContainer}>
        <View style={prediction_styles.table}>
          <View style={prediction_styles.tableHeader}>
            <View style={prediction_styles.headerCell}>
              <Text style={prediction_styles.headerText}>Product</Text>
            </View>
            <View style={prediction_styles.headerCell}>
              <Text style={prediction_styles.headerText}>Number</Text>
            </View>
            <View style={prediction_styles.headerCell}>
              <Text style={prediction_styles.headerText}>Accuracy</Text>
            </View>
          </View>

          <FlatList
            data={predictions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View
                style={[
                  prediction_styles.row,
                  index % 2 === 0 ? prediction_styles.rowEven : prediction_styles.rowOdd,
                ]}
              >
                <View style={prediction_styles.cell}>
                  <Text style={prediction_styles.cellText}>{item.name}</Text>
                </View>
                <View style={prediction_styles.cell}>
                  <Text style={prediction_styles.cellText}>{item.predictedQty}</Text>
                </View>
                <View style={prediction_styles.cell}>
                  <Text style={prediction_styles.cellText}>{item.accuracy}%</Text>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PredictionPage;

