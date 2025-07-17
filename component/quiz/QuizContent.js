// components/quiz/QuizContent.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const QuizContent = ({
  question,
  selectedAnswer,
  questionStatus,
  onSelectOption,
  onClearResponse,
  onMarkForReview,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.questionText}</Text>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === index && styles.selectedOption,
              ]}
              onPress={() => onSelectOption(index)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  selectedAnswer === index && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.questionActionContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.clearButton,
              selectedAnswer === null && styles.disabledButton,
            ]}
            onPress={onClearResponse}
            disabled={selectedAnswer === null}
          >
            <Text
              style={[
                styles.actionButtonText,
                selectedAnswer === null && styles.disabledButtonText,
              ]}
            >
              Clear Response
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.markButton,
              questionStatus === "marked" && styles.markedButton,
              questionStatus === "answered-and-marked" &&
                styles.answeredAndMarkedButton,
            ]}
            onPress={onMarkForReview}
          >
            <Text style={styles.actionButtonText}>
              {questionStatus === "marked" ||
              questionStatus === "answered-and-marked"
                ? "Unmark"
                : "Mark for Review"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  questionContainer: {
    padding: 20,
    marginTop: 12,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 24,
    lineHeight: 26,
  },
  optionsContainer: {
    marginTop: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    elevation: 1,
  },
  selectedOption: {
    backgroundColor: "#e6f3ff",
    borderColor: "#3478f6",
    borderWidth: 2,
  },
  optionButtonText: {
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "500",
  },
  selectedOptionText: {
    fontWeight: "600",
    color: "#3478f6",
  },
  questionActionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "gray",
  },
  markButton: {
    backgroundColor: "#5856d6",
  },
  markedButton: {
    backgroundColor: "#5856d6",
  },
  answeredAndMarkedButton: {
    backgroundColor: "#5856d6",
    borderColor: "#34c759",
    borderWidth: 2,
  },
  actionButtonText: {
    fontSize: 14,
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

export default QuizContent;