import React, { createContext, useEffect, useState } from "react";
import { onLoginWithCredentials , changePassword} from "./auth.service";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const isPasswordChange = localStorage.getItem("isPasswordChanged");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      setIsPasswordChanged(isPasswordChange);
    }
    setLoading(false);
  }, []);

  const onLogin = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await onLoginWithCredentials(username, password);
      if (!response.status) {
        throw new Error(response.message || "Invalid credentials");
      }

      localStorage.setItem("token", response.session_token); 
      localStorage.setItem("user", JSON.stringify(response)); 

      setToken(response.session_token);
      setUser(response);
      setIsAuthenticated(true);
    } catch (e) {
      setError(e.message);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const onChangePassword = async (user_id, newPassword) => {
    setLoading(true);
    setError(null);
  
    try {
      const result = await changePassword({ user_id, newPassword });
  
      if (result?.status) {
        console.log("Password changed successfully");

        setIsPasswordChanged(true);
        localStorage.setItem("isPasswordChanged", true); // Store the password change status in localStorage
        
        // Fetch updated user profile
       
        
        // const updatedUserData = await onLogin(user.mob , newPassword);
        // console.log(updatedUserData);
        
        // setUser(updatedUserData);
  
        return true;
      } else {
        throw new Error(result?.message || "Password update failed");
      }
    } catch (error) {
      console.error("Change password error:", error.message);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  
 
  return (
    <AuthContext.Provider value={{ isPasswordChanged,isAuthenticated, onLogin, onLogout, user, loading, error, token  , onChangePassword}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
