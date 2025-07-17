import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from './store/slices/userSlice';
import BottomTabs from './navigation/BottomTabs';

// This component wraps the main app and initializes authentication
const AuthWrapper = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  // Check authentication status when component mounts
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return <BottomTabs />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default AuthWrapper;