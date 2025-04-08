import { Linking, Platform } from "react-native";

export const handleSubscribe = async (priceId) => {
  try {
    const response = await fetch('http://192.168.68.107:5000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong with Stripe.");
    }

    // Redirect user to Stripe Checkout page
     // Redirect user to Stripe Checkout page
     if (data.url) {
      if (Platform.OS === 'web') {
        window.location.href = data.url; // web
      } else {
        await Linking.openURL(data.url); // mobile
      }
    } else {
      console.error("Stripe checkout URL missing.");
    }
  } catch (error) {
    console.error("Subscription error:", error.message);
  }
};
