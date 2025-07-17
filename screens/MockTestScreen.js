// import React, { useState, useEffect } from "react";
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   TextInput, 
//   TouchableOpacity, 
//   ActivityIndicator,
//   ScrollView,
//   Alert,
//   Image,
//   Animated
// } from "react-native";
// import { useSelector, useDispatch } from "react-redux";
// import { generateQuiz, clearGeneratedQuiz } from "../store/slices/quizSlice";
// import * as ImagePicker from 'expo-image-picker';
// import Toast from 'react-native-toast-message';

// const MockTestScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { isAuthenticated } = useSelector((state) => state.user);
//   const { 
//     generatedQuiz, 
//     generationLoading, 
//     generationError,
//     success
//   } = useSelector((state) => state.quiz);
  
//   const [topic, setTopic] = useState("");
//   const [level, setLevel] = useState("easy");
//   const [image, setImage] = useState(null);
//   const [imageLoading, setImageLoading] = useState(false);
//   const [fadeAnim] = useState(new Animated.Value(0)); // Animation for fade-in

//   // Clear generated quiz when component unmounts
//   useEffect(() => {
//     return () => {
//       dispatch(clearGeneratedQuiz());
//     };
//   }, [dispatch]);

//   // Handle success and show toast
//   useEffect(() => {
//     if (success && generatedQuiz) {
//       Toast.show({
//         type: 'success',
//         text1: 'Success',
//         text2: 'Quiz has been generated successfully!',
//         position: 'bottom',
//         visibilityTime: 4000,
//         text1Style: styles.toastText1,
//         text2Style: styles.toastText2,
//         style: styles.toastContainer,
//       });
      
//       setTimeout(() => {
//         dispatch(clearGeneratedQuiz());
//       }, 1000);
//     }
//   }, [success, generatedQuiz, dispatch]);

//   // Show error alert if generation failed
//   useEffect(() => {
//     if (generationError) {
//       Toast.show({
//         type: 'error',
//         text1: 'Generation Failed',
//         text2: generationError,
//         position: 'top',
//         visibilityTime: 4000,
//         text1Style: styles.toastText1,
//         text2Style: styles.toastText2,
//         style: styles.toastContainer,
//       });
//     }
//   }, [generationError]);

//   // Request permission for accessing the camera roll
//   useEffect(() => {
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to upload images.');
//       }
//     })();
//   }, []);

//   // Fade-in animation on mount
//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 400,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

//   const handlePickImage = async () => {
//     if (!isAuthenticated) {
//       Alert.alert(
//         "Login Required",
//         "Please log in to upload images for quiz generation.",
//         [
//           { text: "Cancel", style: "cancel" },
//           { text: "Go to Login", onPress: () => navigation.navigate('Login') }
//         ]
//       );
//       return;
//     }

//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.8,
//       });
      
//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         setImage(result.assets[0]);
//       }
//     } catch (error) {
//       console.error("Error picking image:", error);
//       Alert.alert("Error", "Failed to pick image. Please try again.");
//     }
//   };

//   const handleRemoveImage = () => {
//     setImage(null);
//   };

//   const handleGenerateQuiz = async () => {
//     if (!isAuthenticated) {
//       Alert.alert(
//         "Login Required",
//         "You need to log in to generate quizzes. Would you like to go to the login screen?",
//         [
//           { text: "Cancel", style: "cancel" },
//           { text: "Go to Login", onPress: () => navigation.navigate('Login') }
//         ]
//       );
//       return;
//     }

//     if (!topic.trim() && !image) {
//       Alert.alert("Error", "Please enter a topic or upload an image");
//       return;
//     }
    
//     const formData = new FormData();
//     formData.append('topic', topic);
//     formData.append('level', level);
    
//     if (image) {
//       const imageUri = image.uri;
//       const filename = imageUri.split('/').pop();
//       const match = /\.(\w+)$/.exec(filename);
//       const type = match ? `image/${match[1]}` : 'image/jpeg';
      
//       formData.append('image', {
//         uri: imageUri,
//         name: filename,
//         type,
//       });
//     }
    
//     dispatch(generateQuiz(formData));
//   };

