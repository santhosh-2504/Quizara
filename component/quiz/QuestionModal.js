// // import React, { useEffect, useRef } from "react";
// // import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Animated } from "react-native";

// // const QuestionModal = ({ visible, question, userAnswer, onClose }) => {
// //   const scaleAnim = useRef(new Animated.Value(0)).current;
// //   const opacityAnim = useRef(new Animated.Value(0)).current;

// //   useEffect(() => {
// //     if (visible) {
// //       Animated.parallel([
// //         Animated.spring(scaleAnim, {
// //           toValue: 1,
// //           tension: 80,
// //           friction: 10,
// //           useNativeDriver: true,
// //         }),
// //         Animated.timing(opacityAnim, {
// //           toValue: 1,
// //           duration: 300,
// //           useNativeDriver: true,
// //         }),
// //       ]).start();
// //     } else {
// //       Animated.parallel([
// //         Animated.timing(scaleAnim, {
// //           toValue: 0,
// //           duration: 200,
// //           useNativeDriver: true,
// //         }),
// //         Animated.timing(opacityAnim, {
// //           toValue: 0,
// //           duration: 200,
// //           useNativeDriver: true,
// //         }),
// //       ]).start();
// //     }
// //   }, [visible]);

// //   if (!question) return null;

// //   const isCorrect = userAnswer === question.correctOption - 1;

// //   return (
// //     <Modal
// //       animationType="none"
// //       transparent={true}
// //       visible={visible}
// //       onRequestClose={onClose}
// //     >
// //       <View style={styles.modalContainer}>
// //         <Animated.View
// //           style={[
// //             styles.modalContent,
// //             {
// //               transform: [{ scale: scaleAnim }],
// //               opacity: opacityAnim,
// //             },
// //           ]}
// //         >
// //           <ScrollView contentContainerStyle={styles.modalScrollContent}>
// //             <Text style={styles.modalTitle}>Question Details</Text>

// //             <View style={styles.questionContainer}>
// //               <Text style={styles.questionText}>{question.questionText}</Text>

// //               <View style={styles.answerSection}>
// //                 <Text style={styles.answerText}>
// //                   Your answer:{" "}
// //                   <Text style={styles.answerHighlight}>
// //                     {userAnswer !== null && userAnswer !== undefined
// //                       ? question.options[userAnswer]
// //                       : "Not answered"}
// //                   </Text>
// //                 </Text>
// //                 <Text style={styles.correctAnswerText}>
// //                   Correct answer:{" "}
// //                   <Text style={styles.correctAnswerHighlight}>
// //                     {question.options[question.correctOption - 1]}
// //                   </Text>
// //                 </Text>
// //                 <View style={styles.explanationContainer}>
// //                   <Text style={styles.explanationLabel}>Explanation</Text>
// //                   <Text style={styles.explanationText}>
// //                     {question.explanation}
// //                   </Text>
// //                 </View>
// //               </View>

// //               <View
// //                 style={[
// //                   styles.resultIndicator,
// //                   isCorrect ? styles.correctIndicator : styles.incorrectIndicator,
// //                 ]}
// //               >
// //                 <Text style={styles.resultIndicatorText}>
// //                   {isCorrect ? "Correct" : "Incorrect"}
// //                 </Text>
// //               </View>
// //             </View>
// //           </ScrollView>

