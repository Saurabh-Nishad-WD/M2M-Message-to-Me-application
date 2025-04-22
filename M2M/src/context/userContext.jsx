import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id || decoded.userId || decoded._id;
        axios
          .get(`http://localhost:5000/api/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => console.error("Error fetching user:", err));
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  const updateUser = (newUserData) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserData }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