//   const levels = [
//     { id: "easy", label: "Easy" },
//     { id: "medium", label: "Medium" },
//     { id: "hard", label: "Hard" },
//   ];

//   return (
//     <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
//       <ScrollView contentContainerStyle={styles.contentContainer}>
//         <Text style={styles.heading}>Generate Mock Test</Text>

//         <Text style={styles.labelText}>Topic</Text> 
//         <TextInput
//           placeholder="Enter topic (e.g., General Knowledge)"
//           style={styles.input}
//           value={topic}
//           onChangeText={setTopic}
//           placeholderTextColor="#A3A3A3"
//           editable={isAuthenticated}
//         />

//         <Text style={styles.labelText}>Upload Reference Image (Optional)</Text>
//         <View style={styles.imageUploadContainer}>
//           {image ? (
//             <View style={styles.selectedImageContainer}>
//               <Image source={{ uri: image.uri }} style={styles.selectedImage} />
//               <TouchableOpacity style={styles.removeImageButton} onPress={handleRemoveImage}>
//                 <Text style={styles.removeImageText}>✕</Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <TouchableOpacity 
//               style={styles.uploadButton} 
//               onPress={handlePickImage}
//               disabled={imageLoading}
//               activeOpacity={0.7}
//             >
//               {imageLoading ? (
//                 <ActivityIndicator color="#3B82F6" size="small" />
//               ) : (
//                 <Text style={styles.uploadButtonText}>Select Image</Text>
//               )}
//             </TouchableOpacity>
//           )}
//         </View>

//         <Text style={styles.labelText}>Difficulty Level</Text>
//         <View style={styles.levelSelector}>
//         {levels.map((item) => (
//             <TouchableOpacity
//               key={item.id}
//               style={[
//                 styles.levelButton,
//                 level === item.id && styles.selectedLevel,
//               ]}
//               onPress={() => setLevel(item.id)}
//               activeOpacity={0.7}
//             >
//               <Text
//                 style={[
//                   styles.levelButtonText,
//                   level === item.id && styles.selectedLevelText,
//                 ]}
//               >
//                 {item.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <TouchableOpacity
//           onPress={handleGenerateQuiz}
//           style={[
//             styles.button,
//             (!topic.trim() && !image) || generationLoading ? styles.buttonDisabled : {},
//           ]}
//           disabled={(!topic.trim() && !image) || generationLoading}
//           activeOpacity={0.7}
//         >
//           {generationLoading ? (
//             <ActivityIndicator color="#fff" size="small" />
//           ) : (
//             <Text style={styles.buttonText}>
//               {isAuthenticated ? "Generate Quiz" : "Login to Generate"}
//             </Text>
//           )}
//         </TouchableOpacity>

//         {generationLoading && (
//           <View style={styles.loadingContainer}>
//             <Text style={styles.loadingText}>
//               Generating your quiz... This may take a moment as we're creating tailored questions about {topic}
//               {image ? " with your reference image" : ""}.
//             </Text>
//           </View>
//         )}

