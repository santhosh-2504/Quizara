import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
  BackHandler,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllQuizzes, fetchUserQuizzes } from "../store/slices/quizSlice";
import { updateQuizScore } from "../store/slices/userSlice";

// Import modular components
import LoadingScreen from "../component/quiz/LoadingScreen";
import QuizHeader from "../component/quiz/QuizHeader";
import QuizSidebar from "../component/quiz/QuizSidebar";
import QuizContent from "../component/quiz/QuizContent";
import QuizNavigation from "../component/quiz/QuizNavigation";
import QuizResults from "../component/quiz/QuizResults";

const QuizTakingScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { quizId } = route.params;
  const { quizzes, userQuizzes, loading } = useSelector((state) => state.quiz);
  const { updatingScore } = useSelector((state) => state.user);

  // State management
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showingResults, setShowingResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [questionStatuses, setQuestionStatuses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const timerRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (!currentQuiz || showingResults) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerRef.current);
          if (currentQuiz) {
            evaluateQuiz();
          } else {
            Alert.alert(
              "Error",
              "Quiz data is not available. Please try again.",
              [{ text: "OK", onPress: () => navigation.goBack() }]
            );
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [currentQuiz, showingResults]);

  // Handle back button press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (!showingResults) {
          Alert.alert(
            "Exit Quiz?",
            "Are you sure you want to exit? This will submit your current answers.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Exit", onPress: handleSubmitQuiz },
            ]
          );
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [selectedAnswers, currentQuiz, showingResults]);

  // Fetch quiz data
  useEffect(() => {
    if (!quizzes.length && !userQuizzes.length) {
      dispatch(fetchAllQuizzes());
      dispatch(fetchUserQuizzes());
    }
  }, [dispatch, quizzes.length, userQuizzes.length]);

  // Set current quiz
  useEffect(() => {
    const quiz = [...quizzes, ...userQuizzes].find((q) => q._id === quizId);
    if (quiz) {
      if (!quiz.questions || !Array.isArray(quiz.questions)) {
        Alert.alert(
          "Error",
          "Invalid quiz data. Please try again.",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
        return;
      }
      setCurrentQuiz(quiz);
      setSelectedAnswers(new Array(quiz.questions.length).fill(null));
      const initialStatuses = new Array(quiz.questions.length).fill("not-visited");
      initialStatuses[0] = "visited";
      setQuestionStatuses(initialStatuses);
    } else if (quizzes.length || userQuizzes.length) {
      Alert.alert(
        "Error",
        "Quiz not found. Please try again.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }
  }, [quizId, quizzes, userQuizzes]);

  // Update question status on navigation
  useEffect(() => {
    if (!currentQuiz || !questionStatuses.length) return;

    const newStatuses = [...questionStatuses];
    if (newStatuses[currentQuestionIndex] === "not-visited") {
      newStatuses[currentQuestionIndex] = "visited";
      setQuestionStatuses(newStatuses);
    }
  }, [currentQuestionIndex]);

  // Helper functions
  const evaluateQuiz = async () => {
    if (!currentQuiz) {
      Alert.alert(
        "Error",
        "Quiz data is not available. Please try again.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
      return;
    }

    setSubmittedAnswers([...selectedAnswers]);

    let correctAnswers = 0;
    currentQuiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctOption - 1) {
        correctAnswers++;
      }
    });

    const calculatedScore = (correctAnswers / currentQuiz.questions.length) * 100;
    setScore(calculatedScore);
    setShowingResults(true);
    clearInterval(timerRef.current);

    try {
      await dispatch(updateQuizScore({
        quizId: currentQuiz._id,
        score: calculatedScore
      })).unwrap();
    } catch (error) {
      console.error('Failed to update quiz score:', error);
    }
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswers.includes(null)) {
      const unansweredCount = selectedAnswers.filter(
        (answer) => answer === null
      ).length;
      Alert.alert(
        "Unanswered Questions",
        `You have ${unansweredCount} unanswered question${
          unansweredCount > 1 ? "s" : ""
        }. Do you want to submit anyway?`,
        [
          { text: "Continue Quiz", style: "cancel" },
          { text: "Submit Anyway", onPress: evaluateQuiz },
        ]
      );
    } else {
      evaluateQuiz();
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers(new Array(currentQuiz.questions.length).fill(null));
    setSubmittedAnswers([]);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setShowingResults(false);
    setScore(0);
    setTimeLeft(600);
    const initialStatuses = new Array(currentQuiz.questions.length).fill("not-visited");
    initialStatuses[0] = "visited";
    setQuestionStatuses(initialStatuses);
  };

  const handleFinishQuiz = () => {
    navigation.goBack();
  };

  // Event handlers
  const handleSelectOption = (optionIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);

    const newStatuses = [...questionStatuses];
    if (newStatuses[currentQuestionIndex] === "marked") {
      newStatuses[currentQuestionIndex] = "answered-and-marked";
    } else if (newStatuses[currentQuestionIndex] !== "answered-and-marked") {
      newStatuses[currentQuestionIndex] = "answered";
    }
    setQuestionStatuses(newStatuses);
  };

  const handleClearResponse = () => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = null;
    setSelectedAnswers(newSelectedAnswers);

    const newStatuses = [...questionStatuses];
    if (newStatuses[currentQuestionIndex] === "answered-and-marked") {
      newStatuses[currentQuestionIndex] = "marked";
    } else if (newStatuses[currentQuestionIndex] === "answered") {
      newStatuses[currentQuestionIndex] = "visited";
    }
    setQuestionStatuses(newStatuses);
  };

  const handleMarkForReview = () => {
    const newStatuses = [...questionStatuses];
    const currentStatus = newStatuses[currentQuestionIndex];

    if (currentStatus === "marked") {
      newStatuses[currentQuestionIndex] = selectedAnswers[currentQuestionIndex] !== null ? "answered" : "visited";
    } else if (currentStatus === "answered-and-marked") {
      newStatuses[currentQuestionIndex] = "answered";
    } else if (currentStatus === "answered") {
      newStatuses[currentQuestionIndex] = "answered-and-marked";
    } else {
      newStatuses[currentQuestionIndex] = "marked";
    }
    setQuestionStatuses(newStatuses);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
      Alert.alert(
        "Submit Quiz?",
        "You've reached the end of the quiz. Do you want to submit your answers?",
        [
          { text: "Review Answers", style: "cancel" },
          { text: "Submit", onPress: handleSubmitQuiz },
        ]
      );
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const navigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setSidebarOpen(false);
  };

  const getProgressPercentage = () => {
    if (!currentQuiz) return 0;
    const answeredCount = selectedAnswers.filter((answer) => answer !== null).length;
    return (answeredCount / currentQuiz.questions.length) * 100;
  };

  // Loading screen
  if (loading || !currentQuiz || updatingScore) {
    return (
      <LoadingScreen 
        text={updatingScore ? 'Saving quiz score...' : 'Loading quiz...'}
      />
    );
  }

  // Results screen
  if (showingResults) {
    return (
      <QuizResults
        quiz={currentQuiz}
        score={score}
        submittedAnswers={submittedAnswers}
        onRetakeQuiz={handleRetakeQuiz}
        onFinishQuiz={handleFinishQuiz}
      />
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
      <QuizHeader
        quizTopic={currentQuiz.topic}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={currentQuiz.questions.length}
        progressPercentage={getProgressPercentage()}
        timeLeft={timeLeft}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <QuizContent
        question={currentQuestion}
        selectedAnswer={selectedAnswers[currentQuestionIndex]}
        questionStatus={questionStatuses[currentQuestionIndex]}
        onSelectOption={handleSelectOption}
        onClearResponse={handleClearResponse}
        onMarkForReview={handleMarkForReview}
      />

      <QuizNavigation
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={currentQuiz.questions.length}
        onPreviousQuestion={handlePreviousQuestion}
        onNextQuestion={handleNextQuestion}
      />

      <QuizSidebar
        isOpen={sidebarOpen}
        timeLeft={timeLeft}
        questionStatuses={questionStatuses}
        currentQuestionIndex={currentQuestionIndex}
        onClose={() => setSidebarOpen(false)}
        onNavigateToQuestion={navigateToQuestion}
        onSubmitQuiz={handleSubmitQuiz}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: "#ffffff",
  },
});

export default QuizTakingScreen;