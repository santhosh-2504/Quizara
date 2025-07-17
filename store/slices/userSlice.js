// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// // Base URL for your API
// //const API_URL = 'https://mocktest-backend-uu2q.onrender.com/api/users'; // Change this to your actual backend URL
// const API_URL = 'http://192.168.1.5:5000/api/users'; // Change this to your actual backend URL

// // Async thunks for authentication actions
// export const registerUser = createAsyncThunk(
//   'user/register',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/register`, userData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Registration failed'
//       );
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   'user/login',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/login`, userData);
//       const { token } = response.data;
      
//       // Store token in AsyncStorage (React Native's equivalent to localStorage/cookies)
//       await AsyncStorage.setItem('userToken', token);
      
//       // Set token in axios headers for future requests
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       // Get user profile with the token
//       const profileResponse = await axios.get(`${API_URL}/me`);
      
//       return {
//         token,
//         user: profileResponse.data
//       };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Login failed'
//       );
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   'user/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       // Remove token from AsyncStorage
//       await AsyncStorage.removeItem('userToken');
      
//       // Remove token from axios headers
//       delete axios.defaults.headers.common['Authorization'];
      
//       return null;
//     } catch (error) {
//       return rejectWithValue('Logout failed');
//     }
//   }
// );

// export const checkAuthStatus = createAsyncThunk(
//   'user/checkAuth',
//   async (_, { rejectWithValue }) => {
//     try {
//       // Check if token exists in AsyncStorage
//       const token = await AsyncStorage.getItem('userToken');
      
//       if (!token) {
//         return null;
//       }
      
//       // Set token in axios headers
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       // Verify token by getting user profile
//       const profileResponse = await axios.get(`${API_URL}/me`);
      
//       return {
//         token,
//         user: profileResponse.data

//       };
//     } catch (error) {
//       // If token is invalid, clear storage
//       await AsyncStorage.removeItem('userToken');
//       delete axios.defaults.headers.common['Authorization'];
      
//       return rejectWithValue('Authentication failed');
//     }
//   }
// );

// // Initial state
// const initialState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null
// };

// // Create slice
// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register cases
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Login cases
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Logout cases
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.token = null;
//         state.isAuthenticated = false;
//       })
      
//       // Check auth status cases
//       .addCase(checkAuthStatus.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(checkAuthStatus.fulfilled, (state, action) => {
//         state.loading = false;
//         if (action.payload) {
//           state.isAuthenticated = true;
//           state.user = action.payload.user;
//           state.token = action.payload.token;
//         } else {
//           state.isAuthenticated = false;
//           state.user = null;
//           state.token = null;
//         }
//       })
//       .addCase(checkAuthStatus.rejected, (state) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.user = null;
//         state.token = null;
//       });
//   }
// });

// export const { clearError } = userSlice.actions;

// export default userSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// // Base URL for your API
// //const API_URL = 'https://mocktest-backend-uu2q.onrender.com/api/users'; // Change this to your actual backend URL
// const API_URL = 'http://192.168.1.8:5000/api/users'; // Change this to your actual backend URL

// // Async thunks for authentication actions
// export const registerUser = createAsyncThunk(
//   'user/register',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/register`, userData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Registration failed'
//       );
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   'user/login',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/login`, userData);
//       const { token } = response.data;
      
//       // Store token in AsyncStorage (React Native's equivalent to localStorage/cookies)
//       await AsyncStorage.setItem('userToken', token);
      
//       // Set token in axios headers for future requests
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       // Get user profile with the token
//       const profileResponse = await axios.get(`${API_URL}/me`);
      
//       return {
//         token,
//         user: profileResponse.data
//       };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Login failed'
//       );
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   'user/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       // Remove token from AsyncStorage
//       await AsyncStorage.removeItem('userToken');
      
//       // Remove token from axios headers
//       delete axios.defaults.headers.common['Authorization'];
      
//       return null;
//     } catch (error) {
//       return rejectWithValue('Logout failed');
//     }
//   }
// );

// export const checkAuthStatus = createAsyncThunk(
//   'user/checkAuth',
//   async (_, { rejectWithValue }) => {
//     try {
//       // Check if token exists in AsyncStorage
//       const token = await AsyncStorage.getItem('userToken');
      
//       if (!token) {
//         return null;
//       }
      
//       // Set token in axios headers
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       // Verify token by getting user profile
//       const profileResponse = await axios.get(`${API_URL}/me`);
      
//       return {
//         token,
//         user: profileResponse.data

//       };
//     } catch (error) {
//       // If token is invalid, clear storage
//       await AsyncStorage.removeItem('userToken');
//       delete axios.defaults.headers.common['Authorization'];
      
//       return rejectWithValue('Authentication failed');
//     }
//   }
// );

// // New async thunk for updating quiz score
// export const updateQuizScore = createAsyncThunk(
//   'user/updateQuizScore',
//   async ({ quizId, score }, { rejectWithValue, getState }) => {
//     try {
//       // Get token from state or AsyncStorage
//       const { user } = getState();
//       let token = user.token;
      
//       if (!token) {
//         token = await AsyncStorage.getItem('userToken');
//       }
      
//       if (!token) {
//         return rejectWithValue('No authentication token found');
//       }
      
//       // Set token in axios headers if not already set
//       if (!axios.defaults.headers.common['Authorization']) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       }
      
//       const response = await axios.post(`${API_URL}/quiz-score`, {
//         quizId,
//         score
//       });
      
//       return {
//         quizId,
//         score,
//         quizAttempt: response.data.quizAttempt
//       };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || error.response?.data?.message || 'Failed to update quiz score'
//       );
//     }
//   }
// );

// // Initial state
// const initialState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
//   updatingScore: false,
//   scoreUpdateError: null
// };

// // Create slice
// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//       state.scoreUpdateError = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register cases
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Login cases
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Logout cases
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.token = null;
//         state.isAuthenticated = false;
//       })
      
//       // Check auth status cases
//       .addCase(checkAuthStatus.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(checkAuthStatus.fulfilled, (state, action) => {
//         state.loading = false;
//         if (action.payload) {
//           state.isAuthenticated = true;
//           state.user = action.payload.user;
//           state.token = action.payload.token;
//         } else {
//           state.isAuthenticated = false;
//           state.user = null;
//           state.token = null;
//         }
//       })
//       .addCase(checkAuthStatus.rejected, (state) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.user = null;
//         state.token = null;
//       })
      
//       // Update quiz score cases
//       .addCase(updateQuizScore.pending, (state) => {
//         state.updatingScore = true;
//         state.scoreUpdateError = null;
//       })
//       .addCase(updateQuizScore.fulfilled, (state, action) => {
//         state.updatingScore = false;
//         // Update user's quizAttempts in state if user object has this field
//         if (state.user && state.user.quizAttempts) {
//           state.user.quizAttempts.push(action.payload.quizAttempt);
//         }
//       })
//       .addCase(updateQuizScore.rejected, (state, action) => {
//         state.updatingScore = false;
//         state.scoreUpdateError = action.payload;
//       });
//   }
// });

// export const { clearError } = userSlice.actions;

// export default userSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// // Base URL for your API
// //const API_URL = 'https://mocktest-backend-uu2q.onrender.com/api/users'; // Change this to your actual backend URL
// const API_URL = 'http://192.168.1.2:5000/api'; // Change this to your actual backend URL

// // Async thunks for authentication actions
// export const registerUser = createAsyncThunk(
//   'user/register',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/users/register`, userData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Registration failed'
//       );
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   'user/login',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/users/login`, userData);
//       const { token } = response.data;
      
//       // Store token in AsyncStorage (React Native's equivalent to localStorage/cookies)
//       await AsyncStorage.setItem('userToken', token);
      
//       // Set token in axios headers for future requests
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       // Get user profile with the token
//       const profileResponse = await axios.get(`${API_URL}/users/me`);
      
//       return {
//         token,
//         user: profileResponse.data
//       };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Login failed'
//       );
//     }
//   }
// );

// // New OTP-related async thunks
// export const sendOTP = createAsyncThunk(
//   'user/sendOTP',
//   async ({ email, name }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/send-otp`, { email, name });
//       return {
//         message: response.data.message,
//         email: response.data.email
//       };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || error.response?.data?.message || 'Failed to send OTP'
//       );
//     }
//   }
// );

