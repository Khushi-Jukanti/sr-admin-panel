import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, defaultCredentials } from '@/data/sampleUsers';

interface AuthContextType {
  user: User | null;
  login: (role: string, username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (role: string, username: string, password: string): boolean => {
    const credentials = defaultCredentials[role as keyof typeof defaultCredentials];
    
    if (credentials && username === credentials.username && password === credentials.password) {
      const mockUser: User = {
        id: '1',
        name: role === 'superadmin' ? 'Super Admin' : 
              role.charAt(0).toUpperCase() + role.slice(1),
        role: role as User['role'],
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