// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl,
//   ScrollView,
//   SafeAreaView,
//   Alert
// } from "react-native";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchUserQuizzes, deleteQuiz } from "../store/slices/quizSlice";
// import { logoutUser } from "../store/slices/userSlice";
// import { MaterialIcons } from "@expo/vector-icons";

// const ProfileScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { user, isAuthenticated, loading: userLoading } = useSelector((state) => state.user);
//   const { userQuizzes, loading: quizzesLoading } = useSelector((state) => state.quiz);
  
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     if (user) {
//       loadUserQuizzes();
//     }
//   }, [dispatch, user]);

//   const loadUserQuizzes = () => {
//     dispatch(fetchUserQuizzes());
//   };

//   const handleRefresh = () => {
//     setRefreshing(true);
//     loadUserQuizzes();
//     setRefreshing(false);
//   };

//   const handleTakeQuiz = (quiz) => {
//     // Show confirmation alert when user clicks to take a quiz
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

//   const getPreviousScore = (quizId) => {
//     if (!isAuthenticated || !user || !user.quizAttempts) {
//       return null;
//     }
    
//     const attempt = user.quizAttempts.find(attempt => attempt.quiz === quizId);
//     return attempt ? attempt.score : null;
//   };

//   const handleCreateQuiz = () => {
//     navigation.navigate("CreateTab");
//   };

//   const handleDeleteQuiz = (quizId) => {
//     Alert.alert(
//           "Confirm Delete",
//           "Are you sure you want to delete this quiz?",
//           [
//             { text: "Cancel", style: "cancel" },
//             {
//               text: "Delete",
//               style: "destructive",
//               onPress: () => dispatch(deleteQuiz(quizId))
//             }
//           ]
//         );
//   };

//   const handleLogout = () => {
//     Alert.alert(
//       "Confirm Logout",
//       "Are you sure you want to logout?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Logout",
//           style: "destructive",
//           onPress: () => dispatch(logoutUser())
//         }
//       ]
//     );
//   };

//   const renderQuizItem = ({ item }) => {
//     const previousScore = getPreviousScore(item._id);
//     return (
//       <TouchableOpacity
//         style={styles.quizItem}
//         onPress={() => handleTakeQuiz(item)}
//       >
//         <View style={styles.quizContent}>
//           <Text style={styles.quizTopic}>{item.topic}</Text>
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
//         </View>
//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={() => handleDeleteQuiz(item._id)}
//         >
//           <Text style={styles.deleteButtonText}>Delete</Text>
//         </TouchableOpacity>
//       </TouchableOpacity>
//     );
//   };

//   const renderEmptyQuizzes = () => {
//     if (quizzesLoading) return null;
    
//     return (
//       <View style={styles.emptyContainer}>
//         <Text style={styles.emptyText}>
//           You haven't created any quizzes yet.
//         </Text>
//         <TouchableOpacity 
//           style={styles.createButton}
//           onPress={handleCreateQuiz}
//         >
//           <Text style={styles.createButtonText}>Create a Quiz</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   if (!user) {
//     return (
//       <View style={styles.centeredContainer}>
//         <Text style={styles.messageText}>Please login to access this screen</Text>
//       </View>
//     );
//   }

//   if (userLoading) {
//     return (
//       <View style={styles.centeredContainer}>
//         <Text style={styles.messageText}>Loading...</Text>
//       </View>
//     );
//   }

//   const initial = user.name?.charAt(0).toUpperCase() || "?";

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView 
//         contentContainerStyle={styles.scrollContainer}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={handleRefresh}
//             colors={["#3478f6"]}
//           />
//         }
//       >
//         <View style={styles.header}>
//           <View style={styles.avatarContainer}>
//             <View style={styles.avatar}>
//               <Text style={styles.avatarText}>{initial}</Text>
//             </View>
//             <Text style={styles.name}>{user.name}</Text>
//           </View>
//           <TouchableOpacity style={styles.logoutIconButton} onPress={handleLogout}>
//             <MaterialIcons name="exit-to-app" size={24} color="#d32f2f" />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.detailsContainer}>
//           <View style={styles.detailRow}>
//             <Text style={styles.label}>Email:</Text>
//             <Text style={styles.value}>{user.email}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.label}>Phone:</Text>
//             <Text style={styles.value}>{user.phone || "Not provided"}</Text>
//           </View>
//         </View>

//         <View style={styles.myQuizzesSection}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>My Quizzes</Text>
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={handleCreateQuiz}
//             >
//               <Text style={styles.addButtonText}>Create</Text>
//             </TouchableOpacity>
//           </View>

//           {quizzesLoading && userQuizzes.length === 0 ? (
//             <View style={styles.loadingContainer}>
//               <ActivityIndicator size="large" color="#3478f6" />
//               <Text style={styles.loadingText}>Loading your quizzes...</Text>
//             </View>
//           ) : (
//             <FlatList
//               data={userQuizzes}
//               renderItem={renderQuizItem}
//               keyExtractor={(item) => item._id}
//               contentContainerStyle={styles.quizzesListContainer}
//               ListEmptyComponent={renderEmptyQuizzes}
//               scrollEnabled={false} // Disable FlatList scrolling as we're using ScrollView
//               nestedScrollEnabled={true}
//             />
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   centeredContainer: {
//     flex: 1,
//     marginTop: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   messageText: {
//     fontSize: 16,
//     color: "#888",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#f9f9f9",
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingBottom: 30,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginTop: 40,
//   },
//   avatarContainer: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   avatar: {
//     backgroundColor: "#4f6d7a",
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   avatarText: {
//     color: "white",
//     fontSize: 40,
//     fontWeight: "bold",
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "600",
//     color: "#333",
//   },
//   logoutIconButton: {
//     padding: 10,
//     alignSelf: 'flex-start',
//     marginTop: 10,
//   },
//   detailsContainer: {
//     width: "90%",
//     alignSelf: "center",
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 3,
//     marginBottom: 25,
//   },
//   detailRow: {
//     flexDirection: "row",
//     marginBottom: 15,
//   },
//   label: {
//     fontWeight: "500",
//     width: 70,
//     color: "#666",
//   },
//   value: {
//     flex: 1,
//     color: "#333",
//   },
//   myQuizzesSection: {
//     width: "90%",
//     alignSelf: "center",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 3,
//     paddingBottom: 15,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#e0e0e0",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#333",
//   },
//   addButton: {
//     backgroundColor: "#3478f6",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//   },
//   addButtonText: {
//     color: "#ffffff",
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   loadingContainer: {
//     padding: 40,
//     alignItems: "center",
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 14,
//     color: "#666",
//   },
//   quizzesListContainer: {
//     paddingHorizontal: 15,
//     paddingTop: 15,
//     paddingBottom: 5,
//   },
//   quizItem: {
//     backgroundColor: "#f9f9f9",
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 15,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   quizContent: {
//     flex: 1,
//   },
//   quizTopic: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
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
//   deleteButton: {
//     backgroundColor: "#ffebee",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     marginLeft: 10,
//   },
//   deleteButtonText: {
//     color: "#d32f2f",
//     fontSize: 12,
//     fontWeight: "500",
//   },
//   emptyContainer: {
//     alignItems: "center",
//     paddingVertical: 30,
//   },
//   emptyText: {
//     fontSize: 15,
//     color: "#666",
//     textAlign: "center",
//     marginBottom: 15,
//   },
//   createButton: {
//     backgroundColor: "#3478f6",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   createButtonText: {
//     color: "#ffffff",
//     fontSize: 15,
//     fontWeight: "500",
//   },
// });

// export default ProfileScreen;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserQuizzes, deleteQuiz } from '../store/slices/quizSlice';
import { logoutUser } from '../store/slices/userSlice';
import Icon from 'react-native-vector-icons/Feather';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading: userLoading } = useSelector(
    (state) => state.user
  );
  const { userQuizzes, loading: quizzesLoading } = useSelector(
    (state) => state.quiz
  );

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserQuizzes();
    }
  }, [dispatch, user]);

  const loadUserQuizzes = () => {
    dispatch(fetchUserQuizzes());
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadUserQuizzes();
    setRefreshing(false);
  };

  const handleTakeQuiz = (quiz) => {
    const previousScore = getPreviousScore(quiz._id);
    const scoreText = previousScore !== null ? `\n\nYour previous score: ${previousScore}%` : '';

    Alert.alert(
      'Start Quiz',
      `Are you ready to take the quiz on "${quiz.topic}"?${scoreText}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start Quiz',
          onPress: () => navigation.navigate('QuizTaking', { quizId: quiz._id }),
        },
      ]
    );
  };

  const getPreviousScore = (quizId) => {
    if (!isAuthenticated || !user || !user.quizAttempts) {
      return null;
    }

    const attempt = user.quizAttempts.find((attempt) => attempt.quiz === quizId);
    return attempt ? attempt.score : null;
  };

  const handleCreateQuiz = () => {
    navigation.navigate('CreateTab');
  };

  const handleDeleteQuiz = (quizId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this quiz?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteQuiz(quizId)),
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logoutUser()),
        },
      ]
    );
  };

  const renderQuizItem = ({ item }) => {
    const previousScore = getPreviousScore(item._id);
    return (
      <TouchableOpacity
        style={styles.quizItem}
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
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteQuiz(item._id)}
        >
          <Icon name="trash-2" size={20} color="#dc2626" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderEmptyQuizzes = () => {
    if (quizzesLoading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You haven't created any quizzes yet.</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateQuiz}
          activeOpacity={0.7}
        >
          <Icon name="plus" size={20} color="#ffffff" style={styles.createButtonIcon} />
          <Text style={styles.createButtonText}>Create a Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!user) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.messageText}>Please login to access this screen</Text>
      </View>
    );
  }

  if (userLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.messageText}>Loading...</Text>
      </View>
    );
  }

  const initial = user.name?.charAt(0).toUpperCase() || '?';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#2563eb']}
            tintColor="#2563eb"
            progressBackgroundColor="#ffffff"
          />
        }
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
           {/* <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initial}</Text>
            </View>*/}
            <Text style={styles.name}>{user.name}</Text>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Icon name="log-out" size={20} color="#ffffff" style={styles.logoutIcon} />
            
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Icon name="mail" size={20} color="#64748b" style={styles.detailIcon} />
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="phone" size={20} color="#64748b" style={styles.detailIcon} />
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{user.phone || 'Not provided'}</Text>
          </View>
        </View>

        <View style={styles.myQuizzesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Quizzes</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleCreateQuiz}
              activeOpacity={0.7}
            >
              <Icon name="plus" size={20} color="#ffffff" style={styles.addButtonIcon} />
              <Text style={styles.addButtonText}>Create</Text>
            </TouchableOpacity>
          </View>

          {quizzesLoading && userQuizzes.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2563eb" />
              <Text style={styles.loadingText}>Loading your quizzes...</Text>
            </View>
          ) : (
            <FlatList
              data={userQuizzes}
              renderItem={renderQuizItem}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.quizzesListContainer}
              ListEmptyComponent={renderEmptyQuizzes}
              scrollEnabled={false}
              nestedScrollEnabled={true}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8fafc',
  },
  messageText: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '400',
    letterSpacing: -0.3,
    marginTop: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#2563eb',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: -0.5,
    marginTop : 20,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#dc2626',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop : 20,
    elevation: 6,
  },
  logoutIcon: {
    marginRight: 6,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIcon: {
    marginRight: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    width: 70,
    letterSpacing: -0.3,
  },
  value: {
    flex: 1,
    fontSize: 15,
    color: '#334155',
    fontWeight: '500',
    letterSpacing: -0.3,
  },
  myQuizzesSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: -0.5,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#2563eb',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
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
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748b',
    fontWeight: '400',
    letterSpacing: -0.3,
  },
  quizzesListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  quizItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
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
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: '#2563eb',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  createButtonIcon: {
    marginRight: 8,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
});

export default ProfileScreen;