// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   Animated,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser, registerUser, clearError } from '../store/slices/userSlice';
// import Icon from 'react-native-vector-icons/Feather'; // You'll need to install this

// const LoginScreen = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.user);

//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.8)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 400,
//         useNativeDriver: true,
//       }),
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         tension: 80,
//         friction: 10,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     if (error) {
//       Alert.alert('Error', error);
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   const handleAuth = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     if (!isLogin && password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     if (isLogin) {
//       dispatch(loginUser({ email, password }));
//     } else {
//       dispatch(registerUser({ name, email, phone, password }));
//     }
//   };

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     setEmail('');
//     setPassword('');
//     setName('');
//     setPhone('');
//     setConfirmPassword('');
//     setShowPassword(false);
//     setShowConfirmPassword(false);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.formContainer,
//           {
//             opacity: fadeAnim,
//             transform: [{ scale: scaleAnim }],
//           },
//         ]}
//       >
//         <Text style={styles.title}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
        
//         {!isLogin && (
//           <>
//             <TextInput
//               style={styles.input}
//               placeholder="Name"
//               placeholderTextColor="#a0a0a0"
//               value={name}
//               onChangeText={setName}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Phone"
//               placeholderTextColor="#a0a0a0"
//               value={phone}
//               onChangeText={setPhone}
//               keyboardType="phone-pad"
//             />
//           </>
//         )}
        
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           placeholderTextColor="#a0a0a0"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
        
//         <View style={styles.passwordContainer}>
//           <TextInput
//             style={styles.passwordInput}
//             placeholder="Password"
//             placeholderTextColor="#a0a0a0"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry={!showPassword}
//           />
//           <TouchableOpacity
//             style={styles.eyeIcon}
//             onPress={togglePasswordVisibility}
//             activeOpacity={0.7}
//           >
//             <Icon
//               name={showPassword ? 'eye' : 'eye-off'}
//               size={20}
//               color="#a0a0a0"
//             />
//           </TouchableOpacity>
//         </View>
        
//         {!isLogin && (
//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.passwordInput}
//               placeholder="Confirm Password"
//               placeholderTextColor="#a0a0a0"
//               value={confirmPassword}
//               onChangeText={setConfirmPassword}
//               secureTextEntry={!showConfirmPassword}
//             />
//             <TouchableOpacity
//               style={styles.eyeIcon}
//               onPress={toggleConfirmPasswordVisibility}
//               activeOpacity={0.7}
//             >
//               <Icon
//                 name={showConfirmPassword ? 'eye' : 'eye-off'}
//                 size={20}
//                 color="#a0a0a0"
//               />
//             </TouchableOpacity>
//           </View>
//         )}
        
//         <TouchableOpacity 
//           style={styles.button} 
//           onPress={handleAuth}
//           disabled={loading}
//           activeOpacity={0.85}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>
//               {isLogin ? 'Log In' : 'Sign Up'}
//             </Text>
//           )}
//         </TouchableOpacity>
        
//         <TouchableOpacity onPress={toggleMode}>
//           <Text style={styles.toggleText}>
//             {isLogin
//               ? "Don't have an account? Sign Up"
//               : 'Already have an account? Log In'}
//           </Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#e6e6e6', // Soft gray for modern backdrop
//     padding: 20,
//   },
//   formContainer: {
//     width: '100%',
//     maxWidth: 400,
//     backgroundColor: 'rgba(255, 255, 255, 0.95)', // Glassmorphism effect
//     borderRadius: 20,
//     padding: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: '#1a1a1a',
//     marginBottom: 24,
//     textAlign: 'center',
//     letterSpacing: 0.5,
//   },
//   input: {
//     width: '100%',
//     height: 56,
//     backgroundColor: 'rgba(245, 245, 245, 0.8)', // Subtle translucent input
//     borderRadius: 12,
//     marginBottom: 16,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     color: '#1a1a1a',
//     borderWidth: 1,
//     borderColor: 'rgba(200, 200, 200, 0.3)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   passwordContainer: {
//     width: '100%',
//     height: 56,
//     backgroundColor: 'rgba(245, 245, 245, 0.8)',
//     borderRadius: 12,
//     marginBottom: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(200, 200, 200, 0.3)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   passwordInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#1a1a1a',
//     paddingRight: 10,
//   },
//   eyeIcon: {
//     padding: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     width: '100%',
//     height: 56,
//     backgroundColor: '#3478f6', // App's primary blue
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },
//   toggleText: {
//     color: '#3478f6',
//     fontSize: 16,
//     fontWeight: '600',
//     textAlign: 'center',
//     marginTop: 8,
//   },
// });

// export default LoginScreen;

// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   Animated,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser, registerUser, clearError } from '../store/slices/userSlice';
// import Icon from 'react-native-vector-icons/Feather';

// const OTPInput = ({ otp, setOtp, disabled = false }) => {
//   const [otpValues, setOtpValues] = useState(['', '', '', '']);
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     setOtp(otpValues.join(''));
//   }, [otpValues, setOtp]);

//   const handleOtpChange = (value, index) => {
//     const newOtpValues = [...otpValues];
//     newOtpValues[index] = value;
//     setOtpValues(newOtpValues);

//     // Auto-focus next input
//     if (value && index < 3) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.nativeEvent.key === 'Backspace' && !otpValues[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   return (
//     <View style={styles.otpContainer}>
//       {otpValues.map((digit, index) => (
//         <TextInput
//           key={index}
//           ref={(ref) => (inputRefs.current[index] = ref)}
//           style={[
//             styles.otpInput,
//             digit && styles.otpInputFilled,
//             disabled && styles.otpInputDisabled
//           ]}
//           value={digit}
//           onChangeText={(value) => handleOtpChange(value, index)}
//           onKeyPress={(e) => handleKeyPress(e, index)}
//           keyboardType="numeric"
//           maxLength={1}
//           textAlign="center"
//           editable={!disabled}
//           selectTextOnFocus
//         />
//       ))}
//     </View>
//   );
// };

// const LoginScreen = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [otpLoading, setOtpLoading] = useState(false);
//   const [resendTimer, setResendTimer] = useState(0);
  
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.user);

