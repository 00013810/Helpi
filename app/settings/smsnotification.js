
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as SMS from "expo-sms";


const useSmsNotification = () => {

  const initialInterval = [60000, 6000]
  
  const [isNotifying, setIsNotifying] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('')

  // input by default 1 minute
  const [notificationInteval, setNotificationInterval] = useState(initialInterval[0])
  const message = "Check Helpi for data.";

  useEffect(() => {
    let intervalId;

    if (isNotifying) {
      sendSMS(); // Initial send
      intervalId = setInterval(() => {
        sendSMS();
      }, notificationInteval);
    }

    return () => clearInterval(intervalId);
  }, [isNotifying, notificationInteval]);

  const sendSMS = async () => {
    if(phoneNumber.trim() == ""){
      Alert.alert("Phone can not be empty")
    }

    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert("Error", "SMS service is not available on this device.");
      return;
    }

    const { result } = await SMS.sendSMSAsync([phoneNumber], message);
    if (result === "sent") {
      console.log(`SMS sent successfully to ${phoneNumber}`);
    } else {
      console.log("SMS not sent.");
    }
  };

  const startNotifications = (interval, number) => {
    if(number.trim() == ""){
      Alert.alert("Phone number can not empty. Re-enter number please")
    }
    setPhoneNumber(number)
    setNotificationInterval(interval)
    setIsNotifying(true);
    Alert.alert("SMS Notifications Started");
  };

  const stopNotifications = () => {
    setIsNotifying(false);
    Alert.alert("SMS Notifications Stopped");
  };

  return { isNotifying, startNotifications, stopNotifications, setNotificationInterval };
};

export default useSmsNotification;

