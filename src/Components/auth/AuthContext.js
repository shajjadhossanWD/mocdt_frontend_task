import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('emailapp'));
    const [currentUser, setCurrentUser] = useState(null);
    const [isGet, setIsGet] = useState(false);
    const [userRefetch, setUserRefetch] = useState(false);
    const [tokenLocal, setTokenLocal] = useState(null);
    const [token, setToken] = useState(null);


    useEffect(() => {
      if (localStorage.getItem("emailapp")) {
        axios
          .get(
            "https://mocdt-backend-task-x5ie.vercel.app/api/v1/user/current-user",
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("emailapp")}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              setCurrentUser(res.data.result);
              console.log(res.data.result,"userss")
              setIsGet(true);
            }
          })
          .finally(() => { });
        setUserRefetch(false);
      }
    }, [userRefetch, localStorage.getItem("emailapp"),tokenLocal]);


    const logout = () => {
      localStorage.removeItem('emailapp');
      setAuthToken(null);
      setCurrentUser(null);
    };
  
      
  
    return (
      <AuthContext.Provider 
       value={{ 
        authToken, 
        currentUser, 
        logout,
        setTokenLocal,
        setUserRefetch,
        userRefetch,
        isGet,
        setToken,
        }}>
        {children}
      </AuthContext.Provider>
    );
  };
  