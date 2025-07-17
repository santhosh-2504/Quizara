// components/quiz/QuizNavigation.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const QuizNavigation = ({
  currentQuestionIndex,
  totalQuestions,
  onPreviousQuestion,
  onNextQuestion,
}) => {
  return (
    <View style={styles.navigationContainer}>
      <TouchableOpacity
        style={[
          styles.navButton,
          styles.prevButton,
          currentQuestionIndex === 0 && styles.disabledButton,
        ]}
        onPress={onPreviousQuestion}
        disabled={currentQuestionIndex === 0}
      >
        <Text
          style={[
            styles.navButtonText,
            currentQuestionIndex === 0 && styles.disabledButtonText,
          ]}
        >
          Previous
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, styles.nextButton]}
        onPress={onNextQuestion}
      >
        <Text style={styles.navButtonText}>
          {currentQuestionIndex === totalQuestions - 1 ? "Submit" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    elevation: 2,
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 6,
    marginBottom: 40,
  },
  prevButton: {
    backgroundColor: "#e6e6e6",
  },
  nextButton: {
    backgroundColor: "#3478f6",
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: "#999999",
  },
});

export default QuizNavigation;