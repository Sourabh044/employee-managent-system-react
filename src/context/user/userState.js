import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import UserContext from "./userContext";

const UserState = (props) => {
  const [login, setLogin] = useState(false);
  const [account, setAccount] = useState(0);
  const [token,setToken] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    // console.log('account', account);
    if (account === 2){
      // console.log(account);
      // console.log(response);
      navigate('/employee')
    }
    else if(account === 1){
      // console.log(account);
      navigate('/hr')
    }
  }, [account]);

  useEffect(() => {
    // console.log('login', login);

  }, [login]);
  useEffect(() => {
    // console.log('login', login);
    localStorage.setItem('token',token)
  }, [token]);

    // User login function
    const auth = async (credentials) => {
      await fetch(`http://127.0.0.1:8000/token/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.email,
          password: credentials.password,
        }),
      }).then(response => response.json()).then(responseJson=>{

        if (!responseJson.token) {
          return swal({
            title: "Invalid Credentials",
            text: "Username or Password not correct",
            icon: "info",
            button: "Login again",
          });
        }
        setToken(responseJson.token);
        setAccount(responseJson.account);
        localStorage.setItem("token", responseJson.token);
        // console.log(localStorage.getItem("token"))
        localStorage.setItem('account',responseJson.account)
        // console.log(localStorage.getItem("account"))
        localStorage.setItem("username", responseJson.username);
        localStorage.setItem("login", "true");
        setLogin(true);
        return swal({
          title: "Login Successfull",
          text: `Welcome ${responseJson.username}`,
          icon: "success",
          button: "Continue",
        });
      })

  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("account");
    setLogin(false);
    setAccount(0);
  };

     return (
        <UserContext.Provider
          value={{
            auth,
            login,
            account,
            logout,
            setAccount,
            setToken,
            setLogin,
          }}
        >
          {props.children}
        </UserContext.Provider>
      );
    };
    
    export default UserState;