// //           <TouchableOpacity
// //             style={styles.closeButton}
// //             onPress={onClose}
// //             activeOpacity={0.8}
// //           >
// //             <Text style={styles.closeButtonText}>Close</Text>
// //           </TouchableOpacity>
// //         </Animated.View>
// //       </View>
// //     </Modal>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   modalContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker, modern overlay
// //   },
// //   modalContent: {
// //     backgroundColor: "rgba(255, 255, 255, 0.95)", // Semi-transparent white for glassmorphism
// //     borderRadius: 20,
// //     width: "92%",
// //     maxHeight: "85%",
// //     padding: 24,
// //     borderWidth: 1,
// //     borderColor: "rgba(255, 255, 255, 0.2)", // Subtle border for glass effect
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 8,
// //     elevation: 10,
// //   },
// //   modalScrollContent: {
// //     flexGrow: 1,
// //     paddingBottom: 16,
// //   },
// //   modalTitle: {
// //     fontSize: 28,
// //     fontWeight: "800",
// //     color: "#1a1a1a",
// //     marginBottom: 24,
// //     textAlign: "center",
// //     letterSpacing: 0.5,
// //   },
// //   questionContainer: {
// //     padding: 20,
// //     backgroundColor: "#ffffff",
// //     borderRadius: 16,
// //     borderWidth: 1,
// //     borderColor: "#e6e6e6",
// //     marginBottom: 20,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   questionText: {
// //     fontSize: 20,
// //     fontWeight: "700",
// //     color: "#1a1a1a",
// //     marginBottom: 20,
// //     lineHeight: 28,
// //   },
// //   answerSection: {
// //     marginBottom: 20,
// //   },
// //   answerText: {
// //     fontSize: 16,
// //     color: "#666666",
// //     marginBottom: 12,
// //     fontWeight: "500",
// //   },
// //   answerHighlight: {
// //     fontWeight: "700",
// //     color: "#3478f6",
// //   },
// //   correctAnswerText: {
// //     fontSize: 16,
// //     color: "#666666",
// //     marginBottom: 16,
// //     fontWeight: "500",
// //   },
// //   correctAnswerHighlight: {
// //     fontWeight: "700",
// //     color: "#34c759",
// //   },
// //   explanationContainer: {
// //     backgroundColor: "rgba(245, 245, 245, 0.8)",
// //     padding: 16,
// //     borderRadius: 12,
// //     borderWidth: 1,
// //     borderColor: "#e6e6e6",
// //   },
// //   explanationLabel: {
// //     fontSize: 18,
// //     fontWeight: "700",
// //     color: "#1a1a1a",
// //     marginBottom: 8,
// //   },
// //   explanationText: {
// //     fontSize: 16,
// //     color: "#333333",
// //     fontWeight: "500",
// //     lineHeight: 24,
// //   },
// //   resultIndicator: {
// //     paddingVertical: 8,
// //     paddingHorizontal: 16,
// //     borderRadius: 20,
// //     alignSelf: "flex-start",
// //     backgroundColor: "transparent", // Gradient applied via style
// //   },
// //   correctIndicator: {
// //     backgroundColor: "#e4f8e9",
// //     borderColor: "#34c759",
// //     borderWidth: 1,
// //   },
// //   incorrectIndicator: {
// //     backgroundColor: "#ffebeb",
// //     borderColor: "#ff3b30",
// //     borderWidth: 1,
// //   },
// //   resultIndicatorText: {
// //     fontSize: 14,
// //     fontWeight: "700",
// //     color: "#1a1a1a",
// //   },
// //   closeButton: {
// //     paddingVertical: 16,
// //     backgroundColor: "#3478f6",
// //     borderRadius: 12,
// //     alignItems: "center",
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 4,
// //     elevation: 4,
// //     transform: [{ scale: 1 }],
// //   },
// //   closeButtonText: {
// //     fontSize: 18,
// //     fontWeight: "700",
// //     color: "#ffffff",
// //     letterSpacing: 0.5,
// //   },
// // });

// // export default QuestionModal;

// import React, { useEffect, useRef, useState } from "react";
// import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Animated, ActivityIndicator } from "react-native";
// import { useDispatch, useSelector } from 'react-redux';
// import { askAIAboutQuestion, clearQuizError } from '../../store/slices/quizSlice';

// const QuestionModal = ({ visible, question, userAnswer, onClose }) => {
//   const scaleAnim = useRef(new Animated.Value(0)).current;
//   const opacityAnim = useRef(new Animated.Value(0)).current;
//   const dispatch = useDispatch();
//   const { aiResponse, aiLoading, error } = useSelector((state) => state.quiz);
//   const [showAIResponse, setShowAIResponse] = useState(false);

//   useEffect(() => {
//     if (visible) {
//       Animated.parallel([
//         Animated.spring(scaleAnim, {
//           toValue: 1,
//           tension: 80,
//           friction: 10,
//           useNativeDriver: true,
//         }),
//         Animated.timing(opacityAnim, {
//           toValue: 1,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     } else {
//       Animated.parallel([
//         Animated.timing(scaleAnim, {
//           toValue: 0,
//           duration: 200,
//           useNativeDriver: true,
//         }),
//         Animated.timing(opacityAnim, {
//           toValue: 0,
//           duration: 200,
//           useNativeDriver: true,
//         }),
//       ]).start();
//       // Clear AI response and error when modal closes
//       setShowAIResponse(false);
//       dispatch(clearQuizError());
//     }
//   }, [visible, dispatch]);

