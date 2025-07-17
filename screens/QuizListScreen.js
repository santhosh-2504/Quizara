// import React, { useEffect, useState, useCallback, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl,
//   SafeAreaView,
//   TextInput,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Platform,
//   Alert,
// } from "react-native";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchAllQuizzes, fetchQuizTitles } from "../store/slices/quizSlice";
// import { fuzzySearchWithScoring } from "../utils/fuzzySearch";

// const QuizListScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { 
//     quizzes, 
//     quizTitles,
//     loading, 
//     titlesLoading,
//     error 
//   } = useSelector((state) => state.quiz);
//   const { isAuthenticated, user } = useSelector((state) => state.user);
  
//   // States for search and pagination
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
//   const [displayedQuizzes, setDisplayedQuizzes] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const ITEMS_PER_PAGE = 10;
  
//   const searchInputRef = useRef(null);

//   // Load data on component mount
//   useEffect(() => {
//     loadQuizzes();
//     dispatch(fetchQuizTitles());
//   }, [dispatch]);

//   // Filter quizzes based on search text
//   useEffect(() => {
//     if (quizzes.length) {
//       filterAndPaginateQuizzes();
//     }
//   }, [quizzes, searchText, page]);

//   // Update suggestions when search text changes
//   useEffect(() => {
//     if (searchText.trim() === "") {
//       setFilteredSuggestions([]);
//       return;
//     }
    
//     const suggestions = fuzzySearchWithScoring(quizTitles, searchText);
//     setFilteredSuggestions(suggestions.slice(0, 5));
//     setShowSuggestions(suggestions.length > 0);
//   }, [searchText, quizTitles]);

//   const loadQuizzes = () => {
//     dispatch(fetchAllQuizzes());
//     setPage(1);
//     setHasMore(true);
//   };

//   const filterAndPaginateQuizzes = () => {
//     let filtered = quizzes;
    
//     if (searchText.trim() !== "") {
//       filtered = fuzzySearchWithScoring(quizzes, searchText);
//     }
    
//     setHasMore(filtered.length > page * ITEMS_PER_PAGE);
//     setDisplayedQuizzes(filtered.slice(0, page * ITEMS_PER_PAGE));
//   };

//   const handleRefresh = useCallback(() => {
//     setRefreshing(true);
//     setSearchText("");
//     loadQuizzes();
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1000);
//   }, []);

//   // Get previous score for a quiz
//   const getPreviousScore = (quizId) => {
//     if (!isAuthenticated || !user || !user.quizAttempts) {
//       return null;
//     }
    
//     const attempt = user.quizAttempts.find(attempt => attempt.quiz === quizId);
//     return attempt ? attempt.score : null;
//   };

//   const handleTakeQuiz = (quiz) => {
//     if (!isAuthenticated) {
//       Alert.alert(
//         "Login Required",
//         "You need to log in to take quizzes. Would you like to go to the login screen?",
//         [
//           {
//             text: "Cancel",
//             style: "cancel",
//           },
//           {
//             text: "Login",
//             onPress: () => navigation.navigate("Login"),
//           },
//         ]
//       );
//       return;
//     }
    
//     // Show confirmation alert for authenticated users
//     const previousScore = getPreviousScore(quiz._id);
//     const scoreText = previousScore !== null ? `\n\nYour previous score: ${previousScore}%` : "";
    
//     Alert.alert(
//       "Start Quiz",
//       `Are you ready to take the quiz on "${quiz.topic}"?${scoreText}`,
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Start Quiz",
//           onPress: () => navigation.navigate("QuizTaking", { quizId: quiz._id }),
//         },
//       ]
//     );
//   };

//   const handleCreateQuiz = () => {
//     navigation.navigate("CreateTab");
//   };

//   const handleSearch = (text) => {
//     setSearchText(text);
//     setPage(1);
//     setShowSuggestions(text.trim() !== "");
//   };

//   const handleSelectSuggestion = (suggestion) => {
//     setSearchText(suggestion.topic);
//     setShowSuggestions(false);
//     Keyboard.dismiss();
//     const matchingQuizzes = quizzes.filter(quiz => 
//       quiz.topic.toLowerCase() === suggestion.topic.toLowerCase()
//     );
//     setDisplayedQuizzes(matchingQuizzes);
//     setHasMore(false);
//   };

//   const handleClearSearch = () => {
//     setSearchText("");
//     setShowSuggestions(false);
//     setPage(1);
//     setDisplayedQuizzes(quizzes.slice(0, ITEMS_PER_PAGE));
//     setHasMore(quizzes.length > ITEMS_PER_PAGE);
//   };

