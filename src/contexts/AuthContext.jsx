import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultCredentials } from '../data/sampleUsers.js';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (role, username, password) => {
    const credentials = defaultCredentials[role];
    
    if (credentials && username === credentials.username && password === credentials.password) {
      const mockUser = {
        id: '1',
        name: role === 'superadmin' ? 'Super Admin' : 
              role.charAt(0).toUpperCase() + role.slice(1),
        role: role,
        email: `${username}@srinstitutes.edu.in`,
        school: 'SR Engineering College',
        campus: 'Main Campus',
        status: 'active'
      };
      
      setUser(mockUser);
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};