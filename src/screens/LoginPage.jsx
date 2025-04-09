import React, { useContext, useState } from 'react';
import { AuthContext } from '../services/auth/auth.context';
import { useNavigate } from 'react-router';
import logoImage from "../assets/logo.png";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const { onLogin  , user } = useContext(AuthContext);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
   await onLogin(username , password);
if(user){
  navigate("/",{replace: true})
}


   
    // Add your authentication logic here
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" 
         style={{ background: 'linear-gradient(#05f601 0, #118010 100%)'  }}>
      <div className="w-full max-w-md p-8 mx-4 rounded-lg shadow-2xl relative" 
           style={{ 
              background: 'linear-gradient(145deg, #05f601 0%, #129e12 100%)',
         boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)'
           }}>
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
        
          <div className="flex items-center">
          <img
            src={logoImage}
            alt="Site Logo"
            className="h-20 w-auto cursor-pointer"
          />
        
          </div>
        </div>
        
        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="relative">
              <input 
                type="text" 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-3 rounded bg-white focus:outline-none pr-10"
                style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <input 
                type={passwordVisible ? "text" : "password"} 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 rounded bg-white focus:outline-none pr-10"
                style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              />
              <button 
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
              >
                {passwordVisible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center justify-center"
          >
            Login
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;