// export const resendOTP = createAsyncThunk(
//   'user/resendOTP',
//   async ({ email }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/resend-otp`, { email });
//       return {
//         message: response.data.message,
//         email: response.data.email
//       };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || error.response?.data?.message || 'Failed to resend OTP'
//       );
//     }
//   }
// );

// export const registerWithOTP = createAsyncThunk(
//   'user/registerWithOTP',
//   async ({ name, email, phone, password, otp }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/register-with-otp`, {
//         name,
//         email,
//         phone,
//         password,
//         otp
//       });
      
//       const { token } = response.data;
      
//       // Store token in AsyncStorage
//       await AsyncStorage.setItem('userToken', token);
      
//       // Set token in axios headers for future requests
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       return {
//         token,
//         user: response.data.user,
//         message: response.data.message
//       };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || error.response?.data?.message || 'Registration failed'
//       );
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   'user/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       // Remove token from AsyncStorage
//       await AsyncStorage.removeItem('userToken');
      
//       // Remove token from axios headers
//       delete axios.defaults.headers.common['Authorization'];
      
//       return null;
//     } catch (error) {
//       return rejectWithValue('Logout failed');
//     }
//   }
// );

// export const checkAuthStatus = createAsyncThunk(
//   'user/checkAuth',
//   async (_, { rejectWithValue }) => {
//     try {
//       // Check if token exists in AsyncStorage
//       const token = await AsyncStorage.getItem('userToken');
      
//       if (!token) {
//         return null;
//       }
      
//       // Set token in axios headers
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       // Verify token by getting user profile
//       const profileResponse = await axios.get(`${API_URL}/users/me`);
      
//       return {
//         token,
//         user: profileResponse.data
//       };
//     } catch (error) {
//       // If token is invalid, clear storage
//       await AsyncStorage.removeItem('userToken');
//       delete axios.defaults.headers.common['Authorization'];
      
//       return rejectWithValue('Authentication failed');
//     }
//   }
// );

// // New async thunk for updating quiz score
// export const updateQuizScore = createAsyncThunk(
//   'user/updateQuizScore',
//   async ({ quizId, score }, { rejectWithValue, getState }) => {
//     try {
//       // Get token from state or AsyncStorage
//       const { user } = getState();
//       let token = user.token;
      
//       if (!token) {
//         token = await AsyncStorage.getItem('userToken');
//       }
      
//       if (!token) {
//         return rejectWithValue('No authentication token found');
//       }
      
//       // Set token in axios headers if not already set
//       if (!axios.defaults.headers.common['Authorization']) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       }
      
//       const response = await axios.post(`${API_URL}/users/quiz-score`, {
//         quizId,
//         score
//       });
      
//       return {
//         quizId,
//         score,
//         quizAttempt: response.data.quizAttempt
//       };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || error.response?.data?.message || 'Failed to update quiz score'
//       );
//     }
//   }
// );

// // Initial state
// const initialState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
//   updatingScore: false,
//   scoreUpdateError: null,
//   // OTP-related state
//   otpSent: false,
//   otpLoading: false,
//   otpError: null,
//   verifyingOtp: false,
//   registrationSuccess: false
// };

// // Create slice
// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//       state.scoreUpdateError = null;
//       state.otpError = null;
//     },
//     clearOtpState: (state) => {
//       state.otpSent = false;
//       state.otpLoading = false;
//       state.otpError = null;
//       state.verifyingOtp = false;
//       state.registrationSuccess = false;
//     },
//     resetRegistrationState: (state) => {
//       state.registrationSuccess = false;
//       state.otpSent = false;
//       state.otpError = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register cases (keeping for backward compatibility)
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Send OTP cases
//       .addCase(sendOTP.pending, (state) => {
//         state.otpLoading = true;
//         state.otpError = null;
//       })
//       .addCase(sendOTP.fulfilled, (state, action) => {
//         state.otpLoading = false;
//         state.otpSent = true;
//         state.otpError = null;
//       })
//       .addCase(sendOTP.rejected, (state, action) => {
//         state.otpLoading = false;
//         state.otpError = action.payload;
//         state.otpSent = false;
//       })
      
//       // Resend OTP cases
//       .addCase(resendOTP.pending, (state) => {
//         state.otpLoading = true;
//         state.otpError = null;
//       })
//       .addCase(resendOTP.fulfilled, (state, action) => {
//         state.otpLoading = false;
//         state.otpError = null;
//       })
//       .addCase(resendOTP.rejected, (state, action) => {
//         state.otpLoading = false;
//         state.otpError = action.payload;
//       })
      
//       // Register with OTP cases
//       .addCase(registerWithOTP.pending, (state) => {
//         state.verifyingOtp = true;
//         state.error = null;
//         state.otpError = null;
//       })
//       .addCase(registerWithOTP.fulfilled, (state, action) => {
//         state.verifyingOtp = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.registrationSuccess = true;
//         state.otpSent = false;
//         state.error = null;
//         state.otpError = null;
//       })
//       .addCase(registerWithOTP.rejected, (state, action) => {
//         state.verifyingOtp = false;
//         state.otpError = action.payload;
//       })
      
//       // Login cases
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Logout cases
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.token = null;
//         state.isAuthenticated = false;
//         state.registrationSuccess = false;
//       })
      
//       // Check auth status cases
//       .addCase(checkAuthStatus.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(checkAuthStatus.fulfilled, (state, action) => {
//         state.loading = false;
//         if (action.payload) {
//           state.isAuthenticated = true;
//           state.user = action.payload.user;
//           state.token = action.payload.token;
//         } else {
//           state.isAuthenticated = false;
//           state.user = null;
//           state.token = null;
//         }
//       })
//       .addCase(checkAuthStatus.rejected, (state) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.user = null;
//         state.token = null;
//       })
      
//       // Update quiz score cases
//       .addCase(updateQuizScore.pending, (state) => {
//         state.updatingScore = true;
//         state.scoreUpdateError = null;
//       })
//       .addCase(updateQuizScore.fulfilled, (state, action) => {
//         state.updatingScore = false;
//         // Update user's quizAttempts in state if user object has this field
//         if (state.user && state.user.quizAttempts) {
//           state.user.quizAttempts.push(action.payload.quizAttempt);
//         }
//       })
//       .addCase(updateQuizScore.rejected, (state, action) => {
//         state.updatingScore = false;
//         state.scoreUpdateError = action.payload;
//       });
//   }
// });

// export const { clearError, clearOtpState, resetRegistrationState } = userSlice.actions;

// export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Base URL for your API
const API_URL = 'https://mocktest-backend-uu2q.onrender.com/api'; // Change this to your actual backend URL
//const API_URL = 'http://192.168.1.114:5000/api'; // Change this to your actual backend URL

// Async thunks for authentication actions
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, userData);
      const { token } = response.data;
      
      // Store token in AsyncStorage (React Native's equivalent to localStorage/cookies)
      await AsyncStorage.setItem('userToken', token);
      
      // Set token in axios headers for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Get user profile with the token
      const profileResponse = await axios.get(`${API_URL}/users/me`);
      
      return {
        token,
        user: profileResponse.data
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// New OTP-related async thunks
export const sendOTP = createAsyncThunk(
  'user/sendOTP',
  async ({ email, name }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/send-otp`, { email, name });
      return {
        message: response.data.message,
        email: response.data.email
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.response?.data?.message || 'Failed to send OTP'
      );
    }
  }
);

export const resendOTP = createAsyncThunk(
  'user/resendOTP',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/resend-otp`, { email });
      return {
        message: response.data.message,
        email: response.data.email
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.response?.data?.message || 'Failed to resend OTP'
      );
    }
  }
);

