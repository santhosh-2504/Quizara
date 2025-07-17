// // components/quiz/QuizHeader.js
// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// const QuizHeader = ({
//   quizTopic,
//   currentQuestionIndex,
//   totalQuestions,
//   progressPercentage,
//   onToggleSidebar,
// }) => {
//   return (
//     <>
//       <View style={styles.quizHeader}>
//         <Text style={styles.quizTopic}>{quizTopic}</Text>
//         <Text style={styles.questionCounter}>
//           Question {currentQuestionIndex + 1} of {totalQuestions}
//         </Text>

//         <TouchableOpacity style={styles.sidebarToggle} onPress={onToggleSidebar}>
//           <Text style={styles.sidebarToggleText}>☰</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.progressBarContainer}>
//         <View
//           style={[styles.progressBar, { width: `${progressPercentage}%` }]}
//         />
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   quizHeader: {
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     backgroundColor: "#ffffff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   quizTopic: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#1a1a1a",
//     flex: 1,
//   },
//   questionCounter: {
//     fontSize: 14,
//     color: "#666666",
//     fontWeight: "500",
//     marginRight: 12,
//   },
//   sidebarToggle: {
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 8,
//     backgroundColor: "#3478f6",
//   },
//   sidebarToggleText: {
//     fontSize: 24,
//     color: "#ffffff",
//   },
//   progressBarContainer: {
//     height: 4,
//     backgroundColor: "#e6e6e6",
//     width: "100%",
//   },
//   progressBar: {
//     height: "100%",
//     backgroundColor: "#34c759",
//     borderRadius: 2,
//   },
// });

// export default QuizHeader;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import QuizTimer from "./QuizTimer";

const QuizHeader = ({
  quizTopic,
  currentQuestionIndex,
  totalQuestions,
  progressPercentage,
  timeLeft,
  onToggleSidebar,
}) => {
  return (
    <>
      <View style={styles.quizHeader}>
        <Text style={styles.quizTopic}>{quizTopic}</Text>
        <View style={styles.headerContent}>
          <QuizTimer timeLeft={timeLeft} />
          <View style={styles.rightSection}>
            <Text style={styles.questionCounter}>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </Text>
            <TouchableOpacity style={styles.sidebarToggle} onPress={onToggleSidebar}>
              <Text style={styles.sidebarToggleText}>☰</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <View
          style={[styles.progressBar, { width: `${progressPercentage}%` }]}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  quizHeader: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quizTopic: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  questionCounter: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
    marginRight: 12,
  },
  sidebarToggle: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#3478f6",
  },
  sidebarToggleText: {
    fontSize: 24,
    color: "#ffffff",
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#e6e6e6",
    width: "100%",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#34c759",
    borderRadius: 2,
  },
});

export default QuizHeader;