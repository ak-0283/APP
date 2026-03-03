import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import client, { setAuthToken } from '../api/client';
import { getToken, removeToken, saveToken } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        setToken(storedToken);
        setAuthToken(storedToken);
      }
      setLoading(false);
    };
    bootstrap();
  }, []);

  const signup = async (payload) => {
    const { data } = await client.post('/auth/signup', payload);
    setToken(data.token);
    setUser(data.user);
    setAuthToken(data.token);
    await saveToken(data.token);
  };

  const login = async (payload) => {
    const { data } = await client.post('/auth/login', payload);
    setToken(data.token);
    setUser(data.user);
    setAuthToken(data.token);
    await saveToken(data.token);
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
    await removeToken();
  };

  const value = useMemo(
    () => ({ token, user, loading, signup, login, logout, setUser }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
