import React, { useState, useEffect, useContext, createContext } from 'react';
import fetchApi from './fetchApi';

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
        {children}
    </authContext.Provider>
  );
};

export const useAuth = () => (
  useContext(authContext)
);

const useProvideAuth = () => {
  const apiUrl = 'http://localhost:5000';
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/get-user/`, {credentials: 'include'})
      .then(res => res.ok ? res.json() : null)
      .then(user => setUser(user))
    }, []);

  const login = async (credentials) => (
    fetchApi(`${apiUrl}/login/`, credentials)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(user => setUser(user))
  );

  const register = async (credentials) => (
    fetchApi(`${apiUrl}/register/`, credentials)
      .then(res => res.ok ? res.json() : Promise.reject(res))
  );

  const logout = async () => (
    fetchApi(`${apiUrl}/logout/`, {})
      .then(res => res.ok ? setUser(null): Promise.reject(res))
  );

  return {
    user,
    login,
    register,
    logout
  }
}
