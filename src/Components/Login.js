import React from "react";
import useStore from "../Store/useStore.js";
import { loginStyles } from "../Styles/Styles.js";

const Login = () => {
  const { googleSign } = useStore();

  return (
    <div className={loginStyles.main}>
      <h1 className={loginStyles.text}>Please Login First</h1>
      <button onClick={googleSign} className={loginStyles.btn}>
        Login With Google
      </button>
    </div>
  );
};

export default Login;