//   const handleAskAI = () => {
//     if (question) {
//       dispatch(askAIAboutQuestion({
//         questionText: question.questionText,
//         options: question.options,
//         explanation: question.explanation,
//       }));
//       setShowAIResponse(true);
//     }
//   };

//   if (!question) return null;

//   const isCorrect = userAnswer === question.correctOption - 1;

//   return (
//     <Modal
//       animationType="none"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalContainer}>
//         <Animated.View
//           style={[
//             styles.modalContent,
//             {
//               transform: [{ scale: scaleAnim }],
//               opacity: opacityAnim,
//             },
//           ]}
//         >
//           <ScrollView contentContainerStyle={styles.modalScrollContent}>
//             <Text style={styles.modalTitle}>Question Details</Text>

//             <View style={styles.questionContainer}>
//               <Text style={styles.questionText}>{question.questionText}</Text>

//               <View style={styles.answerSection}>
//                 <Text style={styles.answerText}>
//                   Your answer:{" "}
//                   <Text style={styles.answerHighlight}>
//                     {userAnswer !== null && userAnswer !== undefined
//                       ? question.options[userAnswer]
//                       : "Not answered"}
//                   </Text>
//                 </Text>
//                 <Text style={styles.correctAnswerText}>
//                   Correct answer:{" "}
//                   <Text style={styles.correctAnswerHighlight}>
//                     {question.options[question.correctOption - 1]}
//                   </Text>
//                 </Text>
//                 <View style={styles.explanationContainer}>
//                   <Text style={styles.explanationLabel}>Explanation</Text>
//                   <Text style={styles.explanationText}>
//                     {question.explanation}
//                   </Text>
//                 </View>
//               </View>

//               <View
//                 style={[
//                   styles.resultIndicator,
//                   isCorrect ? styles.correctIndicator : styles.incorrectIndicator,
//                 ]}
//               >
//                 <Text style={styles.resultIndicatorText}>
//                   {isCorrect ? "Correct" : "Incorrect"}
//                 </Text>
//               </View>
//             </View>

//             {showAIResponse && (
//               <View style={styles.aiResponseContainer}>
//                 <Text style={styles.aiResponseLabel}>AI Clarification</Text>
//                 {aiLoading ? (
//                   <ActivityIndicator size="large" color="#3478f6" style={styles.aiLoading} />
//                 ) : error ? (
//                   <Text style={styles.aiErrorText}>Error: {error}</Text>
//                 ) : aiResponse ? (
//                   <Text style={styles.aiResponseText}>{aiResponse}</Text>
//                 ) : (
//                   <Text style={styles.aiResponseText}>No response yet.</Text>
//                 )}
//               </View>
//             )}
//           </ScrollView>

