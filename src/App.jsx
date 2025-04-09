import React, { useContext } from 'react';

import LoginPage from './screens/LoginPage';
import HomeScreen from './screens/HomeScreen';
import { AuthContext } from './services/auth/auth.context';
import ChangePassword from './screens/ChangePassword';

const App = () => {
   const {isAuthenticated , user } = useContext(AuthContext);
  
   

  return isAuthenticated ?  user.is_virgin === 0 ? <HomeScreen /> :<ChangePassword />: <LoginPage />
};

export default App;