export const registerWithOTP = createAsyncThunk(
  'user/registerWithOTP',
  async ({ name, email, phone, password, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register-with-otp`, {
        name,
        email,
        phone,
        password,
        otp
      });
      
      const { token } = response.data;
      
      // Store token in AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      
      // Set token in axios headers for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return {
        token,
        user: response.data.user,
        message: response.data.message
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

// New forgot password related async thunks
export const sendPasswordResetOTP = createAsyncThunk(
  'user/sendPasswordResetOTP',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      return {
        message: response.data.message,
        email: response.data.email
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.response?.data?.message || 'Failed to send password reset OTP'
      );
    }
  }
);

export const verifyPasswordResetOTP = createAsyncThunk(
  'user/verifyPasswordResetOTP',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/verify-reset-otp`, { email, otp });
      return {
        message: response.data.message,
        resetToken: response.data.resetToken
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.response?.data?.message || 'Failed to verify OTP'
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ resetToken, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, { 
        resetToken, 
        newPassword 
      });
      return {
        message: response.data.message
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.response?.data?.message || 'Failed to reset password'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Remove token from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      
      // Remove token from axios headers
      delete axios.defaults.headers.common['Authorization'];
      
      return null;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      // Check if token exists in AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        return null;
      }
      
      // Set token in axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Verify token by getting user profile
      const profileResponse = await axios.get(`${API_URL}/users/me`);
      
      return {
        token,
        user: profileResponse.data
      };
    } catch (error) {
      // If token is invalid, clear storage
      await AsyncStorage.removeItem('userToken');
      delete axios.defaults.headers.common['Authorization'];
      
      return rejectWithValue('Authentication failed');
    }
  }
);

