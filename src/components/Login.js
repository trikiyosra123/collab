import React from "react";
import { Button } from "@material-ui/core";
import "../index.css";
import { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import logo from "../images/Entertainment HUB.png"


function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img src= {logo} alt="login__logo" />
        <div className="login__text">
          <h1>SignIn</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          SignIn With Google
        </Button>
      </div>
    </div>
  );
}

export default Login;