//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={onClose}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.askAIButton, aiLoading && styles.askAIButtonDisabled]}
//             onPress={handleAskAI}
//             activeOpacity={0.8}
//             disabled={aiLoading}
//           >
//             <Text style={styles.askAIButtonText}>Ask AI</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//   },
//   modalContent: {
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     borderRadius: 20,
//     width: "92%",
//     maxHeight: "85%",
//     padding: 24,
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.2)",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 10,
//   },
//   modalScrollContent: {
//     flexGrow: 1,
//     paddingBottom: 16,
//   },
//   modalTitle: {
//     fontSize: 28,
//     fontWeight: "800",
//     color: "#1a1a1a",
//     marginBottom: 24,
//     textAlign: "center",
//     letterSpacing: 0.5,
//   },
//   questionContainer: {
//     padding: 20,
//     backgroundColor: "#ffffff",
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: "#e6e6e6",
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   questionText: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#1a1a1a",
//     marginBottom: 20,
//     lineHeight: 28,
//   },
//   answerSection: {
//     marginBottom: 20,
//   },
//   answerText: {
//     fontSize: 16,
//     color: "#666666",
//     marginBottom: 12,
//     fontWeight: "500",
//   },
//   answerHighlight: {
//     fontWeight: "700",
//     color: "#3478f6",
//   },
//   correctAnswerText: {
//     fontSize: 16,
//     color: "#666666",
//     marginBottom: 16,
//     fontWeight: "500",
//   },
//   correctAnswerHighlight: {
//     fontWeight: "700",
//     color: "#34c759",
//   },
//   explanationContainer: {
//     backgroundColor: "rgba(245, 245, 245, 0.8)",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#e6e6e6",
//   },
//   explanationLabel: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#1a1a1a",
//     marginBottom: 8,
//   },
//   explanationText: {
//     fontSize: 16,
//     color: "#333333",
//     fontWeight: "500",
//     lineHeight: 24,
//   },
//   resultIndicator: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     alignSelf: "flex-start",
//     backgroundColor: "transparent",
//   },
//   correctIndicator: {
//     backgroundColor: "#e4f8e9",
//     borderColor: "#34c759",
//     borderWidth: 1,
//   },
//   incorrectIndicator: {
//     backgroundColor: "#ffebeb",
//     borderColor: "#ff3b30",
//     borderWidth: 1,
//   },
//   resultIndicatorText: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#1a1a1a",
//   },
//   closeButton: {
//     paddingVertical: 16,
//     backgroundColor: "#3478f6",
//     borderRadius: 12,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//     transform: [{ scale: 1 }],
//     marginBottom: 12, // Add spacing for the new button
//   },
//   closeButtonText: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#ffffff",
//     letterSpacing: 0.5,
//   },
//   askAIButton: {
//     paddingVertical: 16,
//     backgroundColor: "#6200ee", // Distinct purple color for AI button
//     borderRadius: 12,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   askAIButtonDisabled: {
//     backgroundColor: "#b0b0b0",
//     opacity: 0.6,
//   },
//   askAIButtonText: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#ffffff",
//     letterSpacing: 0.5,
//   },
//   aiResponseContainer: {
//     backgroundColor: "rgba(245, 245, 245, 0.8)",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#e6e6e6",
//     marginBottom: 20,
//   },
//   aiResponseLabel: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#1a1a1a",
//     marginBottom: 8,
//   },
//   aiResponseText: {
//     fontSize: 16,
//     color: "#333333",
//     fontWeight: "500",
//     lineHeight: 24,
//   },
//   aiErrorText: {
//     fontSize: 16,
//     color: "#ff3b30",
//     fontWeight: "500",
//     lineHeight: 24,
//   },
//   aiLoading: {
//     marginVertical: 16,
//   },
// });

// export default QuestionModal;

import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Animated, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { askAIAboutQuestion, clearQuizError } from '../../store/slices/quizSlice';
import Icon from 'react-native-vector-icons/Feather'; // Make sure to install this

