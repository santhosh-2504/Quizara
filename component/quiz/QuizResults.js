// import React from "react";
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";

// const QuizResults = ({ quiz, score, submittedAnswers, onRetakeQuiz, onFinishQuiz }) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.resultsContainer}>
//         <Text style={styles.resultsTitle}>Quiz Results</Text>
//         <Text style={styles.quizTopic}>{quiz.topic}</Text>
//         <Text style={styles.quizLevel}>
//           Level: {quiz.level.charAt(0).toUpperCase() + quiz.level.slice(1)}
//         </Text>

//         <View style={styles.scoreContainer}>
//           <Text style={styles.scoreText}>Your Score</Text>
//           <Text
//             style={[
//               styles.scoreValue,
//               score >= 70
//                 ? styles.goodScore
//                 : score >= 40
//                 ? styles.mediumScore
//                 : styles.badScore,
//             ]}
//           >
//             {Math.round(score)}%
//           </Text>
//           <Text style={styles.scoreDetail}>
//             {Math.round(score / (100 / quiz.questions.length))} correct out of{" "}
//             {quiz.questions.length} questions
//           </Text>
//         </View>

//         <View style={styles.answerReviewContainer}>
//           <Text style={styles.reviewTitle}>Answer Review</Text>

//           {quiz.questions.map((question, index) => {
//             const userAnswer = submittedAnswers[index];
//             const isCorrect = userAnswer === question.correctOption - 1;

//             return (
//               <View key={index} style={styles.reviewItem}>
//                 <Text style={styles.reviewQuestionText}>
//                   {index + 1}. {question.questionText}
//                 </Text>
//                 <View style={styles.reviewAnswers}>
//                   <Text style={styles.reviewAnswerText}>
//                     Your answer:{" "}
//                     {userAnswer !== null && userAnswer !== undefined
//                       ? question.options[userAnswer]
//                       : "Not answered"}
//                   </Text>
//                   <Text style={styles.explanationText}>
//                     Explanation: {question.explanation}
//                   </Text>
//                   <Text style={styles.reviewCorrectAnswer}>
//                     Correct answer: {question.options[question.correctOption - 1]}
//                   </Text>
//                 </View>
//                 <View
//                   style={[
//                     styles.resultIndicator,
//                     isCorrect ? styles.correctIndicator : styles.incorrectIndicator,
//                   ]}
//                 >
//                   <Text style={styles.resultIndicatorText}>
//                     {isCorrect ? "Correct" : "Incorrect"}
//                   </Text>
//                 </View>
//               </View>
//             );
//           })}
//         </View>