//   const handleLoadMore = useCallback(() => {
//     if (!hasMore || loadingMore) return;
    
//     setLoadingMore(true);
//     setTimeout(() => {
//       setPage(prevPage => prevPage + 1);
//       setLoadingMore(false);
//     }, 500);
//   }, [hasMore, loadingMore, page]);

//   const renderQuizItem = ({ item }) => {
//     const previousScore = getPreviousScore(item._id);
    
//     return (
//       <TouchableOpacity
//         style={[
//           styles.quizItem,
//           !isAuthenticated && styles.quizItemDisabled
//         ]}
//         onPress={() => handleTakeQuiz(item)}
//         activeOpacity={0.7}
//       >
//         <View style={styles.quizContent}>
//           <Text style={styles.quizTopic} numberOfLines={2}>
//             {item.topic}
//           </Text>
//           <View style={styles.quizInfo}>
//             <Text style={styles.quizLevel}>
//               {item.level.charAt(0).toUpperCase() + item.level.slice(1)}
//             </Text>
//             <Text style={styles.quizQuestions}>
//               {item.questions.length} Qs
//             </Text>
//             {isAuthenticated && previousScore !== null && (
//               <Text style={styles.previousScore}>
//                 Previous: {previousScore}%
//               </Text>
//             )}
//           </View>
//           {!isAuthenticated && (
//             <Text style={styles.loginRequired}>Login required to take quiz</Text>
//           )}
//         </View>
//         {!isAuthenticated && (
//           <View style={styles.lockIconContainer}>
//             <Text style={styles.lockIcon}>🔒</Text>
//           </View>
//         )}
//       </TouchableOpacity>
//     );
//   };

//   const renderSuggestionItem = ({ item }) => {
//     return (
//       <TouchableOpacity
//         style={styles.suggestionItem}
//         onPress={() => handleSelectSuggestion(item)}
//         activeOpacity={0.7}
//       >
//         <Text style={styles.suggestionText} numberOfLines={1}>
//           {item.topic}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderFooter = () => {
//     if (!loadingMore) return null;
    
//     return (
//       <View style={styles.loadingFooter}>
//         <ActivityIndicator size="small" color="#2563eb" />
//         <Text style={styles.loadingMoreText}>Loading more...</Text>
//       </View>
//     );
//   };

//   const renderEmptyList = () => {
//     if (loading) return null;

//     return (
//       <View style={styles.emptyContainer}>
//         <Text style={styles.emptyText}>
//           {searchText ? "No matching quizzes found" : "No quizzes available"}
//         </Text>
//         <TouchableOpacity
//           style={styles.retryButton}
//           onPress={handleRefresh}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.retryButtonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <TouchableWithoutFeedback onPress={() => {
//       Keyboard.dismiss();
//       setShowSuggestions(false);
//     }}>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.headerContainer}>
//           <Text style={styles.headerTitle}>Discover Quizzes</Text>
          
//           {isAuthenticated && (
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={handleCreateQuiz}
//               activeOpacity={0.7}
//             >
//               <Text style={styles.addButtonText}>+ Create</Text>
//             </TouchableOpacity>
//           )}
//         </View>

//         <View style={styles.searchContainer}>
//           <View style={styles.searchInputContainer}>
//             <TextInput
//               ref={searchInputRef}
//               style={styles.searchInput}
//               placeholder="Search quizzes..."
//               placeholderTextColor="#94a3b8"
//               value={searchText}
//               onChangeText={handleSearch}
//               onFocus={() => {
//                 if (searchText.trim() !== "" && quizTitles.length > 0) {
//                   setShowSuggestions(true);
//                 }
//               }}
//             />
//             {searchText ? (
//               <TouchableOpacity
//                 style={styles.clearButton}
//                 onPress={handleClearSearch}
//                 activeOpacity={0.7}
//               >
//                 <Text style={styles.clearButtonText}>✕</Text>
//               </TouchableOpacity>
//             ) : null}
//           </View>
          
//           {showSuggestions && (
//             <View style={styles.suggestionsContainer}>
//               {titlesLoading ? (
//                 <ActivityIndicator size="small" color="#2563eb" style={styles.suggestionLoading} />
//               ) : (
//                 <FlatList
//                   data={filteredSuggestions}
//                   renderItem={renderSuggestionItem}
//                   keyExtractor={(item) => item._id}
//                   keyboardShouldPersistTaps="handled"
//                   ListEmptyComponent={
//                     <Text style={styles.noSuggestionsText}>No matching topics</Text>
//                   }
//                 />
//               )}
//             </View>
//           )}
//         </View>

