import { clippingParents } from "@popperjs/core";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import LoadingContext from "../loadingContext";
import UserContext from "./userContext";

const UserState = (props) => {
  const { setLoading } = useContext(LoadingContext);
  const [login, setLogin] = useState(false);
  const [account, setAccount] = useState(0);
  const [token, setToken] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    // console.log('account', account);
    if (account === 2) {
      // console.log(account);
      // console.log(response);
      navigate('/employee')
    }
    else if (account === 1) {
      // console.log(account);
      navigate('/hr')
    }
  }, [account]);

  useEffect(() => {
    // console.log('login', login);

  }, [login]);
  useEffect(() => {
    // console.log('login', login);
    localStorage.setItem('token', token)
  }, [token]);

  // User login function
  const auth = async (credentials) => {
    await fetch(process.env.REACT_APP_API_URL + "token/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.email,
        password: credentials.password,
      }),
    })
      .then(response => response.json()).then(responseJson => {
        console.log(responseJson)
        if (!responseJson.token) {
          return swal({
            title: "Invalid Credentials",
            text: "Username or Password not correct",
            icon: "error",
            button: "Login again",
          });
        }
        setLoading(false)
        setToken(responseJson.token);
        setAccount(responseJson.account);
        localStorage.setItem("token", responseJson.token);
        localStorage.setItem("id", responseJson.user_id);
        localStorage.setItem('account', responseJson.account)
        localStorage.setItem("username", responseJson.username);
        localStorage.setItem("login", "true");
        setLogin(true);
        return swal({
          title: "Login Successfull",
          text: `Welcome ${localStorage.getItem('username')}`,
          icon: "success",
          button: "Continue",
        }).then(() => {
          setLoading(false)
        })
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