const QuestionModal = ({ visible, question, userAnswer, onClose }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const { aiResponse, aiLoading, error } = useSelector((state) => state.quiz);
  const [showAIResponse, setShowAIResponse] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 80,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      // Clear AI response and error when modal closes
      setShowAIResponse(false);
      dispatch(clearQuizError());
    }
  }, [visible, dispatch]);

  const handleAskAI = () => {
    if (question) {
      dispatch(askAIAboutQuestion({
        questionText: question.questionText,
        options: question.options,
        explanation: question.explanation,
      }));
      setShowAIResponse(true);
    }
  };

  if (!question) return null;

  const isCorrect = userAnswer === question.correctOption - 1;

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          {/* Modal Header with Close Button */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Question Review</Text>
            <TouchableOpacity
              style={styles.headerCloseButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Icon name="x" size={24} color="#666666" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            contentContainerStyle={styles.modalScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{question.questionText}</Text>

              <View style={styles.answerSection}>
                <View style={styles.answerItem}>
                  <View style={styles.answerLabel}>
                    <Icon name="user" size={16} color="#666666" />
                    <Text style={styles.answerLabelText}>Your Answer</Text>
                  </View>
                  <Text style={[
                    styles.answerValue,
                    isCorrect ? styles.correctAnswer : styles.incorrectAnswer
                  ]}>
                    {userAnswer !== null && userAnswer !== undefined
                      ? question.options[userAnswer]
                      : "Not answered"}
                  </Text>
                </View>

                <View style={styles.answerItem}>
                  <View style={styles.answerLabel}>
                    <Icon name="check-circle" size={16} color="#34c759" />
                    <Text style={styles.answerLabelText}>Correct Answer</Text>
                  </View>
                  <Text style={styles.correctAnswerValue}>
                    {question.options[question.correctOption - 1]}
                  </Text>
                </View>

                <View style={styles.explanationContainer}>
                  <View style={styles.explanationHeader}>
                    <Icon name="info" size={18} color="#3478f6" />
                    <Text style={styles.explanationLabel}>Explanation</Text>
                  </View>
                  <Text style={styles.explanationText}>
                    {question.explanation}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.resultBadge,
                  isCorrect ? styles.correctBadge : styles.incorrectBadge,
                ]}
              >
                <Icon 
                  name={isCorrect ? "check" : "x"} 
                  size={16} 
                  color={isCorrect ? "#34c759" : "#ff3b30"} 
                />
                <Text style={[
                  styles.resultBadgeText,
                  isCorrect ? styles.correctBadgeText : styles.incorrectBadgeText
                ]}>
                  {isCorrect ? "Correct" : "Incorrect"}
                </Text>
              </View>
            </View>

            {showAIResponse && (
              <View style={styles.aiResponseContainer}>
                <View style={styles.aiResponseHeader}>
                  <Icon name="cpu" size={18} color="#6200ee" />
                  <Text style={styles.aiResponseLabel}>AI Assistant</Text>
                </View>
                {aiLoading ? (
                  <View style={styles.aiLoadingContainer}>
                    <ActivityIndicator size="small" color="#6200ee" />
                    <Text style={styles.aiLoadingText}>Thinking...</Text>
                  </View>
                ) : error ? (
                  <View style={styles.aiErrorContainer}>
                    <Icon name="alert-circle" size={16} color="#ff3b30" />
                    <Text style={styles.aiErrorText}>{error}</Text>
                  </View>
                ) : aiResponse ? (
                  <Text style={styles.aiResponseText}>{aiResponse}</Text>
                ) : (
                  <Text style={styles.aiResponseText}>No response yet.</Text>
                )}
              </View>
            )}
          </ScrollView>

          {/* Modern Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.aiButton, aiLoading && styles.aiButtonDisabled]}
              onPress={handleAskAI}
              activeOpacity={0.8}
              disabled={aiLoading}
            >
              <View style={styles.buttonContent}>
                {aiLoading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Icon name="cpu" size={18} color="#ffffff" />
                )}
                <Text style={styles.actionButtonText}>
                  {aiLoading ? "Processing..." : "Ask AI"}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.closeButtonModern]}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <Icon name="arrow-left" size={18} color="#3478f6" />
                <Text style={styles.closeButtonModernText}>Done</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 16,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    width: "100%",
    maxWidth: 420,
    maxHeight: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 15,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    flex: 1,
  },
  headerCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
  },
  modalScrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  questionContainer: {
    backgroundColor: "#fafafa",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 24,
    lineHeight: 26,
  },
  answerSection: {
    marginBottom: 20,
  },
  answerItem: {
    marginBottom: 16,
  },
  answerLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  answerLabelText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
    marginLeft: 6,
  },
  answerValue: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
  },
  correctAnswer: {
    borderColor: "#34c759",
    backgroundColor: "#f0fff4",
    color: "#1a6b2e",
  },
  incorrectAnswer: {
    borderColor: "#ff3b30",
    backgroundColor: "#fff0f0",
    color: "#b71c1c",
  },
  correctAnswerValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#34c759",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f0fff4",
    borderWidth: 1,
    borderColor: "#34c759",
  },
  explanationContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    marginTop: 8,
  },
  explanationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  explanationLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginLeft: 6,
  },
  explanationText: {
    fontSize: 15,
    color: "#333333",
    lineHeight: 22,
  },
  resultBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  correctBadge: {
    backgroundColor: "#f0fff4",
    borderColor: "#34c759",
  },
  incorrectBadge: {
    backgroundColor: "#fff0f0",
    borderColor: "#ff3b30",
  },
  resultBadgeText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  correctBadgeText: {
    color: "#34c759",
  },
  incorrectBadgeText: {
    color: "#ff3b30",
  },
  aiResponseContainer: {
    backgroundColor: "#f8f7ff",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e8e4ff",
  },
  aiResponseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  aiResponseLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6200ee",
    marginLeft: 6,
  },
  aiLoadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  aiLoadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#6200ee",
    fontWeight: "500",
  },
  aiErrorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  aiErrorText: {
    fontSize: 14,
    color: "#ff3b30",
    marginLeft: 6,
    flex: 1,
  },
  aiResponseText: {
    fontSize: 15,
    color: "#333333",
    lineHeight: 22,
  },
  actionContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  aiButton: {
    backgroundColor: "#6200ee",
  },
  aiButtonDisabled: {
    backgroundColor: "#b0b0b0",
    opacity: 0.7,
  },
  closeButtonModern: {
    backgroundColor: "#f0f4ff",
    borderWidth: 1,
    borderColor: "#3478f6",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginLeft: 6,
  },
  closeButtonModernText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3478f6",
    marginLeft: 6,
  },
});

export default QuestionModal;