//         {!isAuthenticated && (
//           <View style={styles.authPromptContainer}>
//             <Text style={styles.authPromptText}>
//               💡 Login to unlock full quiz generation features including image uploads and personalized content!
//             </Text>
//           </View>
//         )}
//       </ScrollView>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F9FAFB",
//   },
//   contentContainer: {
//     paddingHorizontal: 24,
//     paddingTop: 32,
//     paddingBottom: 48,
//   },
//   centeredContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 24,
//     backgroundColor: "#F9FAFB",
//   },
//   authPromptContainer: {
//     backgroundColor: '#F0F9FF',
//     borderRadius: 12,
//     padding: 16,
//     marginTop: 24,
//     borderWidth: 1,
//     borderColor: '#BFDBFE',
//     alignItems: 'center',
//   },
//   authPromptText: {
//     fontSize: 14,
//     color: '#1E40AF',
//     textAlign: 'center',
//     lineHeight: 20,
//     fontWeight: '500',
//   },
//   authCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 24,
//     width: "100%",
//     maxWidth: 400,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   authTitle: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   authMessage: {
//     fontSize: 16,
//     fontWeight: "400",
//     color: "#6B7280",
//     textAlign: "center",
//     marginBottom: 24,
//     lineHeight: 24,
//   },
//   loginButton: {
//     backgroundColor: "#3B82F6",
//     paddingVertical: 14,
//     paddingHorizontal: 32,
//     borderRadius: 12,
//     width: "100%",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   loginButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 32,
//     textAlign: "center",
//   },
//   labelText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#374151",
//     marginBottom: 12,
//   },
//   input: {
//     backgroundColor: "#FFFFFF",
//     padding: 16,
//     borderRadius: 12,
//     fontSize: 16,
//     marginBottom: 24,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   imageUploadContainer: {
//     marginBottom: 24,
//   },
//   uploadButton: {
//     backgroundColor: "#FFFFFF",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderStyle: "dashed",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   uploadButtonText: {
//     color: "#3B82F6",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   selectedImageContainer: {
//     position: "relative",
//     marginBottom: 12,
//     alignItems: "center",
//   },
//   selectedImage: {
//     width: "100%",
//     height: 240,
//     borderRadius: 12,
//     resizeMode: "cover",
//   },
//   removeImageButton: {
//     position: "absolute",
//     right: 12,
//     top: 12,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   removeImageText: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     fontWeight: "700",
//   },
//   levelSelector: {
//     flexDirection: "row",
//     marginBottom: 32,
//     gap: 8,
//   },
//   levelButton: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     padding: 14,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   levelButtonText: {
//     fontSize: 15,
//     color: "#374151",
//     fontWeight: "600",
//   },
//   selectedLevel: {
//     backgroundColor: "#3B82F6",
//     borderColor: "#3B82F6",
//   },
//   selectedLevelText: {
//     color: "#FFFFFF",
//     fontWeight: "700",
//   },
//   button: {
//     backgroundColor: "#3B82F6",
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   buttonDisabled: {
//     backgroundColor: "#93C5FD",
//     opacity: 0.7,
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 17,
//     fontWeight: "700",
//   },
//   loadingContainer: {
//     marginTop: 24,
//     padding: 16,
//     backgroundColor: "#EFF6FF",
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#DBEAFE",
//   },
//   loadingText: {
//     color: "#3B82F6",
//     textAlign: "center",
//     fontSize: 15,
//     fontWeight: "500",
//   },
//   toastContainer: {
//     minWidth: '90%',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.15,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   toastText1: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#111827",
//   },
//   toastText2: {
//     fontSize: 15,
//     fontWeight: "500",
//     color: "#374151",
//   },
// });

// export default MockTestScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  Image,
  Animated,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { generateQuiz, clearGeneratedQuiz } from '../store/slices/quizSlice';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';

const MockTestScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { generatedQuiz, generationLoading, generationError, success } = useSelector(
    (state) => state.quiz
  );

  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('easy');
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Clear generated quiz when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearGeneratedQuiz());
    };
  }, [dispatch]);

  // Handle success and show toast
  useEffect(() => {
    if (success && generatedQuiz) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Quiz has been generated successfully!',
        position: 'bottom',
        visibilityTime: 4000,
        text1Style: styles.toastText1,
        text2Style: styles.toastText2,
        style: styles.toastContainer,
      });

      setTimeout(() => {
        dispatch(clearGeneratedQuiz());
      }, 1000);
    }
  }, [success, generatedQuiz, dispatch]);

  // Show error alert if generation failed
  useEffect(() => {
    if (generationError) {
      Toast.show({
        type: 'error',
        text1: 'Generation Failed',
        text2: generationError,
        position: 'top',
        visibilityTime: 4000,
        text1Style: styles.toastText1,
        text2Style: styles.toastText2,
        style: styles.toastContainer,
      });
    }
  }, [generationError]);

  // Request permission for accessing the camera roll
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission needed',
          'Sorry, we need camera roll permissions to upload images.'
        );
      }
    })();
  }, []);

  // Fade-in animation on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePickImage = async () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Login Required',
        'Please log in to upload images for quiz generation.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go to Login', onPress: () => navigation.navigate('Login') },
        ]
      );
      return;
    }

    try {
      setImageLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    } finally {
      setImageLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleGenerateQuiz = async () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Login Required',
        'You need to log in to generate quizzes. Would you like to go to the login screen?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go to Login', onPress: () => navigation.navigate('Login') },
        ]
      );
      return;
    }

    if (!topic.trim() && !image) {
      Alert.alert('Error', 'Please enter a topic or upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('topic', topic);
    formData.append('level', level);

    if (image) {
      const imageUri = image.uri;
      const filename = imageUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      formData.append('image', {
        uri: imageUri,
        name: filename,
        type,
      });
    }

    dispatch(generateQuiz(formData));
  };

  const levels = [
    { id: 'easy', label: 'Easy' },
    { id: 'medium', label: 'Medium' },
    { id: 'hard', label: 'Hard' },
  ];

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Generate Mock Test</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.labelText}>Topic</Text>
          <View style={styles.inputContainer}>
            <Icon name="book" size={20} color="#9ca3af" style={styles.inputIcon} />
            <TextInput
              placeholder="Enter topic (e.g., General Knowledge)"
              style={styles.input}
              value={topic}
              onChangeText={setTopic}
              placeholderTextColor="#9ca3af"
              editable={isAuthenticated}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.labelText}>Upload Reference Image (Optional)</Text>
          <View style={styles.imageUploadContainer}>
            {image ? (
              <View style={styles.selectedImageContainer}>
                <Image source={{ uri: image.uri }} style={styles.selectedImage} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={handleRemoveImage}
                >
                  <Icon name="x" size={16} color="#ffffff" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handlePickImage}
                disabled={imageLoading}
                activeOpacity={0.7}
              >
                {imageLoading ? (
                  <ActivityIndicator color="#2563eb" size="small" />
                ) : (
                  <>
                    <Icon
                      name="image"
                      size={20}
                      color="#2563eb"
                      style={styles.uploadButtonIcon}
                    />
                    <Text style={styles.uploadButtonText}>Select Image</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.labelText}>Difficulty Level</Text>
          <View style={styles.levelSelector}>
            {levels.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.levelButton,
                  level === item.id && styles.selectedLevel,
                ]}
                onPress={() => setLevel(item.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.levelButtonText,
                    level === item.id && styles.selectedLevelText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          onPress={handleGenerateQuiz}
          style={[
            styles.button,
            (!topic.trim() && !image) || generationLoading
              ? styles.buttonDisabled
              : {},
          ]}
          disabled={(!topic.trim() && !image) || generationLoading}
          activeOpacity={0.7}
        >
          {generationLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>
              {isAuthenticated ? 'Generate Quiz' : 'Login to Generate'}
            </Text>
          )}
        </TouchableOpacity>

        {generationLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              Generating your quiz... This may take a moment as we're creating
              tailored questions about {topic}
              {image ? ' with your reference image' : ''}.
            </Text>
          </View>
        )}

        {!isAuthenticated && (
          <View style={styles.authPromptContainer}>
            <Text style={styles.authPromptText}>
              💡 Login to unlock full quiz generation features including image
              uploads and personalized content!
            </Text>
          </View>
        )}
      </ScrollView>
      <Toast />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentContainer: {
    marginTop : 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 48,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: -0.5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  inputContainer: {
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
  input: {
    flex: 1,
    height: 54,
    fontSize: 16,
    color: '#1f2937',
    paddingVertical: 0,
  },
  imageUploadContainer: {
    marginBottom: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadButtonIcon: {
    marginRight: 8,
  },
  uploadButtonText: {
    color: '#2563eb',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  selectedImageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  selectedImage: {
    width: '100%',
    height: 240,
    borderRadius: 14,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  removeImageButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  levelButton: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelButtonText: {
    fontSize: 15,
    color: '#1f2937',
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  selectedLevel: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  selectedLevelText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#94a3b8',
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  loadingContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f0f9ff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#bae6fd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingText: {
    color: '#2563eb',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: -0.3,
  },
  authPromptContainer: {
    backgroundColor: '#f0f9ff',
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#bae6fd',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  authPromptText: {
    fontSize: 14,
    color: '#1e40af',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: -0.3,
  },
  toastContainer: {
    minWidth: '90%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  toastText1: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: -0.3,
  },
  toastText2: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    letterSpacing: -0.3,
  },
});

export default MockTestScreen;