// New async thunk for updating quiz score
export const updateQuizScore = createAsyncThunk(
  'user/updateQuizScore',
  async ({ quizId, score }, { rejectWithValue, getState }) => {
    try {
      // Get token from state or AsyncStorage
      const { user } = getState();
      let token = user.token;
      
      if (!token) {
        token = await AsyncStorage.getItem('userToken');
      }
      
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      
      // Set token in axios headers if not already set
      if (!axios.defaults.headers.common['Authorization']) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await axios.post(`${API_URL}/users/quiz-score`, {
        quizId,
        score
      });
      
      return {
        quizId,
        score,
        quizAttempt: response.data.quizAttempt
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.response?.data?.message || 'Failed to update quiz score'
      );
    }
  }
);

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  updatingScore: false,
  scoreUpdateError: null,
  // OTP-related state
  otpSent: false,
  otpLoading: false,
  otpError: null,
  verifyingOtp: false,
  registrationSuccess: false,
  // Password reset related state
  passwordResetOtpSent: false,
  passwordResetOtpVerified: false,
  passwordResetToken: null,
  passwordResetSuccess: false,
  passwordResetLoading: false,
  passwordResetError: null
};

// Create slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.scoreUpdateError = null;
      state.otpError = null;
      state.passwordResetError = null;
    },
    clearOtpState: (state) => {
      state.otpSent = false;
      state.otpLoading = false;
      state.otpError = null;
      state.verifyingOtp = false;
      state.registrationSuccess = false;
    },
    resetRegistrationState: (state) => {
      state.registrationSuccess = false;
      state.otpSent = false;
      state.otpError = null;
    },
    resetPasswordResetState: (state) => {
      state.passwordResetOtpSent = false;
      state.passwordResetOtpVerified = false;
      state.passwordResetToken = null;
      state.passwordResetSuccess = false;
      state.passwordResetError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register cases (keeping for backward compatibility)
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Send OTP cases
      .addCase(sendOTP.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.otpSent = true;
        state.otpError = null;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload;
        state.otpSent = false;
      })
      
      // Resend OTP cases
      .addCase(resendOTP.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.otpError = null;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload;
      })
      
      // Register with OTP cases
      .addCase(registerWithOTP.pending, (state) => {
        state.verifyingOtp = true;
        state.error = null;
        state.otpError = null;
      })
      .addCase(registerWithOTP.fulfilled, (state, action) => {
        state.verifyingOtp = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.registrationSuccess = true;
        state.otpSent = false;
        state.error = null;
        state.otpError = null;
      })
      .addCase(registerWithOTP.rejected, (state, action) => {
        state.verifyingOtp = false;
        state.otpError = action.payload;
      })
      
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.registrationSuccess = false;
      })
      
      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        } else {
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
        }
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      
      // Update quiz score cases
      .addCase(updateQuizScore.pending, (state) => {
        state.updatingScore = true;
        state.scoreUpdateError = null;
      })
      .addCase(updateQuizScore.fulfilled, (state, action) => {
        state.updatingScore = false;
        // Update user's quizAttempts in state if user object has this field
        if (state.user && state.user.quizAttempts) {
          state.user.quizAttempts.push(action.payload.quizAttempt);
        }
      })
      .addCase(updateQuizScore.rejected, (state, action) => {
        state.updatingScore = false;
        state.scoreUpdateError = action.payload;
      })
      
      // Send password reset OTP cases
      .addCase(sendPasswordResetOTP.pending, (state) => {
        state.passwordResetLoading = true;
        state.passwordResetError = null;
      })
      .addCase(sendPasswordResetOTP.fulfilled, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetOtpSent = true;
        state.passwordResetError = null;
      })
      .addCase(sendPasswordResetOTP.rejected, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetError = action.payload;
        state.passwordResetOtpSent = false;
      })
      
      // Verify password reset OTP cases
      .addCase(verifyPasswordResetOTP.pending, (state) => {
        state.passwordResetLoading = true;
        state.passwordResetError = null;
      })
      .addCase(verifyPasswordResetOTP.fulfilled, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetOtpVerified = true;
        state.passwordResetToken = action.payload.resetToken;
        state.passwordResetError = null;
      })
      .addCase(verifyPasswordResetOTP.rejected, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetError = action.payload;
        state.passwordResetOtpVerified = false;
      })
      
      // Reset password cases
      .addCase(resetPassword.pending, (state) => {
        state.passwordResetLoading = true;
        state.passwordResetError = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.passwordResetLoading = false;
        state.passwordResetSuccess = true;
        state.passwordResetOtpSent = false;
        state.passwordResetOtpVerified = false;
        state.passwordResetToken = null;
        state.passwordResetError = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetError = action.payload;
      });
  }
});

export const { 
  clearError, 
  clearOtpState, 
  resetRegistrationState,
  resetPasswordResetState 
} = userSlice.actions;

export default userSlice.reducer;