//         <View style={styles.actionButtons}>
//           <TouchableOpacity
//             style={[styles.button, styles.retakeButton]}
//             onPress={onRetakeQuiz}
//           >
//             <Text style={styles.buttonText}>Retake Quiz</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.button, styles.finishButton]}
//             onPress={onFinishQuiz}
//           >
//             <Text style={styles.buttonText}>Back to Quizzes</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 25,
//     backgroundColor: "#ffffff",
//   },
//   resultsContainer: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   resultsTitle: {
//     fontSize: 26,
//     fontWeight: "700",
//     color: "#1a1a1a",
//     marginBottom: 12,
//     textAlign: "center",
//   },
//   quizTopic: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#1a1a1a",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   quizLevel: {
//     fontSize: 14,
//     color: "#666666",
//     marginBottom: 24,
//     textAlign: "center",
//     fontWeight: "500",
//   },
//   scoreContainer: {
//     alignItems: "center",
//     padding: 24,
//     marginVertical: 20,
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   scoreText: {
//     fontSize: 18,
//     color: "#666666",
//     marginBottom: 8,
//     fontWeight: "500",
//   },
//   scoreValue: {
//     fontSize: 48,
//     fontWeight: "700",
//     marginBottom: 12,
//   },
//   goodScore: {
//     color: "#34c759",
//   },
//   mediumScore: {
//     color: "#ff9500",
//   },
//   badScore: {
//     color: "#ff3b30",
//   },
//   scoreDetail: {
//     fontSize: 14,
//     color: "#666666",
//     fontWeight: "500",
//   },
//   answerReviewContainer: {
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 20,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   reviewTitle: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#1a1a1a",
//     marginBottom: 16,
//   },
//   reviewItem: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//     paddingVertical: 12,
//     marginBottom: 12,
//   },
//   reviewQuestionText: {
//     fontSize: 16,
//     color: "#1a1a1a",
//     marginBottom: 12,
//     fontWeight: "500",
//   },
//   reviewAnswers: {
//     marginBottom: 12,
//   },
//   reviewAnswerText: {
//     fontSize: 14,
//     color: "#666666",
//     marginBottom: 4,
//     fontWeight: "500",
//   },
//   explanationText: {
//     fontSize: 14,
//     color: "#666666",
//     marginBottom: 4,
//     fontWeight: "500",
//   },
//   reviewCorrectAnswer: {
//     fontSize: 14,
//     color: "#34c759",
//     fontWeight: "500",
//   },
//   resultIndicator: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 12,
//     alignSelf: "flex-start",
//   },
//   correctIndicator: {
//     backgroundColor: "#e4f8e9",
//   },
//   incorrectIndicator: {
//     backgroundColor: "#ffebeb",
//   },
//   resultIndicatorText: {
//     fontSize: 12,
//     fontWeight: "500",
//   },
//   actionButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   button: {
//     paddingVertical: 14,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     flex: 1,
//     alignItems: "center",
//     marginHorizontal: 6,
//     marginBottom: 40,
//   },
//   retakeButton: {
//     backgroundColor: "#3478f6",
//   },
//   finishButton: {
//     backgroundColor: "#666666",
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default QuizResults;

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import QuestionModal from "./QuestionModal";

const QuizResults = ({ quiz, score, submittedAnswers, onRetakeQuiz, onFinishQuiz }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const handleOpenModal = (index) => {
    setSelectedQuestionIndex(index);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedQuestionIndex(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Quiz Results</Text>
        <Text style={styles.quizTopic}>{quiz.topic}</Text>
        <Text style={styles.quizLevel}>
          Level: {quiz.level.charAt(0).toUpperCase() + quiz.level.slice(1)}
        </Text>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Your Score</Text>
          <Text
            style={[
              styles.scoreValue,
              score >= 70
                ? styles.goodScore
                : score >= 40
                ? styles.mediumScore
                : styles.badScore,
            ]}
          >
            {Math.round(score)}%
          </Text>
          <Text style={styles.scoreDetail}>
            {Math.round(score / (100 / quiz.questions.length))} correct out of{" "}
            {quiz.questions.length} questions
          </Text>
        </View>

        <View style={styles.answerReviewContainer}>
          <Text style={styles.reviewTitle}>Answer Review</Text>
          {quiz.questions.map((question, index) => {
  const userAnswer = submittedAnswers[index];
  const isCorrect = userAnswer === question.correctOption - 1;

  return (
    <TouchableOpacity
      key={index}
      style={styles.questionCard}
      onPress={() => handleOpenModal(index)}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.questionCardText}>
          {question.questionText}
        </Text>
        <View
          style={[
            styles.resultIndicator,
            isCorrect ? styles.correctIndicator : styles.incorrectIndicator,
          ]}
        >
          <Text style={styles.resultIndicatorText}>
            {isCorrect ? "✔ Correct" : "✘ Incorrect"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
})}


        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.retakeButton]}
            onPress={onRetakeQuiz}
          >
            <Text style={styles.buttonText}>Retake Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.finishButton]}
            onPress={onFinishQuiz}
          >
            <Text style={styles.buttonText}>Back to Quizzes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {selectedQuestionIndex !== null && (
        <QuestionModal
          visible={modalVisible}
          question={quiz.questions[selectedQuestionIndex]}
          userAnswer={submittedAnswers[selectedQuestionIndex]}
          onClose={handleCloseModal}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: "#ffffff",
  },
  resultsContainer: {
    flexGrow: 1,
    padding: 20,
  },
  resultsTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
    textAlign: "center",
  },
  quizTopic: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 8,
  },
  quizLevel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "500",
  },
  scoreContainer: {
    alignItems: "center",
    padding: 24,
    marginVertical: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scoreText: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 8,
    fontWeight: "500",
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: "700",
    marginBottom: 12,
  },
  goodScore: {
    color: "#34c759",
  },
  mediumScore: {
    color: "#ff9500",
  },
  badScore: {
    color: "#ff3b30",
  },
  scoreDetail: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  answerReviewContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  questionCard: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2,
  },
  
  questionCardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  
  resultIndicator: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  
  correctIndicator: {
    backgroundColor: "#d4f7d4",
  },
  
  incorrectIndicator: {
    backgroundColor: "#fbdcdc",
  },
  
  resultIndicatorText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },  
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 6,
    marginBottom: 40,
  },
  retakeButton: {
    backgroundColor: "#3478f6",
  },
  finishButton: {
    backgroundColor: "#666666",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default QuizResults;