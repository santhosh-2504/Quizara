// components/quiz/LoadingScreen.js
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const LoadingScreen = ({ text = "Loading..." }) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3478f6" />
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
  },
});

export default LoadingScreen;