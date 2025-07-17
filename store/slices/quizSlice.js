import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for your API
const API_URL = 'https://mocktest-backend-uu2q.onrender.com/api/quizzes'; // Change this to your actual backend URL
//const API_URL = 'http://192.168.1.114:5000/api/quizzes'; // Change this to your actual backend URL
// Async thunks for quiz actions
export const createQuiz = createAsyncThunk(
  'quiz/create',
  async (quizData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL + '/create', quizData);
      return response.data.quiz;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to create quiz'
      );
    }
  }
);

export const askAIAboutQuestion = createAsyncThunk(
  'quiz/askAI',
  async (questionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/ask-ai`, questionData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data.aiResponse;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to get AI response'
      );
    }
  }
);

export const generateQuiz = createAsyncThunk(
  'quiz/generate',
  async (quizParams, { rejectWithValue }) => {
    try {
      // Check if quizParams is FormData (contains image)
      const isFormData = quizParams instanceof FormData;
      
      // Configure headers based on request type
      const headers = isFormData 
        ? { 'Content-Type': 'multipart/form-data' } 
        : { 'Content-Type': 'application/json' };
      
      const response = await axios.post(
        API_URL + '/generate', 
        quizParams,
        { headers }
      );
      
      return response.data.quiz;
    } catch (error) {
      // Extract error message from response or provide a fallback
      const errorMessage = 
        error.response?.data?.error || 
        error.message || 
        'Failed to generate quiz';
        
      console.error('Quiz generation error:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchAllQuizzes = createAsyncThunk(
  'quiz/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data.quizzes;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch quizzes'
      );
    }
  }
);

export const fetchUserQuizzes = createAsyncThunk(
  'quiz/fetchUserQuizzes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user`);
      return response.data.quizzes;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch your quizzes'
      );
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  'quiz/delete',
  async (quizId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${quizId}`);
      return quizId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to delete quiz'
      );
    }
  }
);

export const fetchQuizTitles = createAsyncThunk(
  'quiz/fetchTitles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/titles`);
      return response.data.quizTitles;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch quiz titles'
      );
    }
  }
);


// Initial state
const initialState = {
  quizzes: [],
  userQuizzes: [],
  quizTitles: [],
  currentQuiz: null,
  loading: false,
  titlesLoading: false,
  error: null,
  success: false,
  generatedQuiz: null,
  generationLoading: false,
  generationError: null,
  aiResponse: null,
  aiLoading: false,
};

// Create slice
const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    clearQuizError: (state) => {
      state.error = null;
      state.success = false;
      state.generationError = null;
    },
    setCurrentQuiz: (state, action) => {
      state.currentQuiz = action.payload;
    },
    clearCurrentQuiz: (state) => {
      state.currentQuiz = null;
    },
    clearGeneratedQuiz: (state) => {
      state.generatedQuiz = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create quiz cases
      .addCase(createQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userQuizzes.push(action.payload);
        state.quizzes.push(action.payload);
        state.currentQuiz = action.payload;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      
      // Generate quiz cases
      .addCase(generateQuiz.pending, (state) => {
        state.generationLoading = true;
        state.generationError = null;
        state.success = false;
      })
      .addCase(generateQuiz.fulfilled, (state, action) => {
        state.generationLoading = false;
        state.generatedQuiz = action.payload;
        state.success = true;
      })
      .addCase(generateQuiz.rejected, (state, action) => {
        state.generationLoading = false;
        state.generationError = action.payload;
        state.success = false;
      })
      
      // Fetch all quizzes cases
      .addCase(fetchAllQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchAllQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch user quizzes cases
      .addCase(fetchUserQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.userQuizzes = action.payload;
      })
      .addCase(fetchUserQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete quiz cases
      .addCase(deleteQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userQuizzes = state.userQuizzes.filter(
          (quiz) => quiz._id !== action.payload
        );
        state.quizzes = state.quizzes.filter(
          (quiz) => quiz._id !== action.payload
        );
        if (state.currentQuiz && state.currentQuiz._id === action.payload) {
          state.currentQuiz = null;
        }
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(fetchQuizTitles.pending, (state) => {
        state.titlesLoading = true;
        state.error = null;
      })
      .addCase(fetchQuizTitles.fulfilled, (state, action) => {
        state.titlesLoading = false;
        state.quizTitles = action.payload;
      })
      .addCase(fetchQuizTitles.rejected, (state, action) => {
        state.titlesLoading = false;
        state.error = action.payload;
      })

      .addCase(askAIAboutQuestion.pending, (state) => {
        state.aiLoading = true;
        state.error = null;
      })
      .addCase(askAIAboutQuestion.fulfilled, (state, action) => {
        state.aiLoading = false;
        state.aiResponse = action.payload;
      })
      .addCase(askAIAboutQuestion.rejected, (state, action) => {
        state.aiLoading = false;
        state.error = action.payload;
        state.aiResponse = null;
      });
  }
});

export const { 
  clearQuizError, 
  setCurrentQuiz, 
  clearCurrentQuiz,
  clearGeneratedQuiz
} = quizSlice.actions;

export default quizSlice.reducer;