//         {error && (
//           <View style={styles.errorContainer}>
//             <Text style={styles.errorText}>{error}</Text>
//             <TouchableOpacity
//               style={styles.retryButton}
//               onPress={handleRefresh}
//               activeOpacity={0.7}
//             >
//               <Text style={styles.retryButtonText}>Try Again</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {loading && displayedQuizzes.length === 0 ? (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#2563eb" />
//             <Text style={styles.loadingText}>Loading quizzes...</Text>
//           </View>
//         ) : (
//           <FlatList
//             data={displayedQuizzes}
//             renderItem={renderQuizItem}
//             keyExtractor={(item) => item._id}
//             contentContainerStyle={styles.listContainer}
//             ListEmptyComponent={renderEmptyList}
//             ListFooterComponent={renderFooter}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={handleRefresh}
//                 colors={["#2563eb"]}
//                 tintColor="#2563eb"
//                 progressBackgroundColor="#ffffff"
//               />
//             }
//             onEndReached={handleLoadMore}
//             onEndReachedThreshold={0.3}
//           />
//         )}
//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//   },
//   headerContainer: {
//     marginTop: 25,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: "#ffffff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e2e8f0",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//     }),
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#1e293b",
//     letterSpacing: -0.5,
//   },
//   addButton: {
//     backgroundColor: "#2563eb",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   addButtonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   searchContainer: {
//     padding: 16,
//     backgroundColor: "#ffffff",
//   },
//   searchInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f1f5f9",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: "#e2e8f0",
//   },
//   searchInput: {
//     flex: 1,
//     height: 48,
//     fontSize: 16,
//     color: "#1e293b",
//     fontWeight: "500",
//   },
//   clearButton: {
//     padding: 8,
//   },
//   clearButtonText: {
//     fontSize: 18,
//     color: "#64748b",
//     fontWeight: "600",
//   },
//   suggestionsContainer: {
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     marginTop: 8,
//     borderWidth: 1,
//     borderColor: "#e2e8f0",
//     maxHeight: 240,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   suggestionItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f1f5f9",
//   },
//   suggestionText: {
//     fontSize: 16,
//     color: "#1e293b",
//     fontWeight: "500",
//   },
//   suggestionLoading: {
//     padding: 16,
//   },
//   noSuggestionsText: {
//     padding: 16,
//     color: "#64748b",
//     textAlign: "center",
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   errorContainer: {
//     padding: 16,
//     backgroundColor: "#fef2f2",
//     marginHorizontal: 16,
//     marginVertical: 8,
//     borderRadius: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   errorText: {
//     color: "#dc2626",
//     fontSize: 14,
//     fontWeight: "500",
//     flex: 1,
//   },
//   retryButton: {
//     backgroundColor: "#2563eb",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: "#ffffff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: {
//     marginTop: 12,
//     fontSize: 16,
//     color: "#64748b",
//     fontWeight: "500",
//   },
//   listContainer: {
//     flexGrow: 1,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   quizItem: {
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     padding: 16,
//     marginVertical: 8,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   quizItemDisabled: {
//     backgroundColor: "#f8fafc",
//     opacity: 0.7,
//   },
//   quizContent: {
//     flex: 1,
//   },
//   quizTopic: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1e293b",
//     marginBottom: 8,
//   },
//   quizInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     flexWrap: "wrap",
//   },
//   quizLevel: {
//     fontSize: 14,
//     color: "#64748b",
//     fontWeight: "500",
//     marginRight: 16,
//     backgroundColor: "#f1f5f9",
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 6,
//   },
//   quizQuestions: {
//     fontSize: 14,
//     color: "#64748b",
//     fontWeight: "500",
//     marginRight: 16,
//   },
//   previousScore: {
//     fontSize: 14,
//     color: "#059669",
//     fontWeight: "600",
//     backgroundColor: "#dcfce7",
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 6,
//   },
//   loginRequired: {
//     fontSize: 12,
//     color: "#dc2626",
//     fontWeight: "500",
//     marginTop: 4,
//     fontStyle: "italic",
//   },
//   lockIconContainer: {
//     marginLeft: 16,
//   },
//   lockIcon: {
//     fontSize: 20,
//     color: "#64748b",
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 48,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: "#64748b",
//     textAlign: "center",
//     marginBottom: 16,
//     fontWeight: "500",
//   },
//   loadingFooter: {
//     paddingVertical: 16,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingMoreText: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: "#64748b",
//     fontWeight: "500",
//   },
// });

// export default QuizListScreen;

import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Alert,
  Animated,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllQuizzes, fetchQuizTitles } from '../store/slices/quizSlice';
