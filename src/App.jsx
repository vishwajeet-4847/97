import React, { useContext } from 'react';

import LoginPage from './screens/LoginPage';
import HomeScreen from './screens/HomeScreen';
import { AuthContext } from './services/auth/auth.context';
import ChangePassword from './screens/ChangePassword';
const App = () => {
  const { isAuthenticated, user, isPasswordChanged } = useContext(AuthContext);

  if (!isAuthenticated) return <LoginPage />;

  // If user is virgin and hasn't changed password yet => force ChangePassword
  if (user?.is_virgin === 1 && !isPasswordChanged) {
    return <ChangePassword />;
  }

  // Otherwise, show the app
  return <HomeScreen />;
};

export default  App;