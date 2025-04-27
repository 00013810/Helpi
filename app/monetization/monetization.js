import { View, Text, TouchableOpacity } from "react-native";
import monetization_styles from "./monetization_styles";
import { handleSubscribe } from "./handleSubscribe";

const MonetizationPage = () => {
  return (
    <View style={monetization_styles.container}>
      <Text style={monetization_styles.title}>Choose Your Plan</Text>

      {/* Basic Plan */}
      <View style={[monetization_styles.card, monetization_styles.basicPlan]}>
        <Text style={monetization_styles.planName}>Basic</Text>
        <Text style={monetization_styles.price}>$1.00/month</Text>
        <View style={monetization_styles.featureList}>
          <Text style={monetization_styles.feature}>• Access to standard features</Text>
          <Text style={monetization_styles.feature}>• Limited support</Text>
          <Text style={monetization_styles.feature}>• Monthly updates</Text>
        </View>
        <TouchableOpacity 
          style={monetization_styles.button} 
          onPress={() => handleSubscribe("price_1R8MarGH3WN9fBw2X91UozcT")}
        >
          <Text style={monetization_styles.buttonText}>Subscribe</Text>
        </TouchableOpacity>

        {/* Cancel Subscription Button for Basic */}
        <TouchableOpacity
          style={[monetization_styles.button, { backgroundColor: 'crimson', marginTop: 10 }]}
        >
          <Text style={monetization_styles.buttonText}>Cancel Subscription</Text>
        </TouchableOpacity>
      </View>

      {/* Premium Plan */}
      <View style={[monetization_styles.card, monetization_styles.premiumPlan]}>
        <Text style={monetization_styles.planName}>Premium</Text>
        <Text style={monetization_styles.price}>$5.00/month</Text>
        <View style={monetization_styles.featureList}>
          <Text style={monetization_styles.feature}>• Access to new features</Text>
          <Text style={monetization_styles.feature}>• Priority support</Text>
          <Text style={monetization_styles.feature}>• Early access to updates</Text>
        </View>
        <TouchableOpacity 
          style={monetization_styles.button} 
          onPress={() => handleSubscribe("price_1R8MbLGH3WN9fBw2pojxQPqr")}
        >

          <Text style={monetization_styles.buttonText}>Subscribe</Text>
        </TouchableOpacity>

      {/* Cancel Subscription Button */}
      <TouchableOpacity
        style={[monetization_styles.button, { backgroundColor: 'crimson', marginTop: 10 }]}
      >
        <Text style={monetization_styles.buttonText}>Cancel Subscription</Text>
      </TouchableOpacity>

      </View>

    </View>
  );
};

export default MonetizationPage;