import { fuzzySearchWithScoring } from '../utils/fuzzySearch';
import Icon from 'react-native-vector-icons/Feather';

const QuizListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    quizzes,
    quizTitles,
    loading,
    titlesLoading,
    error,
  } = useSelector((state) => state.quiz);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // States for search and pagination
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [displayedQuizzes, setDisplayedQuizzes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const ITEMS_PER_PAGE = 10;

  const searchInputRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animation effect
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  // Load data on component mount
  useEffect(() => {
    loadQuizzes();
    dispatch(fetchQuizTitles());
  }, [dispatch]);

  // Filter quizzes based on search text
  useEffect(() => {
    if (quizzes.length) {
      filterAndPaginateQuizzes();
    }
  }, [quizzes, searchText, page]);

  // Update suggestions when search text changes
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredSuggestions([]);
      return;
    }

    const suggestions = fuzzySearchWithScoring(quizTitles, searchText);
    setFilteredSuggestions(suggestions.slice(0, 5));
    setShowSuggestions(suggestions.length > 0);
  }, [searchText, quizTitles]);

  const loadQuizzes = () => {
    dispatch(fetchAllQuizzes());
    setPage(1);
    setHasMore(true);
  };

  const filterAndPaginateQuizzes = () => {
    let filtered = quizzes;

    if (searchText.trim() !== '') {
      filtered = fuzzySearchWithScoring(quizzes, searchText);
    }

    setHasMore(filtered.length > page * ITEMS_PER_PAGE);
    setDisplayedQuizzes(filtered.slice(0, page * ITEMS_PER_PAGE));
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setSearchText('');
    loadQuizzes();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Get previous score for a quiz
  const getPreviousScore = (quizId) => {
    if (!isAuthenticated || !user || !user.quizAttempts) {
      return null;
    }

    const attempt = user.quizAttempts.find((attempt) => attempt.quiz === quizId);
    return attempt ? attempt.score : null;
  };

  const handleTakeQuiz = (quiz) => {
    if (!isAuthenticated) {
      Alert.alert(
        'Login Required',
        'You need to log in to take quizzes. Would you like to go to the login screen?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Login',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
      return;
    }

    const previousScore = getPreviousScore(quiz._id);
    const scoreText = previousScore !== null ? `\n\nYour previous score: ${previousScore}%` : '';

    Alert.alert(
      'Start Quiz',
      `Are you ready to take the quiz on "${quiz.topic}"?${scoreText}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Start Quiz',
          onPress: () => navigation.navigate('QuizTaking', { quizId: quiz._id }),
        },
      ]
    );
  };

  const handleCreateQuiz = () => {
    navigation.navigate('CreateTab');
  };

  const handleSearch = (text) => {
    setSearchText(text);
    setPage(1);
    setShowSuggestions(text.trim() !== '');
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchText(suggestion.topic);
    setShowSuggestions(false);
    Keyboard.dismiss();
    const matchingQuizzes = quizzes.filter(
      (quiz) => quiz.topic.toLowerCase() === suggestion.topic.toLowerCase()
    );
    setDisplayedQuizzes(matchingQuizzes);
    setHasMore(false);
  };

  const handleClearSearch = () => {
    setSearchText('');
    setShowSuggestions(false);
    setPage(1);
    setDisplayedQuizzes(quizzes.slice(0, ITEMS_PER_PAGE));
    setHasMore(quizzes.length > ITEMS_PER_PAGE);
  };

  const handleLoadMore = useCallback(() => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
      setLoadingMore(false);
    }, 500);
  }, [hasMore, loadingMore, page]);

  const renderQuizItem = ({ item }) => {
    const previousScore = getPreviousScore(item._id);

    return (
      <TouchableOpacity
        style={[styles.quizItem, !isAuthenticated && styles.quizItemDisabled]}
        onPress={() => handleTakeQuiz(item)}
        activeOpacity={0.7}
      >
        <View style={styles.quizContent}>
          <Text style={styles.quizTopic} numberOfLines={2}>
            {item.topic}
          </Text>
          <View style={styles.quizInfo}>
            <Text style={styles.quizLevel}>
              {item.level.charAt(0).toUpperCase() + item.level.slice(1)}
            </Text>
            <Text style={styles.quizQuestions}>{item.questions.length} Qs</Text>
            {isAuthenticated && previousScore !== null && (
              <Text style={styles.previousScore}>Previous: {previousScore}%</Text>
            )}
          </View>
        </View>
        {!isAuthenticated && (
          <View style={styles.lockIconContainer}>
            <Icon name="lock" size={20} color="#64748b" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderSuggestionItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.suggestionItem}
        onPress={() => handleSelectSuggestion(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.suggestionText} numberOfLines={1}>
          {item.topic}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#2563eb" />
        <Text style={styles.loadingMoreText}>Loading more...</Text>
      </View>
    );
  };

  const renderEmptyList = () => {
    if (loading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {searchText ? 'No matching quizzes found' : 'No quizzes available'}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh} activeOpacity={0.7}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setShowSuggestions(false);
      }}
    >
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.innerContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Discover Quizzes</Text>
            {isAuthenticated && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleCreateQuiz}
                activeOpacity={0.7}
              >
                <Icon name="plus" size={20} color="#ffffff" style={styles.addButtonIcon} />
                <Text style={styles.addButtonText}>Create</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Icon name="search" size={20} color="#9ca3af" style={styles.inputIcon} />
              <TextInput
                ref={searchInputRef}
                style={styles.searchInput}
                placeholder="Search quizzes..."
                placeholderTextColor="#9ca3af"
                value={searchText}
                onChangeText={handleSearch}
                onFocus={() => {
                  if (searchText.trim() !== '' && quizTitles.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
              />
              {searchText ? (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={handleClearSearch}
                  activeOpacity={0.7}
                >
                  <Icon name="x" size={20} color="#6b7280" />
                </TouchableOpacity>
              ) : null}
            </View>

            {showSuggestions && (
              <View style={styles.suggestionsContainer}>
                {titlesLoading ? (
                  <ActivityIndicator
                    size="small"
                    color="#2563eb"
                    style={styles.suggestionLoading}
                  />
                ) : (
                  <FlatList
                    data={filteredSuggestions}
                    renderItem={renderSuggestionItem}
                    keyExtractor={(item) => item._id}
                    keyboardShouldPersistTaps="handled"
                    ListEmptyComponent={
                      <Text style={styles.noSuggestionsText}>No matching topics</Text>
                    }
                  />
                )}
              </View>
            )}
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={handleRefresh}
                activeOpacity={0.7}
              >
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}

          {loading && displayedQuizzes.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2563eb" />
              <Text style={styles.loadingText}>Loading quizzes...</Text>
            </View>
          ) : (
            <FlatList
              data={displayedQuizzes}
              renderItem={renderQuizItem}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.listContainer}
              ListEmptyComponent={renderEmptyList}
              ListFooterComponent={renderFooter}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={['#2563eb']}
                  tintColor="#2563eb"
                  progressBackgroundColor="#ffffff"
                />
              }
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.3}
            />
          )}
        </Animated.View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  headerContainer: {
    marginTop : 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  headerIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#2563eb',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: -0.5,
  },
  addButton: {
    backgroundColor: '#2563eb',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  addButtonIcon: {
    marginRight: 6,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    padding: 15,
  },
  searchInput: {
    flex: 1,
    height: 54,
    fontSize: 16,
    color: '#1f2937',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 15,
  },
  suggestionsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 8,
    maxHeight: 240,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  suggestionText: {
    fontSize: 15,
    color: '#334155',
    fontWeight: '500',
    letterSpacing: -0.3,
  },
  suggestionLoading: {
    padding: 16,
  },
  noSuggestionsText: {
    padding: 16,
    color: '#64748b',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.3,
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#fef2f2',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fee2e2',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    letterSpacing: -0.3,
  },
  retryButton: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#64748b',
    fontWeight: '400',
    letterSpacing: -0.3,
  },
  listContainer: {
    flexGrow: 1,
    paddingVertical: 8,
  },
  quizItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.7)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  quizItemDisabled: {
    backgroundColor: '#f8fafc',
    opacity: 0.7,
  },
  quizContent: {
    flex: 1,
  },
  quizTopic: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  quizInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  quizLevel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    marginRight: 12,
    backgroundColor: '#f0f9ff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  quizQuestions: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    marginRight: 12,
    backgroundColor: '#f0f9ff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  previousScore: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
    backgroundColor: '#dcfce7',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6ee7b7',
  },
  loginRequired: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '500',
    marginTop: 8,
    fontStyle: 'italic',
    letterSpacing: -0.3,
  },
  lockIconContainer: {
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '400',
    letterSpacing: -0.3,
  },
  loadingFooter: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMoreText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    letterSpacing: -0.3,
  },
});

export default QuizListScreen;