//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.8)).current;
//   const otpSlideAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 400,
//         useNativeDriver: true,
//       }),
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         tension: 80,
//         friction: 10,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     if (error) {
//       Alert.alert('Error', error);
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   useEffect(() => {
//     let interval;
//     if (resendTimer > 0) {
//       interval = setInterval(() => {
//         setResendTimer((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [resendTimer]);

//   useEffect(() => {
//     if (isOtpSent) {
//       Animated.timing(otpSlideAnim, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(otpSlideAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [isOtpSent]);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSendOtp = async () => {
//     if (!email) {
//       Alert.alert('Error', 'Please enter your email address');
//       return;
//     }

//     if (!validateEmail(email)) {
//       Alert.alert('Error', 'Please enter a valid email address');
//       return;
//     }

//     setOtpLoading(true);
    
//     try {
//       // Simulate API call for sending OTP
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       setIsOtpSent(true);
//       setResendTimer(60); // 60 seconds countdown
//       Alert.alert('Success', 'OTP sent to your email address');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to send OTP. Please try again.');
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (otp.length !== 4) {
//       Alert.alert('Error', 'Please enter the complete 4-digit OTP');
//       return;
//     }

//     setOtpLoading(true);
    
//     try {
//       // Simulate API call for OTP verification
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // For demo purposes, accept any 4-digit OTP
//       setIsOtpVerified(true);
//       Alert.alert('Success', 'Email verified successfully!');
//     } catch (error) {
//       Alert.alert('Error', 'Invalid OTP. Please try again.');
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   const handleResendOtp = () => {
//     if (resendTimer === 0) {
//       setOtp('');
//       handleSendOtp();
//     }
//   };

//   const handleAuth = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     if (!isLogin) {
//       if (!name || !phone) {
//         Alert.alert('Error', 'Please fill all required fields');
//         return;
//       }

//       if (!isOtpVerified) {
//         Alert.alert('Error', 'Please verify your email address first');
//         return;
//       }

//       if (password !== confirmPassword) {
//         Alert.alert('Error', 'Passwords do not match');
//         return;
//       }
//     }

//     if (isLogin) {
//       dispatch(loginUser({ email, password }));
//     } else {
//       dispatch(registerUser({ name, email, phone, password }));
//     }
//   };

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     setEmail('');
//     setPassword('');
//     setName('');
//     setPhone('');
//     setConfirmPassword('');
//     setShowPassword(false);
//     setShowConfirmPassword(false);
//     setOtp('');
//     setIsOtpSent(false);
//     setIsOtpVerified(false);
//     setResendTimer(0);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.formContainer,
//           {
//             opacity: fadeAnim,
//             transform: [{ scale: scaleAnim }],
//           },
//         ]}
//       >
//         <Text style={styles.title}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
        
//         {!isLogin && (
//           <>
//             <TextInput
//               style={styles.input}
//               placeholder="Name"
//               placeholderTextColor="#a0a0a0"
//               value={name}
//               onChangeText={setName}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Phone"
//               placeholderTextColor="#a0a0a0"
//               value={phone}
//               onChangeText={setPhone}
//               keyboardType="phone-pad"
//             />
//           </>
//         )}
        
//         <View style={styles.emailContainer}>
//           <TextInput
//             style={[styles.input, !isLogin && { marginBottom: 0, marginRight: 8, flex: 1 }]}
//             placeholder="Email"
//             placeholderTextColor="#a0a0a0"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             editable={!isOtpVerified || isLogin}
//           />
//           {!isLogin && (
//             <TouchableOpacity
//               style={[
//                 styles.otpButton,
//                 (isOtpSent && !isOtpVerified) && styles.otpButtonSecondary,
//                 isOtpVerified && styles.otpButtonVerified
//               ]}
//               onPress={isOtpSent && !isOtpVerified ? handleVerifyOtp : handleSendOtp}
//               disabled={otpLoading || isOtpVerified}
//               activeOpacity={0.8}
//             >
//               {otpLoading ? (
//                 <ActivityIndicator size="small" color="#fff" />
//               ) : (
//                 <Text style={styles.otpButtonText}>
//                   {isOtpVerified ? 'Verified' : isOtpSent ? 'Verify' : 'Send OTP'}
//                 </Text>
//               )}
//             </TouchableOpacity>
//           )}
//         </View>

//         {!isLogin && isOtpSent && !isOtpVerified && (
//           <Animated.View
//             style={[
//               styles.otpSection,
//               {
//                 opacity: otpSlideAnim,
//                 transform: [
//                   {
//                     translateY: otpSlideAnim.interpolate({
//                       inputRange: [0, 1],
//                       outputRange: [-20, 0],
//                     }),
//                   },
//                 ],
//               },
//             ]}
//           >
//             <Text style={styles.otpLabel}>Enter 4-digit OTP sent to your email</Text>
//             <OTPInput otp={otp} setOtp={setOtp} disabled={otpLoading} />
//             <View style={styles.resendContainer}>
//               <TouchableOpacity
//                 onPress={handleResendOtp}
//                 disabled={resendTimer > 0}
//                 activeOpacity={0.7}
//               >
//                 <Text style={[styles.resendText, resendTimer > 0 && styles.resendTextDisabled]}>
//                   {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </Animated.View>
//         )}
        
//         <View style={styles.passwordContainer}>
//           <TextInput
//             style={styles.passwordInput}
//             placeholder="Password"
//             placeholderTextColor="#a0a0a0"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry={!showPassword}
//           />
//           <TouchableOpacity
//             style={styles.eyeIcon}
//             onPress={togglePasswordVisibility}
//             activeOpacity={0.7}
//           >
//             <Icon
//               name={showPassword ? 'eye' : 'eye-off'}
//               size={20}
//               color="#a0a0a0"
//             />
//           </TouchableOpacity>
//         </View>
        
//         {!isLogin && (
//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.passwordInput}
//               placeholder="Confirm Password"
//               placeholderTextColor="#a0a0a0"
//               value={confirmPassword}
//               onChangeText={setConfirmPassword}
//               secureTextEntry={!showConfirmPassword}
//             />
//             <TouchableOpacity
//               style={styles.eyeIcon}
//               onPress={toggleConfirmPasswordVisibility}
//               activeOpacity={0.7}
//             >
//               <Icon
//                 name={showConfirmPassword ? 'eye' : 'eye-off'}
//                 size={20}
//                 color="#a0a0a0"
//               />
//             </TouchableOpacity>
//           </View>
//         )}
        
//         <TouchableOpacity 
//           style={styles.button} 
//           onPress={handleAuth}
//           disabled={loading}
//           activeOpacity={0.85}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>
//               {isLogin ? 'Log In' : 'Sign Up'}
//             </Text>
//           )}
//         </TouchableOpacity>
        
//         <TouchableOpacity onPress={toggleMode}>
//           <Text style={styles.toggleText}>
//             {isLogin
//               ? "Don't have an account? Sign Up"
//               : 'Already have an account? Log In'}
//           </Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#e6e6e6',
//     padding: 20,
//   },
//   formContainer: {
//     width: '100%',
//     maxWidth: 400,
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     borderRadius: 20,
//     padding: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: '#1a1a1a',
//     marginBottom: 24,
//     textAlign: 'center',
//     letterSpacing: 0.5,
//   },
//   input: {
//     width: '100%',
//     height: 56,
//     backgroundColor: 'rgba(245, 245, 245, 0.8)',
//     borderRadius: 12,
//     marginBottom: 16,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     color: '#1a1a1a',
//     borderWidth: 1,
//     borderColor: 'rgba(200, 200, 200, 0.3)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   emailContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   otpButton: {
//     backgroundColor: '#3478f6',
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     minWidth: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   otpButtonSecondary: {
//     backgroundColor: '#28a745',
//   },
//   otpButtonVerified: {
//     backgroundColor: '#6c757d',
//   },
//   otpButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   otpSection: {
//     marginBottom: 16,
//     padding: 16,
//     backgroundColor: 'rgba(52, 120, 246, 0.05)',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: 'rgba(52, 120, 246, 0.1)',
//   },
//   otpLabel: {
//     fontSize: 14,
//     color: '#555',
//     textAlign: 'center',
//     marginBottom: 16,
//     fontWeight: '500',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   otpInput: {
//     width: 60,
//     height: 60,
//     borderWidth: 2,
//     borderColor: '#ddd',
//     borderRadius: 12,
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#1a1a1a',
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   otpInputFilled: {
//     borderColor: '#3478f6',
//     backgroundColor: 'rgba(52, 120, 246, 0.05)',
//   },
//   otpInputDisabled: {
//     backgroundColor: '#f5f5f5',
//     color: '#999',
//   },
//   resendContainer: {
//     alignItems: 'center',
//   },
//   resendText: {
//     color: '#3478f6',
//     fontSize: 14,
//     fontWeight: '600',
//     textDecorationLine: 'underline',
//   },
//   resendTextDisabled: {
//     color: '#999',
//     textDecorationLine: 'none',
//   },
//   passwordContainer: {
//     width: '100%',
//     height: 56,
//     backgroundColor: 'rgba(245, 245, 245, 0.8)',
//     borderRadius: 12,
//     marginBottom: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(200, 200, 200, 0.3)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   passwordInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#1a1a1a',
//     paddingRight: 10,
//   },
//   eyeIcon: {
//     padding: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     width: '100%',
//     height: 56,
//     backgroundColor: '#3478f6',
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },
//   toggleText: {
//     color: '#3478f6',
//     fontSize: 16,
//     fontWeight: '600',
//     textAlign: 'center',
//     marginTop: 8,
//   },
// });

// export default LoginScreen;

// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   Animated,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   loginUser, 
//   sendOTP, 
//   resendOTP, 
//   registerWithOTP, 
//   clearError, 
//   clearOtpState,
//   resetRegistrationState 
// } from '../store/slices/userSlice';
// import Icon from 'react-native-vector-icons/Feather';

// const OTPInput = ({ otp, setOtp, disabled = false, onComplete, allowAutoSubmit }) => {
//   const [otpValues, setOtpValues] = useState(['', '', '', '']);
//   const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     const otpString = otpValues.join('');
//     setOtp(otpString);
    
//     // Auto-submit only once when 4 digits are entered
//     if (otpString.length === 4 && onComplete && allowAutoSubmit && !hasAutoSubmitted) {
//       setHasAutoSubmitted(true);
//       onComplete(otpString);
//     }
//   }, [otpValues, setOtp, onComplete, allowAutoSubmit, hasAutoSubmitted]);

//   const handleOtpChange = (value, index) => {
//     if (value && !/^\d$/.test(value)) return;
    
//     const newOtpValues = [...otpValues];
//     newOtpValues[index] = value;
//     setOtpValues(newOtpValues);

//     if (value && index < 3) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.nativeEvent.key === 'Backspace' && !otpValues[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//       const newOtpValues = [...otpValues];
//       newOtpValues[index - 1] = '';
//       setOtpValues(newOtpValues);
//     }
//   };

//   useEffect(() => {
//     if (!otp) {
//       setOtpValues(['', '', '', '']);
//       setHasAutoSubmitted(false); // Reset auto-submit when OTP is cleared
//     }
//   }, [otp]);

//   return (
//     <View style={styles.otpContainer}>
//       {otpValues.map((digit, index) => (
//         <TextInput
//           key={index}
//           ref={(ref) => (inputRefs.current[index] = ref)}
//           style={[
//             styles.otpInput,
//             digit && styles.otpInputFilled,
//             disabled && styles.otpInputDisabled
//           ]}
//           value={digit}
//           onChangeText={(value) => handleOtpChange(value, index)}
//           onKeyPress={(e) => handleKeyPress(e, index)}
//           keyboardType="numeric"
//           maxLength={1}
//           textAlign="center"
//           editable={!disabled}
//           selectTextOnFocus
//         />
//       ))}
//     </View>
//   );
// };

// const LoginScreen = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [resendTimer, setResendTimer] = useState(0);
//   const [autoSubmitting, setAutoSubmitting] = useState(false);
  
//   const dispatch = useDispatch();
//   const { 
//     loading, 
//     error, 
//     otpSent, 
//     otpLoading, 
//     otpError, 
//     verifyingOtp, 
//     registrationSuccess,
//     isAuthenticated 
//   } = useSelector((state) => state.user);

//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.95)).current;
//   const otpSlideAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         tension: 100,
//         friction: 8,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   useEffect(() => {
//     if (error || otpError) {
//       Alert.alert('Error', error || otpError);
//       dispatch(clearError());
//     }
//   }, [error, otpError, dispatch]);

//   useEffect(() => {
//     if (registrationSuccess) {
//       Alert.alert('Success', 'Registration successful! You are now logged in.');
//       dispatch(resetRegistrationState());
//     }
//   }, [registrationSuccess, dispatch]);

//   useEffect(() => {
//     let interval;
//     if (resendTimer > 0) {
//       interval = setInterval(() => {
//         setResendTimer((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [resendTimer]);

//   useEffect(() => {
//     if (otpSent) {
//       setResendTimer(60);
//       Animated.timing(otpSlideAnim, {
//         toValue: 1,
//         duration: 400,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(otpSlideAnim, {
//         toValue: 0,
//         duration: 400,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [otpSent]);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePhone = (phone) => {
//     const phoneRegex = /^\d{10}$/;
//     return phoneRegex.test(phone.replace(/\D/g, ''));
//   };

//   const handleSendOtp = async () => {
//     if (!email) {
//       Alert.alert('Error', 'Please enter your email address');
//       return;
//     }

//     if (!validateEmail(email)) {
//       Alert.alert('Error', 'Please enter a valid email address');
//       return;
//     }

//     if (!name) {
//       Alert.alert('Error', 'Please enter your name');
//       return;
//     }

//     dispatch(sendOTP({ email, name }));
//   };

//   const handleOtpComplete = (otpValue) => {
//     if (otpValue.length === 4 && !autoSubmitting && !verifyingOtp) {
//       setAutoSubmitting(true);
//       setTimeout(() => {
//         handleRegisterWithOtp(otpValue);
//         setAutoSubmitting(false);
//       }, 500);
//     }
//   };

//   const handleRegisterWithOtp = (otpValue = otp) => {
//     if (!name || !email || !phone || !password) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     if (!validatePhone(phone)) {
//       Alert.alert('Error', 'Please enter a valid 10-digit phone number');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     if (password.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters long');
//       return;
//     }

//     if (otpValue.length !== 4) {
//       Alert.alert('Error', 'Please enter the complete 4-digit OTP');
//       return;
//     }

//     dispatch(registerWithOTP({ 
//       name, 
//       email, 
//       phone: phone.replace(/\D/g, ''),
//       password, 
//       otp: otpValue 
//     }));
//   };

//   const handleResendOtp = () => {
//     if (resendTimer === 0) {
//       setOtp('');
//       dispatch(resendOTP({ email }));
//     }
//   };

//   const handleLogin = () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     if (!validateEmail(email)) {
//       Alert.alert('Error', 'Please enter a valid email address');
//       return;
//     }

//     dispatch(loginUser({ email, password }));
//   };

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     setEmail('');
//     setPassword('');
//     setName('');
//     setPhone('');
//     setConfirmPassword('');
//     setShowPassword(false);
//     setShowConfirmPassword(false);
//     setOtp('');
//     setResendTimer(0);
//     setAutoSubmitting(false);
//     dispatch(clearOtpState());
//     dispatch(clearError());
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const formatPhone = (value) => {
//     const digits = value.replace(/\D/g, '');
//     if (digits.length <= 3) {
//       return digits;
//     } else if (digits.length <= 6) {
//       return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
//     } else {
//       return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
//     }
//   };

//   const handlePhoneChange = (value) => {
//     const formatted = formatPhone(value);
//     setPhone(formatted);
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <Animated.View
//           style={[
//             styles.formContainer,
//             {
//               opacity: fadeAnim,
//               transform: [{ scale: scaleAnim }],
//             },
//           ]}
//         >
//           <View style={styles.header}>
//             <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
//             <Text style={styles.subtitle}>
//               {isLogin ? 'Sign in to continue' : 'Join us today'}
//             </Text>
//           </View>
          
//           {!isLogin && (
//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Full Name</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your full name"
//                 placeholderTextColor="#9ca3af"
//                 value={name}
//                 onChangeText={setName}
//                 autoCapitalize="words"
//               />
//             </View>
//           )}
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Email Address</Text>
//             <View style={styles.emailContainer}>
//               <TextInput
//                 style={[styles.input, !isLogin && { marginBottom: 0, marginRight: 12, flex: 1 }]}
//                 placeholder="Enter your email"
//                 placeholderTextColor="#9ca3af"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 editable={!otpSent || isLogin}
//               />
//               {!isLogin && (
//                 <TouchableOpacity
//                   style={[
//                     styles.otpButton,
//                     otpSent && styles.otpButtonSent
//                   ]}
//                   onPress={handleSendOtp}
//                   disabled={otpLoading || otpSent}
//                   activeOpacity={0.7}
//                 >
//                   {otpLoading ? (
//                     <ActivityIndicator size="small" color="#fff" />
//                   ) : (
//                     <View style={styles.otpButtonContent}>
//                       <Icon 
//                         name={otpSent ? "check" : "mail"} 
//                         size={16} 
//                         color="#fff" 
//                         style={styles.otpButtonIcon}
//                       />
//                       <Text style={styles.otpButtonText}>
//                         {otpSent ? 'Sent' : 'Send OTP'}
//                       </Text>
//                     </View>
//                   )}
//                 </TouchableOpacity>
//               )}
//             </View>
//           </View>

//           {!isLogin && (
//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Phone Number</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="(123) 456-7890"
//                 placeholderTextColor="#9ca3af"
//                 value={phone}
//                 onChangeText={handlePhoneChange}
//                 keyboardType="phone-pad"
//                 maxLength={14}
//               />
//             </View>
//           )}

//           {!isLogin && otpSent && (
//             <Animated.View
//               style={[
//                 styles.otpSection,
//                 {
//                   opacity: otpSlideAnim,
//                   transform: [
//                     {
//                       translateY: otpSlideAnim.interpolate({
//                         inputRange: [0, 1],
//                         outputRange: [-30, 0],
//                       }),
//                     },
//                   ],
//                 },
//               ]}
//             >
//               <View style={styles.otpHeader}>
//                 <Icon name="shield" size={24} color="#2563eb" />
//                 <Text style={styles.otpLabel}>Verify Your Email</Text>
//               </View>
//               <Text style={styles.otpDescription}>
//                 Enter the 4-digit code sent to{'\n'}
//                 <Text style={styles.emailHighlight}>{email}</Text>
//               </Text>
              
//               <OTPInput 
//                 otp={otp} 
//                 setOtp={setOtp} 
//                 disabled={verifyingOtp || autoSubmitting}
//                 onComplete={handleOtpComplete}
//                 allowAutoSubmit={true}
//               />
              
//               {(verifyingOtp || autoSubmitting) && (
//                 <View style={styles.verifyingContainer}>
//                   <ActivityIndicator size="small" color="#2563eb" />
//                   <Text style={styles.verifyingText}>Verifying OTP...</Text>
//                 </View>
//               )}
              
//               <View style={styles.resendContainer}>
//                 <Text style={styles.resendPrompt}>Didn't receive the code?</Text>
//                 <TouchableOpacity
//                   onPress={handleResendOtp}
//                   disabled={resendTimer > 0}
//                   activeOpacity={0.7}
//                 >
//                   <Text style={[styles.resendText, resendTimer > 0 && styles.resendTextDisabled]}>
//                     {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </Animated.View>
//           )}
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Password</Text>
//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Enter your password"
//                 placeholderTextColor="#9ca3af"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={togglePasswordVisibility}
//                 activeOpacity={0.7}
//               >
//                 <Icon
//                   name={showPassword ? 'eye' : 'eye-off'}
//                   size={20}
//                   color="#6b7280"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
          
//           {!isLogin && (
//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Confirm Password</Text>
//               <View style={styles.passwordContainer}>
//                 <TextInput
//                   style={styles.passwordInput}
//                   placeholder="Confirm your password"
//                   placeholderTextColor="#9ca3af"
//                   value={confirmPassword}
//                   onChangeText={setConfirmPassword}
//                   secureTextEntry={!showConfirmPassword}
//                 />
//                 <TouchableOpacity
//                   style={styles.eyeIcon}
//                   onPress={toggleConfirmPasswordVisibility}
//                   activeOpacity={0.7}
//                 >
//                   <Icon
//                     name={showConfirmPassword ? 'eye' : 'eye-off'}
//                     size={20}
//                     color="#6b7280"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
          
//           <TouchableOpacity 
//             style={[
//               styles.button,
//               (!isLogin && !otpSent) && styles.buttonDisabled
//             ]} 
//             onPress={isLogin ? handleLogin : handleRegisterWithOtp}
//             disabled={loading || verifyingOtp || (!isLogin && !otpSent)}
//             activeOpacity={0.7}
//           >
//             {(loading || verifyingOtp) ? (
//               <View style={styles.buttonLoadingContent}>
//                 <ActivityIndicator color="#fff" />
//                 <Text style={styles.buttonLoadingText}>
//                   {isLogin ? 'Signing in...' : 'Creating account...'}
//                 </Text>
//               </View>
//             ) : (
//               <View style={styles.buttonContent}>
//                 <Icon 
//                   name={isLogin ? "log-in" : "user-plus"} 
//                   size={18} 
//                   color="#fff" 
//                   style={styles.buttonIcon}
//                 />
//                 <Text style={styles.buttonText}>
//                   {isLogin ? 'Sign In' : 'Create Account'}
//                 </Text>
//               </View>
//             )}
//           </TouchableOpacity>
          
//           <View style={styles.divider}>
//             <View style={styles.dividerLine} />
//             <Text style={styles.dividerText}>or</Text>
//             <View style={styles.dividerLine} />
//           </View>
          
//           <TouchableOpacity onPress={toggleMode} activeOpacity={0.7}>
//             <Text style={styles.toggleText}>
//               {isLogin
//                 ? "Don't have an account? "
//                 : 'Already have an account? '}
//               <Text style={styles.toggleTextBold}>
//                 {isLogin ? 'Sign Up' : 'Sign In'}
//               </Text>
//             </Text>
//           </TouchableOpacity>
//         </Animated.View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f1f5f9',
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 24,
//   },
//   formContainer: {
//     width: '100%',
//     maxWidth: 440,
//     backgroundColor: '#ffffff',
//     borderRadius: 28,
//     padding: 32,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.15,
//     shadowRadius: 20,
//     elevation: 15,
//     borderWidth: 1,
//     borderColor: 'rgba(0, 0, 0, 0.03)',
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 36,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: '700',
//     color: '#1f2937',
//     marginBottom: 10,
//     textAlign: 'center',
//     letterSpacing: -0.5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#6b7280',
//     textAlign: 'center',
//     fontWeight: '400',
//   },
//   inputGroup: {
//     marginBottom: 24,
//   },
//   inputLabel: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 10,
//     letterSpacing: -0.3,
//   },
//   input: {
//     width: '100%',
//     height: 56,
//     backgroundColor: '#f9fafb',
//     borderRadius: 14,
//     paddingHorizontal: 18,
//     fontSize: 16,
//     color: '#1f2937',
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//   },
//   emailContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//   },
//   otpButton: {
//     backgroundColor: '#2563eb',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderRadius: 14,
//     minWidth: 120,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#2563eb',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   otpButtonSent: {
//     backgroundColor: '#059669',
//   },
//   otpButtonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   otpButtonIcon: {
//     marginRight: 8,
//   },
//   otpButtonText: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '600',
//     letterSpacing: -0.3,
//   },
//   otpSection: {
//     marginBottom: 28,
//     padding: 24,
//     backgroundColor: '#eff6ff',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: '#bfdbfe',
//   },
//   otpHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 16,
//   },
//   otpLabel: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#1f2937',
//     marginLeft: 10,
//   },
//   otpDescription: {
//     fontSize: 15,
//     color: '#6b7280',
//     textAlign: 'center',
//     marginBottom: 24,
//     lineHeight: 22,
//   },
//   emailHighlight: {
//     fontWeight: '600',
//     color: '#2563eb',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 24,
//     paddingHorizontal: 12,
//   },
//   otpInput: {
//     width: 60,
//     height: 60,
//     borderWidth: 1.5,
//     borderColor: '#d1d5db',
//     borderRadius: 14,
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#1f2937',
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   otpInputFilled: {
//     borderColor: '#2563eb',
//     backgroundColor: '#eff6ff',
//     shadowColor: '#2563eb',
//     shadowOpacity: 0.2,
//   },
//   otpInputDisabled: {
//     backgroundColor: '#f3f4f6',
//     color: '#9ca3af',
//     borderColor: '#d1d5db',
//   },
//   verifyingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   verifyingText: {
//     marginLeft: 10,
//     fontSize: 15,
//     color: '#2563eb',
//     fontWeight: '500',
//   },
//   resendContainer: {
//     alignItems: 'center',
//   },
//   resendPrompt: {
//     fontSize: 14,
//     color: '#6b7280',
//     marginBottom: 6,
//   },
//   resendText: {
//     color: '#2563eb',
//     fontSize: 15,
//     fontWeight: '600',
//     letterSpacing: -0.3,
//   },
//   resendTextDisabled: {
//     color: '#9ca3af',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f9fafb',
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     paddingHorizontal: 18,
//     height: 56,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//   },
//   passwordInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#1f2937',
//     paddingRight: 12,
//   },
//   eyeIcon: {
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     width: '100%',
//     height: 56,
//     backgroundColor: '#2563eb',
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 28,
//     shadowColor: '#2563eb',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.3,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   buttonDisabled: {
//     backgroundColor: '#9ca3af',
//     shadowOpacity: 0.1,
//   },
//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   buttonIcon: {
//     marginRight: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     letterSpacing: -0.3,
//   },
//   buttonLoadingContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   buttonLoadingText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 12,
//     letterSpacing: -0.3,
//   },
//   divider: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 28,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#d1d5db',
//   },
//   dividerText: {
//     marginHorizontal: 16,
//     fontSize: 15,
//     color: '#6b7280',
//     fontWeight: '500',
//   },
//   toggleText: {
//     color: '#6b7280',
//     fontSize: 16,
//     textAlign: 'center',
//     lineHeight: 24,
//     fontWeight: '400',
//   },
//   toggleTextBold: {
//     color: '#2563eb',
//     fontWeight: '600',
//   },
// });

// export default LoginScreen;

// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   Animated,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   loginUser, 
//   sendOTP, 
//   resendOTP, 
//   registerWithOTP, 
//   clearError, 
//   clearOtpState,
//   resetRegistrationState 
// } from '../store/slices/userSlice';
// import Icon from 'react-native-vector-icons/Feather';

// const OTPInput = ({ otp, setOtp, disabled = false, onComplete }) => {
//   const [otpValues, setOtpValues] = useState(['', '', '', '']);
//   const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     const otpString = otpValues.join('');
//     setOtp(otpString);
    
//     // Auto-submit only once when 4 digits are entered
//     if (otpString.length === 4 && onComplete && !hasAutoSubmitted && !disabled) {
//       setHasAutoSubmitted(true);
//       onComplete(otpString);
//     }
//   }, [otpValues, setOtp, onComplete, hasAutoSubmitted, disabled]);

//   const handleOtpChange = (value, index) => {
//     if (value && !/^\d$/.test(value)) return;
    
//     const newOtpValues = [...otpValues];
//     newOtpValues[index] = value;
//     setOtpValues(newOtpValues);

//     // Reset auto-submit flag if OTP is modified
//     if (hasAutoSubmitted && newOtpValues.join('').length < 4) {
//       setHasAutoSubmitted(false);
//     }

//     if (value && index < 3) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.nativeEvent.key === 'Backspace' && !otpValues[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//       const newOtpValues = [...otpValues];
//       newOtpValues[index - 1] = '';
//       setOtpValues(newOtpValues);
//       // Reset auto-submit flag when clearing
//       if (hasAutoSubmitted) {
//         setHasAutoSubmitted(false);
//       }
//     }
//   };

//   useEffect(() => {
//     if (!otp) {
//       setOtpValues(['', '', '', '']);
//       setHasAutoSubmitted(false);
//     }
//   }, [otp]);

//   return (
//     <View style={styles.otpContainer}>
//       {otpValues.map((digit, index) => (
//         <TextInput
//           key={index}
//           ref={(ref) => (inputRefs.current[index] = ref)}
//           style={[
//             styles.otpInput,
//             digit && styles.otpInputFilled,
//             disabled && styles.otpInputDisabled
//           ]}
//           value={digit}
//           onChangeText={(value) => handleOtpChange(value, index)}
//           onKeyPress={(e) => handleKeyPress(e, index)}
//           keyboardType="numeric"
//           maxLength={1}
//           textAlign="center"
//           editable={!disabled}
//           selectTextOnFocus
//         />
//       ))}
//     </View>
//   );
// };

// const LoginScreen = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [resendTimer, setResendTimer] = useState(0);
//   const [autoSubmitting, setAutoSubmitting] = useState(false);
  
//   const dispatch = useDispatch();
//   const { 
//     loading, 
//     error, 
//     otpSent, 
//     otpLoading, 
//     otpError, 
//     verifyingOtp, 
//     registrationSuccess,
//     isAuthenticated 
//   } = useSelector((state) => state.user);

//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.95)).current;
//   const otpSlideAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         tension: 100,
//         friction: 8,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   useEffect(() => {
//     if (error || otpError) {
//       Alert.alert('Error', error || otpError);
//       dispatch(clearError());
//       setAutoSubmitting(false); // Reset auto-submit on error
//     }
//   }, [error, otpError, dispatch]);

//   useEffect(() => {
//     if (registrationSuccess) {
//       Alert.alert('Success', 'Registration successful! You are now logged in.');
//       dispatch(resetRegistrationState());
//     }
//   }, [registrationSuccess, dispatch]);

//   useEffect(() => {
//     let interval;
//     if (resendTimer > 0) {
//       interval = setInterval(() => {
//         setResendTimer((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [resendTimer]);

//   useEffect(() => {
//     if (otpSent) {
//       setResendTimer(60);
//       Animated.timing(otpSlideAnim, {
//         toValue: 1,
//         duration: 400,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(otpSlideAnim, {
//         toValue: 0,
//         duration: 400,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [otpSent]);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePhone = (phone) => {
//     const phoneRegex = /^\d{10}$/;
//     return phoneRegex.test(phone.replace(/\D/g, ''));
//   };

//   const handleSendOtp = async () => {
//     if (!email) {
//       Alert.alert('Error', 'Please enter your email address');
//       return;
//     }

//     if (!validateEmail(email)) {
//       Alert.alert('Error', 'Please enter a valid email address');
//       return;
//     }

//     if (!name) {
//       Alert.alert('Error', 'Please enter your name');
//       return;
//     }

//     dispatch(sendOTP({ email, name }));
//   };

//   const handleOtpComplete = async (otpValue) => {
//     if (otpValue.length === 4 && !autoSubmitting && !verifyingOtp) {
//       setAutoSubmitting(true);
//       // Ensure state is updated before proceeding
//       setOtp(otpValue);
//       await new Promise(resolve => setTimeout(resolve, 100)); // Small delay to ensure state update
//       handleRegisterWithOtp(otpValue);
//     }
//   };

//   const handleRegisterWithOtp = (otpValue = otp) => {
//     if (!name || !email || !phone || !password) {
//       Alert.alert('Error', 'Please fill all required fields');
//       setAutoSubmitting(false);
//       return;
//     }

//     if (!validatePhone(phone)) {
//       Alert.alert('Error', 'Please enter a valid 10-digit phone number');
//       setAutoSubmitting(false);
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       setAutoSubmitting(false);
//       return;
//     }

//     if (password.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters long');
//       setAutoSubmitting(false);
//       return;
//     }

//     if (otpValue.length !== 4) {
//       Alert.alert('Error', 'Please enter the complete 4-digit OTP');
//       setAutoSubmitting(false);
//       return;
//     }

//     dispatch(registerWithOTP({ 
//       name, 
//       email, 
//       phone: phone.replace(/\D/g, ''),
//       password, 
//       otp: otpValue 
//     }));
//   };

//   const handleResendOtp = () => {
//     if (resendTimer === 0) {
//       setOtp('');
//       dispatch(resendOTP({ email }));
//     }
//   };

//   const handleLogin = () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     if (!validateEmail(email)) {
//       Alert.alert('Error', 'Please enter a valid email address');
//       return;
//     }

//     dispatch(loginUser({ email, password }));
//   };

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     setEmail('');
//     setPassword('');
//     setName('');
//     setPhone('');
//     setConfirmPassword('');
//     setShowPassword(false);
//     setShowConfirmPassword(false);
//     setOtp('');
//     setResendTimer(0);
//     setAutoSubmitting(false);
//     dispatch(clearOtpState());
//     dispatch(clearError());
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const formatPhone = (value) => {
//     const digits = value.replace(/\D/g, '');
//     if (digits.length <= 3) {
//       return digits;
//     } else if (digits.length <= 6) {
//       return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
//     } else {
//       return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
//     }
//   };

//   const handlePhoneChange = (value) => {
//     const formatted = formatPhone(value);
//     setPhone(formatted);
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <Animated.View
//           style={[
//             styles.formContainer,
//             {
//               opacity: fadeAnim,
//               transform: [{ scale: scaleAnim }],
//             },
//           ]}
//         >
//           <View style={styles.header}>
//             <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
//             <Text style={styles.subtitle}>
//               {isLogin ? 'Sign in to continue' : 'Join us today'}
//             </Text>
//           </View>
          
//           {!isLogin && (
//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Full Name</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your full name"
//                 placeholderTextColor="#9ca3af"
//                 value={name}
//                 onChangeText={setName}
//                 autoCapitalize="words"
//               />
//             </View>
//           )}
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Email Address</Text>
//             <View style={styles.emailContainer}>
//               <TextInput
//                 style={[styles.input, !isLogin && { marginBottom: 0, marginRight: 12, flex: 1 }]}
//                 placeholder="Enter your email"
//                 placeholderTextColor="#9ca3af"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 editable={!otpSent || isLogin}
//               />
//               {!isLogin && (
//                 <TouchableOpacity
//                   style={[
//                     styles.otpButton,
//                     otpSent && styles.otpButtonSent
//                   ]}
//                   onPress={handleSendOtp}
//                   disabled={otpLoading || otpSent}
//                   activeOpacity={0.7}
//                 >
//                   {otpLoading ? (
//                     <ActivityIndicator size="small" color="#fff" />
//                   ) : (
//                     <View style={styles.otpButtonContent}>
//                       <Icon 
//                         name={otpSent ? "check" : "mail"} 
//                         size={16} 
//                         color="#fff" 
//                         style={styles.otpButtonIcon}
//                       />
//                       <Text style={styles.otpButtonText}>
//                         {otpSent ? 'Sent' : 'Send OTP'}
//                       </Text>
//                     </View>
//                   )}
//                 </TouchableOpacity>
//               )}
//             </View>
//           </View>

//           {!isLogin && (
//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Phone Number</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="(123) 456-7890"
//                 placeholderTextColor="#9ca3af"
//                 value={phone}
//                 onChangeText={handlePhoneChange}
//                 keyboardType="phone-pad"
//                 maxLength={14}
//               />
//             </View>
//           )}

//           {!isLogin && otpSent && (
//             <Animated.View
//               style={[
//                 styles.otpSection,
//                 {
//                   opacity: otpSlideAnim,
//                   transform: [
//                     {
//                       translateY: otpSlideAnim.interpolate({
//                         inputRange: [0, 1],
//                         outputRange: [-30, 0],
//                       }),
//                     },
//                   ],
//                 },
//               ]}
//             >
//               <View style={styles.otpHeader}>
//                 <Icon name="shield" size={24} color="#2563eb" />
//                 <Text style={styles.otpLabel}>Verify Your Email</Text>
//               </View>
//               <Text style={styles.otpDescription}>
//                 Enter the 4-digit code sent to{'\n'}
//                 <Text style={styles.emailHighlight}>{email}</Text>
//               </Text>
              
//               <OTPInput 
//                 otp={otp} 
//                 setOtp={setOtp} 
//                 disabled={verifyingOtp || autoSubmitting}
//                 onComplete={handleOtpComplete}
//               />
              
//               {(verifyingOtp || autoSubmitting) && (
//                 <View style={styles.verifyingContainer}>
//                   <ActivityIndicator size="small" color="#2563eb" />
//                   <Text style={styles.verifyingText}>Verifying OTP...</Text>
//                 </View>
//               )}
              
//               <View style={styles.resendContainer}>
//                 <Text style={styles.resendPrompt}>Didn't receive the code?</Text>
//                 <TouchableOpacity
//                   onPress={handleResendOtp}
//                   disabled={resendTimer > 0}
//                   activeOpacity={0.7}
//                 >
//                   <Text style={[styles.resendText, resendTimer > 0 && styles.resendTextDisabled]}>
//                     {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </Animated.View>
//           )}
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Password</Text>
//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Enter your password"
//                 placeholderTextColor="#9ca3af"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={togglePasswordVisibility}
//                 activeOpacity={0.7}
//               >
//                 <Icon
//                   name={showPassword ? 'eye' : 'eye-off'}
//                   size={20}
//                   color="#6b7280"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
          
//           {!isLogin && (
//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Confirm Password</Text>
//               <View style={styles.passwordContainer}>
//                 <TextInput
//                   style={styles.passwordInput}
//                   placeholder="Confirm your password"
//                   placeholderTextColor="#9ca3af"
//                   value={confirmPassword}
//                   onChangeText={setConfirmPassword}
//                   secureTextEntry={!showConfirmPassword}
//                 />
//                 <TouchableOpacity
//                   style={styles.eyeIcon}
//                   onPress={toggleConfirmPasswordVisibility}
//                   activeOpacity={0.7}
//                 >
//                   <Icon
//                     name={showConfirmPassword ? 'eye' : 'eye-off'}
//                     size={20}
//                     color="#6b7280"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
          
//           <TouchableOpacity 
//             style={[
//               styles.button,
//               (!isLogin && !otpSent) && styles.buttonDisabled
//             ]} 
//             onPress={isLogin ? handleLogin : handleRegisterWithOtp}
//             disabled={loading || verifyingOtp || (!isLogin && !otpSent)}
//             activeOpacity={0.7}
//           >
//             {(loading || verifyingOtp) ? (
//               <View style={styles.buttonLoadingContent}>
//                 <ActivityIndicator color="#fff" />
//                 <Text style={styles.buttonLoadingText}>
//                   {isLogin ? 'Signing in...' : 'Creating account...'}
//                 </Text>
//               </View>
//             ) : (
//               <View style={styles.buttonContent}>
//                 <Icon 
//                   name={isLogin ? "log-in" : "user-plus"} 
//                   size={18} 
//                   color="#fff" 
//                   style={styles.buttonIcon}
//                 />
//                 <Text style={styles.buttonText}>
//                   {isLogin ? 'Sign In' : 'Create Account'}
//                 </Text>
//               </View>
//             )}
//           </TouchableOpacity>
          
//           <View style={styles.divider}>
//             <View style={styles.dividerLine} />
//             <Text style={styles.dividerText}>or</Text>
//             <View style={styles.dividerLine} />
//           </View>
          
//           <TouchableOpacity onPress={toggleMode} activeOpacity={0.7}>
//             <Text style={styles.toggleText}>
//               {isLogin
//                 ? "Don't have an account? "
//                 : 'Already have an account? '}
//               <Text style={styles.toggleTextBold}>
//                 {isLogin ? 'Sign Up' : 'Sign In'}
//               </Text>
//             </Text>
//           </TouchableOpacity>
//         </Animated.View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f1f5f9',
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 24,
//   },
//   formContainer: {
//     width: '100%',
//     maxWidth: 440,
//     backgroundColor: '#ffffff',
//     borderRadius: 28,
//     padding: 32,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.15,
//     shadowRadius: 20,
//     elevation: 15,
//     borderWidth: 1,
//     borderColor: 'rgba(0, 0, 0, 0.03)',
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 36,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: '700',
//     color: '#1f2937',
//     marginBottom: 10,
//     textAlign: 'center',
//     letterSpacing: -0.5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#6b7280',
//     textAlign: 'center',
//     fontWeight: '400',
//   },
//   inputGroup: {
//     marginBottom: 24,
//   },
//   inputLabel: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 10,
//     letterSpacing: -0.3,
//   },
//   input: {
//     width: '100%',
//     height: 56,
//     backgroundColor: '#f9fafb',
//     borderRadius: 14,
//     paddingHorizontal: 18,
//     fontSize: 16,
//     color: '#1f2937',
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//   },
//   emailContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//   },
//   otpButton: {
//     backgroundColor: '#2563eb',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderRadius: 14,
//     minWidth: 120,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#2563eb',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   otpButtonSent: {
//     backgroundColor: '#059669',
//   },
//   otpButtonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   otpButtonIcon: {
//     marginRight: 8,
//   },
//   otpButtonText: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '600',
//     letterSpacing: -0.3,
//   },
//   otpSection: {
//     marginBottom: 28,
//     padding: 24,
//     backgroundColor: '#eff6ff',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: '#bfdbfe',
//   },
//   otpHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 16,
//   },
//   otpLabel: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#1f2937',
//     marginLeft: 10,
//   },
//   otpDescription: {
//     fontSize: 15,
//     color: '#6b7280',
//     textAlign: 'center',
//     marginBottom: 24,
//     lineHeight: 22,
//   },
//   emailHighlight: {
//     fontWeight: '600',
//     color: '#2563eb',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 24,
//     paddingHorizontal: 12,
//   },
//   otpInput: {
//     width: 60,
//     height: 60,
//     borderWidth: 1.5,
//     borderColor: '#d1d5db',
//     borderRadius: 14,
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#1f2937',
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   otpInputFilled: {
//     borderColor: '#2563eb',
//     backgroundColor: '#eff6ff',
//     shadowColor: '#2563eb',
//     shadowOpacity: 0.2,
//   },
//   otpInputDisabled: {
//     backgroundColor: '#f3f4f6',
//     color: '#9ca3af',
//     borderColor: '#d1d5db',
//   },
//   verifyingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   verifyingText: {
//     marginLeft: 10,
//     fontSize: 15,
//     color: '#2563eb',
//     fontWeight: '500',
//   },
//   resendContainer: {
//     alignItems: 'center',
//   },
//   resendPrompt: {
//     fontSize: 14,
//     color: '#6b7280',
//     marginBottom: 6,
//   },
//   resendText: {
//     color: '#2563eb',
//     fontSize: 15,
//     fontWeight: '600',
//     letterSpacing: -0.3,
//   },
//   resendTextDisabled: {
//     color: '#9ca3af',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f9fafb',
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     paddingHorizontal: 18,
//     height: 56,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//   },
//   passwordInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#1f2937',
//     paddingRight: 12,
//   },
//   eyeIcon: {
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     width: '100%',
//     height: 56,
//     backgroundColor: '#2563eb',
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 28,
//     shadowColor: '#2563eb',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.3,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   buttonDisabled: {
//     backgroundColor: '#9ca3af',
//     shadowOpacity: 0.1,
//   },
//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   buttonIcon: {
//     marginRight: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     letterSpacing: -0.3,
//   },
//   buttonLoadingContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   buttonLoadingText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 12,
//     letterSpacing: -0.3,
//   },
//   divider: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 28,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#d1d5db',
//   },
//   dividerText: {
//     marginHorizontal: 16,
//     fontSize: 15,
//     color: '#6b7280',
//     fontWeight: '500',
//   },
//   toggleText: {
//     color: '#6b7280',
//     fontSize: 16,
//     textAlign: 'center',
//     lineHeight: 24,
//     fontWeight: '400',
//   },
//   toggleTextBold: {
//     color: '#2563eb',
//     fontWeight: '600',
//   },
// });

//export default LoginScreen;

// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   Animated,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Dimensions,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   loginUser, 
//   sendOTP, 
//   resendOTP, 
//   registerWithOTP, 
//   clearError, 
//   clearOtpState,
//   resetRegistrationState 
// } from '../store/slices/userSlice';
// import Icon from 'react-native-vector-icons/Feather';

// const { width } = Dimensions.get('window');

// const OTPInput = ({ otp, setOtp, disabled = false, onComplete }) => {
//   const [otpValues, setOtpValues] = useState(['', '', '', '']);
//   const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     const otpString = otpValues.join('');
//     setOtp(otpString);
    
//     // Auto-submit only once when 4 digits are entered
//     if (otpString.length === 4 && onComplete && !hasAutoSubmitted && !disabled) {
//       setHasAutoSubmitted(true);
//       onComplete(otpString);
//     }
//   }, [otpValues, setOtp, onComplete, hasAutoSubmitted, disabled]);

//   const handleOtpChange = (value, index) => {
//     if (value && !/^\d$/.test(value)) return;
    
//     const newOtpValues = [...otpValues];
//     newOtpValues[index] = value;
//     setOtpValues(newOtpValues);

//     // Reset auto-submit flag if OTP is modified
//     if (hasAutoSubmitted && newOtpValues.join('').length < 4) {
//       setHasAutoSubmitted(false);
//     }

//     if (value && index < 3) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.nativeEvent.key === 'Backspace' && !otpValues[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//       const newOtpValues = [...otpValues];
//       newOtpValues[index - 1] = '';
//       setOtpValues(newOtpValues);
//       // Reset auto-submit flag when clearing
//       if (hasAutoSubmitted) {
//         setHasAutoSubmitted(false);
//       }
//     }
//   };

//   useEffect(() => {
//     if (!otp) {
//       setOtpValues(['', '', '', '']);
//       setHasAutoSubmitted(false);
//     }
//   }, [otp]);

//   return (
//     <View style={styles.otpContainer}>
//       {otpValues.map((digit, index) => (
//         <TextInput
//           key={index}
//           ref={(ref) => (inputRefs.current[index] = ref)}
//           style={[
//             styles.otpInput,
//             digit && styles.otpInputFilled,
//             disabled && styles.otpInputDisabled
//           ]}
//           value={digit}
//           onChangeText={(value) => handleOtpChange(value, index)}
//           onKeyPress={(e) => handleKeyPress(e, index)}
//           keyboardType="numeric"
//           maxLength={1}
//           textAlign="center"
//           editable={!disabled}
//           selectTextOnFocus
//         />
//       ))}
//     </View>
//   );
// };

// const LoginScreen = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [resendTimer, setResendTimer] = useState(0);
//   const [autoSubmitting, setAutoSubmitting] = useState(false);
//   const [formComplete, setFormComplete] = useState(false);
  
//   const dispatch = useDispatch();
//   const { 
//     loading, 
//     error, 
//     otpSent, 
//     otpLoading, 
//     otpError, 
//     verifyingOtp, 
//     registrationSuccess,
//     isAuthenticated 
//   } = useSelector((state) => state.user);

//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.95)).current;
//   const otpFadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         tension: 100,
//         friction: 8,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   useEffect(() => {
//     if (error || otpError) {
//       Alert.alert('Error', error || otpError);
//       dispatch(clearError());
//       setAutoSubmitting(false); // Reset auto-submit on error
//     }
//   }, [error, otpError, dispatch]);

//   useEffect(() => {
//     if (registrationSuccess) {
//       Alert.alert('Success', 'Registration successful! You are now logged in.');
//       dispatch(resetRegistrationState());
//     }
//   }, [registrationSuccess, dispatch]);

//   useEffect(() => {
//     let interval;
//     if (resendTimer > 0) {
//       interval = setInterval(() => {
//         setResendTimer((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [resendTimer]);

//   useEffect(() => {
//     if (otpSent) {
//       setResendTimer(60);
//       Animated.timing(otpFadeAnim, {
//         toValue: 1,
//         duration: 400,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(otpFadeAnim, {
//         toValue: 0,
//         duration: 400,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [otpSent]);

//   // Check if all required fields for registration are filled
//   useEffect(() => {
//     if (!isLogin) {
//       const isNameValid = name.trim() !== '';
//       const isEmailValid = validateEmail(email);
//       const isPhoneValid = validatePhone(phone);
//       const isPasswordValid = password.length >= 6;
//       const isConfirmPasswordValid = confirmPassword === password && confirmPassword !== '';
      
//       setFormComplete(
//         isNameValid && 
//         isEmailValid && 
//         isPhoneValid && 
//         isPasswordValid && 
//         isConfirmPasswordValid
//       );
//     }
//   }, [isLogin, name, email, phone, password, confirmPassword]);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePhone = (phone) => {
//     const phoneRegex = /^\d{10}$/;
//     return phoneRegex.test(phone.replace(/\D/g, ''));
//   };

//   const handleSendOtp = async () => {
//     if (!name) {
//       Alert.alert('Error', 'Please enter your name');
//       return;
//     }

//     if (!email) {
//       Alert.alert('Error', 'Please enter your email address');
//       return;
//     }

//     if (!validateEmail(email)) {
//       Alert.alert('Error', 'Please enter a valid email address');
//       return;
//     }

//     if (!validatePhone(phone)) {
//       Alert.alert('Error', 'Please enter a valid 10-digit phone number');
//       return;
//     }

//     if (!password) {
//       Alert.alert('Error', 'Please enter a password');
//       return;
//     }

//     if (password.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters long');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     dispatch(sendOTP({ email, name }));
//   };

//   const handleOtpComplete = async (otpValue) => {
//     if (otpValue.length === 4 && !autoSubmitting && !verifyingOtp) {
//       setAutoSubmitting(true);
//       // Ensure state is updated before proceeding
//       setOtp(otpValue);
//       await new Promise(resolve => setTimeout(resolve, 100)); // Small delay to ensure state update
//       handleRegisterWithOtp(otpValue);
//     }
//   };

//   const handleRegisterWithOtp = (otpValue = otp) => {
//     if (!name || !email || !phone || !password) {
//       Alert.alert('Error', 'Please fill all required fields');
//       setAutoSubmitting(false);
//       return;
//     }

//     if (!validatePhone(phone)) {
//       Alert.alert('Error', 'Please enter a valid 10-digit phone number');
//       setAutoSubmitting(false);
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       setAutoSubmitting(false);
//       return;
//     }

//     if (password.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters long');
//       setAutoSubmitting(false);
//       return;
//     }

//     if (otpValue.length !== 4) {
//       Alert.alert('Error', 'Please enter the complete 4-digit OTP');
//       setAutoSubmitting(false);
//       return;
//     }

//     dispatch(registerWithOTP({ 
//       name, 
//       email, 
//       phone: phone.replace(/\D/g, ''),
//       password, 
//       otp: otpValue 
//     }));
//   };

//   const handleResendOtp = () => {
//     if (resendTimer === 0) {
//       setOtp('');
//       dispatch(resendOTP({ email }));
//     }
//   };

//   const handleLogin = () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     if (!validateEmail(email)) {
//       Alert.alert('Error', 'Please enter a valid email address');
//       return;
//     }

//     dispatch(loginUser({ email, password }));
//   };

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     setEmail('');
//     setPassword('');
//     setName('');
//     setPhone('');
//     setConfirmPassword('');
//     setShowPassword(false);
//     setShowConfirmPassword(false);
//     setOtp('');
//     setResendTimer(0);
//     setAutoSubmitting(false);
//     setFormComplete(false);
//     dispatch(clearOtpState());
//     dispatch(clearError());
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const formatPhone = (value) => {
//     const digits = value.replace(/\D/g, '');
//     if (digits.length <= 3) {
//       return digits;
//     } else if (digits.length <= 6) {
//       return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
//     } else {
//       return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
//     }
//   };

//   const handlePhoneChange = (value) => {
//     const formatted = formatPhone(value);
//     setPhone(formatted);
//   };

//   const renderOtpSection = () => {
//     if (!isLogin && otpSent) {
//       return (
//         <Animated.View
//           style={[
//             styles.otpSection,
//             {
//               opacity: otpFadeAnim,
//             },
//           ]}
//         >
//           <View style={styles.otpHeader}>
//             <View style={styles.otpIconContainer}>
//               <Icon name="shield" size={20} color="#ffffff" />
//             </View>
//             <Text style={styles.otpLabel}>Verify Your Email</Text>
//           </View>
          
//           <Text style={styles.otpDescription}>
//             Enter the 4-digit code sent to{' '}
//             <Text style={styles.emailHighlight}>{email}</Text>
//           </Text>
          
//           <OTPInput 
//             otp={otp} 
//             setOtp={setOtp} 
//             disabled={verifyingOtp || autoSubmitting}
//             onComplete={handleOtpComplete}
//           />
          
//           {(verifyingOtp || autoSubmitting) && (
//             <View style={styles.verifyingContainer}>
//               <ActivityIndicator size="small" color="#2563eb" />
//               <Text style={styles.verifyingText}>Verifying OTP...</Text>
//             </View>
//           )}
          
//           <View style={styles.resendContainer}>
//             <Text style={styles.resendPrompt}>Didn't receive the code?</Text>
//             <TouchableOpacity
//               onPress={handleResendOtp}
//               disabled={resendTimer > 0}
//               activeOpacity={0.7}
//             >
//               <Text style={[styles.resendText, resendTimer > 0 && styles.resendTextDisabled]}>
//                 {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       );
//     }
//     return null;
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <Animated.View
//           style={[
//             styles.formContainer,
//             {
//               opacity: fadeAnim,
//               transform: [{ scale: scaleAnim }],
//             },
//           ]}
//         >
//           {/*<View style={styles.brandHeader}>
//             <View style={styles.logoContainer}>
//               <Icon name="unlock" size={28} color="#ffffff" />
//             </View>
//             <Text style={styles.brandName}>SecureAuth</Text>
//           </View>*/}
          
//           <View style={styles.header}>
//             <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
//             <Text style={styles.subtitle}>
//               {isLogin ? 'Sign in to continue' : 'Join us today'}
//             </Text>
//           </View>
          
//           {!isLogin && (
//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Full Name</Text>
//               <View style={styles.inputContainer}>
//                 <Icon name="user" size={20} color="#9ca3af" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your full name"
//                   placeholderTextColor="#9ca3af"
//                   value={name}
//                   onChangeText={setName}
//                   autoCapitalize="words"
//                 />
//               </View>
//             </View>
//           )}
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Email Address</Text>
//             <View style={styles.inputContainer}>
//               <Icon name="mail" size={20} color="#9ca3af" style={styles.inputIcon} />
//               <TextInput
//                 style={[styles.input, !isLogin && otpSent && styles.inputDisabled]}
//                 placeholder="Enter your email"
//                 placeholderTextColor="#9ca3af"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 editable={!otpSent || isLogin}
//               />
//               {!isLogin && (
//                 <TouchableOpacity
//                   style={[
//                     styles.otpButton,
//                     otpSent && styles.otpButtonSent,
//                     (!formComplete || otpSent) && styles.otpButtonDisabled
//                   ]}
//                   onPress={handleSendOtp}
//                   disabled={otpLoading || otpSent || !formComplete}
//                   activeOpacity={0.7}
//                 >
//                   {otpLoading ? (
//                     <ActivityIndicator size="small" color="#fff" />
//                   ) : (
//                     <Text style={styles.otpButtonText}>
//                       {otpSent ? 'Sent' : 'OTP'}
//                     </Text>
//                   )}
//                 </TouchableOpacity>
//               )}
//             </View>
//           </View>

//           {!isLogin && (
//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Phone Number</Text>
//               <View style={styles.inputContainer}>
//                 <Icon name="phone" size={20} color="#9ca3af" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="(123) 456-7890"
//                   placeholderTextColor="#9ca3af"
//                   value={phone}
//                   onChangeText={handlePhoneChange}
//                   keyboardType="phone-pad"
//                   maxLength={14}
//                 />
//               </View>
//             </View>
//           )}

//           {renderOtpSection()}
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Password</Text>
//             <View style={styles.inputContainer}>
//               <Icon name="lock" size={20} color="#9ca3af" style={styles.inputIcon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your password"
//                 placeholderTextColor="#9ca3af"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={togglePasswordVisibility}
//                 activeOpacity={0.7}
//               >
//                 <Icon
//                   name={showPassword ? 'eye' : 'eye-off'}
//                   size={20}
//                   color="#6b7280"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
          
//           {!isLogin && (
//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Confirm Password</Text>
//               <View style={styles.inputContainer}>
//                 <Icon name="lock" size={20} color="#9ca3af" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Confirm your password"
//                   placeholderTextColor="#9ca3af"
//                   value={confirmPassword}
//                   onChangeText={setConfirmPassword}
//                   secureTextEntry={!showConfirmPassword}
//                 />
//                 <TouchableOpacity
//                   style={styles.eyeIcon}
//                   onPress={toggleConfirmPasswordVisibility}
//                   activeOpacity={0.7}
//                 >
//                   <Icon
//                     name={showConfirmPassword ? 'eye' : 'eye-off'}
//                     size={20}
//                     color="#6b7280"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
          
//           {isLogin && (
//             <TouchableOpacity 
//               activeOpacity={0.7}
//               style={styles.forgotPasswordContainer}
//             >
//               <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//             </TouchableOpacity>
//           )}
          
//           <TouchableOpacity 
//             style={[
//               styles.button,
//               (!isLogin && !otpSent) && styles.buttonDisabled
//             ]} 
//             onPress={isLogin ? handleLogin : handleRegisterWithOtp}
//             disabled={loading || verifyingOtp || (!isLogin && !otpSent)}
//             activeOpacity={0.7}
//           >
//             {(loading || verifyingOtp) ? (
//               <View style={styles.buttonLoadingContent}>
//                 <ActivityIndicator color="#fff" />
//                 <Text style={styles.buttonLoadingText}>
//                   {isLogin ? 'Signing in...' : 'Creating account...'}
//                 </Text>
//               </View>
//             ) : (
//               <Text style={styles.buttonText}>
//                 {isLogin ? 'Sign In' : 'Create Account'}
//               </Text>
//             )}
//           </TouchableOpacity>
          
//           {/*<View style={styles.divider}>
//             <View style={styles.dividerLine} />
//             <Text style={styles.dividerText}>or</Text>
//             <View style={styles.dividerLine} />
//           </View>
          
//           <TouchableOpacity 
//             style={styles.socialButton}
//             activeOpacity={0.7}
//           >
//             <Icon name="github" size={20} color="#1f2937" style={styles.socialIcon} />
//             <Text style={styles.socialButtonText}>
//               Continue with GitHub
//             </Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={[styles.socialButton, styles.googleButton]}
//             activeOpacity={0.7}
//           >
//             <Icon name="chrome" size={20} color="#1f2937" style={styles.socialIcon} />
//             <Text style={styles.socialButtonText}>
//               Continue with Google
//             </Text>
//           </TouchableOpacity>*/}
          
//           <TouchableOpacity onPress={toggleMode} activeOpacity={0.7}>
//             <Text style={styles.toggleText}>
//               {isLogin
//                 ? "Don't have an account? "
//                 : 'Already have an account? '}
//               <Text style={styles.toggleTextBold}>
//                 {isLogin ? 'Sign Up' : 'Sign In'}
//               </Text>
//             </Text>
//           </TouchableOpacity>
//         </Animated.View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8fafc',
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   formContainer: {
//     width: '100%',
//     maxWidth: 440,
//     backgroundColor: '#ffffff',
//     borderRadius: 24,
//     padding: 24,
//     marginTop: 24,
//     alignSelf: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 8,
//     borderWidth: 1,
//     borderColor: 'rgba(226, 232, 240, 0.7)',
//   },
//   brandHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 24,
//   },
//   logoContainer: {
//     width: 50,
//     height: 50,
//     backgroundColor: '#2563eb',
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#2563eb',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//     marginRight: 12,
//   },
//   brandName: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1e3a8a',
//     letterSpacing: -0.5,
//   },
//   header: {
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: '700',
//     color: '#1f2937',
//     marginBottom: 8,
//     textAlign: 'center',
//     letterSpacing: -0.5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#64748b',
//     textAlign: 'center',
//     fontWeight: '400',
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   inputLabel: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#334155',
//     marginBottom: 8,
//     letterSpacing: -0.3,
//     paddingLeft: 4,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f8fafc',
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#e2e8f0',
//     overflow: 'hidden',
//   },
//   inputIcon: {
//     padding: 15,
//   },
//   input: {
//     flex: 1,
//     height: 54,
//     fontSize: 16,
//     color: '#1f2937',
//     paddingVertical: 0, // Fix for Android
//   },
//   inputDisabled: {
//     backgroundColor: '#f1f5f9',
//     color: '#64748b',
//   },
//   eyeIcon: {
//     padding: 15,
//   },
//   otpButton: {
//     backgroundColor: '#2563eb',
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//     margin: 7,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#2563eb',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   otpButtonSent: {
//     backgroundColor: '#059669',
//   },
//   otpButtonDisabled: {
//     backgroundColor: '#94a3b8',
//     shadowOpacity: 0.1,
//   },
//   otpButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   otpSection: {
//     marginBottom: 20,
//     padding: 16,
//     backgroundColor: '#f0f9ff',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: '#bae6fd',
//   },
//   otpHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   otpIconContainer: {
//     width: 36,
//     height: 36,
//     backgroundColor: '#2563eb',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 10,
//   },
//   otpLabel: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#334155',
//   },
//   otpDescription: {
//     fontSize: 15,
//     color: '#64748b',
//     marginBottom: 16,
//     lineHeight: 20,
//   },
//   emailHighlight: {
//     fontWeight: '600',
//     color: '#2563eb',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   otpInput: {
//     width: width < 380 ? 50 : 55,
//     height: width < 380 ? 50 : 55,
//     borderWidth: 1.5,
//     borderColor: '#cbd5e1',
//     borderRadius: 12,
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#334155',
//     backgroundColor: '#fff',
//     shadowColor: '#64748b',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   otpInputFilled: {
//     borderColor: '#2563eb',
//     backgroundColor: '#eff6ff',
//     shadowColor: '#2563eb',
//     shadowOpacity: 0.15,
//   },
//   otpInputDisabled: {
//     backgroundColor: '#f1f5f9',
//     color: '#94a3b8',
//     borderColor: '#cbd5e1',
//   },
//   verifyingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 12,
//   },
//   verifyingText: {
//     marginLeft: 10,
//     fontSize: 14,
//     color: '#2563eb',
//     fontWeight: '500',
//   },
//   resendContainer: {
//     alignItems: 'center',
//   },
//   resendPrompt: {
//     fontSize: 14,
//     color: '#64748b',
//     marginBottom: 4,
//   },
//   resendText: {
//     color: '#2563eb',
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   resendTextDisabled: {
//     color: '#94a3b8',
//   },
//   forgotPasswordContainer: {
//     alignItems: 'flex-end',
//     marginBottom: 20,
//   },
//   forgotPasswordText: {
//     color: '#2563eb',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   button: {
//     width: '100%',
//     height: 54,
//     backgroundColor: '#2563eb',
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//     shadowColor: '#2563eb',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.25,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   buttonDisabled: {
//     backgroundColor: '#94a3b8',
//     shadowOpacity: 0.1,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     letterSpacing: -0.3,
//   },
//   buttonLoadingContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   buttonLoadingText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 12,
//     letterSpacing: -0.3,
//   },
//   divider: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 16,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#e2e8f0',
//   },
//   dividerText: {
//     marginHorizontal: 16,
//     fontSize: 14,
//     color: '#64748b',
//     fontWeight: '500',
//   },
//   socialButton: {
//     width: '100%',
//     height: 50,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#f8fafc',
//     borderRadius: 14,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#e2e8f0',
//   },
//   googleButton: {
//     marginBottom: 24,
//   },
//   socialIcon: {
//     marginRight: 10,
//   },
//   socialButtonText: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#334155',
//   },
//   toggleText: {
//     color: '#64748b',
//     fontSize: 15,
//     textAlign: 'center',
//     lineHeight: 24,
//     fontWeight: '400',
//   },
//   toggleTextBold: {
//     color: '#2563eb',
//     fontWeight: '600',
//   },
// });

// export default LoginScreen;

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  sendOTP,
  resendOTP,
  registerWithOTP,
  clearError,
  clearOtpState,
  resetRegistrationState,
  // New imports for forgot password
  sendPasswordResetOTP,
  verifyPasswordResetOTP,
  resetPassword,
  resetPasswordResetState,
} from '../store/slices/userSlice';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const OTPInput = ({ otp, setOtp, disabled = false, onComplete }) => {
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const otpString = otpValues.join('');
    setOtp(otpString);

    if (otpString.length === 4 && onComplete && !hasAutoSubmitted && !disabled) {
      setHasAutoSubmitted(true);
      onComplete(otpString);
    }
  }, [otpValues, setOtp, onComplete, hasAutoSubmitted, disabled]);

  const handleOtpChange = (value, index) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (hasAutoSubmitted && newOtpValues.join('').length < 4) {
      setHasAutoSubmitted(false);
    }

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = '';
      setOtpValues(newOtpValues);
      if (hasAutoSubmitted) {
        setHasAutoSubmitted(false);
      }
    }
  };

  useEffect(() => {
    if (!otp) {
      setOtpValues(['', '', '', '']);
      setHasAutoSubmitted(false);
    }
  }, [otp]);

  return (
    <View style={styles.otpContainer}>
      {otpValues.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[
            styles.otpInput,
            digit && styles.otpInputFilled,
            disabled && styles.otpInputDisabled,
          ]}
          value={digit}
          onChangeText={(value) => handleOtpChange(value, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          editable={!disabled}
          selectTextOnFocus
        />
      ))}
    </View>
  );
};

const LoginScreen = () => {
  // Updated state to include forgot password mode
  const [mode, setMode] = useState('login'); // 'login', 'register', 'forgotPassword'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [autoSubmitting, setAutoSubmitting] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  // New states for forgot password
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const dispatch = useDispatch();
  const {
    loading,
    error,
    otpSent,
    otpLoading,
    otpError,
    verifyingOtp,
    registrationSuccess,
    isAuthenticated,
    // New state properties for forgot password
    passwordResetOtpSent,
    passwordResetOtpVerified,
    passwordResetToken,
    passwordResetSuccess,
    passwordResetLoading,
    passwordResetError,
  } = useSelector((state) => state.user);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const otpFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (error || otpError || passwordResetError) {
      Alert.alert('Error', error || otpError || passwordResetError);
      dispatch(clearError());
      setAutoSubmitting(false);
    }
  }, [error, otpError, passwordResetError, dispatch]);

  useEffect(() => {
    if (registrationSuccess) {
      Alert.alert('Success', 'Registration successful! You are now logged in.');
      dispatch(resetRegistrationState());
    }
  }, [registrationSuccess, dispatch]);

  // New effect for password reset success
  useEffect(() => {
    if (passwordResetSuccess) {
      Alert.alert('Success', 'Password reset successful! Please sign in with your new password.');
      setMode('login');
      setEmail('');
      setNewPassword('');
      setConfirmNewPassword('');
      setOtp('');
      setResendTimer(0);
      setAutoSubmitting(false);
      dispatch(resetPasswordResetState());
    }
  }, [passwordResetSuccess, dispatch]);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    if (otpSent || passwordResetOtpSent) {
      setResendTimer(60);
      Animated.timing(otpFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(otpFadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [otpSent, passwordResetOtpSent]);

  // Updated form validation for all modes
  useEffect(() => {
    if (mode === 'register') {
      const isNameValid = name.trim() !== '';
      const isEmailValid = validateEmail(email);
      const isPhoneValid = validatePhone(phone);
      const isPasswordValid = password.length >= 6;
      const isConfirmPasswordValid = confirmPassword === password && confirmPassword !== '';

      setFormComplete(
        isNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isPasswordValid &&
        isConfirmPasswordValid
      );
    } else if (mode === 'forgotPassword') {
      if (passwordResetOtpVerified) {
        const isNewPasswordValid = newPassword.length >= 6;
        const isConfirmNewPasswordValid = confirmNewPassword === newPassword && confirmNewPassword !== '';
        setFormComplete(isNewPasswordValid && isConfirmNewPasswordValid);
      } else {
        setFormComplete(validateEmail(email));
      }
    } else {
      setFormComplete(validateEmail(email) && password.length >= 6);
    }
  }, [
    mode,
    name,
    email,
    phone,
    password,
    confirmPassword,
    newPassword,
    confirmNewPassword,
    passwordResetOtpVerified,
  ]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  const handleSendOtp = async () => {
    if (!name && mode === 'register') {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (mode === 'register') {
      if (!validatePhone(phone)) {
        Alert.alert('Error', 'Please enter a valid 10-digit phone number');
        return;
      }

      if (!password) {
        Alert.alert('Error', 'Please enter a password');
        return;
      }

      if (password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      dispatch(sendOTP({ email, name }));
    } else if (mode === 'forgotPassword') {
      dispatch(sendPasswordResetOTP({ email }));
    }
  };

  const handleOtpComplete = async (otpValue) => {
    if (otpValue.length === 4 && !autoSubmitting && !verifyingOtp && !passwordResetLoading) {
      setAutoSubmitting(true);
      setOtp(otpValue);
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (mode === 'register') {
        handleRegisterWithOtp(otpValue);
      } else if (mode === 'forgotPassword') {
        handleVerifyResetOtp(otpValue);
      }
    }
  };

  const handleRegisterWithOtp = (otpValue = otp) => {
    if (!name || !email || !phone || !password) {
      Alert.alert('Error', 'Please fill all required fields');
      setAutoSubmitting(false);
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      setAutoSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      setAutoSubmitting(false);
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      setAutoSubmitting(false);
      return;
    }

    if (otpValue.length !== 4) {
      Alert.alert('Error', 'Please enter the complete 4-digit OTP');
      setAutoSubmitting(false);
      return;
    }

    dispatch(
      registerWithOTP({
        name,
        email,
        phone: phone.replace(/\D/g, ''),
        password,
        otp: otpValue,
      })
    );
  };

  // New function to verify password reset OTP
  const handleVerifyResetOtp = (otpValue = otp) => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      setAutoSubmitting(false);
      return;
    }

    if (otpValue.length !== 4) {
      Alert.alert('Error', 'Please enter the complete 4-digit OTP');
      setAutoSubmitting(false);
      return;
    }

    dispatch(verifyPasswordResetOTP({ email, otp: otpValue }));
  };

  // New function to handle password reset
  const handleResetPassword = () => {
    if (!newPassword || !confirmNewPassword) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (!passwordResetToken) {
      Alert.alert('Error', 'Invalid reset token. Please try again.');
      return;
    }

    dispatch(resetPassword({ resetToken: passwordResetToken, newPassword }));
  };

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      setOtp('');
      if (mode === 'register') {
        dispatch(resendOTP({ email }));
      } else if (mode === 'forgotPassword') {
        dispatch(sendPasswordResetOTP({ email }));
      }
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  const toggleMode = (newMode) => {
    setMode(newMode);
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setConfirmPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
    setOtp('');
    setResendTimer(0);
    setAutoSubmitting(false);
    setFormComplete(false);
    dispatch(clearOtpState());
    dispatch(clearError());
    dispatch(resetPasswordResetState());
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (value) => {
    const formatted = formatPhone(value);
    setPhone(formatted);
  };

  const renderOtpSection = () => {
    if ((mode === 'register' && otpSent) || (mode === 'forgotPassword' && passwordResetOtpSent)) {
      return (
        <Animated.View
          style={[
            styles.otpSection,
            {
              opacity: otpFadeAnim,
            },
          ]}
        >
          <View style={styles.otpHeader}>
            <View style={styles.otpIconContainer}>
              <Icon name="shield" size={20} color="#ffffff" />
            </View>
            <Text style={styles.otpLabel}>Verify Your Email</Text>
          </View>

          <Text style={styles.otpDescription}>
            Enter the 4-digit code sent to{' '}
            <Text style={styles.emailHighlight}>{email}</Text>
          </Text>

          <OTPInput
            otp={otp}
            setOtp={setOtp}
            disabled={verifyingOtp || autoSubmitting || passwordResetLoading}
            onComplete={handleOtpComplete}
          />

          {(verifyingOtp || autoSubmitting || passwordResetLoading) && (
            <View style={styles.verifyingContainer}>
              <ActivityIndicator size="small" color="#2563eb" />
              <Text style={styles.verifyingText}>Verifying OTP...</Text>
            </View>
          )}

          <View style={styles.resendContainer}>
            <Text style={styles.resendPrompt}>Didn't receive the code?</Text>
            <TouchableOpacity
              onPress={handleResendOtp}
              disabled={resendTimer > 0}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.resendText, resendTimer > 0 && styles.resendTextDisabled]}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      );
    }
    return null;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[
            styles.formContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              {mode === 'login'
                ? 'Welcome Back'
                : mode === 'register'
                ? 'Create Account'
                : 'Reset Password'}
            </Text>
            <Text style={styles.subtitle}>
              {mode === 'login'
                ? 'Sign in to continue'
                : mode === 'register'
                ? 'Join us today'
                : 'Reset your password'}
            </Text>
          </View>

          {mode === 'register' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9ca3af"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Icon name="mail" size={20} color="#9ca3af" style={styles.inputIcon} />
              <TextInput
                style={[
                  styles.input,
                  (mode === 'register' && otpSent) ||
                  (mode === 'forgotPassword' && passwordResetOtpSent)
                    ? styles.inputDisabled
                    : null,
                ]}
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={
                  mode === 'login' ||
                  (mode === 'register' && !otpSent) ||
                  (mode === 'forgotPassword' && !passwordResetOtpSent)
                }
              />
              {(mode === 'register' || mode === 'forgotPassword') &&
                !passwordResetOtpVerified && (
                  <TouchableOpacity
                    style={[
                      styles.otpButton,
                      (mode === 'register' && otpSent) ||
                      (mode === 'forgotPassword' && passwordResetOtpSent)
                        ? styles.otpButtonSent
                        : null,
                      (!formComplete ||
                        (mode === 'register' && otpSent) ||
                        (mode === 'forgotPassword' && passwordResetOtpSent))
                        ? styles.otpButtonDisabled
                        : null,
                    ]}
                    onPress={handleSendOtp}
                    disabled={
                      otpLoading ||
                      passwordResetLoading ||
                      (mode === 'register' && otpSent) ||
                      (mode === 'forgotPassword' && passwordResetOtpSent) ||
                      !formComplete
                    }
                    activeOpacity={0.7}
                  >
                    {otpLoading || passwordResetLoading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.otpButtonText}>
                        {(mode === 'register' && otpSent) ||
                        (mode === 'forgotPassword' && passwordResetOtpSent)
                          ? 'Sent'
                          : 'OTP'}
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
            </View>
          </View>

          {mode === 'register' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <Icon name="phone" size={20} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="(123) 456-7890"
                  placeholderTextColor="#9ca3af"
                  value={phone}
                  onChangeText={handlePhoneChange}
                  keyboardType="phone-pad"
                  maxLength={14}
                />
              </View>
            </View>
          )}

          {renderOtpSection()}

          {(mode === 'login' || mode === 'register') && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={togglePasswordVisibility}
                  activeOpacity={0.7}
                >
                  <Icon
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {mode === 'register' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="#9ca3af"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={toggleConfirmPasswordVisibility}
                  activeOpacity={0.7}
                >
                  <Icon
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {mode === 'forgotPassword' && passwordResetOtpVerified && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>New Password</Text>
                <View style={styles.inputContainer}>
                  <Icon name="lock" size={20} color="#9ca3af" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter new password"
                    placeholderTextColor="#9ca3af"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showNewPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={toggleNewPasswordVisibility}
                    activeOpacity={0.7}
                  >
                    <Icon
                      name={showNewPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color="#6b7280"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirm New Password</Text>
                <View style={styles.inputContainer}>
                  <Icon name="lock" size={20} color="#9ca3af" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm new password"
                    placeholderTextColor="#9ca3af"
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                    secureTextEntry={!showConfirmNewPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={toggleConfirmNewPasswordVisibility}
                    activeOpacity={0.7}
                  >
                    <Icon
                      name={showConfirmNewPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color="#6b7280"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

          {mode === 'login' && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.forgotPasswordContainer}
              onPress={() => toggleMode('forgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.button,
              ((mode === 'register' && !otpSent) ||
                (mode === 'forgotPassword' &&
                  !passwordResetOtpSent &&
                  !passwordResetOtpVerified) ||
                (mode === 'forgotPassword' && passwordResetOtpVerified && !formComplete))
                ? styles.buttonDisabled
                : null,
            ]}
            onPress={
              mode === 'login'
                ? handleLogin
                : mode === 'register'
                ? handleRegisterWithOtp
                : passwordResetOtpVerified
                ? handleResetPassword
                : handleSendOtp
            }
            disabled={
              loading ||
              verifyingOtp ||
              passwordResetLoading ||
              (mode === 'register' && !otpSent) ||
              (mode === 'forgotPassword' && !passwordResetOtpSent && !formComplete) ||
              (mode === 'forgotPassword' && passwordResetOtpVerified && !formComplete)
            }
            activeOpacity={0.7}
          >
            {(loading || verifyingOtp || passwordResetLoading) ? (
              <View style={styles.buttonLoadingContent}>
                <ActivityIndicator color="#fff" />
                <Text style={styles.buttonLoadingText}>
                  {mode === 'login'
                    ? 'Signing in...'
                    : mode === 'register'
                    ? 'Creating account...'
                    : passwordResetOtpVerified
                    ? 'Resetting password...'
                    : 'Sending OTP...'}
                </Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>
                {mode === 'login'
                  ? 'Sign In'
                  : mode === 'register'
                  ? 'Create Account'
                  : passwordResetOtpVerified
                  ? 'Reset Password'
                  : 'Send OTP'}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.toggleContainer}>
            {mode === 'login' && (
              <TouchableOpacity
                onPress={() => toggleMode('register')}
                activeOpacity={0.7}
              >
                <Text style={styles.toggleText}>
                  Don't have an account?{' '}
                  <Text style={styles.toggleTextBold}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            )}
            {(mode === 'register' || mode === 'forgotPassword') && (
              <TouchableOpacity
                onPress={() => toggleMode('login')}
                activeOpacity={0.7}
              >
                <Text style={styles.toggleText}>
                  Already have an account?{' '}
                  <Text style={styles.toggleTextBold}>Sign In</Text>
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles remain unchanged except for adding toggleContainer
const styles = StyleSheet.create({
  // ... (existing styles unchanged)
  container: {
        flex: 1,
        backgroundColor: '#f8fafc',
      },
      scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
      },
      formContainer: {
        width: '100%',
        maxWidth: 440,
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 24,
        marginTop: 24,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(226, 232, 240, 0.7)',
      },
      brandHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
      },
      logoContainer: {
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
      brandName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1e3a8a',
        letterSpacing: -0.5,
      },
      header: {
        marginBottom: 30,
      },
      title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 8,
        textAlign: 'center',
        letterSpacing: -0.5,
      },
      subtitle: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        fontWeight: '400',
      },
      inputGroup: {
        marginBottom: 20,
      },
      inputLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 8,
        letterSpacing: -0.3,
        paddingLeft: 4,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        overflow: 'hidden',
      },
      inputIcon: {
        padding: 15,
      },
      input: {
        flex: 1,
        height: 54,
        fontSize: 16,
        color: '#1f2937',
        paddingVertical: 0, // Fix for Android
      },
      inputDisabled: {
        backgroundColor: '#f1f5f9',
        color: '#64748b',
      },
      eyeIcon: {
        padding: 15,
      },
      otpButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        margin: 7,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
      },
      otpButtonSent: {
        backgroundColor: '#059669',
      },
      otpButtonDisabled: {
        backgroundColor: '#94a3b8',
        shadowOpacity: 0.1,
      },
      otpButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
      },
      otpSection: {
        marginBottom: 20,
        padding: 16,
        backgroundColor: '#f0f9ff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#bae6fd',
      },
      otpHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
      },
      otpIconContainer: {
        width: 36,
        height: 36,
        backgroundColor: '#2563eb',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
      },
      otpLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#334155',
      },
      otpDescription: {
        fontSize: 15,
        color: '#64748b',
        marginBottom: 16,
        lineHeight: 20,
      },
      emailHighlight: {
        fontWeight: '600',
        color: '#2563eb',
      },
      otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
      },
      otpInput: {
        width: width < 380 ? 50 : 55,
        height: width < 380 ? 50 : 55,
        borderWidth: 1.5,
        borderColor: '#cbd5e1',
        borderRadius: 12,
        fontSize: 22,
        fontWeight: '600',
        color: '#334155',
        backgroundColor: '#fff',
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 2,
      },
      otpInputFilled: {
        borderColor: '#2563eb',
        backgroundColor: '#eff6ff',
        shadowColor: '#2563eb',
        shadowOpacity: 0.15,
      },
      otpInputDisabled: {
        backgroundColor: '#f1f5f9',
        color: '#94a3b8',
        borderColor: '#cbd5e1',
      },
      verifyingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
      },
      verifyingText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#2563eb',
        fontWeight: '500',
      },
      resendContainer: {
        alignItems: 'center',
      },
      resendPrompt: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 4,
      },
      resendText: {
        color: '#2563eb',
        fontSize: 15,
        fontWeight: '600',
      },
      resendTextDisabled: {
        color: '#94a3b8',
      },
      forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginBottom: 20,
      },
      forgotPasswordText: {
        color: '#2563eb',
        fontSize: 14,
        fontWeight: '600',
      },
      button: {
        width: '100%',
        height: 54,
        backgroundColor: '#2563eb',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
      },
      buttonDisabled: {
        backgroundColor: '#94a3b8',
        shadowOpacity: 0.1,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: -0.3,
      },
      buttonLoadingContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      buttonLoadingText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 12,
        letterSpacing: -0.3,
      },
      divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
      },
      dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e2e8f0',
      },
      dividerText: {
        marginHorizontal: 16,
        fontSize: 14,
        color: '#64748b',
        fontWeight: '500',
      },
      socialButton: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
      },
      googleButton: {
        marginBottom: 24,
      },
      socialIcon: {
        marginRight: 10,
      },
      socialButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#334155',
      },
      toggleText: {
        color: '#64748b',
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '400',
      },
      toggleTextBold: {
        color: '#2563eb',
        fontWeight: '600',
      },
    
  toggleContainer: {
    marginTop: 10,
    alignItems: 'center',
  },

});

export default LoginScreen;