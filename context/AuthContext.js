import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('/api/auth/user', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data.user);
        } catch (err) {
          console.error(err);
          localStorage.removeItem('token');
        }
      }
    };
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (username, email, password) => {
    try {
      const res = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
