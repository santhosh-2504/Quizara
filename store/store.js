import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import quizReducer from './slices/quizSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    quiz: quizReducer,
    // Add other reducers here as needed
  },
});

export default store;