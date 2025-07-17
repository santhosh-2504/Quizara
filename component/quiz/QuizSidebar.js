import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";

const QuizSidebar = ({
  isOpen,
  timeLeft,
  questionStatuses,
  currentQuestionIndex,
  onClose,
  onNavigateToQuestion,
  onSubmitQuiz,
}) => {
  const [sidebarAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    const toValue = isOpen ? 1 : 0;
    Animated.timing(sidebarAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const sidebarTranslateX = sidebarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [280, 0],
  });

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const getStatusCounts = () => {
    if (!questionStatuses.length) {
      return {
        answered: 0,
        unanswered: 0,
        notVisited: 0,
        marked: 0,
        answeredAndMarked: 0,
      };
    }

    return {
      answered: questionStatuses.filter((status) => status === "answered").length,
      unanswered: questionStatuses.filter((status) => status === "visited").length,
      notVisited: questionStatuses.filter((status) => status === "not-visited").length,
      marked: questionStatuses.filter((status) => status === "marked").length,
      answeredAndMarked: questionStatuses.filter((status) => status === "answered-and-marked").length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <>
      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
      )}
      <Animated.View
        style={[styles.sidebar, { transform: [{ translateX: sidebarTranslateX }] }]}
      >
        <View style={styles.sidebarHeader}>
          <Text style={styles.sidebarTitle}>Time Left: {formatTime(timeLeft)}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.sidebarCloseText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sidebarSummary}>
          <View style={styles.statusItem}>
            <View style={[styles.statusIndicator, styles.answeredIndicator]} />
            <Text style={styles.statusText}>Answered: {statusCounts.answered}</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusIndicator, styles.unansweredIndicator]} />
            <Text style={styles.statusText}>Unanswered: {statusCounts.unanswered}</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusIndicator, styles.notVisitedIndicator]} />
            <Text style={styles.statusText}>Not Visited: {statusCounts.notVisited}</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusIndicator, styles.markedIndicator]} />
            <Text style={styles.statusText}>Marked: {statusCounts.marked}</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusIndicator, styles.answeredAndMarkedIndicator]} />
            <Text style={styles.statusText}>Answered & Marked: {statusCounts.answeredAndMarked}</Text>
          </View>
        </View>

        <View style={styles.questionGrid}>
          {questionStatuses.map((status, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.questionBox,
                currentQuestionIndex === index && styles.currentQuestionBox,
                status === "answered" && styles.answeredBox,
                status === "visited" && styles.unansweredBox,
                status === "not-visited" && styles.notVisitedBox,
                status === "marked" && styles.markedBox,
                status === "answered-and-marked" && styles.answeredAndMarkedBox,
              ]}
              onPress={() => onNavigateToQuestion(index)}
            >
              <Text style={styles.questionBoxText}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.submitFromSidebar}
          onPress={onSubmitQuiz}
        >
          <Text style={styles.submitFromSidebarText}>Submit Quiz</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 10,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 280,
    height: "100%",
    backgroundColor: "#ffffff",
    zIndex: 20,
    elevation: 10,
    paddingBottom: 20,
  },
  sidebarHeader: {
    marginTop: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  sidebarCloseText: {
    fontSize: 24,
    color: "#666666",
    padding: 5,
  },
  sidebarSummary: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  answeredIndicator: {
    backgroundColor: "#34c759",
  },
  unansweredIndicator: {
    backgroundColor: "#ff9500",
  },
  notVisitedIndicator: {
    backgroundColor: "#8e8e93",
  },
  markedIndicator: {
    backgroundColor: "#5856d6",
  },
  answeredAndMarkedIndicator: {
    backgroundColor: "#5856d6",
    borderColor: "#34c759",
    borderWidth: 2,
  },
  questionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: "space-between",
  },
  questionBox: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e6e6e6",
  },
  currentQuestionBox: {
    backgroundColor: "#e6f3ff",
    borderColor: "#3478f6",
  },
  questionBoxText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  answeredBox: {
    backgroundColor: "#e4f8e9",
    borderColor: "#34c759",
  },
  unansweredBox: {
    backgroundColor: "#fff4e6",
    borderColor: "#ff9500",
  },
  notVisitedBox: {
    backgroundColor: "#f5f5f5",
    borderColor: "#8e8e93",
  },
  markedBox: {
    backgroundColor: "#efeffb",
    borderColor: "#5856d6",
  },
  answeredAndMarkedBox: {
    backgroundColor: "#efeffb",
    borderColor: "#34c759",
  },
  submitFromSidebar: {
    marginTop: 20,
    paddingVertical: 14,
    backgroundColor: "#34c759",
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 40,
  },
  submitFromSidebarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});

export default QuizSidebar;