import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import useSmsNotification from "./smsnotification";

const SmsPage = () => {
  const { isNotifying, startNotifications, stopNotifications } = useSmsNotification();
  const [intervalInput, setIntervalInput] = useState("1"); // Default 1 min
  const [phoneNumberInput, setPhoneNumberInput] = useState('')

  const handleStart = () => {
    const intervalInMs = parseInt(intervalInput) * 60000; // Convert minutes to milliseconds
    if (intervalInMs >= 60000 && phoneNumberInput.trim() !== "") {
      startNotifications(intervalInMs, phoneNumberInput);
    } else {
      alert("Please enter at least 1 minute.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SMS Notification</Text>

      <Text>Enter Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={phoneNumberInput}
        onChangeText={setPhoneNumberInput}
        placeholder="+998940510932"
      />

      <Text>Enter Interval (Minutes):</Text>
      <TextInput
        style={styles.input}
        value={intervalInput}
        onChangeText={setIntervalInput}
      />

      {!isNotifying ? (
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start SMS Notifications</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.stopButton} onPress={stopNotifications}>
          <Text style={styles.buttonText}>Stop SMS Notifications</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    width: 200,
    marginVertical: 10,
    textAlign: "center",
  },
  button: { backgroundColor: "blue", padding: 15, borderRadius: 10 },
  stopButton: { backgroundColor: "red", padding: 15, borderRadius: 5 },
  buttonText: { color: "#fff", fontSize: 16 },
});

export default SmsPage;
